self.elementNotifier=function(e){"use strict";var t=!0,r=!1,n="querySelectorAll";return e.notify=function(e){var o=function r(o,d,a,i,s){for(var u=0,l=o.length;u<l;u++){var f=o[u];(s||n in f)&&(i?d.has(f)||(d.add(f),a.delete(f),e(f,i)):a.has(f)||(a.add(f),d.delete(f),e(f,i)),s||r(f[n]("*"),d,a,i,t))}},d=new MutationObserver((function(e){for(var n=new Set,d=new Set,a=0,i=e.length;a<i;a++){var s=e[a],u=s.addedNodes,l=s.removedNodes;o(l,n,d,r,r),o(u,n,d,t,r)}}));return d.observe(document,{subtree:t,childList:t}),d},e}({});