# Repository layout

This repository now keeps the Travel Old Hollywood app under:

- `oht/` — Vite app for Travel Old Hollywood (ready to copy to a fresh repo)
- `nextjs-app/` — legacy Next.js app (kept as-is)

## Work from `oht/`

```bash
cd oht
npm install
npm run dev
```

## Or run from repo root

```bash
npm run install:oht
npm run dev
```

## Deploy `oht/` on Vercel

In Vercel project settings set:

- **Root Directory**: `oht`
- Framework/build/output are already defined in `oht/vercel.json`.

## Test update

This README was updated to verify pushes and PRs are targeting `AdamVT85/cb`.
