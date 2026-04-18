import express from 'express';

const app = express();
const port = parseInt(process.env.PORT || '8080', 10);

const renderPage = (name) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello ${name} | Cloud Run Showcase</title>
    <meta
      name="description"
      content="A polished Hello World experience for Google Cloud Run built with Node.js and Express."
    />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111f;
        --bg-soft: #10233f;
        --panel: rgba(8, 20, 38, 0.78);
        --line: rgba(255, 255, 255, 0.14);
        --text: #f5f7fb;
        --muted: #b8c3d9;
        --cyan: #7de2ff;
        --teal: #74f2ce;
        --gold: #ffd166;
        --shadow: 0 30px 80px rgba(2, 6, 23, 0.45);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Aptos", "Segoe UI Variable Display", "Trebuchet MS", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(125, 226, 255, 0.18), transparent 30%),
          radial-gradient(circle at 85% 15%, rgba(255, 209, 102, 0.22), transparent 25%),
          radial-gradient(circle at bottom right, rgba(116, 242, 206, 0.16), transparent 32%),
          linear-gradient(135deg, #020817 0%, var(--bg) 55%, var(--bg-soft) 100%);
        overflow-x: hidden;
      }

      body::before,
      body::after {
        content: "";
        position: fixed;
        inset: auto;
        width: 22rem;
        height: 22rem;
        border-radius: 999px;
        filter: blur(40px);
        z-index: 0;
        pointer-events: none;
      }

      body::before {
        top: 8%;
        left: -8%;
        background: rgba(125, 226, 255, 0.12);
        animation: drift 14s ease-in-out infinite;
      }

      body::after {
        right: -6%;
        bottom: 5%;
        background: rgba(255, 209, 102, 0.12);
        animation: drift 16s ease-in-out infinite reverse;
      }

      main {
        position: relative;
        z-index: 1;
        width: min(1120px, calc(100% - 32px));
        margin: 0 auto;
        padding: 32px 0 48px;
      }

      .shell {
        position: relative;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(10, 25, 47, 0.86), rgba(7, 17, 31, 0.88));
        backdrop-filter: blur(18px);
        border-radius: 28px;
        box-shadow: var(--shadow);
        overflow: hidden;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 18px 22px;
        border-bottom: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.03);
      }

      .dots {
        display: inline-flex;
        gap: 8px;
      }

      .dots span {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      .dots span:nth-child(1) { background: #ff6b6b; }
      .dots span:nth-child(2) { background: #ffd166; }
      .dots span:nth-child(3) { background: #06d6a0; }

      .deploy-pill {
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid rgba(125, 226, 255, 0.28);
        color: var(--cyan);
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .hero {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 28px;
        padding: 34px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        border-radius: 999px;
        background: rgba(125, 226, 255, 0.08);
        border: 1px solid rgba(125, 226, 255, 0.16);
        color: var(--cyan);
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: 18px 0 16px;
        font-family: "Rockwell", "Georgia", serif;
        font-size: clamp(3rem, 6vw, 5.6rem);
        line-height: 0.95;
        letter-spacing: -0.04em;
      }

      h1 span {
        display: block;
        background: linear-gradient(120deg, var(--text), var(--cyan), var(--gold));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .lede {
        max-width: 62ch;
        color: var(--muted);
        font-size: 1.05rem;
        line-height: 1.7;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 28px;
      }

      .button,
      .ghost {
        text-decoration: none;
        padding: 14px 18px;
        border-radius: 14px;
        font-weight: 700;
        transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
      }

      .button {
        color: #04111d;
        background: linear-gradient(135deg, var(--cyan), var(--teal));
        box-shadow: 0 16px 40px rgba(116, 242, 206, 0.18);
      }

      .ghost {
        color: var(--text);
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.03);
      }

      .button:hover,
      .ghost:hover {
        transform: translateY(-2px);
      }

      .metrics {
        display: grid;
        gap: 16px;
      }

      .card,
      .stack,
      .terminal,
      .footer-grid article {
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.03);
        border-radius: 22px;
      }

      .card {
        padding: 22px;
      }

      .card strong {
        display: block;
        font-size: 2.4rem;
        margin-bottom: 6px;
      }

      .stack {
        padding: 22px;
      }

      .stack ul {
        list-style: none;
        padding: 0;
        margin: 14px 0 0;
        display: grid;
        gap: 12px;
      }

      .stack li {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        color: var(--muted);
      }

      .stack b {
        color: var(--text);
      }

      .terminal {
        margin: 0 34px 34px;
        overflow: hidden;
      }

      .terminal header {
        padding: 14px 18px;
        border-bottom: 1px solid var(--line);
        color: var(--muted);
        font-size: 0.95rem;
      }

      pre {
        margin: 0;
        padding: 22px;
        overflow-x: auto;
        font-family: "Cascadia Code", "Fira Code", monospace;
        color: #d7e3f7;
        line-height: 1.8;
      }

      .footer-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
        margin: 0 34px 34px;
      }

      .footer-grid article {
        padding: 20px;
      }

      .footer-grid h2 {
        margin: 0 0 10px;
        font-size: 1.05rem;
      }

      .footer-grid p {
        margin: 0;
        color: var(--muted);
        line-height: 1.65;
      }

      .hello-name {
        color: var(--gold);
      }

      @keyframes drift {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(18px, -12px, 0) scale(1.05); }
      }

      @media (max-width: 900px) {
        .hero,
        .footer-grid {
          grid-template-columns: 1fr;
        }

        .hero {
          padding: 26px;
        }

        .terminal,
        .footer-grid {
          margin-left: 26px;
          margin-right: 26px;
        }
      }

      @media (max-width: 640px) {
        main {
          width: min(100% - 18px, 1120px);
          padding-top: 14px;
        }

        .topbar {
          padding: 14px 16px;
        }

        .hero,
        .terminal header,
        pre,
        .footer-grid article {
          padding-left: 18px;
          padding-right: 18px;
        }

        .terminal,
        .footer-grid {
          margin-left: 18px;
          margin-right: 18px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="shell">
        <div class="topbar">
          <div class="dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="deploy-pill">Ready for Google Cloud Run</div>
        </div>

        <div class="hero">
          <div>
            <div class="eyebrow">Node.js • Express • Cloud Run</div>
            <h1>Hello <span class="hello-name">${name}</span></h1>
            <p class="lede">
              This service turns a simple Hello World into a polished landing page with bold visuals,
              responsive layout, lightweight runtime behavior, and clean deployment compatibility for Cloud Run.
            </p>
            <div class="actions">
              <a class="button" href="https://cloud.google.com/run" target="_blank" rel="noreferrer">Deploy on Cloud Run</a>
              <a class="ghost" href="/health">Check health endpoint</a>
            </div>
          </div>

          <div class="metrics">
            <div class="card">
              <strong>Fast</strong>
              <span>Single Express service, minimal moving parts, ideal for quick container startup.</span>
            </div>
            <div class="stack">
              <span>Stack highlights</span>
              <ul>
                <li><b>Runtime</b><span>Node.js on port ${port}</span></li>
                <li><b>Personalization</b><span><code>NAME=${name}</code></span></li>
                <li><b>Operations</b><span>Health route + production-friendly defaults</span></li>
              </ul>
            </div>
          </div>
        </div>

        <section class="terminal" aria-label="Deploy command preview">
          <header>Suggested deploy command</header>
          <pre>gcloud run deploy hello-visual \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NAME=${name}</pre>
        </section>

        <section class="footer-grid">
          <article>
            <h2>Visual polish</h2>
            <p>Layered gradients, glass panels, expressive typography and subtle motion create a showcase feel without adding frontend build tooling.</p>
          </article>
          <article>
            <h2>Cloud-ready</h2>
            <p>The app respects the <code>PORT</code> provided by Cloud Run and keeps the server entrypoint simple for container deployment.</p>
          </article>
          <article>
            <h2>Easy to evolve</h2>
            <p>You can keep this as a landing page or grow it into a product splash page, docs entry, or service dashboard starter.</p>
          </article>
        </section>
      </section>
    </main>
  </body>
</html>`;

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.status(200).type('html').send(renderPage(name));
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'helloworld',
    name: process.env.NAME || 'World',
  });
});

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

export default app;

