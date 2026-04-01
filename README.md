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

## Deploy `oht/` on Vercel

In Vercel project settings set:

- **Root Directory**: `oht`
- Framework/build/output are already defined in `oht/vercel.json`.
