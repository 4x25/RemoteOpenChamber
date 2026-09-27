import{r as v,C as D}from"./vendor-regex-utilities-2BQyy0xI.js";const b=String.raw`\(\?(?:[:=!>A-Za-z\-]|<[=!]|\(DEFINE\))`;function q(e,a){for(let t=0;t<e.length;t++)e[t]>=a&&e[t]++}function B(e,a,t,l){return e.slice(0,a)+l+e.slice(a+t.length)}const G=new RegExp(String.raw`(?<noncapturingStart>${b})|(?<capturingStart>\((?:\?<[^>]+>)?)|\\?.`,"gsu");function M(e,a){const t=a?.hiddenCaptures??[];let l=a?.captureTransfers??new Map;if(!/\(\?>/.test(e))return{pattern:e,captureTransfers:l,hiddenCaptures:t};const n="(?>",u="(?:(?=(",g=[0],r=[];let i=0,c=0,f=NaN,h;do{h=!1;let d=0,s=0,o=!1,p;for(G.lastIndex=Number.isNaN(f)?0:f+u.length;p=G.exec(e);){const{0:$,index:w,groups:{capturingStart:S,noncapturingStart:k}}=p;if($==="[")d++;else if(d)$==="]"&&d--;else if($===n&&!o)f=w,o=!0;else if(o&&k)s++;else if(S)o?s++:(i++,g.push(i+c));else if($===")"&&o){if(!s){c++;const m=i+c;if(e=`${e.slice(0,f)}${u}${e.slice(f+n.length,w)}))<$$${m}>)${e.slice(w+1)}`,h=!0,r.push(m),q(t,m),l.size){const E=new Map;l.forEach((T,A)=>{E.set(A>=m?A+1:A,T.map(C=>C>=m?C+1:C))}),l=E}break}s--}}}while(h);return t.push(...r),e=v(e,String.raw`\\(?<backrefNum>[1-9]\d*)|<\$\$(?<wrappedBackrefNum>\d+)>`,({0:d,groups:{backrefNum:s,wrappedBackrefNum:o}})=>{if(s){const p=+s;if(p>g.length-1)throw new Error(`Backref "${d}" greater than number of captures`);return`\\${g[p]}`}return`\\${o}`},D.DEFAULT),{pattern:e,captureTransfers:l,hiddenCaptures:t}}const N=String.raw`(?:[?*+]|\{\d+(?:,\d*)?\})`,I=new RegExp(String.raw`
\\(?: \d+
  | c[A-Za-z]
  | [gk]<[^>]+>
  | [pPu]\{[^\}]+\}
  | u[A-Fa-f\d]{4}
  | x[A-Fa-f\d]{2}
  )
| \((?: \? (?: [:=!>]
  | <(?:[=!]|[^>]+>)
  | [A-Za-z\-]+:
  | \(DEFINE\)
  ))?
| (?<qBase>${N})(?<qMod>[?+]?)(?<invalidQ>[?*+\{]?)
| \\?.
`.replace(/\s+/g,""),"gsu");function P(e){if(!new RegExp(`${N}\\+`).test(e))return{pattern:e};const a=[];let t=null,l=null,n="",u=0,g;for(I.lastIndex=0;g=I.exec(e);){const{0:r,index:i,groups:{qBase:c,qMod:f,invalidQ:h}}=g;if(r==="[")u||(l=i),u++;else if(r==="]")u?u--:l=null;else if(!u)if(f==="+"&&n&&!n.startsWith("(")){if(h)throw new Error(`Invalid quantifier "${r}"`);let d=-1;if(/^\{\d+\}$/.test(c))e=B(e,i+c.length,f,"");else{if(n===")"||n==="]"){const s=n===")"?t:l;if(s===null)throw new Error(`Invalid unmatched "${n}"`);e=`${e.slice(0,s)}(?>${e.slice(s,i)}${c})${e.slice(i+r.length)}`}else e=`${e.slice(0,i-n.length)}(?>${n}${c})${e.slice(i+r.length)}`;d+=4}I.lastIndex+=d}else r[0]==="("?a.push(i):r===")"&&(t=a.length?a.pop():null);n=r}return{pattern:e}}export{M as a,P as p};
