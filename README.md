# Sokratix — UI/UX Designer Portfolio

A premium, dark-themed personal portfolio for **Danussh Aditya K**, built with
**Next.js 16 + Tailwind CSS v4 + Framer Motion**, with a **Supabase**-backed admin
panel for managing content and media.

> _"Design begins with better questions."_

## Features

- Animated dark portfolio: hero with a custom-controlled intro video, UX process
  timeline, projects, case studies, skills, principles, metrics, and contact.
- **Admin panel** at `/admin` (email/password login) to add/edit/delete **Projects**
  and **Case Studies**, replace the **intro video/poster**, and manage a **gallery**
  of images.
- Works out of the box with built-in default content; Supabase only powers the admin
  + live editing.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

The public site renders immediately using the defaults in `src/lib/data.js`.
The admin panel needs Supabase (below).

## Supabase setup (for the admin panel)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run the contents of [`supabase/schema.sql`](supabase/schema.sql).
   This creates the tables, RLS policies, the public `media` storage bucket, and seeds
   your projects + case studies.
3. In **Project Settings → API**, copy your keys. Then:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only, never exposed)
4. Create your admin user: **Authentication → Users → Add user** (set an email +
   password, mark email confirmed). Use those to log in at `/admin`.
5. Restart `npm run dev`.

## Replacing the intro video

- Easiest: log in to `/admin` → **Intro Video** tab → upload a new file.
- Or replace `public/intro-video.mp4` directly.

## How content loads

`src/lib/content.js` reads from Supabase first and falls back to `src/lib/data.js`
when Supabase is unconfigured or a table is empty — so the site never looks broken.
The home page revalidates every 30s, so admin edits appear shortly after saving.

## Project structure

```
src/
  app/            page.js (public), login/, admin/ (+ actions.js)
  components/     public sections + ui/ primitives + admin/ dashboard
  lib/            data.js (defaults), content.js (fetch), motion.js, supabase/
  proxy.js        protects /admin (Next 16 renamed middleware → proxy)
supabase/schema.sql
```

## Tech notes

- Built on **Next.js 16** conventions: `cookies()` is async, route `params` are
  promises, and middleware is named `proxy`.
- Tailwind **v4** with brand tokens defined in `src/app/globals.css` (`@theme`).

## Deploy

Deploy to **Vercel**, add the three env vars in the project settings, and you're live.

---

© Danussh Aditya K · Salem, India ·
[Behance](https://www.behance.net/danusshadityak) ·
[LinkedIn](https://www.linkedin.com/in/danussh-aditya-k-6284ab268/)
