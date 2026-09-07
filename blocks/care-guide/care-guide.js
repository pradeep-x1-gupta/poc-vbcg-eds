/**
 * Care guide block — renders a single clinical guide card matching the Allergy
 * Care Guide layout: a blue title bar, a two-column body (Quick Guide on the
 * left, Referral Guidelines on the right), and a full-width Patient
 * Communication footer row.
 *
 * Content model (rows top-to-bottom):
 *   1. Title           — single cell, the card heading text
 *   2. Body            — two cells: [Quick Guide] | [Referral Guidelines]
 *   3. Patient comms   — single cell (optional)
 *
 * The block also gets an id derived from its title so the guide-nav jump links
 * can target it.
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function decorate(block) {
  const rows = [...block.children];

  // Row 1: title
  const titleRow = rows[0];
  if (titleRow) {
    const title = document.createElement('div');
    title.className = 'care-guide-title';
    const text = titleRow.textContent.trim();
    title.textContent = text;
    if (text) block.id = slugify(text);
    titleRow.replaceWith(title);
  }

  // Row 2: two-column body (quick guide | referral guidelines)
  const bodyRow = rows[1];
  if (bodyRow) {
    bodyRow.className = 'care-guide-body';
    const cols = [...bodyRow.children];
    if (cols[0]) cols[0].className = 'care-guide-quick';
    if (cols[1]) cols[1].className = 'care-guide-referral';
  }

  // Row 3: patient communication (optional)
  const commsRow = rows[2];
  if (commsRow) {
    commsRow.className = 'care-guide-comms';
  }
}
