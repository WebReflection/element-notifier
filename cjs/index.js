'use strict';
const TRUE = true, FALSE = false;
const QSA = 'querySelectorAll';

/**
 * Start observing a generic document or root element.
 * @param {Function} callback triggered per each dis/connected node
 * @param {Element?} root by default, the global document to observe
 * @param {Function?} MO by default, the global MutationObserver
 * @returns {MutationObserver}
 */
const notify = (callback, root, MO) => {
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

  const observer = new (MO || MutationObserver)(records => {
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

  observer.observe(root || document, {subtree: TRUE, childList: TRUE});

  return observer;
};
exports.notify = notify;
