/**
 * Specialty index block — renders a list of specialty links as a responsive
 * two-column A–Z directory (matches the "Value-based Care Guides by Specialty"
 * list). Authors provide the links as a single list; CSS columns balance them.
 */
export default function decorate(block) {
  // Collect all links authored in the block, in document order.
  const links = [...block.querySelectorAll('a')];

  const list = document.createElement('ul');
  list.className = 'specialty-index-list';

  links.forEach((a) => {
    const li = document.createElement('li');
    a.classList.remove('button');
    const container = a.closest('.button-container');
    if (container) container.className = '';
    li.append(a);
    list.append(li);
  });

  block.textContent = '';
  block.append(list);
}
