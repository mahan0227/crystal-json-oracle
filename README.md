# Crystal JSON Oracle

Describe data **in plain language** (or messy examples) → get a **JSON Schema** draft, realistic example payloads, and migration notes—ideal when APIs and events evolve faster than your OpenAPI doc.

## What it is

A BYOK Next.js tool that uses OpenAI **JSON mode** to output schema-shaped guidance you can paste into code reviews, contract tests, or documentation. It does not replace runtime validation libraries—it accelerates the **first correct shape**.

## Why it’s useful

- Shortens the gap between **product language** and **typed contracts**.
- Suggests **examples** that double as fixtures.
- Captures **migration** hints when fields rename or types widen.
- Helps data engineers and backend devs agree before writing migrations.

## Where you can use it

- **Event-driven systems** — Kafka / webhook payload specs.
- **ETL and analytics** — staging table contracts and dbt model columns.
- **Mobile & web clients** — form payloads and optimistic UI shapes.
- **Partner integrations** — quick schema drafts for B2B onboarding.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run start
```

## API

`POST /api/schema` · Header `Authorization: Bearer <key>`

Body: `intent` (required), optional `model`.

## Suite brochure

[`docs/neuron-suite-brochure.html`](docs/neuron-suite-brochure.html) · [`docs/neuron-suite-ig-square.svg`](docs/neuron-suite-ig-square.svg)

## License

MIT
