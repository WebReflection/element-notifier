self.elementNotifier = (function (exports) {
  'use strict';

  var TRUE = true,
      FALSE = false;
  var QSA = 'querySelectorAll';
  var notify = function notify(callback) {
    var loop = function loop(nodes, added, removed, connected, pass) {
      for (var i = 0, length = nodes.length; i < length; i++) {
        var node = nodes[i];

        if (pass || QSA in node) {
          if (connected) {
            if (!added.has(node)) {
              added.add(node);
              removed["delete"](node);
              callback(node, connected);
            }
          } else if (!removed.has(node)) {
            removed.add(node);
            added["delete"](node);
            callback(node, connected);
          }

          if (!pass) loop((node.shadowRoot || node)[QSA]('*'), added, removed, connected, TRUE);
        }
      }
    };

    var observer = new MutationObserver(function (records) {
      for (var added = new Set(), removed = new Set(), i = 0, length = records.length; i < length; i++) {
        var _records$i = records[i],
            addedNodes = _records$i.addedNodes,
            removedNodes = _records$i.removedNodes;
        loop(removedNodes, added, removed, FALSE, FALSE);
        loop(addedNodes, added, removed, TRUE, FALSE);
      }
    });
    observer.observe(document, {
      subtree: TRUE,
      childList: TRUE
    });
    return observer;
  };

  exports.notify = notify;

  return exports;

}({}));
