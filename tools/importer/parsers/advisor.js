/* eslint-disable */
/* global WebImporter */

/**
 * Advisor parser — converts the source ".advisor-search" widget into an
 * `Advisor` block table. Row 1: heading text. Row 2: input placeholder.
 */
export default function parse(element, { document }) {
  const heading = element.querySelector('.advisor-search-heading')?.textContent.trim()
    || 'Search with our Value-based Care Advisor';
  const input = element.querySelector('.advisor-search-input');
  const placeholder = input?.getAttribute('placeholder')?.trim() || 'Ask a question';

  const cells = [
    ['Advisor'],
    [heading],
    [placeholder],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
