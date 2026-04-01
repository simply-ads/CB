<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1mG_Id3B4unPQqMyne0VK4NhFQ3v0UhID

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Travel Old Hollywood brief

See [`TRAVEL_OLD_HOLLYWOOD_BLUEPRINT.md`](./TRAVEL_OLD_HOLLYWOOD_BLUEPRINT.md) for the full implementation strategy and delivery roadmap based on the provided poster-style direction.

## Vercel deployment behavior (important)

If your project is connected to GitHub, Vercel creates:

- **Production deployments** from the configured Production Branch (usually `main`).
- **Preview deployments** for non-production branches (for example `codex/create-vintage-style-website-for-travel-old-hollywood`).

So if `https://cb-beta-topaz.vercel.app/` is attached as a **production domain**, it will keep showing the latest deployment from `main`.

To view your branch changes, use the generated preview URL (for example `cb-f6lpdzl4m-simply-ads-projects.vercel.app`) or configure a **branch domain** in Vercel:

1. Vercel Project → **Settings** → **Domains**.
2. Add/attach a domain to the specific Git branch (branch domain), or
3. Change the **Production Branch** in Project Settings → Git if you want that branch to drive production.


## Why preview can still look old

This repository currently contains **two apps**:

- Root (`/`) = Vite app (Travel Old Hollywood changes)
- `nextjs-app/` = older Next.js app

If Vercel Project **Root Directory** is set to `nextjs-app`, preview deployments will continue to show the older Next.js site even when this branch is up to date.

To preview the new Travel Old Hollywood app, set Vercel Root Directory to `/` and use the root `vercel.json` (`framework: vite`, `outputDirectory: dist`).
