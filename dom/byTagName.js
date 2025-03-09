function byTagName(node, tagName) {
  const matchedNodes = [];

  // If not Element type
  if (node.nodeType !== 1) {
    return matchedNodes;
  }

  if (node.children.length) {
    // Convert to Array to use 'reduce'
    const childrenArray = Array.from(node.children);

    matchedNodes.push(
      ...childrenArray.reduce((matched, currentNode) => {
        if (currentNode.tagName.toLowerCase() === tagName) {
          matchedNodes.push(currentNode);
        }

        return [...matched, ...byTagName(currentNode, tagName)];
      }, []),
    );
  }

  return matchedNodes;
}

console.log(byTagName(document.body, 'h1').length);
// → 1
console.log(byTagName(document.body, 'span').length);
// → 3
let para = document.querySelector('p');
console.log(byTagName(para, 'span').length);
