# Imagine Egg Donation

A landing page for [Imagine Egg Donation](https://imagineeggdonation.com/) built with [EmDash CMS](https://emdashcms.com/) — an Astro-native TypeScript CMS with a full admin UI.

Design source: [Figma — Imagine Egg Donation New Landing Page](https://www.figma.com/design/gsU7VaUGx8jqRwpSyT4BpQ/Imagine-Egg-Donation--New-Landing-Page-?node-id=11162-655)

## Getting Started

```bash
npm install
npm run seed   # load CMS content from seed/seed.json
npm run dev
```

- Site: [http://localhost:4321](http://localhost:4321)
- Admin (dev bypass): [http://localhost:4321/admin](http://localhost:4321/admin) — skips passkey login in local dev

Direct bypass URL:

```
http://localhost:4321/_emdash/api/auth/dev-bypass?redirect=/_emdash/admin
```

Dev only — does not work in production.

## Deploy to Vercel

This project is configured for Vercel serverless deployment with the `@astrojs/vercel` adapter.

### 1. Create required services

| Service | Purpose | Setup |
|---------|---------|-------|
| **Turso** (libSQL) | CMS database | [turso.tech](https://turso.tech) — free tier available |
| **Upstash Redis** | Session storage (admin auth) | Add via [Vercel Marketplace](https://vercel.com/marketplace?category=storage&search=redis) |

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in values, then add the same variables in your Vercel project settings:

```bash
LIBSQL_DATABASE_URL=libsql://your-db.turso.io
LIBSQL_AUTH_TOKEN=your-turso-token
KV_REST_API_URL=https://your-redis.upstash.io
KV_REST_API_TOKEN=your-redis-token
EMDASH_ENCRYPTION_KEY=emdash_enc_v1_...   # npx emdash secrets generate
```

### 3. Deploy

**Option A — Vercel CLI**

```bash
npx vercel login
npx vercel link
npx emdash seed          # seed the Turso database
npm run deploy:vercel
```

**Option B — Git integration**

1. Push this repo to GitHub
2. Import the project in [vercel.com/new](https://vercel.com/new)
3. Add environment variables from step 2
4. Deploy — Vercel auto-detects Astro via `vercel.json`

After first deploy, run `npx emdash seed` against your production Turso database to load content.

## Pages

| Page | Path |
|------|------|
| Home | `/` |
| Contact | `/contact` |

## CMS Content

### Editable in the admin sidebar

| Collection | Admin path | What it controls |
|------------|------------|------------------|
| **Industries** | Content → Industries | Benefit cards in the "Why Imagine" section (title, description, icon, sort order) |
| **FAQs** | Content → FAQs | All accordion questions on the home page (question, answer, sort order) |
| **Pages** | Content → Pages | Hero, intro, stats, CTA, and other page blocks |

The home page FAQ and Industries sections pull live data from their collections — add, edit, reorder, or unpublish entries in the admin without touching page content.

### Portable Text blocks

- **Hero Banner** — full-width background image with CTAs
- **Intro Section** — centered headline and body copy
- **Features** — icon grid with optional CTA
- **Statistics** — key metrics display
- **FAQ** — accordion questions
- **CTA Banner** — closing call-to-action

Edit in the admin UI or update `seed/seed.json`.

## Design Tokens

| Token | Value |
|-------|-------|
| Primary blue | `#0170C1` |
| Dark blue | `#003190` |
| Accent green | `#53DC5E` |

Override in `src/styles/theme.css`.

## Figma MCP (Design Sync)

To pull live design context from Figma during development:

1. Authenticate the **Figma MCP** server in Cursor Desktop (Settings → MCP → Figma → Connect)
2. Use the design URL with node `11162-655` to call `get_design_context`

The cloud agent cannot complete Figma OAuth — authentication must happen in the Cursor desktop IDE.

## Local vs Vercel

| | Local dev | Vercel |
|---|-----------|--------|
| Adapter | `@astrojs/node` | `@astrojs/vercel` |
| Database | SQLite (`data.db`) | Turso libSQL |
| Sessions | Filesystem (auto) | Upstash Redis |
| Storage | Local `./uploads` | S3-compatible (optional) |
