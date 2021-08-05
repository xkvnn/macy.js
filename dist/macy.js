"use strict";const t=function(e,n){if(!(this instanceof t))return new t(e,n);if(e&&e.nodeName)return e;if(e=e.replace(/^\s*/,"").replace(/\s*$/,""),n)return this.byCss(e,n);for(var o in this.selectors)if(n=o.split("/"),new RegExp(n[1],n[2]).test(e))return this.selectors[o](e);return this.byCss(e)};t.prototype.byCss=function(t,e){return(e||document).querySelectorAll(t)},t.prototype.selectors={},t.prototype.selectors[/^\.[\w\-]+$/]=function(t){return document.getElementsByClassName(t.substring(1))},t.prototype.selectors[/^\w+$/]=function(t){return document.getElementsByTagName(t)},t.prototype.selectors[/^\#[\w\-]+$/]=function(t){return document.getElementById(t.substring(1))};const e=(t,e)=>{let n=t.length,o=n;for(;n--;)e(t[o-n-1])};const n=function(t=!1){this.running=!1,this.events=[],this.add(t)};n.prototype.run=function(){if(!this.running&&this.events.length>0){const t=this.events.shift();this.running=!0,t(),this.running=!1,this.run()}},n.prototype.add=function(t=!1){return!!t&&(Array.isArray(t)?e(t,(t=>this.add(t))):(this.events.push(t),void this.run()))},n.prototype.clear=function(){this.events=[]};const o=function(t,e={}){return this.instance=t,this.data=e,this},r=function(t=!1){this.events={},this.instance=t};r.prototype.on=function(t=!1,e=!1){return!(!t||!e)&&(Array.isArray(this.events[t])||(this.events[t]=[]),this.events[t].push(e))},r.prototype.emit=function(t=!1,n={}){if(!t||!Array.isArray(this.events[t]))return!1;const r=new o(this.instance,n);e(this.events[t],(t=>t(r)))};const i=t=>!("naturalHeight"in t&&t.naturalHeight+t.naturalWidth===0)||t.width+t.height!==0,s=(t,e,n=!1)=>function(t,e){let n=t.length,o=n,r=[];for(;n--;)r.push(e(t[o-n-1]));return r}(e,(e=>((t,e,n=!1)=>new Promise(((t,n)=>{if(e.complete)return i(e)?t(e):n(e);e.addEventListener("load",(()=>i(e)?t(e):n(e))),e.addEventListener("error",(()=>n(e)))})).then((e=>{n&&t.emit(t.constants.EVENT_IMAGE_LOAD,{img:e})})).catch((e=>t.emit(t.constants.EVENT_IMAGE_ERROR,{img:e}))))(t,e,n)));function a(t,e,n=!1){if(window.Promise)return((t,e,n=!1)=>Promise.all(s(t,e,n)).then((()=>{t.emit(t.constants.EVENT_IMAGE_COMPLETE)})))(t,e,n);t.recalculate(!0,!0)}const c=t=>function(t,e){let n;return function(){n&&clearTimeout(n),n=setTimeout(t,e)}}((()=>{t.emit(t.constants.EVENT_RESIZE),t.queue.add((()=>t.recalculate(!0,!0)))}),100),l=e=>{(e=>{if(e.container=t(e.options.container),e.container instanceof t||!e.container)return!!e.options.debug&&console.error("Error: Container not found");e.container.length&&(e.container=e.container[0]),e.options.container=e.container,e.container.style.position="relative"})(e),(t=>{t.queue=new n,t.events=new r(t),t.rows=[],t.resizer=c(t)})(e),(e=>{let n=t("img",e.container);window.addEventListener("resize",e.resizer),e.on(e.constants.EVENT_IMAGE_LOAD,(()=>e.recalculate(!1,!1))),e.on(e.constants.EVENT_IMAGE_COMPLETE,(()=>e.recalculate(!0,!0))),e.options.useOwnImageLoader||a(e,n,!e.options.waitForImages),e.emit(e.constants.EVENT_INITIALIZED)})(e)},u=t=>t===Object(t)&&"[object Array]"!==Object.prototype.toString.call(t),p=(t,e)=>{u(t)||(e.columns=t),u(t)&&t.columns&&(e.columns=t.columns),u(t)&&t.margin&&!u(t.margin)&&(e.margin={x:t.margin,y:t.margin}),u(t)&&t.margin&&u(t.margin)&&t.margin.x&&(e.margin.x=t.margin.x),u(t)&&t.margin&&u(t.margin)&&t.margin.y&&(e.margin.y=t.margin.y)};function m(t){let e=t.useContainerForBreakpoints?t.container.clientWidth:window.innerWidth,n={columns:t.columns};u(t.margin)?n.margin={x:t.margin.x,y:t.margin.y}:n.margin={x:t.margin,y:t.margin};let o=Object.keys(t.breakAt);return t.mobileFirst?function({options:t,responsiveOptions:e,keys:n,docWidth:o}){let r;for(let i=0;i<n.length;i++){let s=parseInt(n[i],10);o>=s&&(r=t.breakAt[s],p(r,e))}return e}({options:t,responsiveOptions:n,keys:o,docWidth:e}):function({options:t,responsiveOptions:e,keys:n,docWidth:o}){let r;for(let i=n.length-1;i>=0;i--){let s=parseInt(n[i],10);o<=s&&(r=t.breakAt[s],p(r,e))}return e}({options:t,responsiveOptions:n,keys:o,docWidth:e})}function h(t){return m(t).columns}function y(t){return m(t).margin}function f(t,e=!0){let n=h(t),o=y(t).x,r=100/n;if(!e)return r;if(1===n)return"100%";let i="px";if("string"==typeof o){let t=parseFloat(o);i=o.replace(t,""),o=t}return o=(n-1)*o/n,"%"===i?r-o+"%":`calc(${r}% - ${o}${i})`}function E(t,e){let n,o,r,i=h(t.options),s=0;if(1===++e)return 0;r=y(t.options).x;let a="px";if("string"==typeof r){let t=parseFloat(r,10);a=r.replace(t,""),r=t}return n=(r-(i-1)*r/i)*(e-1),s+=f(t.options,!1)*(e-1),o="%"===a?`${s+n}%`:`calc(${s}% + ${n}${a})`,o}function d(t){let n=0,{container:o,rows:r}=t;e(r,(t=>{n=t>n?t:n})),o.style.height=`${n}px`}const g=(t,e,n=!1)=>{if(t.lastcol||(t.lastcol=0),t.rows.length<1&&(n=!0),n){t.rows=[],t.cols=[],t.lastcol=0;for(var o=e-1;o>=0;o--)t.rows[o]=0,t.cols[o]=E(t,o)}else if(t.tmpRows){t.rows=[];for(o=e-1;o>=0;o--)t.rows[o]=t.tmpRows[o]}else{t.tmpRows=[];for(o=e-1;o>=0;o--)t.tmpRows[o]=t.rows[o]}};function w(t,n,o=!1,r=!0){let i=h(t.options),s=y(t.options).y;g(t,i,o),e(n,(e=>{t.lastcol===i&&(t.lastcol=0);let n=(o=e,a="height",window.getComputedStyle(o,null).getPropertyValue(a));var o,a;n=parseInt(e.offsetHeight,10),isNaN(n)||(e.style.position="absolute",e.style.top=`${t.rows[t.lastcol]}px`,e.style.left=`${t.cols[t.lastcol]}`,t.rows[t.lastcol]+=isNaN(n)?0:n+s,t.lastcol+=1,r&&(e.dataset.macyComplete=1))})),r&&(t.tmpRows=null),d(t)}const A=(n,o=!1,r=!0)=>{let i=o?n.container.children:t(':scope > *:not([data-macy-complete="1"])',n.container);i=Array.from(i).filter((t=>null!==t.offsetParent));let s=f(n.options);return e(i,(t=>{o&&(t.dataset.macyComplete=0),t.style.width=s})),n.options.trueOrder?(w(n,i,o,r),n.emit(n.constants.EVENT_RECALCULATED)):(function(t,n,o=!1,r=!0){let i=h(t.options),s=y(t.options).y;g(t,i,o),e(n,(e=>{let n=0,o=parseInt(e.offsetHeight,10);isNaN(o)||(t.rows.forEach(((e,o)=>{e<t.rows[n]&&(n=o)})),e.style.position="absolute",e.style.top=`${t.rows[n]}px`,e.style.left=`${t.cols[n]}`,t.rows[n]+=isNaN(o)?0:o+s,r&&(e.dataset.macyComplete=1))})),r&&(t.tmpRows=null),d(t)}(n,i,o,r),n.emit(n.constants.EVENT_RECALCULATED))};Array.from||(Array.from=t=>{let e=0,n=[];for(;e<t.length;)n.push(t[e++]);return n});const v={columns:4,margin:2,trueOrder:!1,waitForImages:!1,useImageLoader:!0,breakAt:{},useOwnImageLoader:!1,onInit:!1,cancelLegacy:!1,useContainerForBreakpoints:!1};(()=>{try{document.createElement("a").querySelector(":scope *")}catch(t){!function(){var t=/:scope\b/gi,e=o(Element.prototype.querySelector);Element.prototype.querySelector=function(t){return e.apply(this,arguments)};var n=o(Element.prototype.querySelectorAll);function o(e){return function(n){var o=n&&t.test(n);if(o){var r=this.getAttribute("id");r||(this.id="q"+Math.floor(9e6*Math.random())+1e6),arguments[0]=n.replace(t,"#"+this.id);var i=e.apply(this,arguments);return null===r?this.removeAttribute("id"):r||(this.id=r),i}return e.apply(this,arguments)}}Element.prototype.querySelectorAll=function(t){return n.apply(this,arguments)}}()}})();const I=function(t=v){if(!(this instanceof I))return new I(t);this.options={},Object.assign(this.options,v,t),this.options.cancelLegacy&&!window.Promise||l(this)};I.init=function(t){return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "),new I(t)},I.prototype.recalculateOnImageLoad=function(e=!1){return a(this,t("img",this.container),!e)},I.prototype.runOnImageLoad=function(e,n=!1){let o=t("img",this.container);return this.on(this.constants.EVENT_IMAGE_COMPLETE,e),n&&this.on(this.constants.EVENT_IMAGE_LOAD,e),a(this,o,n)},I.prototype.recalculate=function(t=!1,e=!0){return e&&this.queue.clear(),this.queue.add((()=>A(this,t,e)))},I.prototype.remove=function(){window.removeEventListener("resize",this.resizer),e(this.container.children,(t=>{t.removeAttribute("data-macy-complete"),t.removeAttribute("style")})),this.container.removeAttribute("style")},I.prototype.reInit=function(){this.recalculate(!0,!0),this.emit(this.constants.EVENT_INITIALIZED),window.addEventListener("resize",this.resizer),this.container.style.position="relative"},I.prototype.on=function(t,e){this.events.on(t,e)},I.prototype.emit=function(t,e){this.events.emit(t,e)},I.constants={EVENT_INITIALIZED:"macy.initialized",EVENT_RECALCULATED:"macy.recalculated",EVENT_IMAGE_LOAD:"macy.image.load",EVENT_IMAGE_ERROR:"macy.image.error",EVENT_IMAGE_COMPLETE:"macy.images.complete",EVENT_RESIZE:"macy.resize"},I.prototype.constants=I.constants,module.exports=I;
