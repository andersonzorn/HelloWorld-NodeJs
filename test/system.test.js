import assert from 'assert';
import {execSync} from 'child_process';
import request from 'got';

const get = (route, baseUrl, idToken) => {
  return request(new URL(route, baseUrl.trim()), {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    throwHttpErrors: false,
  });
};

describe('End-to-End Tests', () => {
  const {GOOGLE_CLOUD_PROJECT} = process.env;
  if (!GOOGLE_CLOUD_PROJECT) {
    throw Error('"GOOGLE_CLOUD_PROJECT" env var not found.');
  }
  let {SERVICE_NAME} = process.env;
  if (!SERVICE_NAME) {
    SERVICE_NAME = 'helloworld';
    console.log(
      `"SERVICE_NAME" env var not found. Defaulting to "${SERVICE_NAME}"`
    );
  }
  const {SERVICE_ACCOUNT} = process.env;
  let {NAME} = process.env;
  if (!NAME) {
    NAME = 'Cloud';
    console.log(`"NAME" env var not found. Defaulting to "${NAME}"`);
  }
  const {SAMPLE_VERSION} = process.env;

  const {ID_TOKEN} = process.env;
  if (!ID_TOKEN) {
    throw Error('"ID_TOKEN" env var not found.');
  }

  const PLATFORM = 'managed';
  const REGION = 'us-central1';
  before(async () => {
    let buildCmd =
      `gcloud builds submit --project ${GOOGLE_CLOUD_PROJECT} ` +
      '--config ./test/e2e_test_setup.yaml ' +
      `--substitutions _SERVICE=${SERVICE_NAME},_PLATFORM=${PLATFORM},_REGION=${REGION}` +
      `,_NAME=${NAME}`;
    if (SAMPLE_VERSION) buildCmd += `,_VERSION=${SAMPLE_VERSION}`;
    if (SERVICE_ACCOUNT) buildCmd += `,_SERVICE_ACCOUNT=${SERVICE_ACCOUNT}`;

    console.log('Starting Cloud Build...');
    execSync(buildCmd, {timeout: 240000});
    console.log('Cloud Build completed.');
  });

  after(() => {
    let cleanUpCmd =
      `gcloud builds submit --project ${GOOGLE_CLOUD_PROJECT} ` +
      '--config ./test/e2e_test_cleanup.yaml ' +
      `--substitutions _SERVICE=${SERVICE_NAME},_PLATFORM=${PLATFORM},_REGION=${REGION}`;
    if (SAMPLE_VERSION) cleanUpCmd += `,_VERSION=${SAMPLE_VERSION}`;
    if (SERVICE_ACCOUNT) cleanUpCmd += `,_SERVICE_ACCOUNT=${SERVICE_ACCOUNT}`;

    execSync(cleanUpCmd);
  });

  it('renders the personalized landing page', async () => {
    const url = execSync(
      `gcloud run services describe ${SERVICE_NAME} --project=${GOOGLE_CLOUD_PROJECT} ` +
        `--platform=${PLATFORM} --region=${REGION} --format='value(status.url)'`
    );

    const baseUrl = url.toString('utf-8').trim();
    if (!baseUrl) throw Error('Cloud Run service URL not found');

    const response = await get('/', baseUrl, ID_TOKEN);
    assert.strictEqual(response.statusCode, 200, 'Expected HTTP 200');
    assert.match(response.headers['content-type'] || '', /text\/html/);
    assert.match(response.body, new RegExp(`Hello <span class="hello-name">${NAME}<\\/span>`));
    assert.match(response.body, /Ready for Google Cloud Run/);
  });
});

