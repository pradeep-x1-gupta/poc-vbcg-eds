/* eslint-disable */
/* global WebImporter */

/**
 * Sections transformer — applies a page-level Section Metadata style when the
 * embedded template requests one (template.sectionStyle). This lets the Allergy
 * Care Guide page opt into the "guide-layout" section (sticky jump-nav + cards)
 * without affecting pages that don't set a style.
 */
export default function transform(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;

  const template = payload?.template;
  const style = template?.sectionStyle;
  if (!style) return;

  const { document } = payload;

  const cells = [
    ['Section Metadata'],
    ['Style', style],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.append(table);
}
