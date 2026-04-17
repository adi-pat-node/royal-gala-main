# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Run tests (Vitest)
npm run preview    # Preview production build
```

## Architecture

**Stack:** React 18 + TypeScript, Vite, React Router v6, Tailwind CSS v3, Framer Motion, shadcn/ui (Radix UI primitives).

**Routing:** Four main routes defined in `src/App.tsx` — `/` (Index), `/changemakers`, `/story`, `/tickets`, plus a 404 catch-all.

**Pages vs Components:** Pages (`src/pages/`) are route-level assemblies of section components (`src/components/`). The `ui/` subdirectory is the shadcn/ui library — don't edit those files directly.

**Styling:** HSL-based CSS custom properties defined in `src/index.css`. Luxury color palette: wine, maroon, burgundy, champagne, gold. Display font is Cormorant Garamond. Use the `cn()` utility from `src/lib/utils.ts` for conditional classNames. Path alias `@/` maps to `src/`.

**Animations:** Framer Motion is used throughout. `src/components/ScrollReveal.tsx` is a reusable in-viewport entrance animation wrapper. Hero section uses Ken Burns effect. New animated sections should follow the staggered `ScrollReveal` pattern already established.

**TypeScript config:** Loose — no `strict` mode, `noImplicitAny` is off. Path alias `@/*` → `./src/*`.
