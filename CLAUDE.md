@AGENTS.md

---

# San Felice — Design System

This project is a pixel-perfect clone of the San Felice Winery homepage (sanfelice.com).
Luxury Tuscan editorial aesthetic. Every code decision must serve that intent.

---

## Color Palette

| Token | CSS var | Hex | Usage |
|---|---|---|---|
| `cream` | `--cream` | `#F5F1E9` | Body bg, light section bg, button text over dark |
| `dark-green` | `--dark-green` | `#183029` | Headings, nav bg on scroll, dark section bg, footer |
| `deep-green` | `--deep-green` | `#182C25` | Alternate text, subtle variant of dark-green |
| `light-blue` | `--light-blue` | `#B6CFD0` | Accent on dark-green sections (Discover panel, estates bg text) |
| `wine-red` | `--wine-red` | `#912F46` | Wine Making section — text, borders, buttons |
| `blush-pink` | `--blush-pink` | `#E4D5D3` | Wine Making section bg |
| `white` | `#FFFFFF` | — | Card backgrounds (news cards) |
| `dark-text` | `--dark-text` | `#141414` | Rare near-black text use |

Define ALL tokens in `globals.css` under `:root` + expose via `@theme inline`.
Never hardcode hex values in components — always use Tailwind color classes (`bg-dark-green`, `text-wine-red`, etc.).

### Section backgrounds

| Section | Background |
|---|---|
| Hero | Full-bleed image + `rgba(24,48,41,0.3)` overlay |
| Discover panel | `dark-green` |
| Borgo Resort | `cream` (left) / image (right) |
| Wine Estates | `dark-green` |
| Wine Making | `blush-pink` |
| Food Experience | `cream` |
| News & Events | `cream` |
| Footer | `dark-green` |

---

## Typography

### Fonts

| Role | Font | Google Fonts import | CSS var | Usage |
|---|---|---|---|---|
| Serif / display (Nina substitute) | **Cormorant Garamond** | `Cormorant_Garamond` | `--font-cormorant` | All headings, giant display text, hero text |
| Sans-serif (Sohne substitute) | **DM Sans** | `DM_Sans` | `--font-dm-sans` | Body, nav, labels, CTA buttons, captions |

**Never** use Geist, Inter, Roboto, Arial, or Space Grotesk on this project.

`layout.tsx` must load both fonts and pass variables to `<html>`:
```tsx
import { DM_Sans, Cormorant_Garamond } from "next/font/google";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400","500","700"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400","500","600","700"], style: ["normal","italic"] });
```

`globals.css` `@theme inline` must expose:
```css
--font-serif: var(--font-cormorant), "Times New Roman", serif;
--font-sans: var(--font-dm-sans), "Helvetica Neue", Helvetica, Arial, sans-serif;
```

Tailwind utility classes: `font-serif` → Cormorant, `font-sans` → DM Sans.

### Type Scale

| Element | Size | Font | Transform | Tracking |
|---|---|---|---|---|
| Hero h1 (AUTHENTIC / TUSCAN / SOUL) | 128px | Cormorant | uppercase | normal |
| Wine Making giant text | 153.4px | Cormorant | uppercase | normal |
| Wine Estates bg text | 192px | Cormorant | uppercase | normal |
| Food Experience bg text | 128px | Cormorant | uppercase | normal |
| Borgo Resort title | 96px | Cormorant | uppercase | normal |
| Section headings (News) | 48px | Cormorant | uppercase | normal |
| Estate card name | 40px | Cormorant | normal | normal |
| Food "All-Round Dedication" | 32px | Cormorant | uppercase | normal |
| Discover "Star Bene" | 28.8px | Cormorant | uppercase | normal |
| News card title | 25.6px | Cormorant | uppercase | normal |
| Body text | 16px | DM Sans | none | normal |
| CTA button text | 10px | DM Sans bold | uppercase | 2.5px |
| Estate / section label (ESTATE, RESTAURANTS) | 11.2px | DM Sans bold | uppercase | 2px |
| Nav links | 16px / 15px | DM Sans bold | capitalize | normal |

---

## Buttons (CTA variants)

All CTAs: `10px` font, `DM Sans Bold`, `uppercase`, `letter-spacing: 2.5px`, `padding: 18px 35px`, `border`.
Hover always **fills** the button (border-color becomes bg, text inverts). Transition `0.3s ease`.

| Variant | Background | Border | Text | Usage |
|---|---|---|---|---|
| `dark-filled` | `dark-green` | `dark-green` | `cream` | Light sections (Borgo, News, Food) |
| `cream-outlined` | transparent | `cream` | `cream` | Over dark sections (Hero, Discover, Estates) |
| `green-outlined` | transparent | `dark-green` | `dark-green` | Alternate light section usage |
| `wine-outlined` | transparent | `wine-red` | `wine-red` | Wine Making section only |

Use `src/components/CtaButton.tsx` for all CTAs.

---

## Component Structure

```
src/
  app/
    globals.css       ← palette tokens, @theme inline, float keyframe
    layout.tsx        ← font loading (DM Sans + Cormorant Garamond)
    page.tsx          ← assemble all sections in order
  components/
    Header.tsx        ← fixed, transparent → dark-green/95 on scroll
    HeroSection.tsx   ← fullscreen parallax (Framer Motion useScroll)
    DiscoverPanel.tsx ← dark-green bg, "Star Bene" light-blue text
    BorgoResort.tsx   ← 50/50 split + 3-slide fade image slider
    WineEstates.tsx   ← giant bg text + 3-card slide-up hover reveal
    WineMaking.tsx    ← blush-pink bg, 3 floating bottles, wine-red text
    FoodExperience.tsx← asymmetric 3-col editorial (38 / 38 / 24)
    NewsEvents.tsx    ← sticky label left + offset 2-col card grid
    Footer.tsx        ← 2-zone dark-green, contact + link groups
    CtaButton.tsx     ← shared button with 4 variants
    Reveal.tsx        ← Framer whileInView scroll-reveal wrapper
```

Section render order in `page.tsx`:
1. `<Header />`
2. `<HeroSection />`
3. `<DiscoverPanel />`
4. `<BorgoResort />`
5. `<WineEstates />`
6. `<WineMaking />`
7. `<FoodExperience />`
8. `<NewsEvents />`
9. `<Footer />`

---

## Animations

Use **Framer Motion** exclusively. No GSAP. No CSS-only transitions for scroll-driven effects.

| Effect | Implementation |
|---|---|
| Hero parallax | `useScroll` + `useTransform` — bg at 0.5x, top text faster, SOUL emerges from bottom |
| Section text reveal | `Reveal.tsx` wrapper — `whileInView` opacity 0→1, y 40→0, `once: true` |
| Page load stagger | `motion.header` with `staggerChildren: 0.15`, child fade-in from `y: -10` |
| Estate card hover | CSS `translateY(-50%)` on `.group:hover` parent — image slides up, info revealed |
| Wine bottle float | CSS `@keyframes float` — `translateY(-8px)` 3s infinite, each bottle offset `0.5s` |
| Slider transition | Framer `AnimatePresence` + opacity fade |
| News card hover | `translateY(-4px)` + `box-shadow` via Tailwind `hover:` classes |
| CTA button hover | CSS fill transition `0.3s ease` |
| Image zoom | `scale(1.05)` inside `overflow-hidden`, `0.6s ease` |

Easing for reveals: `[0.16, 1, 0.3, 1]` (custom ease-out expo). Duration: `0.8s`–`1.2s`.
Respect `prefers-reduced-motion` — defined in `globals.css`, disables `.animate-float`.

---

## Images

All section images come from `https://admin.sanfelice.com/app/uploads/`.
`next.config.ts` must have:
```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "admin.sanfelice.com", pathname: "/app/uploads/**" }]
}
```
Use `next/image` with `fill` + `sizes` for full-bleed images. Use `width`/`height` for bottles and logos.

### Image asset map

| Key | URL |
|---|---|
| Hero bg | `https://admin.sanfelice.com/app/uploads/2023/04/homepage-1.jpg` |
| Borgo slider 1 | `https://admin.sanfelice.com/app/uploads/2023/02/slider1.jpg` |
| Borgo slider 2 | `https://admin.sanfelice.com/app/uploads/2023/02/fe7.jpg` |
| Estate: San Felice bg | `https://admin.sanfelice.com/app/uploads/2023/04/DSC_6934-scaled.jpg` |
| Estate: Campogiovanni bg | `https://admin.sanfelice.com/app/uploads/2023/04/CAMPOGIOVANNI_hero-2040x1120-1.jpg` |
| Estate: Bell'Aja bg | `https://admin.sanfelice.com/app/uploads/2025/04/1920x-1054.png` |
| Logo: San Felice white | `https://admin.sanfelice.com/app/uploads/2023/04/SF-CHIANTICLASSICO-logo-WHITE.png` |
| Logo: Campogiovanni white | `https://admin.sanfelice.com/app/uploads/2023/04/CampogiovanniMontalcino-logo-BIANCO-1.png` |
| Logo: Bell'Aja white | `https://admin.sanfelice.com/app/uploads/2023/03/BellAjaBolghieri-logo-BIANCO.png` |
| Bottle: Vigorello | `https://admin.sanfelice.com/app/uploads/2023/04/Vigorello_2020-annate-img.png` |
| Bottle: Bell'Aja Bolgheri | `https://admin.sanfelice.com/app/uploads/2023/04/BellAja_Bolgheri-Superiore_2021-annate-img.png` |
| Bottle: Campogiovanni | `https://admin.sanfelice.com/app/uploads/2023/04/CampoGiovanni_2019-annate-img.png` |
| Food: Poggio Rosso exterior | `https://admin.sanfelice.com/app/uploads/2023/02/Sakalis-1144x652-1.png` |
| Food: dish plating | `https://admin.sanfelice.com/app/uploads/2023/02/Sakalis-548x738-1.png` |
| Food: olive oil gallery | `https://admin.sanfelice.com/app/uploads/2023/04/Olio-horizontal-gallery.jpg` |
| News: Wine Couture logo | `https://admin.sanfelice.com/app/uploads/2023/05/Logo_Wine-gouture.png` |

---

## Z-index scale

| Layer | z-index |
|---|---|
| Header | 100 |
| Overlay / modal | 50 |
| Bottle (center, WineMaking) | 20 |
| Section content | 10 |
| Background image / bg text | 1 / -10 |

---

## Global CSS rules

- `box-sizing: border-box` on all elements
- `overflow-x: hidden` on body (prevents decorative oversized text from causing scroll)
- `::selection` → background `dark-green`, color `cream`
- Custom scrollbar → track `cream`, thumb `dark-green`, 8px wide
- All interactive elements → `cursor-pointer`
- All transitions on interactive elements → `0.3s ease`
- Min body font size → 16px
- Line height body → 1.5–1.75

---

## Known pre-existing items (do not delete)

- `src/middleware.ts` — Supabase auth scaffold (deprecated `middleware` → should be `proxy`; fix separately)
- `src/utils/` — Supabase client utilities; unrelated to homepage
