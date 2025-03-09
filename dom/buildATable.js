const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != 'string') node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

const mountainsEl = document.getElementById('mountains');

const titleNames = Object.keys(MOUNTAINS[0]);
const headerRow = elt('tr', ...titleNames.map((name) => elt('th', name)));

const dataRows = MOUNTAINS.map(({ name, height, place }) =>
  elt('tr', elt('td', name), elt('td', String(height)), elt('td', place)),
);

const table = elt('table', headerRow, ...dataRows);

mountainsEl.appendChild(table);
