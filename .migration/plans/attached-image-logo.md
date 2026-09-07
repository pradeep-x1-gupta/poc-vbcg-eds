# Risant Health Logo — Use Provided Full-Lockup SVG

## What Changed

You supplied the **actual logo as SVG source** (`viewBox 0 0 248 32`). This is the complete brand lockup, not just the mark:
- The **figures + sunburst mark** (white figures, sunburst filled `#F6B350`).
- The **"Risant Health" wordmark** rendered as vector paths (white).
- The **®** registered-trademark glyph (white).

This is a better asset than the hand-built SVG and supersedes it. Because it already contains the wordmark text, the header/footer must render **this SVG as the entire logo** and **stop also outputting the "Risant Health" HTML text** (otherwise the word appears twice).

## Key Facts / Constraints

- Aspect ratio ≈ **248:32 = 7.75:1** (very wide). Icon box width must be sized from height accordingly (e.g. height 24px → width ≈ 186px).
- Colors are baked in (white + `#F6B350`), transparent background — sits correctly on the navy bar.
- Current chrome builds the brand from a content fragment link (`<a href="/index">Risant Health</a>`) plus a CSS `::before` mark. New approach: the link itself becomes the SVG; its text is visually hidden (kept for accessibility).
- Footer note (unchanged from before): the local dev server proxies the footer fragment from live, so the footer logo won't show in local preview until deployed — I'll verify the footer CSS by injecting the class locally.

## Planned Changes

1. **`icons/risant-logo.svg`** — replace the hand-built mark with the exact SVG you provided (full lockup, white + `#F6B350`).
2. **`blocks/header/header.css`**
   - Remove the three-dot/`::before` mark approach for the wordmark.
   - Render the full SVG on the brand link via `background: url('/icons/risant-logo.svg') left center / contain no-repeat;` sized to the 7.75:1 ratio (e.g. `height: 24px; width: 186px`).
   - **Hide the duplicate text** ("Risant Health") accessibly (e.g. `font-size: 0` / text-indent, keeping the link's accessible name), and drop the now-unneeded gradient/gap/text styles.
3. **`blocks/footer/footer.css`** — same treatment at footer scale (slightly smaller), hide the duplicate `.footer-brand` text, show the SVG.
4. **No content re-import, no page HTML change** — chrome is driven by fragments + CSS; only CSS + the icon asset change. The fragment link text stays (used as the accessible label) but is visually replaced by the SVG.

## Verification

- Render the new `icons/risant-logo.svg` standalone to confirm it's the provided artwork (figures + sunburst + "Risant Health" + ®).
- Header on navy bar: full logo shows once, crisp, correctly sized/aligned; **no duplicate "Risant Health" text**.
- Footer: confirm via injected `footer-brand` class that the SVG renders at footer scale with no duplicate text.
- Desktop and mobile (~390px): logo scales without distortion and doesn't overflow the bar; wordmark legible.
- Confirm the brand link still exposes an accessible name ("Risant Health") for screen readers despite hidden text.
- Run stylelint on changed CSS.

## Checklist

- [ ] Replace `icons/risant-logo.svg` with the exact provided SVG (full lockup, white + `#F6B350`, transparent bg)
- [ ] Update `blocks/header/header.css`: show full SVG on the brand link at 7.75:1 ratio; visually hide the duplicate "Risant Health" text (keep accessible name); remove obsolete mark/gap/gradient rules
- [ ] Update `blocks/footer/footer.css`: same — show SVG at footer scale, hide duplicate `.footer-brand` text
- [ ] Render `icons/risant-logo.svg` standalone and confirm it is the provided artwork
- [ ] Preview index header on navy bar — logo shows once, sized/aligned, no duplicated wordmark text
- [ ] Verify footer logo via injected `footer-brand` class (local footer is proxied from live)
- [ ] Check desktop + mobile (~390px) — no distortion/overflow, wordmark legible
- [ ] Confirm brand link retains accessible name "Risant Health" (screen-reader check via snapshot)
- [ ] Lint changed CSS (stylelint) and confirm clean
- [ ] Report result; note deployment to `.aem.live` is left to you (local changes only)

> **Note:** This plan is read-only (plan mode). Applying these changes requires **Execute mode**.
