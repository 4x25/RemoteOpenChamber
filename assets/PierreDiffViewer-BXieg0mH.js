import{R as $,j as F,c as we,r as l}from"./vendor-react-BUCujlKS.js";import{a as nt}from"./web-components-D3Yjr4Zx.js";import{f as We}from"./computeVirtualFileMetrics-DKqr_1AQ.js";import{V as rt,F as it}from"./VirtualizedFileDiff-BkFNKWS5.js";import{V as ot}from"./Virtualizer-D_a8gKmg.js";import{eH as st,eI as je,bj as at,c8 as lt,h as Be}from"./useAppFontEffects-BWQZ5DeI.js";import{I as _e,a as ct,u as dt}from"./useInlineCommentController-DlFyVfBu.js";import"./index-CHfphYL3.js";import{ay as ut}from"./runtimeEndpointReset-5r0hkd-2.js";import{ensurePierreThemeRegistered as Ve,getResolvedShikiTheme as Ue}from"./appThemeRegistry-aHUNHoqP.js";const xe=n=>{if(n.type==="new"){const r=Math.min(n.selection.start,n.selection.end),i=Math.max(n.selection.start,n.selection.end);return`new-comment-${n.selection.side??"additions"}-${r}-${i}`}return`draft-${n.draft.id}`},ft=n=>{const{drafts:r,editingDraftId:i,selection:s}=n,c=[];for(const m of r){if(!Number.isFinite(m.endLine))continue;const x=Math.max(1,Math.floor(m.endLine)),M=m.side==="original"?"deletions":"additions";c.push({lineNumber:x,side:M,metadata:{type:m.id===i?"edit":"saved",draft:m}})}return s&&!i&&c.push({lineNumber:Math.max(s.start,s.end),side:s.side??"additions",metadata:{type:"new",selection:s}}),c};function ht(n){const r=n.trim();if(!r)return null;if(/^-?\d+(\.\d+)?$/.test(r)){const i=Number.parseFloat(r);return Number.isFinite(i)?i:null}if(r.endsWith("px")){const i=Number.parseFloat(r.slice(0,-2));return Number.isFinite(i)?i:null}return null}function Ke(n){if(!(!n||n<=0))return Math.max(200,Math.floor(n))}function pt(n){const{diffRootRef:r,drafts:i,selection:s,editingDraftId:c,commentText:m,onTextChange:x,fileLabel:M,onSave:d,onCancel:R,onEdit:z,onDelete:N}=n,[ue,W]=$.useState(0),[O,U]=$.useState(null),D=$.useMemo(()=>!s||c?null:xe({type:"new",selection:s}),[c,s]),Z=$.useMemo(()=>{const h=i.map(T=>xe({type:T.id===c?"edit":"saved",draft:T}));return D&&h.push(D),h},[i,c,D]),A=$.useCallback(h=>{const T=r.current;if(!T)return null;const E=T.querySelector("diffs-container");if(!(E instanceof HTMLElement))return null;const w=E.querySelector(`[data-annotation-id="${h}"]`);if(w instanceof HTMLElement)return w;const C=E.shadowRoot;return C?C.querySelector(`[data-annotation-id="${h}"]`):null},[r]);$.useEffect(()=>{if(Z.length===0)return;let h=!1,T=0;const E=12,w=()=>{h||Z.every(q=>!!A(q))||T>=E||(T+=1,requestAnimationFrame(()=>{h||(W(q=>q+1),w())}))};return w(),()=>{h=!0}},[Z,A]),$.useEffect(()=>{const h=r.current;if(!h)return;const T=()=>{const w=getComputedStyle(h),C=ht(w.getPropertyValue("--oc-context-panel-width")),q=h.getBoundingClientRect(),I=C??q.width;U(I>0?I:null)};T();const E=new ResizeObserver(()=>{T()});return E.observe(h),window.addEventListener("resize",T),()=>{E.disconnect(),window.removeEventListener("resize",T)}},[r]);const ee=$.useCallback(h=>{const E=r.current?.getBoundingClientRect(),w=h.closest("[data-annotation-content]"),C=w instanceof HTMLElement?w.getBoundingClientRect():h.getBoundingClientRect(),q=[C.width];E&&q.push(E.right-C.left);const I=q.filter(K=>Number.isFinite(K)&&K>0);return I.length>0?Ke(Math.min(...I)):Ke(O)},[r,O]);return F.jsxs(F.Fragment,{children:[i.map(h=>{const T=xe({type:h.id===c?"edit":"saved",draft:h}),E=A(T);if(!E)return null;const w=ee(E);return h.id===c?we.createPortal(F.jsx(_e,{initialText:m,onTextChange:x,fileLabel:M,lineRange:{start:h.startLine,end:h.endLine,side:h.side==="original"?"deletions":"additions"},isEditing:!0,onSave:d,onCancel:R,maxWidth:w}),E,`draft-edit-${h.id}`):we.createPortal(F.jsx(ct,{draft:h,onEdit:()=>z(h),onDelete:()=>N(h),maxWidth:w}),E,`draft-card-${h.id}`)}),s&&!c&&D&&(()=>{const h=A(D);if(!h)return null;const T=ee(h);return we.createPortal(F.jsx(_e,{initialText:m,onTextChange:x,fileLabel:M,lineRange:s,isEditing:!1,onSave:d,onCancel:R,maxWidth:T}),h,D)})()]})}const Ge=[],mt=`
  [data-gutter-buffer="annotation"] { min-height: 0; }
  [data-code] { min-height: 2.5rem; align-content: start; }
`,Ye=5e5,gt=`
  :host {
    font-family: var(--font-mono);
    font-size: var(--text-code);
  }

  pre, [data-code] {
    font-family: var(--font-mono);
    font-size: var(--text-code);
  }

  /* Mobile touch selection support */
  [data-line-number] {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }

  /* Ensure interactive line numbers work on touch */
  pre[data-interactive-line-numbers] [data-line-number] {
    touch-action: manipulation;
  }
`,Xe=`
  ${gt}

  /* While a multi-line content drag is being mapped to a line selection the
     row highlight is the feedback; the native blue text selection on top of
     it reads as double-selection, so it is painted transparent for the drag's
     duration only (single-line selections keep the normal look for copying). */
  :host([data-oc-comment-drag]) {
    user-select: none;
    -webkit-user-select: none;
  }

  /* Gutter "+" comment utility: theme primary, and smaller than Pierre's
     1lh default, which reads oversized next to our 13px line numbers. */
  [data-utility-button] {
    width: 16px;
    height: 16px;
    align-self: center;
    margin-right: calc(-16px + 1ch);
    border-radius: 5px;
    background-color: var(--primary-base);
    color: var(--primary-foreground);
  }

  :host {
    --diffs-bg-separator-override: var(--surface-elevated);
  }

  [data-diff-header],
  [data-diff] {
    [data-separator] {
      height: 24px !important;
    }
  }

  [data-separator="line-info-basic"] {
    height: 24px !important;
    background: var(--diffs-bg) !important;
    position: relative;
  }

  [data-diff-type="single"] [data-gutter],
  [data-diff-type="split"] [data-deletions] [data-gutter] {
    [data-separator-wrapper] {
      position: absolute;
      left: 100%;
      display: flex;
      align-items: center;
      gap: unset;
      width: max-content;
      background: transparent;
      color: var(--diffs-fg-number);
      font-family: var(--diffs-header-font-family, var(--font-sans));
      font-size: 0.75rem;
      line-height: 1;
      margin-left: calc(-2ch - 2px);
    }

    [data-separator-wrapper][data-separator-multi-button] {
      margin-left: calc(-3ch - 2px);
    }

    [data-expand-button],
    [data-separator-content] {
      display: block;
      align-self: unset;
      min-width: unset;
      min-height: unset;
      padding: 0;
      flex-shrink: 0;
      grid-column: unset;
      border: none;
      width: auto;
      height: auto;
      background-color: transparent;
      color: inherit;
      font: inherit;
    }

    [data-expand-button]:not([data-expand-all-button]) {
      &[data-expand-down]::before {
        content: '\\2191';
      }

      &[data-expand-up]::before {
        content: '\\2193';
      }

      &[data-expand-both]::before {
        content: '\\2195';
      }

      svg {
        display: none;
      }
    }

    [data-separator-content] {
      background: transparent;
      margin-left: calc(2px + 1ch);
    }

    [data-expand-all-button] {
      position: relative;
      margin-left: 14px;
      text-transform: lowercase;
    }

    [data-expand-all-button]::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: -8px;
      margin-top: -1px;
      width: 3px;
      height: 3px;
      border-radius: 2px;
      background-color: var(--diffs-fg-number);
      pointer-events: none;
    }

    [data-separator-content]:hover,
    [data-expand-button]:hover,
    [data-expand-all-button]:hover {
      color: var(--diffs-fg);
    }

    [data-expand-all-button]:hover {
      text-decoration: underline;
    }
  }

  /* Partial diffs get no expand buttons from Pierre (the lines are not
     loaded). When the owner can load them on demand, the gutter separator
     itself becomes the button and shows the same glyphs as the real one. */
  :host([data-oc-expand-on-demand]) [data-diff-type="single"] [data-gutter] [data-separator-wrapper],
  :host([data-oc-expand-on-demand]) [data-diff-type="split"] [data-deletions] [data-gutter] [data-separator-wrapper] {
    cursor: pointer;

    &::before {
      content: '\\2195';
      display: block;
      flex-shrink: 0;
    }

    &:hover {
      color: var(--diffs-fg);
    }
  }

  :host([data-oc-expand-on-demand]) [data-diff-type="single"] [data-gutter] [data-separator-first] [data-separator-wrapper]::before,
  :host([data-oc-expand-on-demand]) [data-diff-type="split"] [data-deletions] [data-gutter] [data-separator-first] [data-separator-wrapper]::before {
    content: '\\2191';
  }

  /* Full file requested: the glyph becomes a spinner and the separators stop
     taking clicks until the highlighted full diff replaces this one. */
  :host([data-oc-expand-loading]) [data-diff-type="single"] [data-gutter] [data-separator-wrapper],
  :host([data-oc-expand-loading]) [data-diff-type="split"] [data-deletions] [data-gutter] [data-separator-wrapper] {
    cursor: default;
    pointer-events: none;
    opacity: 0.6;

    &::before {
      content: '';
      width: 9px;
      height: 9px;
      margin-right: 3px;
      border-radius: 50%;
      border: 1.5px solid currentColor;
      border-right-color: transparent;
      animation: oc-expand-spin 0.8s linear infinite;
    }
  }

  @keyframes oc-expand-spin {
    to { transform: rotate(360deg); }
  }
  `;function yt(n){let r=2166136261;for(let i=0;i<n.length;i+=1)r^=n.charCodeAt(i),r=r+((r<<1)+(r<<4)+(r<<7)+(r<<8)+(r<<24))>>>0;return r.toString(16)}function ke(n){const r=n.length>400?`${n.slice(0,200)}${n.slice(-200)}`:n;return`${n.length}:${yt(r)}`}const bt=2e3,vt=(n,r)=>{const[i,s]=$.useState(n),c=l.useRef(n);return l.useEffect(()=>{if(n===c.current)return;const m=c.current,x=()=>{c.current=n,s(n)};if(!(m!==void 0&&n!==void 0&&m.isPartial&&!n.isPartial&&m.name===n.name&&r?.isWorkingPool()===!0)){x();return}n.cacheKey??=["diff",n.name,n.prevObjectId??ke(n.deletionLines.join(`
`)),n.newObjectId??ke(n.additionLines.join(`
`))].join(":");let d=!1;const R=()=>{d||(d=!0,ue(),clearTimeout(W))},z=()=>{d||(R(),x())},N=()=>{r.getDiffResultCache(n)&&z()},ue=r.subscribeToStatChanges(N),W=setTimeout(z,bt);return r.primeDiffHighlightCache(n),N(),R},[n,r]),i},wt=(n,r,i,s)=>{const c=s.side==="deletions",x=(i?(c?i.deletionLines:i.additionLines).join(""):c?n:r).split(`
`),M=Math.min(s.start,s.end),d=Math.max(s.start,s.end),R=Math.max(1,M),z=Math.min(x.length,d);return R>z?"":x.slice(R-1,z).join(`
`)},xt=(n,r)=>n===r?!0:!n||!r?!1:n.start===r.start&&n.end===r.end&&n.side===r.side,kt=n=>n==="auto"||n==="scroll"||n==="overlay",Rt=n=>{let r=n?.parentElement??null;for(;r;){const i=window.getComputedStyle(r);if(kt(i.overflowY))return r;r=r.parentElement}return null},St=(n,r)=>{if(!n||!r||typeof window>"u")return()=>{};const i=Rt(n);if(!i)return()=>{};const s=r.getBoundingClientRect().height;if(!s)return()=>{};const c=n.getBoundingClientRect().top-i.getBoundingClientRect().top,m=r.style.minHeight;r.style.minHeight=`${Math.ceil(s)}px`;let x=!1;return()=>{if(x)return;x=!0,r.style.minHeight=m;const d=n.getBoundingClientRect().top-i.getBoundingClientRect().top-c;d&&(i.scrollTop+=d)}},Lt=(n,r)=>{const i=n.find(R=>R instanceof HTMLElement&&R.hasAttribute("data-separator"));if(!i)return null;let s=i.nextElementSibling;for(;s&&!s.hasAttribute("data-line-index");)s=s.nextElementSibling;const[c,m]=s?.getAttribute("data-line-index")?.split(",")??[],x=Number.parseInt(c??"",10),M=Number.parseInt(m??"",10);if(Number.isNaN(x)||Number.isNaN(M))return null;const d=r.hunks.find(R=>R.unifiedLineStart<=x&&x<R.unifiedLineStart+R.unifiedLineCount&&R.splitLineStart<=M&&M<R.splitLineStart+R.splitLineCount);return d?{additionStart:d.additionStart,direction:i.hasAttribute("data-separator-first")?"down":"both"}:null},Ae=(n,r)=>{if(typeof window>"u")return()=>{};let i=null,s=null,c=!1;const m=()=>{c||(s?.disconnect(),s=null,i=window.requestAnimationFrame(()=>{i=window.requestAnimationFrame(()=>{c||r()})}))},x=()=>n.querySelector("diffs-container")?.shadowRoot??void 0,M=(d=x())=>!!d?.querySelector("[data-line]");return M()?m():typeof MutationObserver<"u"?(s=new MutationObserver(()=>{const d=x();if(d){if(M(d)){m();return}s?.disconnect(),s=new MutationObserver(()=>{M(d)&&m()}),s.observe(d,{childList:!0,subtree:!0})}}),s.observe(n,{childList:!0,subtree:!0})):i=window.requestAnimationFrame(m),()=>{c=!0,s?.disconnect(),i!==null&&window.cancelAnimationFrame(i)}},ve=new WeakMap,Tt={lineHeight:24,hunkSeparatorHeight:24,spacing:0};function Et(n){const r=n.closest("[data-diff-virtual-root]");if(r instanceof HTMLElement){const i=r.querySelector("[data-diff-virtual-content]");return{key:r,root:r,content:i instanceof HTMLElement?i:void 0}}return{key:document,root:document,content:void 0}}function Mt(n){if(typeof document>"u")return null;const r=Et(n);let i=ve.get(r.key);if(!i){const c=new ot;c.setup(r.root,r.content),i={virtualizer:c,refs:0},ve.set(r.key,i)}i.refs+=1;let s=!1;return{virtualizer:i.virtualizer,root:r.root,release:()=>{if(s)return;s=!0;const c=ve.get(r.key);c&&(c.refs-=1,!(c.refs>0)&&(c.virtualizer.cleanUp(),ve.delete(r.key)))}}}const Pt=(n,r,i)=>{if(typeof window>"u")return()=>{};const s=[],c=()=>{try{n.rerender()}catch{}const m=r?.root;m instanceof HTMLElement?m.dispatchEvent(new Event("scroll",{bubbles:!1})):document.dispatchEvent(new Event("scroll",{bubbles:!1})),window.dispatchEvent(new Event("resize")),i()};return s.push(window.requestAnimationFrame(c)),s.push(window.requestAnimationFrame(()=>{s.push(window.requestAnimationFrame(c))})),()=>{for(const m of s)window.cancelAnimationFrame(m)}},Ot=({original:n,modified:r,fileDiff:i,language:s,fileName:c,renderSideBySide:m,wrapLines:x,layout:M="fill",enableComments:d=!0,hunkActions:R,onExpandContextRequest:z,pendingContextExpansion:N=null,contextLoading:ue=!1})=>{const W=st(),O=W?.currentTheme.metadata.variant==="dark",U=W?.availableThemes.find(e=>e.metadata.id===W.lightThemeId)??je(!1),D=W?.availableThemes.find(e=>e.metadata.id===W.darkThemeId)??je(!0),{isMobile:Z}=at(),A=R?.anchors??Ge,[ee,h]=$.useState(()=>({fileDiff:void 0,anchors:Ge,targets:new Map})),T=dt({source:"diff",fileLabel:c||"unknown",language:s,getCodeForRange:e=>wt(n,r,i,e),toStoreRange:e=>({startLine:e.start,endLine:e.end,side:e.side==="deletions"?"original":"modified"}),fromDraftRange:e=>({start:e.startLine,end:e.endLine,side:e.side==="original"?"deletions":"additions"})}),{drafts:E,selection:w,setSelection:C,commentText:q,setCommentText:I,editingDraftId:K,saveComment:Ie,cancel:Fe,startEdit:Je,deleteDraft:Qe}=T,fe=l.useRef(null),Y=l.useRef(null),re=l.useRef(""),j=l.useRef(!1),he=l.useRef(null);l.useEffect(()=>{fe.current=w},[w]),l.useEffect(()=>{Y.current=K},[K]),l.useEffect(()=>{re.current=q},[q]);const pe=l.useCallback(e=>{if(!d||j.current)return;const t=fe.current;if(!(!e&&t&&re.current.trim())){if(Z&&t&&e&&e.side===t.side){const o=Math.min(t.start,e.start),a=Math.max(t.end,e.end);C({...e,start:o,end:a})}else C(e);e&&(Y.current||I(""))}},[d,Z,I,C]),Ze=l.useCallback(()=>{Fe()},[Fe]),Ne=l.useCallback(e=>{const t=document.createElement("div");if(t.style.position="relative",e.metadata.type==="hunk-action")return t.dataset.hunkActionTarget=String(e.metadata.index),t.style.height="0px",t;const o=xe(e.metadata);return t.dataset.annotationId=o,t.dataset.annotationSide=e.side,t.dataset.annotationLine=String(e.lineNumber),t},[]),De=l.useCallback((e,t,o)=>{const a=new Map;if(o!=="unmount"){const u=Number.parseFloat(getComputedStyle(document.documentElement).fontSize)*2,b=new Map,S=[];for(const k of e.shadowRoot?.querySelectorAll("slot")??[])for(const P of k.assignedElements()){const v=P.querySelector("[data-hunk-action-target]"),f=Number(v?.dataset.hunkActionTarget);if(!v||!Number.isInteger(f)||f<0)continue;a.set(f,v);const p=k.closest("[data-code]");if(!p)continue;let y=b.get(p);y||(y=p.getBoundingClientRect(),b.set(p,y));const G=v.getBoundingClientRect().top,ce=Math.max(y.top+4,Math.min(G+4,y.bottom-u-4));S.push({target:v,offset:ce-G})}for(const{target:k,offset:P}of S){const v=`${P}px`;k.style.getPropertyValue("--oc-hunk-action-offset")!==v&&k.style.setProperty("--oc-hunk-action-offset",v)}}const g=t.fileDiff;h(u=>u.fileDiff===g&&u.anchors===A&&u.targets.size===a.size&&[...a].every(([b,S])=>u.targets.get(b)===S)?u:{fileDiff:g,anchors:A,targets:a})},[A]),et=l.useCallback((e,t)=>{Ie(e,t??w??void 0)},[Ie,w]),X=l.useCallback(e=>{C(e);const t=H.current;if(t)try{j.current=!0,t.setSelectedLines(e),he.current=e}catch{}finally{j.current=!1}},[C]),ie=l.useRef(null),Re=l.useRef(null);l.useEffect(()=>{if(!d)return;const e=ne.current;if(!e)return;const t=()=>{const f=e.querySelector("diffs-container");return f instanceof HTMLElement?f.shadowRoot:null},o=f=>{const p=e.querySelector("diffs-container");p instanceof HTMLElement&&(f?p.setAttribute("data-oc-comment-drag",""):p.removeAttribute("data-oc-comment-drag"))},a=(f,p)=>{const G=t()?.elementFromPoint(f,p)??document.elementFromPoint(f,p);if(!(G instanceof Element))return null;const ce=!!G.closest("[data-column-number]"),de=G.closest("[data-line]");if(!(de instanceof HTMLElement))return null;const Ce=Number.parseInt(de.getAttribute("data-line")??"",10);if(!Number.isFinite(Ce)||Ce<=0)return null;const tt=de.getAttribute("data-line-type")==="change-deletion"||de.closest("[data-code][data-deletions]")!=null?"deletions":"additions";return{line:Ce,side:tt,numberColumn:ce}};let g=null,u=!1,b=null;const S=f=>{ie.current=f;const p=H.current;if(p)try{j.current=!0,p.setSelectedLines(f)}catch{}finally{j.current=!1}},k=f=>{if(f.button!==0||f.pointerType!=="mouse")return;const p=a(f.clientX,f.clientY);if(!p||p.numberColumn){g=null;return}g={line:p.line,side:p.side},u=!1,b=f.pointerId},P=f=>{if(g==null||f.pointerId!==b)return;const p=a(f.clientX,f.clientY);if(p){if(!u){if(p.line===g.line)return;u=!0,o(!0),window.getSelection()?.removeAllRanges();const y=t();y&&"getSelection"in y&&y.getSelection()?.removeAllRanges()}S({start:Math.min(g.line,p.line),end:Math.max(g.line,p.line),side:g.side})}},v=f=>{if(g==null||f.pointerId!==b)return;const p=u;if(g=null,u=!1,b=null,o(!1),!p)return;const y=ie.current;ie.current=null,y&&(fe.current&&re.current.trim()&&!Y.current||(X(y),Y.current||I("")))};return e.addEventListener("pointerdown",k),document.addEventListener("pointermove",P,{passive:!0}),document.addEventListener("pointerup",v),()=>{e.removeEventListener("pointerdown",k),document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",v),o(!1)}},[X,d,I]);const He=l.useCallback(e=>{if(!d)return;const t=ie.current,o=t&&e.start>=t.start&&e.end<=t.end&&(e.side==null||e.side===t.side);Re.current!==null&&(window.clearTimeout(Re.current),Re.current=null),ie.current=null,X(o&&t?t:e),Y.current||I("")},[X,d,I]),ze=l.useCallback(e=>{if(!d||e.numberColumn||window.getSelection()?.toString().trim())return;const t=e.annotationSide,o={start:e.lineNumber,end:e.lineNumber,side:t},a=fe.current;if(a&&a.start===o.start&&a.end===o.end&&a.side===o.side){if(!re.current.trim()){C(null);const g=H.current;try{j.current=!0,g?.setSelectedLines(null)}finally{j.current=!1}}return}a&&re.current.trim()&&!Y.current||(X(o),Y.current||I(""))},[X,d,I,C]),qe=l.useCallback(e=>{const t=e.closest("[data-line-type]")?.getAttribute("data-line-type")??e.getAttribute("data-line-type");if(t==="change-deletion")return"deletions";if(t==="change-addition")return"additions";const o=e.getAttribute("data-column-side")??e.getAttribute("data-side")??e.closest("[data-column-side]")?.getAttribute("data-column-side");if(o==="deletions"||o==="left"||o==="original")return"deletions";if(o==="additions"||o==="right"||o==="modified")return"additions";const a=e.closest("[data-line-type]");if(a instanceof HTMLElement){const g=a.getBoundingClientRect(),u=e.getBoundingClientRect(),b=g.left+g.width/2;return u.left+u.width/2<b?"deletions":"additions"}return"additions"},[]);Ve(U),Ve(D);const te=`${U.metadata.id}:${D.metadata.id}:${O?"dark":"light"}`,oe=l.useMemo(()=>{if(i){const e=i.deletionLines.reduce((o,a)=>o+a.length,0),t=i.additionLines.reduce((o,a)=>o+a.length,0);return Math.max(e,t)>Ye}return Math.max(n.length,r.length)>Ye},[i,r.length,n.length]),ne=l.useRef(null),B=l.useRef(null),H=l.useRef(null),se=l.useRef(null),Se=l.useRef(null),Le=l.useRef(null),Te=l.useRef(void 0),me=l.useRef(void 0),ge=l.useRef(void 0),ye=l.useRef(void 0),[,Ee]=$.useReducer(e=>e+1,0),J=ut(oe?"unified":m?"split":"unified"),L=vt(i,J),_=l.useMemo(()=>Ue(U),[U]),V=l.useMemo(()=>Ue(D),[D]);$.useLayoutEffect(()=>{const e=ne.current;if(!e)return;const t=e.querySelector("diffs-container");if(!t)return;const o=O?V:_,a=(G,ce)=>G.colors?.[ce],g=a(_,"terminal.ansiGreen"),u=a(_,"terminal.ansiRed"),b=a(_,"terminal.ansiBlue"),S=a(V,"terminal.ansiGreen"),k=a(V,"terminal.ansiRed"),P=a(V,"terminal.ansiBlue");t.style.setProperty("--shiki-light",_.fg),t.style.setProperty("--shiki-light-bg",_.bg),g&&t.style.setProperty("--shiki-light-addition-color",g),u&&t.style.setProperty("--shiki-light-deletion-color",u),b&&t.style.setProperty("--shiki-light-modified-color",b),t.style.setProperty("--shiki-dark",V.fg),t.style.setProperty("--shiki-dark-bg",V.bg),S&&t.style.setProperty("--shiki-dark-addition-color",S),k&&t.style.setProperty("--shiki-dark-deletion-color",k),P&&t.style.setProperty("--shiki-dark-modified-color",P),t.style.setProperty("--diffs-bg",o.bg),t.style.setProperty("--diffs-fg",o.fg);const v=O?S:g,f=O?k:u,p=O?P:b;v&&t.style.setProperty("--diffs-addition-color-override",v),f&&t.style.setProperty("--diffs-deletion-color-override",f),p&&t.style.setProperty("--diffs-modified-color-override",p);const y=t.shadowRoot?.querySelector("pre");y&&(y.style.setProperty("--shiki-light",_.fg),y.style.setProperty("--shiki-light-bg",_.bg),g&&y.style.setProperty("--shiki-light-addition-color",g),u&&y.style.setProperty("--shiki-light-deletion-color",u),b&&y.style.setProperty("--shiki-light-modified-color",b),y.style.setProperty("--shiki-dark",V.fg),y.style.setProperty("--shiki-dark-bg",V.bg),S&&y.style.setProperty("--shiki-dark-addition-color",S),k&&y.style.setProperty("--shiki-dark-deletion-color",k),P&&y.style.setProperty("--shiki-dark-modified-color",P),y.style.setProperty("--diffs-bg",o.bg),y.style.setProperty("--diffs-fg",o.fg),v&&y.style.setProperty("--diffs-addition-color-override",v),f&&y.style.setProperty("--diffs-deletion-color-override",f),p&&y.style.setProperty("--diffs-modified-color-override",p))},[V,te,O,_]);const Q=l.useMemo(()=>({theme:{dark:D.metadata.id,light:U.metadata.id},themeType:O?"dark":"light",diffStyle:m?"split":"unified",diffIndicators:"none",hunkSeparators:"line-info-basic",lineDiffType:"none",maxLineDiffLength:oe?0:1e3,maxLineLengthForHighlighting:oe?1:1e3,tokenizeMaxLineLength:oe?1:1e3,collapsedContextThreshold:0,expansionLineCount:20,overflow:x?"wrap":"scroll",disableFileHeader:!0,enableLineSelection:d,enableGutterUtility:d,onGutterUtilityClick:d?He:void 0,onLineClick:d?ze:void 0,onLineSelected:d?pe:void 0,unsafeCSS:A.length>0?`${Xe}
${mt}`:Xe,renderAnnotation:d||A.length>0?Ne:void 0,onPostRender:A.length>0?De:void 0}),[De,A.length,D.metadata.id,d,O,oe,U.metadata.id,m,x,pe,He,ze,Ne]),ae=l.useMemo(()=>{const e=d?ft({drafts:E,editingDraftId:K,selection:w}):[];for(const t of A)e.push({side:t.side,lineNumber:t.lineNumber,metadata:{type:"hunk-action",index:t.index}});return e},[K,d,E,A,w]),Me=l.useRef(ae);l.useEffect(()=>{Me.current=ae},[ae]),l.useEffect(()=>{const e=B.current;return()=>{H.current?.cleanUp(),H.current=null,se.current?.release(),se.current=null,Se.current=null,Le.current=null,Te.current=void 0,me.current=void 0,ge.current=void 0,ye.current=void 0,e&&(e.innerHTML="")}},[]),l.useEffect(()=>{if(typeof window>"u")return;const e=B.current,t=ne.current;if(!e||!J)return;const o=St(t,e);let a=se.current;a||(a=Mt(e),se.current=a),se.current=a;const g=a?.virtualizer??null,u=L?void 0:{name:c||"",contents:n,lang:s,cacheKey:`old:${te}:${c}:${ke(n)}`},b=L?void 0:{name:c||"",contents:r,lang:s,cacheKey:`new:${te}:${c}:${ke(r)}`},S=L?me.current!==L:me.current!==void 0||!u||!b||!ge.current||!ye.current||!We(ge.current,u)||!We(ye.current,b),k=H.current,P=!!(k&&(Se.current!==g||Le.current!==J||g&&(Te.current!==Q.hunkSeparators||S)));P&&(k?.cleanUp(),H.current=null,e.innerHTML="");let v=H.current;const f=!P&&k?!nt(k.options,Q):!1;if(v?v.setOptions(Q):(v=a?new rt(Q,a.virtualizer,Tt,J):new it(Q,J),H.current=v,he.current=null),Se.current=g,Le.current=J,Te.current=g?Q.hunkSeparators:void 0,me.current=L,ge.current=u,ye.current=b,L)v.render({fileDiff:L,forceRender:f,lineAnnotations:Me.current,containerWrapper:e});else{if(!u||!b)return;v.render({oldFile:u,newFile:b,forceRender:f,lineAnnotations:Me.current,containerWrapper:e})}const p=Ae(e,()=>{o(),Pt(v,a,Ee)});return()=>{p(),o()}},[te,L,c,s,r,Q,n,J]),l.useEffect(()=>{const e=H.current;if(e){try{e.setLineAnnotations(ae)}catch(t){console.error("Failed to apply diff line annotations",t);try{e.setLineAnnotations([])}catch{}}requestAnimationFrame(()=>{if(H.current===e){try{e.rerender()}catch{}Ee()}})}},[ae]),l.useEffect(()=>{const e=H.current;if(!e||w!==null)return;const t=he.current;if(!xt(w,t))try{j.current=!0,e.setSelectedLines(w),he.current=w}catch{}finally{j.current=!1}},[w]),l.useEffect(()=>{if(!d)return;const e=B.current;if(!e)return;let t=null,o=()=>{};const a=()=>{const u=e.querySelector("diffs-container")?.shadowRoot;if(!u){t=requestAnimationFrame(a);return}const b=S=>{if(!(S instanceof MouseEvent)||S.button!==0||!(S.target instanceof Element))return;const k=S.target.closest("[data-column-number]");if(!(k instanceof HTMLElement))return;const P=k.getAttribute("data-column-number"),v=P?parseInt(P,10):NaN;if(Number.isNaN(v))return;const f=qe(k);pe({start:v,end:v,side:f}),S.preventDefault(),S.stopPropagation()};u.addEventListener("click",b,!0),o=()=>{u.removeEventListener("click",b,!0)}};return a(),()=>{t!==null&&cancelAnimationFrame(t),o()}},[te,d,c,pe,qe]),l.useEffect(()=>{const e=B.current;if(!e)return;let t=null,o=null;const g=setTimeout(()=>{const u=e.querySelector("diffs-container");if(!(u instanceof HTMLElement))return;const b=u.shadowRoot;t=new MutationObserver(()=>{o&&cancelAnimationFrame(o),o=requestAnimationFrame(()=>{Ee(),o=null})}),t.observe(u,{childList:!0,subtree:!0}),b&&t.observe(b,{childList:!0,subtree:!0})},100);return()=>{clearTimeout(g),o&&cancelAnimationFrame(o),t?.disconnect()}},[te,c]);const le=!!z&&L?.isPartial===!0,be=le&&(ue||i!==L);l.useEffect(()=>{const e=B.current;if(e)return Ae(e,()=>{const t=e.querySelector("diffs-container");t instanceof HTMLElement&&(t.toggleAttribute("data-oc-expand-on-demand",le),t.toggleAttribute("data-oc-expand-loading",be))})},[be,le,L]),l.useEffect(()=>{const e=B.current;if(!e||!le||be||!L||!z)return;const t=o=>{if(o.button!==0)return;const a=Lt(o.composedPath(),L);a&&(o.preventDefault(),o.stopPropagation(),z(a))};return e.addEventListener("click",t),()=>e.removeEventListener("click",t)},[be,le,L,z]);const Pe=l.useRef(null);if(l.useEffect(()=>{if(!N||!L||L.isPartial||Pe.current===N)return;const e=B.current;if(e)return Ae(e,()=>{const t=H.current;if(!t||t.fileDiff!==L||Pe.current===N)return;Pe.current=N;const o=L.hunks.findIndex(a=>a.additionStart<=N.additionStart&&N.additionStart<a.additionStart+Math.max(a.additionCount,1));o<0||t.expandHunk(o,N.direction)})},[L,N]),typeof window>"u")return null;const $e=d?F.jsx(pt,{diffRootRef:ne,drafts:E,selection:w,editingDraftId:K,commentText:q,onTextChange:I,fileLabel:c?.split("/").pop()??"",onSave:et,onCancel:Ze,onEdit:e=>{X({start:e.startLine,end:e.endLine,side:e.side==="original"?"deletions":"additions"}),Je(e)},onDelete:Qe}):null,Oe=R&&L&&ee.fileDiff===L&&ee.anchors===A?[...ee.targets].map(([e,t])=>we.createPortal(R.render(e),t,`hunk-${e}`)):null;return M==="fill"?F.jsx("div",{className:Be("flex flex-col relative","size-full"),"data-diff-virtual-root":!0,children:F.jsxs("div",{className:"flex-1 relative min-h-0",children:[F.jsx(lt,{outerClassName:"pierre-diff-wrapper size-full",disableHorizontal:!1,fillContainer:!0,"data-diff-virtual-content":!0,children:F.jsx("div",{ref:ne,className:"size-full relative",children:F.jsx("div",{ref:B,className:"size-full"})})}),$e,Oe]})}):F.jsxs("div",{className:Be("relative","w-full"),children:[F.jsx("div",{ref:ne,className:"pierre-diff-wrapper w-full overflow-x-auto overflow-y-visible relative",children:F.jsx("div",{ref:B,className:"w-full"})}),$e,Oe]})};export{Ot as P};
