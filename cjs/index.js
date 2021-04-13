'use strict';
const TRUE = true, FALSE = false;
const QSA = 'querySelectorAll';

const notify = callback => {
  const loop = (nodes, added, removed, connected, pass) => {
    for (let i = 0, {length} = nodes; i < length; i++) {
      const node = nodes[i];
      if (pass || (QSA in node)) {
        if (connected) {
          if (!added.has(node)) {
            added.add(node);
            removed.delete(node);
            callback(node, connected);
          }
        }
        else if (!removed.has(node)) {
          removed.add(node);
          added.delete(node);
          callback(node, connected);
        }
        if (!pass)
          loop((node.shadowRoot || node)[QSA]('*'), added, removed, connected, TRUE);
      }
    }
  };

  const observer = new MutationObserver(records => {
    for (let
      added = new Set,
      removed = new Set,
      i = 0, {length} = records;
      i < length; i++
    ) {
      const {addedNodes, removedNodes} = records[i];
      loop(removedNodes, added, removed, FALSE, FALSE);
      loop(addedNodes, added, removed, TRUE, FALSE);
    }
  });

  observer.observe(document, {subtree: TRUE, childList: TRUE});

  return observer;
};
exports.notify = notify;
