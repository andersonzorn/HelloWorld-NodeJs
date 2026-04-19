# 🌍 Hello World: Cinematic Edition

Este não é o seu "Hello World" comum. Esta é uma implementação premium utilizando **Node.js** e **Express**, projetada com uma interface cinematográfica para demonstrar como aplicações simples podem ter um visual impactante e profissional.

O projeto apresenta um planeta Terra renderizado inteiramente em **CSS3**, com camadas de nuvens, rotação de continentes e brilho atmosférico, tudo mantendo uma performance extremamente leve e sem dependências de frameworks frontend pesados.

## 🚀 Principais Diferenciais
     
- **UI Cinematográfica**: Experiência visual rica com gradientes dinâmicos e tipografia moderna.
- **Planeta 3D (Pure CSS)**: Animação avançada de rotação e flutuação sem o uso de imagens ou WebGL.
- **Layout Inteligente**: Design responsivo que se adapta de monitores UltraWide a dispositivos móveis.
- **Pronto para Cloud**: Configurado especificamente para **Google Cloud Run**, respeitando a injeção dinâmica de portas e variáveis.
- **Observabilidade**: Inclui endpoint de `/health` para monitoramento de saúde do serviço.

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js (ES Modules)
- **Servidor**: Express.js
- **Frontend**: HTML5 Semântico & CSS3 Moderno (Variáveis, Flexbox, Grid)
- **Testes**: Mocha, Supertest e C8 para cobertura de código.

## Rodando localmente

```bash
# Instalar dependências
npm install

# Iniciar o servidor
npm start
```

A aplicacao sobe por padrao em `http://localhost:8080`.

## Variaveis de ambiente

- `PORT`: porta HTTP usada pelo servidor
- `NAME`: nome exibido na landing page

Exemplo:

```bash
NAME=Ander npm start
```

## Deploy no Cloud Run

```bash
gcloud run deploy hello-visual \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NAME=Cloud
```

## Rotas

- `/`: landing page visual
- `/health`: retorna JSON com status da aplicacao
