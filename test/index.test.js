import assert from 'assert';
import supertest from 'supertest';
import app from '../index.js';

let request;
describe('Unit Tests', () => {
  before(() => {
    request = supertest(app);
  });

  it('renders the page with the NAME override', async () => {
    process.env.NAME = 'Cloud';
    const response = await request.get('/').retry(3).expect(200);
    assert.match(response.headers['content-type'], /text\/html/);
    assert.match(response.text, /Hello <span class="hello-name">Cloud<\/span>/);
    assert.match(response.text, /Ready for Google Cloud Run/);
  });

  it('renders the page with the NAME default', async () => {
    process.env.NAME = '';
    const response = await request.get('/').retry(3).expect(200);
    assert.match(response.text, /Hello <span class="hello-name">World<\/span>/);
  });

  it('returns the health payload', async () => {
    process.env.NAME = 'Cloud';
    const response = await request.get('/health').retry(3).expect(200);
    assert.deepStrictEqual(response.body, {
      status: 'ok',
      service: 'helloworld',
      name: 'Cloud',
    });
  });
});

