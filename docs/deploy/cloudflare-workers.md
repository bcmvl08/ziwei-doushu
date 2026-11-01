# Deploy 紫微斗數 to Cloudflare Workers (OpenNext)

This app targets **Cloudflare Workers** via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) and **Wrangler**, not Cloudflare Pages Direct Upload. The account may already have an empty Pages project named `ziwei-doushu`; that path is unrelated to OpenNext. Production traffic for this adapter is served by the Worker **`ziwei-doushu`** defined in [`wrangler.jsonc`](../wrangler.jsonc).

## Prerequisites

- Node.js 20+ (same as local Next.js development)
- A Cloudflare account with Workers enabled
- Wrangler authenticated when deploying: `npx wrangler login` (not required for local build/typecheck/tests)

## Local verification (no deploy)

From the repository root:

```bash
npm install
npm run typecheck
npm test
npx opennextjs-cloudflare build
```

The build runs `next build` internally, then writes output under `.open-next/` (gitignored). Equivalent one-liner used in CI-style checks:

```bash
npm run preview -- --help   # preview script runs build + wrangler; for build-only use the command above
```

To preview in the **Workers runtime** locally (after a successful build):

```bash
npm run preview
```

That runs `opennextjs-cloudflare build && opennextjs-cloudflare preview` (Wrangler dev against `.open-next/worker.js` and `.open-next/assets`).

Regular Next.js dev (Node) is unchanged:

```bash
npm run dev
```

`next.config.js` calls `initOpenNextCloudflareForDev()` so bindings behave correctly during `next dev`.

## After merge: production deploy (human operator)

Do **not** run deploy from automated agents unless explicitly requested. Maintainers deploy with:

```bash
npm run deploy
```

Which executes:

```bash
opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

This publishes the Worker **`ziwei-doushu`** to Cloudflare Workers (not Pages upload).

### Upload a version without promoting (Workers Versions)

```bash
npm run upload
```

## Configuration files

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Worker name `ziwei-doushu`, entry `.open-next/worker.js`, static assets `.open-next/assets`, `nodejs_compat` + `global_fetch_strictly_public` |
| `open-next.config.ts` | OpenNext Cloudflare adapter config |
| `public/_headers` | Long-cache headers for `/_next/static/*` |
| `.dev.vars` | `NEXTJS_ENV=development` for local Wrangler/preview env loading |

## Regenerating generated sources

These files are **not** produced by OpenNext; regenerate when their inputs change:

| Output | Command |
|--------|---------|
| `lib/zh/region-labels.generated.ts` | `npx tsx scripts/generate-region-labels.ts` |
| `lib/ziwei/school-tables.generated.ts` | (existing project scripts — see repo docs if you change school tables) |

OpenNext / Wrangler generated artifacts (do not commit):

| Output | Command |
|--------|---------|
| `.open-next/` | `npx opennextjs-cloudflare build` |
| `cloudflare-env.d.ts` | `npm run cf-typegen` (optional; types for Worker bindings) |

## Optional: incremental cache on R2

The default `open-next.config.ts` uses in-memory / default caching. For production ISR-style cache on R2, follow [OpenNext Cloudflare caching](https://opennext.js.org/cloudflare/caching) and add an `NEXT_INC_CACHE_R2_BUCKET` binding in `wrangler.jsonc`.

## Adapter choice

We use **`@opennextjs/cloudflare`** (OpenNext 1.x) rather than `@cloudflare/next-on-pages` or vinext. The app has no `export const runtime = "edge"` routes and runs on the Workers Node compatibility layer (`nodejs_compat`).
