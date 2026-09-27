# Brochure nav link — design

## Goal
Expose the upcoming `/brochure` page from the site header.

## In scope
- Desktop top bar (`src/components/Header.tsx`): add a "Brochure" link on the right, directly before "Book an Appointment". Same style as that button: DM Sans bold 15px, underline-on-hover span, inherits `navColor`, hidden below `lg` like its neighbour.
- Full-screen menu: add `{ label: "Brochure", href: "/brochure" }` to `SECONDARY_NAV`, after "Projects", so phone users can reach it.
- Links use `TransitionLink`, matching the other internal routes.

## Out of scope
- The `/brochure` page itself (separate design; until it ships, the link returns 404).
- Any change to the language switcher, Search, or booking behaviour.

## Verification
- `npm run lint` passes for Header.tsx.
- Homepage returns 200; the "Brochure" link renders in the top bar at desktop width and in the menu.
