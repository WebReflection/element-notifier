self.elementNotifier=function(e){"use strict";
/*! (c) Andrea Giammarchi - ISC */const t=!0,o=!1,n="querySelectorAll";return e.notify=(e,r=document,s=MutationObserver,d=["*"])=>{const c=(o,r,s,i,l)=>{const a=d.join(",");for(const d of o)(l||n in d)&&(i?r.has(d)||(r.add(d),s.delete(d),e(d,i)):s.has(d)||(s.add(d),r.delete(d),e(d,i)),l||c(d[n](a),r,s,i,t))},i=new s((e=>{const n=new Set,r=new Set;for(const{addedNodes:s,removedNodes:d}of e)c(d,n,r,o,o),c(s,n,r,t,o)})),{observe:l}=i;return(i.observe=e=>l.call(i,e,{subtree:t,childList:t}))(r),i},e}({});
