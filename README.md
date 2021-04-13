# element-notifier

A MutationObserver dis/connected helper.

```js
import {notify} from 'element-notifier';

const observer = notify((element, connected) => {
  if (connected)
    console.log(element, 'has been connected');
  else
    console.log(element, 'has been disconnected');
});
```

### Why?

The *MutationObserver* dance with records is easily error prone:

  * records are triggered lazily in a bizarre order
  * records are related to single containers, but inner elements are not notified
  * it's difficult to ensure that within a *MutationObserver* callback, all elements, in the right order of events, get passed along uniquely per event

This helper does just this: it passes to the callback every element that has been added, or removed, from the document, including nodes within opened shadow roots.
