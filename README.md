# Hello World para Cloud Run

Uma versao remodelada do projeto com visual premium, responsivo e pronta para deploy no Google Cloud Run.

## O que mudou

- Landing page em HTML com design mais forte e responsivo
- Personalizacao dinamica usando a variavel de ambiente `NAME`
- Endpoint `GET /health` para verificacao de saude
- Compativel com a porta `PORT` injetada pelo Cloud Run
- Testes atualizados para o novo comportamento

## Rodando localmente

```bash
npm install
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
