# kartiksaxena.com

Live at [www.kartiksaxena.com](https://www.kartiksaxena.com). My portfolio and project pages, built with Next.js and deployed on Vercel.

- `/` - portfolio home
- [`/sameside`](https://www.kartiksaxena.com/sameside) - [SameSide](https://github.com/karticksaxena/SameSide), a free macOS menu bar app
- `/dreams` - My Dream Games, playable games made from my dreams
- `/dreams/play` - the game itself, proxied (rewrite) to its own Vercel project

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm lint
```

`DREAMS_ORIGIN` (set in the Vercel project) is the game project's URL, e.g. `https://kartiks-dreams.vercel.app`. Production builds fail without it; dev defaults to `http://localhost:5230`.

Plain CSS: shared tokens in `app/global.css`, page styles in CSS Modules next to each page.
