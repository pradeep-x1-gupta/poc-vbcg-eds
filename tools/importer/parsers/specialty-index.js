/* eslint-disable */
/* global WebImporter */

/**
 * Specialty index parser — converts the source ".specialty-links" list of
 * anchors into a `Specialty Index` block: a single cell containing all the
 * specialty links (each on its own line).
 */
export default function parse(element, { document }) {
  const links = [...element.querySelectorAll('a')];

  const container = document.createElement('div');
  links.forEach((a) => {
    const p = document.createElement('p');
    p.append(a);
    container.append(p);
  });

  const cells = [
    ['Specialty Index'],
    [container],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
