Let me review how the logo mark is currently implemented in the header and footer before finalizing the plan.# Risant Health Logo Mark — Match the Brand Image

## Goal

Replace the current placeholder logo mark (three orange dots via CSS `radial-gradient`) in the **header** and **footer** with a mark that matches the provided Risant Health image: **two white head-and-shoulders figures flanking a central orange fan/sunburst**, next to the white "Risant Health" wordmark on the dark navy bar.

## Current State (from reviewing the code)

- The mark is faked with CSS: `header nav .nav-brand a::before` and `footer .footer .footer-brand::before` each paint three orange `radial-gradient` dots — no figures, no sunburst. It does not resemble the real logo.
- The wordmark text "Risant Health" is real HTML (white, condensed heading font) — that part already matches and stays.
- Both header and footer build the brand from content fragments (`content/nav.plain.html`, `content/footer.plain.html`) plus these CSS pseudo-elements. No `<img>` is currently used.

## Approach (confirmed with you)

- **Recreate as an inline SVG** icon of the mark (two white figures + orange radiating fan between them), rather than sourcing an external file.
- **Local changes only** — build and verify in local preview; **no git push**. You deploy.
- Keep the existing white "Risant Health" wordmark text; only the icon to its left changes.
- Apply the same mark consistently in header and footer (footer slightly smaller, as now).

## Design of the SVG mark (to match the image)

- **Two figures:** each a white circle "head" above a white rounded "shoulders" shape, one on the left, one on the right.
- **Center sunburst:** an orange fan of radiating segments (wedges) emanating upward/outward between the two figures — the focal element, in the brand orange (~`#f2a03d`/`#e8852c`).
- Colors: figures `#ffffff`, sunburst orange gradient consistent with current tokens; transparent background so it sits on the navy bar.
- Sized to roughly the current mark footprint (~34×26 header, ~30×23 footer) and scales cleanly.

## Implementation Options (decide during build)

1. **Icon file + `background-image`** — add `icons/risant-logo.svg`, reference it via the existing `::before` pseudo-elements (swap the `radial-gradient` for `url(...)`). Minimal change, keeps current markup; the SVG must be self-contained (fills baked in).
2. **Inline SVG injected by block JS** — have `header.js` / `footer.js` inject the SVG markup so currentColor/theming is possible.

Preference: **Option 1** (icon file + CSS `background-image`) for simplicity and because the mark is fixed-color; fall back to inline SVG only if crispness/theming needs it.

## Planned Changes

1. **New asset** `icons/risant-logo.svg` — the two-figures-plus-sunburst mark, white figures + orange fan, transparent background.
2. **`blocks/header/header.css`** — replace the three-dot `radial-gradient` in `.nav-brand a::before` with `background: url('/icons/risant-logo.svg') center/contain no-repeat;` and tune width/height/gap to match the image proportions.
3. **`blocks/footer/footer.css`** — same swap for `.footer-brand::before` at the smaller footer size.
4. **No content re-import, no page HTML change** — chrome is driven by fragments + CSS; only CSS + a new icon asset change.

## Verification

- Local preview of **index** and **allergy-care-guide** at desktop and mobile widths.
- Confirm the header mark shows two white figures + orange sunburst, correctly sized/aligned with the "Risant Health" wordmark on the navy bar.
- Confirm the footer mark matches (smaller) and reads well on the navy footer.
- Compare side-by-side against the provided image for shape, color, and proportion; iterate on the SVG until it matches.
- Confirm no layout shift or misalignment of the wordmark; check both breakpoints.
- Run stylelint on changed CSS.

## Checklist

- [ ] Re-check exact current mark rules in `header.css` (`.nav-brand a::before`) and `footer.css` (`.footer-brand::before`)
- [ ] Author `icons/risant-logo.svg` — two white figures flanking an orange radiating sunburst, transparent background, self-contained fills
- [ ] Update `blocks/header/header.css` to use the SVG as `background-image` (size/gap/alignment tuned to the image)
- [ ] Update `blocks/footer/footer.css` to use the SVG at the footer size
- [ ] Preview index + allergy-care-guide (desktop) and verify the header logo matches the provided image
- [ ] Verify footer logo matches (smaller) on the navy footer
- [ ] Check mobile width — mark stays aligned with the wordmark, no distortion
- [ ] Compare against the reference image and refine the SVG shapes/colors as needed (screenshot only if pixel-level confirmation is required)
- [ ] Lint changed CSS (stylelint) and confirm clean
- [ ] Report results; note deployment to `.aem.live` is left to you (local changes only)

> **Note:** This plan is read-only (plan mode). Applying these changes requires **Execute mode**.
