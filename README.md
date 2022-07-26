# element-notifier

A MutationObserver dis/connected helper.

```js
import {notify} from 'element-notifier';

const observer = notify(
  // callback that receives any connected/disconnected element
  (element, connected) => {
    if (connected)
      console.log(element, 'has been connected');
    else
      console.log(element, 'has been disconnected');
  },

  // optional arguments
  document,         // the root element to observe
  MutationObserver  // a MutationObserver (non DOM envs)
);
```

The `observer` is a regular *MutationObserver* instance with a self bound, and instrumented, `.observe(node)` method to observe mutations within fragments too (example: *shadowRoot* nodes).


### Why?

The *MutationObserver* dance with records is easily error prone:

  * records are triggered lazily in a bizarre order
  * records are related to single containers, but inner elements are not notified
  * it's difficult to ensure that within a *MutationObserver* callback, all elements, in the right order of events, get passed along uniquely per event

This helper does just this: it passes to the callback every element that has been added, or removed, from the document.


### About ShadowDOM

While the observer could crawl nodes within a `shadowRoot`, in case it's opened, if nodes are removed from it nothing is notified due *MutationObserver* limitations.

If observing nodes appended or removed from any `shadowRoot` is desired, or at least any *open* one, it is necessary to somehow pollute the `Element.prototype` in a similar way:

```javascript
import {notify} from 'element-notifier';

// augmented method with right options included
const {observe} = notify(/* ... */);

const {attachShadow} = Element.prototype;
Element.prototype.attachShadow = function (init) {
  const shadowRoot = attachShadow.call(this, init);
  if (init.mode === 'open')
    observe(shadowRoot);
  return shadowRoot;
};
```

It is not responsibility of this module to augment the environment so it's up to this module consumers decide if doing so is needed or desired.

Please note that `connected` might mislead in case the *shadowRoot* is not live yet, as the *MutationObserver* in fragments doesn't care about their owner state.
