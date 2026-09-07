/* eslint-disable */
/* global WebImporter */

/**
 * Care guide parser — converts a source ".care-guide-card" into a `Care Guide`
 * block:
 *   Row 1: title (the card heading)
 *   Row 2: two cells — Quick Guide | Referral Guidelines
 *   Row 3: Patient Communication (single cell)
 */
export default function parse(element, { document }) {
  const title = element.querySelector('h2')?.textContent.trim() || '';

  const quick = element.querySelector('.quick-guide');
  const referral = element.querySelector('.referral-guidelines');
  const comms = element.querySelector('.patient-communication');

  const quickCell = document.createElement('div');
  if (quick) {
    while (quick.firstChild) quickCell.append(quick.firstChild);
  }

  const referralCell = document.createElement('div');
  if (referral) {
    while (referral.firstChild) referralCell.append(referral.firstChild);
  }

  const commsCell = document.createElement('div');
  if (comms) {
    while (comms.firstChild) commsCell.append(comms.firstChild);
  }

  const cells = [
    ['Care Guide'],
    [title],
    [quickCell, referralCell],
    [commsCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
