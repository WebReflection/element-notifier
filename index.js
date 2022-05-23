self.elementNotifier = (function (exports) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */
  const TRUE = true, FALSE = false, QSA = 'querySelectorAll';

  /**
   * Start observing a generic document or root element.
   * @param {(node:Element, connected:boolean) => void} callback triggered per each dis/connected element
   * @param {Document|Element} [root=document] by default, the global document to observe
   * @param {Function} [MO=MutationObserver] by default, the global MutationObserver
   * @param {string[]} [query=['*']] the selectors to use within nodes
   * @returns {MutationObserver}
   */
  const notify = (callback, root = document, MO = MutationObserver, query = ['*']) => {
    const loop = (nodes, selectors, added, removed, connected, pass) => {
      for (const node of nodes) {
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
            loop(node[QSA](selectors), selectors, added, removed, connected, TRUE);
        }
      }
    };

    const mo = new MO(records => {
      if (query.length) {
        const selectors = query.join(',');
        const added = new Set, removed = new Set;
        for (const {addedNodes, removedNodes} of records) {
          loop(removedNodes, selectors, added, removed, FALSE, FALSE);
          loop(addedNodes, selectors, added, removed, TRUE, FALSE);
        }
      }
    });

    const {observe} = mo;
    (mo.observe = node => observe.call(mo, node, {subtree: TRUE, childList: TRUE}))(root);

    return mo;
  };

  exports.notify = notify;

  return exports;

})({});
