!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="./dist/",e(e.s=0)}([function(t,n,e){t.exports=e(1)},function(t,e,r){var o=r(2),a=new Map,u=[],c=new Map,f=new Map,i=new Set,h={U:1,D:2,L:4,R:8,V:3,H:12},d=[1,0,3,2],l=new Map([["○",h.H|h.V],["─",h.H],["┬",h.H|h.D],["├",h.V|h.R],["┴",h.H|h.U],["│",h.V],["┼",h.H|h.V],["┌",h.R|h.D],["┤",h.V|h.L],["╔",h.D|h.R],["║",h.V],["╫",h.V|h.H],["╚",h.U|h.R],["═",h.H],["╪",h.V|h.H],["┐",h.L|h.D],["└",h.U|h.R],["┘",h.L|h.U],["╗",h.L|h.D],["╝",h.L|h.U]]);function s(t,n){return l.has(t)&&l.get(t)&1<<n}function g(t){return t.substr(1).match(/../g).map((function(t){return+"0x".concat(t)}))}function v(t){return function(t,n,e){var r=Math.max(t,n,e),o=r-Math.min(t,n,e),a=1-Math.abs(r+r-o-1),u=o&&(r===t?(n-e)/o:r===n?2+(e-t)/o:4+(t-n)/o);return[60*(u<0?u+6:u),a?o/a:0,(r+r-o)/2]}(t[0]/255,t[1]/255,t[2]/255)}function p(t){return"hsl(".concat(t[0],", ").concat(100*t[1],"%, ").concat(100*t[2],"%)")}function b(t,n){var e=function(t){return Math.floor(t/o.height)}(t),r=function(t){return t%o.height}(t);return function(t,n){return t*o.height+n}(e+Math.floor(n/2)*(n%2*2-1),r+(1-Math.floor(n/2))*(n%2*2-1))}function M(t,n){return(t=t.slice())[2]=Math.min(t[2]*n,1),t}function m(){setInterval((function(){i.clear(),f.clear(),c.forEach((function(t,n){t>1&&f.set(n,t-1),i.add(n);for(var e=0;e<4;e++){var r=b(n,e);a.has(r)&&(i.add(r),10===t&&" "!==a.get(r).char&&s(a.get(n).char,e)&&s(a.get(r).char,d[e])&&!c.has(r)&&f.set(r,10))}}));var t=f;f=c,(c=t).forEach((function(t,n){for(var e=0;e<4;e++){var r=b(n,e);a.has(r)&&i.add(r)}})),u.forEach((function(t){i.add(t);for(var n=0;n<4;n++){var e=b(t,n);a.has(e)&&i.add(e)}})),i.forEach((function(t){a.get(t).newL=1}));var n=function(t,n){a.get(t).newL=Math.max(1+1.5*n*n/10/10,a.get(t).newL);for(var e=0;e<4;e++){var r=b(t,e);if(a.has(r)){var o=a.get(r);o.newL=Math.max(o.newL,1+1*n*n/10/10)}}};c.forEach((function(t,e){n(e,t)}));var e=(new Date).getTime();u.forEach((function(t,r){var o=(Math.sin((r+e/200)%u.length/u.length*Math.PI*4)+1)/2;n(t,Math.floor(10*o/2)),!c.size&&o>.9&&200*Math.random()<3&&c.set(t,Math.floor(10))})),i.forEach((function(t){return function(t,n){var e=a.get(t);if(e){var r=M(e._fg,n),o=M(e._bg,n);e.bg[2]===o[2]&&e.fg[2]==e.fg[2]||(e.bg=o,e.fg=r,e.node.style.backgroundColor=p(o),e.node.style.color=p(r))}}(t,a.get(t).newL)}))}),50)}document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll("#center pre").forEach((function(t){var e=t.innerText,r=parseInt(t.id.substr(1));t.addEventListener("click",(function(){return c.set(r,10),!1}));var o=v(g(t.dataset.bg)),f=v(g(t.dataset.fg));n={bg:o,fg:f,_bg:o,_fg:f,newL:1,char:e,node:t},a.set(r,n),"○"===e&&u.push(r)})),m()}),!1)},function(t,n){t.exports={width:54,height:48}}]);