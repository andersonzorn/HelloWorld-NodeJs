import express from 'express';

const app = express();
const port = parseInt(process.env.PORT || '8080', 10);

const renderPage = (name) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello ${name} | Zorn é o cara</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>">
    <style>
      :root {
        color-scheme: dark;
        --bg: #03111f;
        --bg-deep: #01060f;
        --panel: rgba(7, 17, 31, 0.72);
        --line: rgba(148, 214, 255, 0.18);
        --text: #f4fbff;
        --muted: #9fb7c8;
        --cyan: #76e6ff;
        --blue: #2d7ff9;
        --aqua: #7bffd4;
        --gold: #ffd36e;
        --shadow: 0 28px 90px rgba(1, 10, 20, 0.55);
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
          radial-gradient(circle at 18% 18%, rgba(118, 230, 255, 0.14), transparent 24%),
          radial-gradient(circle at 82% 20%, rgba(45, 127, 249, 0.18), transparent 28%),
          radial-gradient(circle at 50% 100%, rgba(123, 255, 212, 0.12), transparent 30%),
          linear-gradient(135deg, var(--bg-deep) 0%, #04182b 45%, #09233c 100%);
        overflow-x: hidden;
      }

      body::before,
      body::after {
        content: "";
        position: fixed;
        width: 30rem;
        height: 30rem;
        border-radius: 50%;
        filter: blur(70px);
        pointer-events: none;
        z-index: 0;
      }

      body::before {
        left: -8rem;
        top: -8rem;
        background: rgba(118, 230, 255, 0.16);
        animation: floatAura 14s ease-in-out infinite;
      }

      body::after {
        right: -10rem;
        bottom: -10rem;
        background: rgba(45, 127, 249, 0.16);
        animation: floatAura 18s ease-in-out infinite reverse;
      }

      main {
        position: relative;
        z-index: 1;
        width: min(1180px, calc(100% - 32px));
        min-height: 100vh;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
      }

      .shell {
        position: relative;
        width: 100%;
        min-height: min-content;
        overflow: clip;
        border: 1px solid var(--line);
        border-radius: 32px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
          var(--panel);
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow);
      }

      .shell::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(115deg, transparent 10%, rgba(255, 255, 255, 0.06) 35%, transparent 60%),
          linear-gradient(transparent 96%, rgba(118, 230, 255, 0.18) 100%);
        opacity: 0.7;
        pointer-events: none;
      }

      .topbar {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 12px 20px;
        border-bottom: 1px solid var(--line);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.92rem;
        color: var(--muted);
      }

      .dots {
        display: inline-flex;
        gap: 8px;
      }

      .dots span {
        width: 11px;
        height: 11px;
        border-radius: 50%;
      }

      .dots span:nth-child(1) { background: #ff7a7a; }
      .dots span:nth-child(2) { background: #ffd36e; }
      .dots span:nth-child(3) { background: #71f7bf; }

      .deploy-pill {
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid rgba(118, 230, 255, 0.25);
        background: rgba(118, 230, 255, 0.08);
        color: var(--cyan);
        font-size: 0.8rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .hero {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
        align-items: center;
        gap: 24px;
        padding: 10px 40px;
      }

      .copy {
        max-width: 580px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 9px 14px;
        border-radius: 999px;
        border: 1px solid rgba(123, 255, 212, 0.18);
        background: rgba(123, 255, 212, 0.08);
        color: var(--aqua);
        font-size: 0.82rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      h1 {
        margin: 4px 0 6px;
        font-family: "Rockwell", "Georgia", serif;
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 0.9;
        letter-spacing: -0.05em;
      }

      .hello-name {
        display: block;
        margin-top: 5px;
        background: linear-gradient(120deg, #ffffff 0%, var(--cyan) 40%, var(--gold) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .lede {
        margin: 0;
        color: var(--muted);
        font-size: 0.9rem;
        line-height: 1.5;
        max-width: 58ch;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 12px;
      }

      .button,
      .ghost {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 52px;
        padding: 14px 18px;
        border-radius: 16px;
        text-decoration: none;
        font-weight: 700;
        transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
      }

      .button {
        color: #02111d;
        background: linear-gradient(135deg, var(--cyan), var(--aqua));
        box-shadow: 0 18px 34px rgba(118, 230, 255, 0.22);
      }

      .ghost {
        color: var(--text);
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--line);
      }

      .button:hover,
      .ghost:hover {
        transform: translateY(-2px);
      }

      .highlights {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin-top: 12px;
      }

      .highlight {
        padding: 10px 12px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
      }

      .highlight strong {
        display: block;
        margin-bottom: 4px;
        color: var(--text);
        font-size: 0.9rem;
      }

      .highlight span {
        color: var(--muted);
        line-height: 1.6;
        font-size: 0.85rem;
      }

      .planet-stage {
        position: relative;
        min-height: 240px;
        display: grid;
        place-items: center;
      }

      .planet-stage::before {
        content: "";
        position: absolute;
        width: min(20vw, 240px);
        height: min(20vw, 240px);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(123, 255, 212, 0.3), transparent 65%);
        filter: blur(26px);
        animation: pulse 5s ease-in-out infinite;
      }

      .orbit {
        position: absolute;
        width: min(28vw, 340px);
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid rgba(118, 230, 255, 0.14);
        transform: rotateX(72deg);
      }

      .ring {
        position: absolute;
        width: min(32vw, 380px);
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid rgba(255, 211, 110, 0.18);
        transform: rotate(-16deg);
      }

      .earth {
        position: relative;
        width: min(18vw, 210px);
        aspect-ratio: 1;
        border-radius: 50%;
        background: #1c72dd;
        box-shadow:
          inset -35px -25px 50px rgba(0, 0, 0, 0.9),
          inset 15px 15px 35px rgba(255, 255, 255, 0.2),
          0 0 30px rgba(77, 169, 255, 0.4),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 0 80px rgba(118, 230, 255, 0.15);
        animation: planetFloat 8s ease-in-out infinite;
        overflow: hidden;
      }

      .earth::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 20% 20%, #55c36a 0% 14%, transparent 15%),
          radial-gradient(circle at 80% 35%, #47b95c 0% 18%, transparent 19%),
          radial-gradient(circle at 35% 75%, #5dd36f 0% 22%, transparent 23%),
          radial-gradient(circle at 75% 85%, #4bbb63 0% 12%, transparent 13%),
          radial-gradient(circle at 50% 10%, #72d97d 0% 8%, transparent 9%),
          radial-gradient(circle at 10% 50%, #3e9c50 0% 10%, transparent 11%),
          #1663c7;
        background-size: 200% 100%;
        animation: spinMap 20s linear infinite;
        filter: blur(0.5px);
      }

      .earth::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
          linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 20%, rgba(0,0,0,0.4) 80%);
        animation: cloudsMove 24s linear infinite;
        background-image: 
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0% 20%, transparent 21%),
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0% 15%, transparent 16%);
        background-size: 150% 100%;
      }

      .stars,
      .stars::before,
      .stars::after {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          radial-gradient(circle at 15% 24%, rgba(255, 255, 255, 0.9) 0 1px, transparent 1.6px),
          radial-gradient(circle at 76% 20%, rgba(118, 230, 255, 0.9) 0 1px, transparent 1.8px),
          radial-gradient(circle at 68% 72%, rgba(255, 211, 110, 0.9) 0 1.2px, transparent 2px),
          radial-gradient(circle at 26% 78%, rgba(255, 255, 255, 0.9) 0 1px, transparent 1.6px),
          radial-gradient(circle at 92% 54%, rgba(123, 255, 212, 0.9) 0 1px, transparent 1.7px);
        opacity: 0.85;
      }

      .stars::before {
        transform: scale(1.1);
        opacity: 0.45;
      }

      .stars::after {
        transform: scale(1.22);
        opacity: 0.22;
      }

      .footer {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
        padding: 0 40px 12px;
      }

      .footer article {
        padding: 8px 12px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.03);
      }

      .footer h2 {
        margin: 0 0 4px;
        font-size: 0.9rem;
      }

      .footer p {
        margin: 0;
        color: var(--muted);
        line-height: 1.4;
        font-size: 0.8rem;
      }

      code {
        font-family: "Cascadia Code", "Fira Code", monospace;
      }

      @keyframes cloudsMove {
        from { background-position: 0% 0%; }
        to { background-position: 200% 0%; }
      }

      @keyframes spinMap {
        from { background-position: 0% 0%; }
        to { background-position: -200% 0%; }
      }

      @keyframes planetFloat {
        0%, 100% { transform: translateY(0px) rotate(-6deg); }
        50% { transform: translateY(-16px) rotate(6deg); }
      }

      @keyframes floatAura {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(18px, -24px, 0) scale(1.08); }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(0.92); opacity: 0.65; }
        50% { transform: scale(1.04); opacity: 1; }
      }

      @media (max-width: 960px) {
        .hero,
        .footer {
          grid-template-columns: 1fr;
        }

        .hero {
          padding: 30px;
        }

        .copy {
          max-width: none;
        }

        .planet-stage {
          min-height: 280px;
          order: -1;
          margin-top: 20px;
        }

        .earth {
          width: min(50vw, 240px);
        }

        .orbit {
          width: min(62vw, 300px);
        }

        .ring {
          width: min(72vw, 340px);
        }

        .footer {
          padding: 20px 30px 30px;
        }
      }

      @media (max-width: 720px) {
        main {
          width: min(100% - 18px, 1180px);
          padding: 20px 0;
        }

        .topbar {
          padding: 14px 16px;
          align-items: flex-start;
          flex-direction: column;
        }

        .hero {
          padding: 22px 18px 26px;
        }

        .highlights,
        .footer {
          grid-template-columns: 1fr;
        }

        .footer {
          padding: 0 18px 18px;
        }

        .planet-stage {
          min-height: 240px;
        }

        .earth {
          width: min(65vw, 220px);
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="shell">
        <div class="stars" aria-hidden="true"></div>
        <div class="topbar">
          <div class="brand">
            <div class="dots" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>Node.js • Express • Visual Hero</span>
          </div>
          <div class="deploy-pill">Exemplo Hello World</div>
        </div>

        <div class="hero">
          <div class="copy">
            <div class="eyebrow">Página Principal</div>
            <h1>Hello <span class="hello-name">${name}</span></h1>
            <p class="lede">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
            </p>
            <div class="actions">
              <a class="button" href="/">Action Primary</a>
              <a class="ghost" href="/health">Action Secondary</a>
            </div>
            <div class="highlights">
              <div class="highlight">
                <strong>Lorem Ipsum</strong>
                <span>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              </div>
              <div class="highlight">
                <strong>Dolor Sit</strong>
                <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</span>
              </div>
              <div class="highlight">
                <strong>Amet Consectetur</strong>
                <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span>
              </div>
            </div>
          </div>

          <div class="planet-stage" aria-hidden="true">
            <div class="orbit"></div>
            <div class="ring"></div>
            <div class="earth"></div>
          </div>
        </div>

        <section class="footer">
          <article>
            <h2>Pharetra Velit</h2>
            <p>Elementum curabitur vitae nunc sed velit dignissim sodales ut eu.</p>
          </article>
          <article>
            <h2>Massa Placerat</h2>
            <p>Orci porta non pulvinar neque laoreet suspendisse interdum consectetur.</p>
          </article>
          <article>
            <h2>Egestas Maecenas</h2>
            <p>Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim.</p>
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
