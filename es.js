self.elementNotifier=function(e){"use strict";const t=!0,n=!1,o="querySelectorAll";return e.notify=e=>{const r=(n,d,s,l,c)=>{for(let i=0,{length:u}=n;i<u;i++){const u=n[i];(c||o in u)&&(l?d.has(u)||(d.add(u),s.delete(u),e(u,l)):s.has(u)||(s.add(u),d.delete(u),e(u,l)),c||r(u[o]("*"),d,s,l,t))}},d=new MutationObserver((e=>{for(let o=new Set,d=new Set,s=0,{length:l}=e;s<l;s++){const{addedNodes:l,removedNodes:c}=e[s];r(c,o,d,n,n),r(l,o,d,t,n)}}));return d.observe(document,{subtree:t,childList:t}),d},e}({});
