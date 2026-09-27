import{gA as M,kj as V,kk as Y,kl as j,km as K,kn as X,ko as J,kp as $,kq as Q,kr as Z}from"./useAppFontEffects-BWQZ5DeI.js";import{b as ee,j as p,k as I,A as ne,a as G,l as te,m as C}from"./computeVirtualFileMetrics-DKqr_1AQ.js";import{t as ie}from"./vendor-hast-util-to-html-BKBhbTDb.js";function U(e,n,t){if(e===n||e==null||n==null)return e===n;const i=new Set(t),a=Object.keys(e),r=new Set(Object.keys(n));for(const s of a)if(r.delete(s),!i.has(s)&&(!(s in n)||e[s]!==n[s]))return!1;for(const s of Array.from(r))if(!i.has(s))return!1;return!0}function Te(e,n){const t=e?.theme??M,i=n?.theme??M,a=R(e),r=R(n);return ee(t,i)&&U(e,n,["theme","parseDiffOptions"])&&U(a,r)}function R(e){if(e!=null&&"parseDiffOptions"in e)return e.parseDiffOptions}function H(e,n){return e?.start===n?.start&&e?.end===n?.end&&e?.side===n?.side&&e?.endSide===n?.endSide}function ae(){return p({tagName:"button",properties:{"data-utility-button":"",type:"button"},children:[I({name:"diffs-icon-plus",properties:{"data-icon":""}})]})}function re(e,n){return e.lineNumber===n.lineNumber&&e.side===n.side}var Ie=class{mode;options;hoveredLine;hoveredToken;pre;gutterUtilityLine;gutterUtilityContainer;gutterUtilityButton;gutterUtilitySlot;interactiveLinesAttr=!1;interactiveLineNumbersAttr=!1;hasPointerListeners=!1;hasDocumentPointerListeners=!1;selectedRange=null;activeLineHighlightSide;activeLineNumberOnly=!1;editorAttached=!1;proposedSelectedRange;renderedSelectionRange;selectionAnchor;queuedSelectionRender;pointerSession={mode:"idle"};constructor(e,n){this.mode=e,this.options=n}setOptions(e){this.options=e}cleanUp(){this.pre?.removeEventListener("click",this.handlePointerClick),this.pre?.removeEventListener("pointerdown",this.handlePointerDown),this.pre?.removeEventListener("pointermove",this.handlePointerMove),this.pre?.removeEventListener("pointerleave",this.handlePointerLeave),this.pre?.removeAttribute("data-interactive-lines"),this.pre?.removeAttribute("data-interactive-line-numbers"),this.pre=void 0,this.gutterUtilityContainer?.remove(),this.gutterUtilityLine=void 0,this.gutterUtilityContainer=void 0,this.gutterUtilityButton=void 0,this.gutterUtilitySlot=void 0,this.clearHoveredLine(),this.clearHoveredToken(),this.detachDocumentPointerListeners(),this.clearPointerSession(),this.queuedSelectionRender!=null&&(cancelAnimationFrame(this.queuedSelectionRender),this.queuedSelectionRender=void 0),this.interactiveLinesAttr=!1,this.interactiveLineNumbersAttr=!1,this.hasPointerListeners=!1}setup(e){this.setSelectionDirty();const{usesCustomGutterUtility:n=!1,enableGutterUtility:t=!1}=this.options;this.pre!==e&&(this.cleanUp(),this.pre=e),t?this.ensureGutterUtilityNode(n):this.gutterUtilityContainer!=null&&(this.gutterUtilityContainer.remove(),this.gutterUtilityLine=void 0,this.gutterUtilityContainer=void 0,this.gutterUtilityButton=void 0,this.gutterUtilitySlot=void 0,this.pointerSession.mode==="gutterSelecting"&&(this.clearPointerSession(),this.detachDocumentPointerListeners())),this.syncPointerListeners(e),this.updateInteractiveLineAttributes(),this.renderSelection(),this.placeUtility()}setSelectionDirty(){this.renderedSelectionRange=void 0}setEditorAttached(e){this.editorAttached!==e&&(this.editorAttached=e,this.setSelectionDirty(),this.renderSelection())}isSelectionDirty(){return this.renderedSelectionRange===null}setSelection(e,n){const t=!(e===this.selectedRange||H(e??void 0,this.selectedRange??void 0));!this.isSelectionDirty()&&!t||(this.proposedSelectedRange=void 0,this.selectedRange=e,this.activeLineHighlightSide=n?.activeLineSide,this.activeLineNumberOnly=n?.lineNumberOnly??!1,this.renderSelection(),this.placeUtility(),t&&n?.notify!==!1&&this.notifySelectionCommitted())}getSelection(){return this.selectedRange}getHoveredLine=()=>{const e=this.gutterUtilityLine??this.hoveredLine;if(e!=null){if(this.mode==="diff"&&e.type==="diff-line")return{lineNumber:e.lineNumber,side:e.annotationSide};if(this.mode==="file"&&e.type==="line")return{lineNumber:e.lineNumber}}};handlePointerClick=e=>{const{onHunkExpand:n,onLineClick:t,onLineNumberClick:i,onTokenClick:a,onMergeConflictActionClick:r}=this.options;n==null&&t==null&&i==null&&r==null&&a==null||this.options.onGutterUtilityClick!=null&&E(e.composedPath())||(k(this.options.__debugPointerEvents,"click","FileDiff.DEBUG.handlePointerClick:",e),this.handlePointerEvent({eventType:"click",event:e}))};handlePointerMove=e=>{if(e.pointerType!=="mouse")return;const{lineHoverHighlight:n="disabled",onLineEnter:t,onLineLeave:i,onTokenEnter:a,onTokenLeave:r,enableGutterUtility:s=!1}=this.options;n==="disabled"&&!s&&t==null&&i==null&&a==null&&r==null||(k(this.options.__debugPointerEvents,"move","FileDiff.DEBUG.handlePointerMove:",e),this.handlePointerEvent({eventType:"move",event:e}))};handlePointerLeave=e=>{const{__debugPointerEvents:n}=this.options;if(k(n,"move","FileDiff.DEBUG.handlePointerLeave: no event"),this.hoveredLine==null&&this.hoveredToken==null){k(n,"move","FileDiff.DEBUG.handlePointerLeave: returned early, no hovered line or token");return}this.hoveredToken!=null&&(this.options.onTokenLeave?.(this.hoveredToken,e),this.clearHoveredToken()),this.hoveredLine!=null&&(this.options.onLineLeave?.({...this.hoveredLine,event:e}),this.clearHoveredLine()),this.placeUtility()};handlePointerEvent({eventType:e,event:n}){const{__debugPointerEvents:t}=this.options,i=n.composedPath();k(t,e,"FileDiff.DEBUG.handlePointerEvent:",{eventType:e,composedPath:i});const a=this.resolvePointerTarget(i);k(t,e,"FileDiff.DEBUG.handlePointerEvent: resolvePointerTarget result:",a);const{onLineClick:r,onLineNumberClick:s,onLineEnter:l,onLineLeave:o,onTokenClick:d,onTokenEnter:c,onTokenLeave:m,onHunkExpand:h,onMergeConflictActionClick:f}=this.options;switch(e){case"move":{const u=T(a)&&this.hoveredLine?.lineElement===a.lineElement;A(a)&&this.hoveredToken?.tokenElement===a.tokenElement||(this.hoveredToken!=null&&(m?.(this.hoveredToken,n),this.clearHoveredToken()),A(a)&&(this.setHoveredToken(this.toTokenEventBaseProps(a)),c?.(this.hoveredToken,n))),u||(this.hoveredLine!=null&&(o?.({...this.hoveredLine,event:n}),this.clearHoveredLine()),T(a)?(this.setHoveredLine(this.toEventBaseProps(a)),this.placeUtility(),l?.({...this.hoveredLine,event:n})):this.placeUtility());break}case"click":{if(a==null)break;if(de(a)&&f!=null){f(a);break}if(se(a)&&h!=null){h(a.hunkIndex,a.all||n.shiftKey?"both":a.direction,a.all||n.shiftKey?Number.POSITIVE_INFINITY:void 0);break}if(!T(a))break;A(a)&&d!=null&&d(this.toTokenEventBaseProps(a),n);const u=this.toEventBaseProps(a);s!=null&&a.numberColumn?s({...u,event:n}):r?.({...u,event:n});break}}}syncPointerListeners(e){const{__debugPointerEvents:n,lineHoverHighlight:t="disabled",onLineClick:i,onLineNumberClick:a,onLineEnter:r,onLineLeave:s,onTokenClick:l,onTokenEnter:o,onTokenLeave:d,onHunkExpand:c,onMergeConflictActionClick:m,enableGutterUtility:h=!1,enableLineSelection:f=!1,onGutterUtilityClick:u}=this.options,v=u!=null,b=t!=="disabled"||i!=null||a!=null||r!=null||s!=null||l!=null||o!=null||d!=null||c!=null||m!=null||h||f||v;b&&!this.hasPointerListeners?(e.addEventListener("click",this.handlePointerClick),e.addEventListener("pointerdown",this.handlePointerDown),e.addEventListener("pointermove",this.handlePointerMove),e.addEventListener("pointerleave",this.handlePointerLeave),this.hasPointerListeners=!0,k(n,"click","FileDiff.DEBUG.attachEventListeners: Attaching click events for:",(()=>{const x=[];return(n==="both"||n==="click")&&(i!=null&&x.push("onLineClick"),a!=null&&x.push("onLineNumberClick"),c!=null&&x.push("expandable hunk separators"),m!=null&&x.push("merge conflict actions")),x})()),k(n,"move","FileDiff.DEBUG.attachEventListeners: Attaching pointer move event"),k(n,"move","FileDiff.DEBUG.attachEventListeners: Attaching pointer leave event")):!b&&this.hasPointerListeners&&(e.removeEventListener("click",this.handlePointerClick),e.removeEventListener("pointerdown",this.handlePointerDown),e.removeEventListener("pointermove",this.handlePointerMove),e.removeEventListener("pointerleave",this.handlePointerLeave),this.hasPointerListeners=!1);const g=this.pointerSession.mode==="selecting"||this.pointerSession.mode==="pendingSingleLineUnselect",y=this.pointerSession.mode==="gutterSelecting";(!f&&g||!v&&y)&&(this.clearPointerSession(),this.detachDocumentPointerListeners(),this.selectionAnchor=void 0,this.clearPendingSingleLineState())}updateInteractiveLineAttributes(){if(this.pre==null)return;const{onLineClick:e,onLineNumberClick:n,enableLineSelection:t=!1}=this.options,i=e!=null,a=n!=null||t;i&&!this.interactiveLinesAttr?(this.pre.setAttribute("data-interactive-lines",""),this.interactiveLinesAttr=!0):!i&&this.interactiveLinesAttr&&(this.pre.removeAttribute("data-interactive-lines"),this.interactiveLinesAttr=!1),a&&!this.interactiveLineNumbersAttr?(this.pre.setAttribute("data-interactive-line-numbers",""),this.interactiveLineNumbersAttr=!0):!a&&this.interactiveLineNumbersAttr&&(this.pre.removeAttribute("data-interactive-line-numbers"),this.interactiveLineNumbersAttr=!1)}handlePointerDown=e=>{if(e.pointerType==="mouse"&&e.button!==0||this.pre==null||this.pointerSession.mode!=="idle")return;const n=e.composedPath();E(n)&&this.options.onGutterUtilityClick!=null?this.startGutterSelectionFromPointerDown(e):(e.pointerType!=="mouse"&&this.revealUtilityFromGutterPath(n),this.startLineSelectionFromPointerDown(e))};startLineSelectionFromPointerDown(e){const{enableLineSelection:n=!1}=this.options;if(!n)return;const t=this.resolveSelectionInfo(e,{source:"event-path",requireNumberColumn:!0});if(t==null)return;const{pre:i}=this;if(i==null)return;e.preventDefault();const{lineNumber:a,eventSide:r,lineIndex:s}=t;if(e.shiftKey&&this.selectedRange!=null){const l=this.getIndexesFromSelection(this.selectedRange,i.getAttribute("data-diff-type")==="split");if(l==null)return;const o=l.start<=l.end?s>=l.start:s<=l.end;this.selectionAnchor={lineNumber:o?this.selectedRange.start:this.selectedRange.end,side:o?this.selectedRange.side:this.selectedRange.endSide??this.selectedRange.side},this.updateSelection(a,r,!1),this.notifySelectionStart(this.getCurrentSelectionRange()),this.pointerSession={mode:"selecting",pointerId:e.pointerId},this.attachDocumentPointerListeners();return}if(this.selectedRange?.start===a&&this.selectedRange?.end===a){const l={lineNumber:a,side:r};this.selectionAnchor=l,this.pointerSession={mode:"pendingSingleLineUnselect",pointerId:e.pointerId,anchor:l,pending:l},this.attachDocumentPointerListeners();return}this.options.controlledSelection===!0?this.proposedSelectedRange=null:this.selectedRange=null,this.placeUtility(),this.selectionAnchor={lineNumber:a,side:r},this.updateSelection(a,r,!1),this.notifySelectionStart(this.getCurrentSelectionRange()),this.pointerSession={mode:"selecting",pointerId:e.pointerId},this.attachDocumentPointerListeners()}startGutterSelectionFromPointerDown(e){const{enableLineSelection:n=!1,onGutterUtilityClick:t}=this.options;if(t==null)return;const i=this.currentSelectionEnds(),a=i?.bottom??this.resolveSelectionPoint(e,{source:"event-path",excludeUtility:!1}),r=i?.top??a;a==null||r==null||(e.preventDefault(),e.stopPropagation(),this.pointerSession={mode:"gutterSelecting",pointerId:e.pointerId,anchor:r,current:a},n&&(this.selectionAnchor={lineNumber:r.lineNumber,side:r.side},this.updateSelection(a.lineNumber,a.side,!1),this.notifySelectionStart(this.getCurrentSelectionRange())),this.attachDocumentPointerListeners())}handleDocumentPointerMove=e=>{const{enableLineSelection:n=!1}=this.options;switch(this.pointerSession.mode){case"idle":return;case"gutterSelecting":{if(e.pointerId!==this.pointerSession.pointerId)return;e.preventDefault();const t=this.resolveSelectionPoint(e,{source:"coordinates-first"});if(t==null)return;this.pointerSession.current=t,n===!0&&this.updateSelection(t.lineNumber,t.side);return}case"selecting":{if(e.pointerId!==this.pointerSession.pointerId)return;e.preventDefault();const t=this.resolveSelectionInfo(e,{source:"coordinates-first",requireNumberColumn:!1});if(t==null||this.selectionAnchor==null)return;this.updateSelection(t.lineNumber,t.eventSide);return}case"pendingSingleLineUnselect":{if(e.pointerId!==this.pointerSession.pointerId)return;e.preventDefault();const t=this.resolveSelectionInfo(e,{source:"coordinates-first",requireNumberColumn:!1});if(t==null||this.selectionAnchor==null)return;const i={lineNumber:t.lineNumber,side:t.eventSide};if(re(this.pointerSession.pending,i))return;this.updateSelection(t.lineNumber,t.eventSide,!1),this.notifySelectionStart(this.getCurrentSelectionRange()),this.notifySelectionChangeDelta(),this.pointerSession={mode:"selecting",pointerId:e.pointerId};return}}};handleDocumentPointerUp=e=>{const{enableLineSelection:n=!1,onGutterUtilityClick:t}=this.options;switch(this.pointerSession.mode){case"idle":return;case"gutterSelecting":{if(e.pointerId!==this.pointerSession.pointerId)return;e.preventDefault();const i=this.resolveSelectionPoint(e,{source:"coordinates-first"});i!=null&&(this.pointerSession.current=i,n&&this.updateSelection(i.lineNumber,i.side)),t?.(this.buildSelectedLineRange(this.pointerSession.anchor,this.pointerSession.current)),this.selectionAnchor=void 0,n&&(this.notifySelectionEnd(this.getCurrentSelectionRange()),this.notifySelectionCommitted(),this.clearProposedSelection()),this.clearPointerSession(),this.detachDocumentPointerListeners();return}case"pendingSingleLineUnselect":if(e.pointerId!==this.pointerSession.pointerId)return;e.preventDefault(),this.updateSelection(null,void 0,!1),this.selectionAnchor=void 0,this.clearPendingSingleLineState(),this.detachDocumentPointerListeners(),this.notifySelectionEnd(this.getCurrentSelectionRange()),this.notifySelectionCommitted(),this.clearProposedSelection();return;case"selecting":if(e.pointerId!==this.pointerSession.pointerId)return;e.preventDefault(),this.selectionAnchor=void 0,this.detachDocumentPointerListeners(),this.clearPointerSession(),this.notifySelectionEnd(this.getCurrentSelectionRange()),this.notifySelectionCommitted(),this.clearProposedSelection()}};handleDocumentPointerCancel=e=>{switch(this.pointerSession.mode){case"idle":return;case"gutterSelecting":case"selecting":case"pendingSingleLineUnselect":if("pointerId"in this.pointerSession&&e.pointerId!==this.pointerSession.pointerId)return;this.selectionAnchor=void 0,this.clearProposedSelection(),this.clearPendingSingleLineState(),this.clearPointerSession(),this.detachDocumentPointerListeners()}};clearHoveredLine(){this.hoveredLine!=null&&(this.hoveredLine.lineElement.removeAttribute("data-hovered"),this.hoveredLine.numberElement.removeAttribute("data-hovered"),this.hoveredLine=void 0)}setHoveredLine(e){const{lineHoverHighlight:n="disabled"}=this.options;this.hoveredLine!=null&&this.clearHoveredLine(),this.hoveredLine=e,n!=="disabled"&&((n==="both"||n==="line")&&this.hoveredLine.lineElement.setAttribute("data-hovered",""),(n==="both"||n==="number")&&this.hoveredLine.numberElement.setAttribute("data-hovered",""))}clearHoveredToken(){this.hoveredToken!=null&&(this.hoveredToken=void 0)}setHoveredToken(e){this.hoveredToken!=null&&this.clearHoveredToken(),this.hoveredToken=e}ensureGutterUtilityNode(e){if(this.gutterUtilityContainer==null&&(this.gutterUtilityContainer=document.createElement("div"),this.gutterUtilityContainer.setAttribute("data-gutter-utility-slot","")),e)this.gutterUtilityButton!=null&&(this.gutterUtilityButton.remove(),this.gutterUtilityButton=void 0),this.gutterUtilitySlot==null&&(this.gutterUtilitySlot=document.createElement("slot"),this.gutterUtilitySlot.name="gutter-utility-slot"),this.gutterUtilitySlot.parentNode!==this.gutterUtilityContainer&&this.gutterUtilityContainer.replaceChildren(this.gutterUtilitySlot);else{if(this.gutterUtilitySlot?.remove(),this.gutterUtilitySlot=void 0,this.gutterUtilityButton==null){const n=document.createElement("div");n.innerHTML=ie(ae());const t=n.firstElementChild;if(!(t instanceof HTMLButtonElement))throw new Error("InteractionManager.ensureGutterUtilityNode: Node element should be a button");t.remove(),this.gutterUtilityButton=t}this.gutterUtilityButton.parentNode!==this.gutterUtilityContainer&&this.gutterUtilityContainer.replaceChildren(this.gutterUtilityButton)}}revealUtilityFromGutterPath(e){if(this.placeUtilityFromSelection())return;const n=this.resolvePointerTarget(e);w(n)&&n.numberColumn&&this.showUtilityOnLine(this.toEventBaseProps(n))}placeUtility(){if(!this.placeUtilityFromSelection()){if(this.hoveredLine!=null){this.showUtilityOnLine(this.hoveredLine);return}this.hideUtility()}}placeUtilityFromSelection(){const e=this.currentSelectionEnds();if(e==null)return!1;const n=this.targetForSelectionPoint(e.bottom);return n==null?this.hideUtility():this.showUtilityOnLine(this.toEventBaseProps(n)),!0}showUtilityOnLine(e){this.gutterUtilityContainer!=null&&(this.gutterUtilityLine=e,e.numberElement.appendChild(this.gutterUtilityContainer))}hideUtility(){this.gutterUtilityContainer?.remove(),this.gutterUtilityLine=void 0}currentSelectionEnds(){const e=this.getCurrentSelectionRange();return e==null?void 0:this.selectionEnds(e)}selectionEnds(e){const n={lineNumber:e.start,side:e.side},t={lineNumber:e.end,side:e.endSide??e.side},i=this.selectionPointRowIndex(n),a=this.selectionPointRowIndex(t);if(!(i==null||a==null))return i>a?{top:t,bottom:n}:{top:n,bottom:t}}selectionPointRowIndex(e){const n=this.getLineIndex(e.lineNumber,e.side);if(n!=null)return this.isSplitDiff()?n[1]:n[0]}targetForSelectionPoint(e){if(this.pre==null)return;const n=this.getLineIndex(e.lineNumber,e.side);if(n==null)return;const t=this.mode==="diff"?`${n[0]},${n[1]}`:`${n[0]}`,i=this.pre.querySelectorAll(`[data-column-number="${e.lineNumber}"][data-line-index="${t}"]`);for(const a of i){if(!(a instanceof HTMLElement))continue;const r=this.resolvePointerTarget(L(a));if(w(r)&&!(this.mode==="diff"&&e.side!=null&&r.side!==e.side))return r}}attachDocumentPointerListeners(){this.hasDocumentPointerListeners||(document.addEventListener("pointermove",this.handleDocumentPointerMove),document.addEventListener("pointerup",this.handleDocumentPointerUp),document.addEventListener("pointercancel",this.handleDocumentPointerCancel),this.hasDocumentPointerListeners=!0)}detachDocumentPointerListeners(){this.hasDocumentPointerListeners&&(document.removeEventListener("pointermove",this.handleDocumentPointerMove),document.removeEventListener("pointerup",this.handleDocumentPointerUp),document.removeEventListener("pointercancel",this.handleDocumentPointerCancel),this.hasDocumentPointerListeners=!1)}clearPointerSession(){this.pointerSession={mode:"idle"}}clearPendingSingleLineState(){this.pointerSession.mode==="pendingSingleLineUnselect"&&(this.pointerSession={mode:"idle"})}selectionInfoFromPath(e,n){const t=this.resolvePointerTarget(e);if(w(t)&&!(n&&!t.numberColumn)&&t.splitLineIndex!=null)return{lineIndex:t.splitLineIndex,lineNumber:t.lineNumber,eventSide:this.mode==="diff"?t.side:void 0}}resolveSelectionInfo(e,n){const t=this.resolveSelectionPath(e,n);return t!=null?this.selectionInfoFromPath(t,n.requireNumberColumn):void 0}selectionPointFromPath(e){const n=this.resolvePointerTarget(e);if(w(n))return{lineNumber:n.lineNumber,side:this.mode==="diff"?n.side:void 0}}resolveSelectionPoint(e,n){const t=this.resolveSelectionPath(e,n);return t!=null?this.selectionPointFromPath(t):void 0}resolveSelectionPath(e,n){const t=n.excludeUtility!==!1;switch(n.source){case"event-path":return this.pathFromEventPath(e.composedPath(),t);case"coordinates-first":{const i=this.pathFromCoordinates(e,t);return i!==void 0?i??void 0:this.pathFromEventPath(e.composedPath(),t)}}}pathFromCoordinates(e,n){const t=this.hitTest(e);if(t!==void 0)return t===null?null:this.pathFromElement(t,n)??null}pathFromEventPath(e,n){if(!(n&&E(e))){for(const t of e)if(t instanceof Element)return this.pathFromElement(t,n)}}pathFromElement(e,n){const t=L(e);if(n&&E(t))return;const i=fe(e);return i!=null?L(i):this.pathFromAnnotationSlot(e)}pathFromAnnotationSlot(e){const n=ue(ce(e));if(n==null)return;const t=this.targetForSelectionPoint(n);return t!=null?L(t.lineElement):void 0}hitTest(e){if(!Number.isFinite(e.clientX)||!Number.isFinite(e.clientY))return;const n=this.pre?.getRootNode(),t=z(n)?n:z(document)?document:void 0;if(t!=null)return t.elementFromPoint(e.clientX,e.clientY)}getLineIndex(e,n){const{getLineIndex:t}=this.options;return t!=null?t(e,n):[e-1,e-1]}getCurrentSelectionRange(){return this.proposedSelectedRange!==void 0?this.proposedSelectedRange:this.selectedRange}clearProposedSelection(){this.proposedSelectedRange=void 0}updateSelection(e,n,t=!0){const i=this.getCurrentSelectionRange();let a;if(e==null)a=null;else{const r=this.selectionAnchor?.side??n,s=this.selectionAnchor?.lineNumber??e;a=this.buildSelectionRange(s,e,r,n)}H(i??void 0,a??void 0)||(this.activeLineHighlightSide=void 0,this.activeLineNumberOnly=!1,this.options.controlledSelection===!0?this.proposedSelectedRange=a:(this.selectedRange=a,this.queuedSelectionRender??=requestAnimationFrame(this.renderSelection)),this.placeUtility(),t&&this.notifySelectionChangeDelta())}getIndexesFromSelection(e,n){if(this.pre==null)return;const t=this.getLineIndex(e.start,e.side),i=this.getLineIndex(e.end,e.endSide??e.side);return t!=null&&i!=null?{start:n?t[1]:t[0],end:n?i[1]:i[0]}:void 0}highlightLineNumberOnly(){return this.activeLineHighlightSide!=null?this.activeLineNumberOnly:this.activeLineNumberOnly||this.editorAttached}renderSelection=()=>{if(this.queuedSelectionRender!=null&&(cancelAnimationFrame(this.queuedSelectionRender),this.queuedSelectionRender=void 0),this.pre==null||this.renderedSelectionRange===this.selectedRange)return;const e=this.pre.querySelectorAll("[data-selected-line]");for(const o of e)o.removeAttribute("data-selected-line");if(this.renderedSelectionRange=this.selectedRange,this.selectedRange==null)return;const{children:n}=this.pre;if(n.length===0)return;if(n.length>2)throw console.error(n),new Error("InteractionManager.renderSelection: Somehow there are more than 2 code elements...");const t=this.pre.getAttribute("data-diff-type")==="split",i=this.getIndexesFromSelection(this.selectedRange,t);if(i==null)throw console.error({rowRange:i,selectedRange:this.selectedRange}),new Error("InteractionManager.renderSelection: No valid rowRange");const a=i.start===i.end,r=Math.min(i.start,i.end),s=Math.max(i.start,i.end),l=this.highlightLineNumberOnly();for(const o of n){const d=this.activeLineHighlightSide;if(d!=null&&(d==="additions"&&o.hasAttribute("data-deletions")||d==="deletions"&&o.hasAttribute("data-additions")))continue;const[c,m]=o.children,h=m.children.length;if(h!==c.children.length)throw new Error("InteractionManager.renderSelection: gutter and content children dont match, something is wrong");for(let f=0;f<h;f++){const u=m.children[f],v=c.children[f];if(!(u instanceof HTMLElement)||!(v instanceof HTMLElement))continue;const b=this.parseLineIndex(u,t);if((b??0)>s)break;if(b==null||b<r)continue;let g=a?"single":b===r?"first":b===s?"last":"";v.setAttribute("data-selected-line",g),!l&&(u.setAttribute("data-selected-line",g),v.nextSibling instanceof HTMLElement&&u.nextSibling instanceof HTMLElement&&(u.nextSibling.hasAttribute("data-line-annotation")||u.nextSibling.hasAttribute("data-merge-conflict-actions"))&&(a?(g="last",u.setAttribute("data-selected-line","first")):b===r?g="":b===s&&u.setAttribute("data-selected-line",""),u.nextSibling.setAttribute("data-selected-line",g),v.nextSibling.setAttribute("data-selected-line",g)))}}};notifySelectionCommitted(){this.options.onLineSelected?.(this.getCurrentSelectionRange()??null)}notifySelectionChangeDelta(){this.options.onLineSelectionChange?.(this.getCurrentSelectionRange()??null)}notifySelectionStart(e){this.options.onLineSelectionStart?.(e)}notifySelectionEnd(e){this.options.onLineSelectionEnd?.(e)}toEventBaseProps(e){return this.mode==="file"?{type:"line",lineElement:e.lineElement,lineNumber:e.lineNumber,numberColumn:e.numberColumn,numberElement:e.numberElement}:{type:"diff-line",annotationSide:e.side,lineType:e.lineType,lineElement:e.lineElement,numberElement:e.numberElement,lineNumber:e.lineNumber,numberColumn:e.numberColumn}}toTokenEventBaseProps({lineCharEnd:e,lineCharStart:n,lineNumber:t,side:i,tokenElement:a,tokenText:r}){return this.mode==="file"?{type:"token",lineCharEnd:e,lineCharStart:n,lineNumber:t,tokenElement:a,tokenText:r}:{type:"token",lineCharEnd:e,lineCharStart:n,lineNumber:t,side:i,tokenElement:a,tokenText:r}}buildSelectedLineRange(e,n){return this.buildSelectionRange(e.lineNumber,n.lineNumber,e.side,n.side)}buildSelectionRange(e,n,t,i){return{start:e,end:n,...t!=null?{side:t}:{},...t!==i&&i!=null?{endSide:i}:{}}}resolvePointerTarget(e){let n=!1,t,i,a,r,s,l,o,d,c,m;for(const f of e){if(!(f instanceof HTMLElement))continue;if(m==null&&f.hasAttribute("data-merge-conflict-action")){const g=f.getAttribute("data-merge-conflict-action")??void 0,y=f.getAttribute("data-merge-conflict-conflict-index")??void 0,x=y!=null?Number.parseInt(y,10):NaN;le(g)&&Number.isFinite(x)&&(m={kind:"merge-conflict-action",resolution:g,conflictIndex:x})}if(l==null&&f.hasAttribute("data-char")){l=f;const g=f.getAttribute("data-char");if(g!=null){const y=Number.parseInt(g,10);if(!Number.isNaN(y)){const x=f.textContent??"",N=y+x.length;(x.trim()!==""||this.options.enableTokenInteractionsOnWhitespace===!0)&&(o={tokenElement:l,lineCharStart:y,lineCharEnd:N,tokenText:x});continue}}}const u=s==null?f.getAttribute("data-column-number")??void 0:void 0;if(u!=null){s=f,c=Number.parseInt(u,10),n=!0,t=O(f),r=f.getAttribute("data-line-index")??void 0;continue}const v=a==null?f.getAttribute("data-line")??void 0:void 0;if(v!=null){a=f,c=Number.parseInt(v,10),t=O(f),r=f.getAttribute("data-line-index")??void 0;continue}if(d==null&&(f.hasAttribute("data-expand-button")||f.hasAttribute("data-unmodified-lines"))){d={hunkIndex:void 0,direction:f.hasAttribute("data-expand-up")?"up":f.hasAttribute("data-expand-down")?"down":"both",all:f.hasAttribute("data-expand-all-button")};continue}const b=d!=null?f.getAttribute("data-expand-index")??void 0:void 0;if(d!=null&&b!=null){const g=Number.parseInt(b,10);Number.isNaN(g)||(d.hunkIndex=g);continue}if(i==null&&f.hasAttribute("data-code")){i=f;break}}if(m!=null)return m;if(d?.hunkIndex!=null)return{type:"line-info",hunkIndex:d.hunkIndex,direction:d.direction,all:d.all};if(a??=r!=null?D(i,`[data-line][data-line-index="${r}"]`):void 0,s??=r!=null?D(i,`[data-column-number][data-line-index="${r}"]`):void 0,i==null||a==null||s==null||t==null||c==null||Number.isNaN(c))return;const h=this.parseLineIndex(a,this.isSplitDiff());return o!=null?this.mode==="file"?{kind:"token",lineType:t,lineElement:a,lineNumber:c,numberColumn:n,numberElement:s,side:void 0,splitLineIndex:h,...o}:{kind:"token",lineType:t,lineElement:a,lineNumber:c,numberColumn:n,numberElement:s,side:F(t,i),splitLineIndex:h,...o}:this.mode==="file"?{kind:"line",lineType:t,lineElement:a,lineNumber:c,numberColumn:n,numberElement:s,side:void 0,splitLineIndex:h}:{kind:"line",lineType:t,lineElement:a,lineNumber:c,numberColumn:n,numberElement:s,side:F(t,i),splitLineIndex:h}}isSplitDiff(){return this.pre?.getAttribute("data-diff-type")==="split"}parseLineIndex(e,n){const t=(e.getAttribute("data-line-index")??"").split(",").map(i=>Number.parseInt(i,10)).filter(i=>!Number.isNaN(i));if(n&&t.length===2)return t[1];if(!n)return t[0]}};function Me({enableTokenInteractionsOnWhitespace:e,enableGutterUtility:n,lineHoverHighlight:t,onGutterUtilityClick:i,onLineClick:a,onLineEnter:r,onLineLeave:s,onLineNumberClick:l,onTokenClick:o,onTokenEnter:d,onTokenLeave:c,renderGutterUtility:m,__debugPointerEvents:h,enableLineSelection:f,controlledSelection:u,onLineSelected:v,onLineSelectionStart:b,onLineSelectionChange:g,onLineSelectionEnd:y},x,N,W){return{enableTokenInteractionsOnWhitespace:e,enableGutterUtility:oe({enableGutterUtility:n,renderGutterUtility:m,onGutterUtilityClick:i}),usesCustomGutterUtility:m!=null,lineHoverHighlight:t,onGutterUtilityClick:i,onHunkExpand:x,onMergeConflictActionClick:W,onLineClick:a,onLineEnter:r,onLineLeave:s,onLineNumberClick:l,onTokenClick:o,onTokenEnter:d,onTokenLeave:c,__debugPointerEvents:h,enableLineSelection:f,controlledSelection:u,onLineSelected:v,onLineSelectionStart:b,onLineSelectionChange:g,onLineSelectionEnd:y,getLineIndex:N}}function oe({enableGutterUtility:e,renderGutterUtility:n,onGutterUtilityClick:t}){if(t!=null&&n!=null)throw new Error("Cannot use both 'onGutterUtilityClick' and 'renderGutterUtility'. Use only one gutter utility API.");return e??!1}function w(e){return e!=null&&"kind"in e&&e.kind==="line"}function A(e){return e!=null&&"kind"in e&&e.kind==="token"}function T(e){return w(e)||A(e)}function se(e){return"type"in e&&e.type==="line-info"}function de(e){return"kind"in e&&e.kind==="merge-conflict-action"}function le(e){return e==="current"||e==="incoming"||e==="both"}function D(e,n){const t=e?.querySelector(n);return t instanceof HTMLElement?t:void 0}function L(e){const n=[];let t=e;for(;t!=null;)n.push(t),t=t.parentNode;return n}function fe(e){const n=e.closest("[data-line], [data-column-number]");if(n instanceof HTMLElement)return n;const t=e.closest('[data-line-annotation], [data-gutter-buffer="annotation"]');if(!(t instanceof HTMLElement))return;const i=t.previousElementSibling;return i instanceof HTMLElement&&(i.hasAttribute("data-line")||i.hasAttribute("data-column-number"))?i:void 0}function ce(e){const n=e.closest('[slot^="annotation-"]');if(n instanceof HTMLElement)return n.getAttribute("slot")??void 0;if(e instanceof HTMLElement){const t=e.getAttribute("name")??void 0;return t!=null&&t.startsWith("annotation-")?t:void 0}}function ue(e){if(e==null)return;const n=/^annotation-(?:(additions|deletions)-)?(\d+)$/.exec(e);if(n==null)return;const t=Number.parseInt(n[2],10);if(!(!Number.isFinite(t)||t<=0))return{lineNumber:t,side:n[1]}}function z(e){return e!=null&&typeof e.elementFromPoint=="function"}function F(e,n){switch(e){case"change-deletion":return"deletions";case"change-addition":return"additions";default:return n.hasAttribute("data-deletions")?"deletions":"additions"}}function O(e){const n=e.getAttribute("data-line-type");if(n!=null)switch(n){case"change-deletion":case"change-addition":case"context":case"context-expanded":return n;default:return}}function E(e){for(const n of e)if(n instanceof HTMLElement&&(n.hasAttribute("data-utility-button")||n.hasAttribute("data-gutter-utility-slot")||n.getAttribute("slot")==="gutter-utility-slot"||n.getAttribute("name")==="gutter-utility-slot"))return!0;return!1}function k(e="none",n,...t){switch(e){case"none":return;case"both":break;case"click":if(n!=="click")return;break;case"move":if(n!=="move")return;break}console.log(...t)}var Ue=class S{static resizeObserver;static managersByElement=new Map;static getResizeObserver(){const n=S.resizeObserver??new ResizeObserver(S.handleSharedResizeEntries);return S.resizeObserver=n,n}static handleSharedResizeEntries(n){const t=new Map;for(const i of n){const a=S.managersByElement.get(i.target);if(a==null)continue;const r=t.get(a);r==null?t.set(a,[i]):r.push(i)}for(const[i,a]of t)i.handleResizeEntries(a)}observedNodes=new Map;setup(n,t){const i=new Set;let a=0;const r=new Map(this.observedNodes);this.observedNodes.clear();for(const s of n.children){if(a===2)break;const l=(()=>{if(s instanceof HTMLElement&&s.tagName==="CODE")return s})();if(l==null)continue;a++;let o=r.get(l);if(o!=null&&o.type!=="code")throw new Error("ResizeManager.setup: somehow a code node is being used for an annotation, should be impossible");let d=l.firstElementChild;d instanceof HTMLElement||(d=null),o!=null?(this.observedNodes.set(l,o),r.delete(l),o.numberElement!==d?(o.numberElement!=null&&(this.unobserve(o.numberElement),r.delete(o.numberElement)),d!=null&&(this.observe(d),r.delete(d),this.observedNodes.set(d,o)),o.numberElement=d,o.numberWidth=0):o.numberElement!=null?(r.delete(o.numberElement),this.observedNodes.set(o.numberElement,o)):o.numberWidth=0):(o={type:"code",codeElement:l,numberElement:d,codeWidth:"auto",numberWidth:0},this.observedNodes.set(l,o),this.observe(l),d!=null&&(this.observedNodes.set(d,o),this.observe(d)))}if(a>1&&!t){const s=n.querySelectorAll('[data-line-annotation*=","]'),l=new Map;for(const o of s){if(!(o instanceof HTMLElement))continue;const d=o.getAttribute("data-line-annotation")??"";if(!/^-?\d+,-?\d+$/.test(d)){console.error("DiffFileRenderer.setupResizeObserver: Invalid element or annotation",{lineAnnotation:d,element:o});continue}let c=l.get(d);c==null&&(c=[],l.set(d,c)),c.push(o)}for(const[o,d]of l){if(d.length!==2){console.error("DiffFileRenderer.setupResizeObserver: Bad Pair",o,d);continue}const[c,m]=d,h=c.firstElementChild,f=m.firstElementChild;if(!(c instanceof HTMLElement)||!(m instanceof HTMLElement)||!(h instanceof HTMLElement)||!(f instanceof HTMLElement))continue;let u=r.get(h);if(u!=null){this.observedNodes.set(h,u),this.observedNodes.set(f,u),r.delete(h),r.delete(f);continue}const v=h.getBoundingClientRect().height,b=f.getBoundingClientRect().height;u={type:"annotations",column1:{container:c,child:h,childHeight:v},column2:{container:m,child:f,childHeight:b},currentHeight:"auto"},i.add({child1:h,child2:f,item:u,newHeight:Math.max(v,b)})}for(const o of i)this.applyNewHeight(o.item,o.newHeight),this.observedNodes.set(o.child1,o.item),this.observedNodes.set(o.child2,o.item),this.observe(o.child1),this.observe(o.child2);i.clear()}for(const[s,l]of r)this.unobserve(s),l.type==="code"?ge(l):pe(l);r.clear()}cleanUp(){for(const n of this.observedNodes.keys())this.unobserve(n);this.observedNodes.clear()}observe(n){const{managersByElement:t}=S,i=t.get(n);if(i!==this){if(i!=null&&i!==this)throw new Error("ResizeManager.observe: element is already owned by another ResizeManager");t.set(n,this),S.getResizeObserver().observe(n)}}unobserve(n){const{managersByElement:t,resizeObserver:i}=S,a=t.get(n);if(a!=null){if(a!==this)throw new Error("ResizeManager.unobserve: element is owned by another ResizeManager");t.delete(n),i?.unobserve(n),i!=null&&t.size===0&&(i.disconnect(),S.resizeObserver=void 0)}}handleResizeEntries(n){const t=new Map,i=new Set;for(const a of n){const{target:r,borderBoxSize:s,contentBoxSize:l}=a;if(!(r instanceof HTMLElement)){console.error("ResizeManager.handleResizeEntries: Invalid element for ResizeObserver",a);continue}const o=this.observedNodes.get(r);if(o==null){console.error("ResizeManager.handleResizeEntries: Not a valid observed node",a);continue}if(o.type==="annotations"){const d=(()=>{if(r===o.column1.child)return o.column1;if(r===o.column2.child)return o.column2})();if(d==null){console.error("ResizeManager.handleResizeEntries: Couldn't find a column for",{item:o,target:r});continue}d.childHeight=s[0].blockSize,i.add(o)}else if(o.type==="code"){const d=t.get(o)??{},c=l[0].inlineSize;r===o.codeElement?d.codeInlineSize=c:r===o.numberElement&&(d.numberInlineSize=c),t.set(o,d)}}this.applyAnnotationUpdates(i),i.clear(),this.applyColumnUpdates(t),t.clear()}applyAnnotationUpdates(n){for(const t of n)this.applyNewHeight(t,Math.max(t.column1.childHeight,t.column2.childHeight))}applyColumnUpdates=n=>{for(const[t,i]of n){const a=i.codeInlineSize!=null?he(i.codeInlineSize):t.codeWidth,r=i.numberInlineSize!=null?me(i.numberInlineSize):t.numberWidth,s=a!==t.codeWidth,l=r!==t.numberWidth;if(!(!s&&!l)&&(t.codeWidth=a,t.numberWidth=r,s&&t.codeElement.style.setProperty("--diffs-column-width",`${typeof a=="number"?`${a}px`:"auto"}`),l&&t.codeElement.style.setProperty("--diffs-column-number-width",`${r===0?"auto":`${r}px`}`),s||l&&a!=="auto")){const o=typeof a=="number"?Math.max(a-r,0):0;t.codeElement.style.setProperty("--diffs-column-content-width",`${o>0?`${o}px`:"auto"}`)}}};applyNewHeight(n,t){t!==n.currentHeight&&(n.currentHeight=Math.max(t,0),n.column1.container.style.setProperty("--diffs-annotation-min-height",`${n.currentHeight}px`),n.column2.container.style.setProperty("--diffs-annotation-min-height",`${n.currentHeight}px`))}};function he(e){const n=Math.max(Math.floor(e),0);return n===0?"auto":n}function me(e){return Math.max(Math.ceil(e),0)}function ge(e){e.codeElement.isConnected&&(e.codeElement.style.removeProperty("--diffs-column-content-width"),e.codeElement.style.removeProperty("--diffs-column-number-width"),e.codeElement.style.removeProperty("--diffs-column-width"))}function pe(e){e.column1.container.isConnected&&e.column1.container.style.removeProperty("--diffs-annotation-min-height"),e.column2.container.isConnected&&e.column2.container.style.removeProperty("--diffs-annotation-min-height")}function Re(e){for(const n of Array.isArray(e)?e:[e])if(!(n==="text"||n==="ansi")&&!ne.has(n))return!1;return!0}function He(e){for(const n of G(e))if(!te.has(n))return!1;return!0}function De(e,n){return e==null||n==null?e===n:e.startingLine===n.startingLine&&e.totalLines===n.totalLines&&e.bufferBefore===n.bufferBefore&&e.bufferAfter===n.bufferAfter}function ze(e){return p({tagName:"div",children:[p({tagName:"div",children:e.annotations?.map(n=>p({tagName:"slot",properties:{name:n}})),properties:{"data-annotation-content":""}})],properties:{"data-line-annotation":`${e.hunkIndex},${e.lineIndex}`}})}function be(e){switch(e){case"file":return"diffs-icon-file-code";case"change":return"diffs-icon-symbol-modified";case"new":return"diffs-icon-symbol-added";case"deleted":return"diffs-icon-symbol-deleted";case"rename-pure":case"rename-changed":return"diffs-icon-symbol-moved"}}function Fe({fileOrDiff:e,mode:n,stickyHeader:t}){const i="type"in e?e:void 0,a={"data-diffs-header":n,"data-change-type":i?.type,"data-sticky":t?"":void 0};return p({tagName:"div",children:[n==="custom"?p({tagName:"slot",properties:{name:V}}):ve({name:e.name,prevName:"prevName"in e?e.prevName:void 0,iconType:i?.type??"file"}),...n==="custom"?[]:[xe(i)]],properties:a})}function ve({name:e,prevName:n,iconType:t}){const i=[p({tagName:"slot",properties:{name:Y}}),I({name:be(t),properties:{"data-change-icon":t}})];return n!=null&&(i.push(p({tagName:"div",children:[p({tagName:"bdi",children:[C(n)]})],properties:{"data-prev-name":""}})),i.push(I({name:"diffs-icon-arrow-right-short",properties:{"data-rename-icon":""}}))),i.push(p({tagName:"div",children:[p({tagName:"bdi",children:[C(e)]})],properties:{"data-title":""}})),i.push(p({tagName:"slot",properties:{name:j}})),p({tagName:"div",children:i,properties:{"data-header-content":""}})}function xe(e){const n=[];if(e!=null){let t=0,i=0;for(const a of e.hunks)t+=a.additionLines,i+=a.deletionLines;(i>0||t===0)&&n.push(p({tagName:"span",children:[C(`-${i}`)],properties:{"data-deletions-count":""}})),(t>0||i===0)&&n.push(p({tagName:"span",children:[C(`+${t}`)],properties:{"data-additions-count":""}}))}return n.push(p({tagName:"slot",properties:{name:K}})),p({tagName:"div",children:n,properties:{"data-metadata":""}})}function Oe(e){return p({tagName:"pre",properties:ye(e)})}function ye({diffIndicators:e,disableBackground:n,disableLineNumbers:t,overflow:i,split:a,totalLines:r,type:s,customProperties:l}){return{...l,"data-diff":s==="diff"?"":void 0,"data-file":s==="file"?"":void 0,"data-diff-type":s==="diff"?a?"split":"single":void 0,"data-overflow":i,"data-disable-line-numbers":t?"":void 0,"data-background":n?void 0:"","data-indicators":e==="bars"||e==="classic"?e:void 0,tabIndex:0,style:`--diffs-min-number-column-width-default:${`${r}`.length}ch;`}}function Be(e,{theme:n,preferredHighlighter:t="shiki-js"}){return{langs:[e??"text"],themes:G(n),preferredHighlighter:t}}function $e(e){return`annotation-${"side"in e?`${e.side}-`:""}${e.lineNumber}`}const Ge="-1,-1";function _e(e){return e?.some(n=>n.lineNumber===0)??!1}function qe(e){const n=e[0];return n!=null&&n.length>0?n:void 0}function We(e){return e.startingLine===0&&e.totalLines>0}function Ve(e,n){return p({tagName:"div",children:e,properties:{"data-content":"",style:`grid-row: span ${n}`}})}function Ye(e){return e.useTokenTransformer===!0||e.onTokenClick!=null||e.onTokenEnter!=null||e.onTokenLeave!=null}const je=`<svg data-icon-sprite aria-hidden="true" width="0" height="0">
  <symbol id="diffs-icon-arrow-right-short" viewBox="0 0 16 16">
    <path d="M8.47 4.22a.75.75 0 0 0 0 1.06l1.97 1.97H3.75a.75.75 0 0 0 0 1.5h6.69l-1.97 1.97a.75.75 0 1 0 1.06 1.06l3.25-3.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0"/>
  </symbol>
  <symbol id="diffs-icon-brand-github" viewBox="0 0 16 16">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.01 8.01 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27s-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8"/>
  </symbol>
  <symbol id="diffs-icon-chevron" viewBox="0 0 16 16">
    <path d="M1.47 4.47a.75.75 0 0 1 1.06 0L8 9.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-chevrons-narrow" viewBox="0 0 10 16">
    <path d="M4.47 2.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1-1.06 1.06L5 3.81 2.28 6.53a.75.75 0 0 1-1.06-1.06zM1.22 9.47a.75.75 0 0 1 1.06 0L5 12.19l2.72-2.72a.75.75 0 0 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-diff-split" viewBox="0 0 16 16">
    <path d="M14 0H8.5v16H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1.5 6.5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.5V0zm.5 7.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1" opacity=".3"/>
  </symbol>
  <symbol id="diffs-icon-diff-unified" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5h16zm-8-4a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1A.5.5 0 0 0 8 10" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 0a2 2 0 0 1 2 2v5.5H0V2a2 2 0 0 1 2-2zM6.5 3.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" clip-rule="evenodd" opacity=".4"/>
  </symbol>
  <symbol id="diffs-icon-expand" viewBox="0 0 16 16">
    <path d="M3.47 5.47a.75.75 0 0 1 1.06 0L8 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-expand-all" viewBox="0 0 16 16">
    <path d="M11.47 9.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L8 12.94zM7.526 1.418a.75.75 0 0 1 1.004.052l4 4a.75.75 0 1 1-1.06 1.06L8 3.06 4.53 6.53a.75.75 0 1 1-1.06-1.06l4-4z"/>
  </symbol>
  <symbol id="diffs-icon-file-code" viewBox="0 0 16 16">
    <path d="M10.75 0c.199 0 .39.08.53.22l3.5 3.5c.14.14.22.331.22.53v9A2.75 2.75 0 0 1 12.25 16h-8.5A2.75 2.75 0 0 1 1 13.25V2.75A2.75 2.75 0 0 1 3.75 0zm-7 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V5h-1.25A2.25 2.25 0 0 1 10 2.75V1.5z"/><path d="M7.248 6.19a.75.75 0 0 1 .063 1.058L5.753 9l1.558 1.752a.75.75 0 0 1-1.122.996l-2-2.25a.75.75 0 0 1 0-.996l2-2.25a.75.75 0 0 1 1.06-.063M8.69 7.248a.75.75 0 1 1 1.12-.996l2 2.25a.75.75 0 0 1 0 .996l-2 2.25a.75.75 0 1 1-1.12-.996L10.245 9z"/>
  </symbol>
  <symbol id="diffs-icon-plus" viewBox="0 0 16 16">
    <path d="M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3"/>
  </symbol>
  <symbol id="diffs-icon-symbol-added" viewBox="0 0 16 16">
    <path d="M8 4a.75.75 0 0 1 .75.75v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5A.75.75 0 0 1 8 4"/><path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/>
  </symbol>
  <symbol id="diffs-icon-symbol-deleted" viewBox="0 0 16 16">
    <path d="M4 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 8"/><path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/>
  </symbol>
  <symbol id="diffs-icon-symbol-diffstat" viewBox="0 0 16 16">
    <path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/><path d="M8.75 4.296a.75.75 0 0 0-1.5 0V6.25h-2a.75.75 0 0 0 0 1.5h2v1.5h1.5v-1.5h2a.75.75 0 0 0 0-1.5h-2zM5.25 10a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5z"/>
  </symbol>
  <symbol id="diffs-icon-symbol-ignored" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706s.826.607 1.706.802c.898.2 2.091.288 3.704.288s2.806-.088 3.704-.288c.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5s-2.806.088-3.704.288c-.88.196-1.381.478-1.706.802s-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8M0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m11.53-2.47a.75.75 0 0 0-1.06-1.06l-6 6a.75.75 0 1 0 1.06 1.06z"/>
  </symbol>
  <symbol id="diffs-icon-symbol-modified" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706s.826.607 1.706.802c.898.2 2.091.288 3.704.288s2.806-.088 3.704-.288c.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5s-2.806.088-3.704.288c-.88.196-1.381.478-1.706.802s-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8M0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
  </symbol>
  <symbol id="diffs-icon-symbol-moved" viewBox="0 0 16 16">
    <path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/><path d="M8.495 4.695a.75.75 0 0 0-.05 1.06L10.486 8l-2.041 2.246a.75.75 0 0 0 1.11 1.008l2.5-2.75a.75.75 0 0 0 0-1.008l-2.5-2.75a.75.75 0 0 0-1.06-.051m-4 0a.75.75 0 0 0-.05 1.06l2.044 2.248-1.796 1.995a.75.75 0 0 0 1.114 1.004l2.25-2.5a.75.75 0 0 0-.002-1.007l-2.5-2.75a.75.75 0 0 0-1.06-.05"/>
  </symbol>
  <symbol id="diffs-icon-symbol-ref" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706.286.286.71.54 1.41.73V1.86c-.7.19-1.124.444-1.41.73-.324.325-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8m4 6.397c.697.07 1.522.103 2.5.103 1.613 0 2.806-.088 3.704-.288.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5c-.978 0-1.803.033-2.5.103zM0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m7-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/>
  </symbol>
</svg>`;function Ke(e,n){return e==null||n==null?e===n:ke(e.customProperties,n.customProperties)&&e.type===n.type&&e.diffIndicators===n.diffIndicators&&e.disableBackground===n.disableBackground&&e.disableLineNumbers===n.disableLineNumbers&&e.overflow===n.overflow&&e.split===n.split&&e.totalLines===n.totalLines}const B={};function ke(e=B,n=B){if(e===n)return!0;const t=Object.keys(e),i=Object.keys(n);if(t.length!==i.length)return!1;for(const a of t)if(e[a]!==n[a])return!1;return!0}function Xe(e){const n=document.createElement("div");return n.dataset.annotationSlot="",n.slot=e,n.style.whiteSpace="normal",n}function Je(){const e=document.createElement("div");return e.slot="gutter-utility-slot",e.style.position="absolute",e.style.top="0",e.style.bottom="0",e.style.textAlign="center",e.style.whiteSpace="normal",e.style.touchAction="none",e}function Qe(){const e=document.createElement("style");return e.setAttribute(X,""),e}var Se=`@layer base {
  :host {
    --diffs-font-fallback: "SF Mono", Monaco, Consolas, "Ubuntu Mono", "Liberation Mono",
      "Courier New", monospace;
    --diffs-header-font-fallback: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
      "Noto Sans", "Liberation Sans", Arial, sans-serif;
    --diffs-mixer: light-dark(#000, #fff);
    --diffs-gap-fallback: 8px;
    --diffs-scrollbar-gutter-fallback: 6px;
    --diffs-scrollbar-gutter: var(--diffs-scrollbar-gutter-override, var(--diffs-scrollbar-gutter-measured, var(--diffs-scrollbar-gutter-fallback)));
    --diffs-added-light: #0dbe4e;
    --diffs-added-dark: #5ecc71;
    --diffs-modified-light: #009fff;
    --diffs-modified-dark: #69b1ff;
    --diffs-deleted-light: #ff2e3f;
    --diffs-deleted-dark: #ff6762;
    --diffs-warning-light: #d5a910;
    --diffs-warning-dark: #ffd452;
    color-scheme: light dark;
    font-family: var(--diffs-header-font-family, var(--diffs-header-font-fallback));
    font-size: var(--diffs-font-size, 13px);
    line-height: var(--diffs-line-height, 20px);
    font-feature-settings: var(--diffs-font-features);
    --diffs-bg: light-dark(var(--diffs-light-bg, #fff), var(--diffs-dark-bg, #000));
    --diffs-bg-buffer: var(--diffs-bg-buffer-override, light-dark(color-mix(in lab, var(--diffs-bg) 92%, var(--diffs-mixer)), color-mix(in lab, var(--diffs-bg) 92%, var(--diffs-mixer))));
    --diffs-bg-context: var(--diffs-bg-context-override, light-dark(color-mix(in lab, var(--diffs-bg) 98.5%, var(--diffs-mixer)), color-mix(in lab, var(--diffs-bg) 92.5%, var(--diffs-mixer))));
    --diffs-bg-context-gutter: var(--diffs-bg-context-gutter-override, light-dark(color-mix(in lab, var(--diffs-bg-context) 90%, var(--diffs-bg)), color-mix(in lab, var(--diffs-bg-context) 45%, var(--diffs-bg))));
    --diffs-bg-separator: var(--diffs-bg-separator-override, light-dark(color-mix(in lab, var(--diffs-bg) 96%, var(--diffs-mixer)), color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-mixer))));
    --diffs-fg: light-dark(var(--diffs-light, #000), var(--diffs-dark, #fff));
    --diffs-fg-number: var(--diffs-fg-number-override, light-dark(color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg)), color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg))));
    --diffs-fg-conflict-marker: var(--diffs-fg-conflict-marker-override, var(--diffs-fg-number));
    --diffs-deletion-base: var(--diffs-deletion-color-override, light-dark(var(--diffs-light-deletion-color, var(--diffs-deletion-color, var(--diffs-deleted-light))), var(--diffs-dark-deletion-color, var(--diffs-deletion-color, var(--diffs-deleted-dark)))));
    --diffs-addition-base: var(--diffs-addition-color-override, light-dark(var(--diffs-light-addition-color, var(--diffs-addition-color, var(--diffs-added-light))), var(--diffs-dark-addition-color, var(--diffs-addition-color, var(--diffs-added-dark)))));
    --diffs-modified-base: var(--diffs-modified-color-override, light-dark(var(--diffs-light-modified-color, var(--diffs-modified-color, var(--diffs-modified-light))), var(--diffs-dark-modified-color, var(--diffs-modified-color, var(--diffs-modified-dark)))));
    --diffs-bg-deletion: var(--diffs-bg-deletion-override, light-dark(color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-deletion-base)), color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-deletion-base))));
    --diffs-bg-deletion-emphasis: var(--diffs-bg-deletion-emphasis-override, light-dark(rgb(from var(--diffs-deletion-base) r g b / .15), rgb(from var(--diffs-deletion-base) r g b / .2)));
    --diffs-bg-addition: var(--diffs-bg-addition-override, light-dark(color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-addition-base)), color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-addition-base))));
    --diffs-bg-addition-emphasis: var(--diffs-bg-addition-emphasis-override, light-dark(rgb(from var(--diffs-addition-base) r g b / .15), rgb(from var(--diffs-addition-base) r g b / .2)));
    --diffs-selection-base: var(--diffs-modified-base);
    --diffs-selection-number-fg: light-dark(color-mix(in lab, var(--diffs-selection-base) 65%, var(--diffs-mixer)), color-mix(in lab, var(--diffs-selection-base) 75%, var(--diffs-mixer)));
    background-color: var(--diffs-bg);
    color: var(--diffs-fg);
    display: block;
  }

  pre, code, [data-error-wrapper] {
    isolation: isolate;
    font-family: var(--diffs-font-family, var(--diffs-font-fallback));
    outline: none;
    margin: 0;
    padding: 0;
    display: block;
  }

  pre, code {
    background-color: var(--diffs-bg);
  }

  code {
    contain: content;
  }

  input, button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  *, :before, :after {
    box-sizing: border-box;
  }

  [data-icon-sprite] {
    display: none;
  }

  [data-diffs-header], [data-separator] {
    font-family: var(--diffs-header-font-family, var(--diffs-header-font-fallback));
  }

  [data-diffs-header][data-sticky] {
    z-index: 1;
    background-color: var(--diffs-bg);
    position: sticky;
    top: 0;
  }

  [data-file-info] {
    color: var(--fg);
    background-color: color-mix(in lab, var(--bg) 98%, var(--fg));
    border-block: 1px solid color-mix(in lab, var(--bg) 95%, var(--fg));
    padding: 10px;
    font-weight: 700;
  }

  [data-diff], [data-file] {
    --diffs-grid-number-column-width: minmax(min-content, max-content);
    --diffs-code-grid: var(--diffs-grid-number-column-width) 1fr;

    &[data-dehydrated] {
      --diffs-code-grid: var(--diffs-grid-number-column-width) minmax(0, 1fr);
    }

    &:hover [data-code]::-webkit-scrollbar-thumb {
      background-color: var(--diffs-bg-context);
    }
  }

  @supports (-webkit-touch-callout: none) {
    :host {
      --diffs-scrollbar-gutter-fallback: 0px;
    }
  }

  [data-line] span {
    color: light-dark(var(--diffs-token-light, var(--diffs-light)), var(--diffs-token-dark, var(--diffs-dark)));
    background-color: light-dark(var(--diffs-token-light-bg, inherit), var(--diffs-token-dark-bg, inherit));
    font-weight: light-dark(var(--diffs-token-light-font-weight, inherit), var(--diffs-token-dark-font-weight, inherit));
    font-style: light-dark(var(--diffs-token-light-font-style, inherit), var(--diffs-token-dark-font-style, inherit));
    text-decoration: light-dark(var(--diffs-token-light-text-decoration, inherit), var(--diffs-token-dark-text-decoration, inherit));
  }

  [data-line], [data-gutter-buffer], [data-column-number], [data-line-annotation], [data-no-newline], [data-merge-conflict], [data-merge-conflict-actions], [data-editor-overlay] {
    --diffs-computed-decoration-bg: var(--diffs-bg);
    --diffs-computed-diff-line-bg: var(--diffs-bg);
    --diffs-computed-selected-line-bg: var(--diffs-bg);
    color: var(--diffs-fg);
    background-color: var(--diffs-line-bg, var(--diffs-bg));

    @media (pointer: fine) {
      &:where([data-hovered]) {
        --diffs-computed-hovered-line-bg: light-dark(color-mix(in lab,
            var(--diffs-computed-selected-line-bg) 97%,
            var(--diffs-bg-hover-override, var(--diffs-mixer))), color-mix(in lab,
            var(--diffs-computed-selected-line-bg) 91%,
            var(--diffs-bg-hover-override, var(--diffs-mixer))));
        --diffs-line-bg: var(--diffs-computed-hovered-line-bg, inherit);
      }
    }
  }

  [data-line], [data-no-newline] {
    &[data-decoration-bg] {
      --mix-deco-light: 92%;
      --mix-deco-dark: 85%;

      &[data-decoration-bg-depth="2"] {
        --mix-deco-light: 88%;
        --mix-deco-dark: 80%;
      }

      &[data-decoration-bg-depth="3"] {
        --mix-deco-light: 85%;
        --mix-deco-dark: 78%;
      }

      @media (pointer: fine) {
        &[data-hovered]:not([data-selected-line]) {
          --mix-deco-light: 85%;
          --mix-deco-dark: 85%;
        }

        &[data-hovered]:not([data-selected-line])[data-decoration-bg-depth="2"] {
          --mix-deco-light: 83%;
          --mix-deco-dark: 83%;
        }

        &[data-hovered]:not([data-selected-line])[data-decoration-bg-depth="3"] {
          --mix-deco-light: 81%;
          --mix-deco-dark: 81%;
        }
      }

      --diffs-computed-decoration-bg: light-dark(color-mix(in lab,
          var(--diffs-bg) var(--mix-deco-light),
          var(--diffs-decoration-bg)), color-mix(in lab,
          var(--diffs-bg) var(--mix-deco-dark),
          var(--diffs-decoration-bg)));
      --diffs-computed-diff-line-bg: var(--diffs-computed-decoration-bg);
      --diffs-computed-selected-line-bg: var(--diffs-computed-decoration-bg);
      --diffs-line-bg: var(--diffs-computed-decoration-bg);
    }
  }

  [data-line-annotation], [data-gutter-buffer="annotation"] {
    --diffs-annotation-bg: var(--diffs-bg-context);
    --diffs-computed-decoration-bg: var(--diffs-annotation-bg);
    --diffs-computed-diff-line-bg: var(--diffs-annotation-bg);
    --diffs-computed-selected-line-bg: var(--diffs-annotation-bg);
    --diffs-line-bg: var(--diffs-annotation-bg);
  }

  [data-merge-conflict-actions], [data-gutter-buffer="merge-conflict-action"], [data-gutter-buffer="merge-conflict-marker-base"], [data-gutter-buffer="merge-conflict-marker-separator"], [data-merge-conflict="marker-base"], [data-merge-conflict="marker-separator"] {
    --diffs-computed-decoration-bg: var(--diffs-bg-context);
    --diffs-computed-diff-line-bg: var(--diffs-bg-context);
    --diffs-computed-selected-line-bg: var(--diffs-bg-context);
    --diffs-line-bg: var(--diffs-bg-context);
  }

  [data-gutter-buffer="merge-conflict-marker-start"], [data-merge-conflict="marker-start"] {
    --diffs-computed-decoration-bg: light-dark(color-mix(in lab,
        var(--diffs-bg) 78%,
        var(--conflict-bg-current-header-override, var(--diffs-addition-base))), color-mix(in lab,
        var(--diffs-bg) 68%,
        var(--conflict-bg-current-header-override, var(--diffs-addition-base))));
    --diffs-computed-diff-line-bg: var(--diffs-computed-decoration-bg);
    --diffs-computed-selected-line-bg: var(--diffs-computed-decoration-bg);
    --diffs-line-bg: var(--diffs-computed-decoration-bg);
  }

  [data-gutter-buffer="merge-conflict-marker-end"], [data-merge-conflict="marker-end"] {
    --diffs-computed-decoration-bg: light-dark(color-mix(in lab,
        var(--diffs-bg) 78%,
        var(--conflict-bg-incoming-header-override, var(--diffs-modified-base))), color-mix(in lab,
        var(--diffs-bg) 68%,
        var(--conflict-bg-incoming-header-override, var(--diffs-modified-base))));
    --diffs-computed-diff-line-bg: var(--diffs-computed-decoration-bg);
    --diffs-computed-selected-line-bg: var(--diffs-computed-decoration-bg);
    --diffs-line-bg: var(--diffs-computed-decoration-bg);
  }

  [data-has-merge-conflict] [data-line-annotation], [data-has-merge-conflict] [data-gutter-buffer="annotation"] {
    --diffs-computed-decoration-bg: var(--diffs-bg);
    --diffs-computed-diff-line-bg: var(--diffs-bg);
    --diffs-computed-selected-line-bg: var(--diffs-bg);
    --diffs-line-bg: var(--diffs-bg);
  }

  :where([data-background]) {
    & [data-gutter-buffer], & [data-column-number] {
      --mix-light: 91%;
      --mix-dark: 85%;
    }

    & [data-line], & [data-no-newline] {
      --mix-light: 88%;
      --mix-dark: 80%;
    }

    & [data-gutter-buffer], & [data-column-number], & [data-line], & [data-no-newline] {
      --diffs-diff-line-mix-target: var(--diffs-bg);

      &[data-line-type="change-deletion"] {
        --diffs-diff-line-mix-target: var(--diffs-bg-deletion-override, var(--diffs-deletion-base));

        @media (pointer: fine) {
          &[data-hovered] {
            --mix-light: 80%;
            --mix-dark: 75%;
          }
        }

        &:where([data-gutter-buffer], [data-column-number]) {
          color: var(--diffs-fg-number-deletion-override, var(--diffs-deletion-base));
          --diffs-diff-line-mix-target: var(--diffs-bg-deletion-number-override, var(--diffs-deletion-base));
        }

        --diffs-computed-diff-line-bg: light-dark(color-mix(in lab,
            var(--diffs-computed-decoration-bg) var(--mix-light),
            var(--diffs-diff-line-mix-target)), color-mix(in lab,
            var(--diffs-computed-decoration-bg) var(--mix-dark),
            var(--diffs-diff-line-mix-target)));
        --diffs-computed-selected-line-bg: var(--diffs-computed-diff-line-bg);
        --diffs-line-bg: var(--diffs-computed-diff-line-bg, inherit);
      }

      &[data-line-type="change-addition"] {
        --diffs-diff-line-mix-target: var(--diffs-bg-addition-override, var(--diffs-addition-base));

        @media (pointer: fine) {
          &[data-hovered] {
            --mix-light: 80%;
            --mix-dark: 70%;
          }
        }

        &:where([data-gutter-buffer], [data-column-number]) {
          color: var(--diffs-fg-number-addition-override, var(--diffs-addition-base));
          --diffs-diff-line-mix-target: var(--diffs-bg-addition-number-override, var(--diffs-addition-base));
        }

        --diffs-computed-diff-line-bg: light-dark(color-mix(in lab,
            var(--diffs-computed-decoration-bg) var(--mix-light),
            var(--diffs-diff-line-mix-target)), color-mix(in lab,
            var(--diffs-computed-decoration-bg) var(--mix-dark),
            var(--diffs-diff-line-mix-target)));
        --diffs-computed-selected-line-bg: var(--diffs-computed-diff-line-bg);
        --diffs-line-bg: var(--diffs-computed-diff-line-bg, inherit);
      }

      &[data-merge-conflict="current"] {
        --diffs-diff-line-mix-target: var(--conflict-bg-current-override, var(--diffs-addition-base));

        &:where([data-gutter-buffer], [data-column-number]) {
          color: var(--diffs-fg-number-addition-override, var(--diffs-addition-base));
          --diffs-diff-line-mix-target: var(--conflict-bg-current-number-override, var(--diffs-addition-base));
        }

        @media (pointer: fine) {
          &[data-hovered] {
            --mix-light: 80%;
            --mix-dark: 70%;
          }
        }

        --diffs-computed-diff-line-bg: light-dark(color-mix(in lab,
            var(--diffs-computed-decoration-bg) var(--mix-light),
            var(--diffs-diff-line-mix-target)), color-mix(in lab,
            var(--diffs-computed-decoration-bg) var(--mix-dark),
            var(--diffs-diff-line-mix-target)));
        --diffs-computed-selected-line-bg: var(--diffs-computed-diff-line-bg);
        --diffs-line-bg: var(--diffs-computed-diff-line-bg, inherit);
      }

      &[data-merge-conflict="incoming"] {
        --diffs-diff-line-mix-target: var(--conflict-bg-incoming-override, var(--diffs-modified-base));

        &:where([data-gutter-buffer], [data-column-number]) {
          color: var(--diffs-modified-base);
          --diffs-diff-line-mix-target: var(--conflict-bg-incoming-number-override, var(--diffs-modified-base));
        }

        @media (pointer: fine) {
          &[data-hovered] {
            --mix-light: 80%;
            --mix-dark: 70%;
          }
        }

        --diffs-computed-diff-line-bg: light-dark(color-mix(in lab,
            var(--diffs-computed-decoration-bg) var(--mix-light),
            var(--diffs-diff-line-mix-target)), color-mix(in lab,
            var(--diffs-computed-decoration-bg) var(--mix-dark),
            var(--diffs-diff-line-mix-target)));
        --diffs-computed-selected-line-bg: var(--diffs-computed-diff-line-bg);
        --diffs-line-bg: var(--diffs-computed-diff-line-bg, inherit);
      }
    }
  }

  [data-gutter-buffer], [data-column-number], [data-line], [data-line-annotation], [data-merge-conflict], [data-merge-conflict-actions], [data-no-newline], [data-editor-overlay] {
    --diffs-selection-mix-target: var(--diffs-bg-selection-override, var(--diffs-selection-base));

    &:where([data-editor-overlay]), &:where([data-line], [data-line-annotation], [data-merge-conflict], [data-merge-conflict-actions], [data-no-newline])[data-selected-line] {
      --mix-selection-light: 82%;
      --mix-selection-dark: 75%;

      @media (pointer: fine) {
        &[data-hovered]:not([data-merge-conflict], [data-line-type="change-addition"], [data-line-type="change-deletion"]) {
          --mix-selection-light: 75%;
          --mix-selection-dark: 70%;
        }
      }
    }

    &:where([data-gutter-buffer], [data-column-number])[data-selected-line] {
      --mix-selection-light: 75%;
      --mix-selection-dark: 60%;
      --diffs-selection-mix-target: var(--diffs-bg-selection-number-override, var(--diffs-selection-base));

      @media (pointer: fine) {
        &[data-hovered]:not([data-merge-conflict], [data-line-type="change-addition"], [data-line-type="change-deletion"]) {
          --mix-selection-light: 70%;
          --mix-selection-dark: 55%;
        }
      }
    }

    &:where([data-editor-overlay]), &[data-selected-line] {
      --diffs-computed-selected-line-bg: light-dark(color-mix(in lab,
          var(--diffs-computed-diff-line-bg) var(--mix-selection-light),
          var(--diffs-selection-mix-target)), color-mix(in lab,
          var(--diffs-computed-diff-line-bg) var(--mix-selection-dark),
          var(--diffs-selection-mix-target)));
      --diffs-line-bg: var(--diffs-computed-selected-line-bg, inherit);
    }
  }

  [data-gutter-buffer], [data-column-number] {
    &[data-selected-line] {
      color: var(--diffs-selection-number-fg);
    }
  }

  [data-no-newline] {
    user-select: none;

    & span {
      opacity: .6;
    }
  }

  [data-diff-type="split"][data-overflow="scroll"] {
    grid-template-columns: 1fr 1fr;
    display: grid;

    & [data-additions] {
      border-left: 1px solid var(--diffs-bg);
    }

    & [data-deletions] {
      border-right: 1px solid var(--diffs-bg);
    }
  }

  [data-code] {
    grid-auto-flow: dense;
    grid-template-columns: var(--diffs-code-grid);
    overflow: var(--diffs-overflow-override, scroll) clip;
    overscroll-behavior-x: none;
    tab-size: var(--diffs-tab-size, 2);
    padding-top: var(--diffs-gap-block, var(--diffs-gap-fallback));
    padding-bottom: max(0px,
      calc(var(--diffs-gap-block, var(--diffs-gap-fallback)) -
          var(--diffs-scrollbar-gutter)));
    scrollbar-gutter: stable;
    align-self: flex-start;
    display: grid;
  }

  [data-diffs-scrollbar-measure] {
    opacity: 0;
    pointer-events: none;
    scrollbar-gutter: auto;
    grid-template-columns: none;
    width: 100px;
    height: 100px;
    padding: 0;
    position: absolute;
    top: -200px;
    left: -200px;
  }

  [data-container-size] {
    container-type: inline-size;
  }

  [data-code]::-webkit-scrollbar {
    width: 0;
    height: var(--diffs-scrollbar-gutter);
  }

  [data-code]::-webkit-scrollbar-track {
    background: none;
  }

  [data-code]::-webkit-scrollbar-thumb {
    background-color: #0000;
    background-clip: content-box;
    border: 1px solid #0000;
    border-radius: 3px;
  }

  [data-code]::-webkit-scrollbar-corner {
    background-color: #0000;
  }

  @supports ((-moz-appearance: none)) {
    [data-code] {
      scrollbar-width: thin;
      scrollbar-color: var(--diffs-bg-context) transparent;
      padding-bottom: var(--diffs-gap-block, var(--diffs-gap-fallback));
    }
  }

  [data-diffs-header] ~ [data-diff], [data-diffs-header] ~ [data-file] {
    & [data-code], &[data-overflow="wrap"] {
      padding-top: 0;
    }
  }

  [data-gutter] {
    grid-template-rows: subgrid;
    grid-template-columns: subgrid;
    z-index: 3;
    background-color: var(--diffs-bg);
    grid-column: 1;
    display: grid;
    position: relative;

    & [data-gutter-buffer], & [data-column-number] {
      border-right: var(--diffs-gap-style, 2px solid var(--diffs-bg));
    }
  }

  [data-content] {
    grid-template-rows: subgrid;
    grid-template-columns: subgrid;
    background-color: var(--diffs-bg);
    grid-column: 2;
    min-width: 0;
    display: grid;
  }

  [data-diff-type="split"][data-overflow="wrap"] {
    grid-auto-flow: dense;
    grid-template-columns: repeat(2, var(--diffs-code-grid));
    padding-block: var(--diffs-gap-block, var(--diffs-gap-fallback));
    display: grid;

    & [data-deletions] {
      display: contents;

      & [data-gutter] {
        grid-column: 1;
      }

      & [data-content] {
        border-right: 1px solid var(--diffs-bg);
        grid-column: 2;
      }
    }

    & [data-additions] {
      display: contents;

      & [data-gutter] {
        border-left: 1px solid var(--diffs-bg);
        grid-column: 3;
      }

      & [data-content] {
        grid-column: 4;
      }
    }
  }

  [data-overflow="scroll"] [data-gutter] {
    position: sticky;
    left: 0;
  }

  [data-interactive-lines] [data-line] {
    cursor: pointer;
  }

  [data-interactive-line-numbers] [data-column-number] {
    cursor: pointer;
    touch-action: none;
  }

  [data-content-buffer], [data-gutter-buffer] {
    user-select: none;
    min-height: 1lh;
    position: relative;
  }

  [data-gutter-buffer] {
    padding-left: 2ch;
    padding-right: 1ch;

    &:before {
      content: "";
      min-width: var(--diffs-min-number-column-width, var(--diffs-min-number-column-width-default, 3ch));
      display: block;
    }
  }

  [data-gutter-buffer="annotation"] {
    --diffs-annotation-bg: var(--diffs-bg-context-gutter);
    min-height: 0;
  }

  [data-gutter-buffer="buffer"] {
    --diffs-line-bg: var(--diffs-bg-context-gutter);
  }

  [data-content-buffer] {
    background-position: 5px 0;
    background-size: 8px 8px;
    background-origin: border-box;
    background-image: repeating-linear-gradient(-45deg,
      transparent,
      transparent calc(3px * 1.414),
      var(--diffs-bg-buffer) calc(3px * 1.414),
      var(--diffs-bg-buffer) calc(4px * 1.414));
    grid-column: 1;
  }

  [data-separator] {
    box-sizing: content-box;
    background-color: var(--diffs-bg);
  }

  [data-separator="simple"] {
    min-height: 4px;
  }

  [data-separator="line-info"], [data-separator="line-info-basic"], [data-separator="metadata"], [data-separator="simple"] {
    background-color: var(--diffs-bg-separator);
  }

  [data-separator="line-info"], [data-separator="line-info-basic"], [data-separator="metadata"] {
    height: 32px;
    position: relative;
  }

  [data-separator-wrapper] {
    user-select: none;
    fill: currentColor;
    background-color: var(--diffs-bg);
    align-items: center;
    height: 100%;
    display: flex;
    position: absolute;
    inset-inline: 0;
  }

  [data-content] [data-separator-wrapper] {
    display: none;
  }

  [data-separator="metadata"] [data-separator-wrapper] {
    background-color: var(--diffs-bg-separator);
    height: 100%;
    color: var(--diffs-fg-number);
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: min-content;
    padding-inline: 1ch;
    inset-inline: 100% auto;
    overflow: hidden;
  }

  [data-separator="line-info"] {
    margin-block: var(--diffs-gap-block, var(--diffs-gap-fallback));

    & [data-separator-wrapper] {
      min-width: 16px;
    }
  }

  [data-separator="line-info-basic"], [data-separator="metadata"] {
    margin-block: 0;
  }

  [data-separator="line-info"][data-separator-first] {
    margin-top: 0;
  }

  [data-separator="line-info"][data-separator-last] {
    margin-bottom: 0;
  }

  [data-expand-index] [data-separator-wrapper] {
    grid-template-columns: 32px auto;
    display: grid;
  }

  [data-expand-index] [data-separator-wrapper][data-separator-multi-button] {
    grid-template-columns: 32px 32px auto;
  }

  [data-expand-button], [data-separator-content] {
    background-color: var(--diffs-bg-separator);
    flex: none;
    align-items: center;
    display: flex;
  }

  [data-expand-index] [data-separator-content]:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  [data-expand-button] {
    cursor: pointer;
    min-width: 32px;
    color: var(--diffs-fg-number);
    border-right: 2px solid var(--diffs-bg);
    flex-shrink: 0;
    justify-content: center;
    align-self: stretch;

    &:hover {
      color: var(--diffs-fg);
    }

    &[data-expand-all-button] {
      display: none;
    }
  }

  [data-expand-down] [data-icon] {
    transform: scaleY(-1);
  }

  [data-separator-content] {
    height: 100%;
    color: var(--diffs-fg-number);
    flex: auto;
    justify-content: flex-start;
    padding: 0 1ch;
    overflow: hidden;
  }

  [data-separator="line-info"], [data-separator="line-info-basic"] {
    & [data-separator-content] {
      user-select: none;
      height: 100%;
      overflow: clip;
    }
  }

  [data-unmodified-lines] {
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 0 auto;
    min-width: 0;
    display: block;
    overflow: hidden;
  }

  @supports (width: 1cqi) {
    [data-unified] {
      & [data-separator="line-info"] [data-separator-wrapper] {
        padding-inline: var(--diffs-gap-inline, var(--diffs-gap-fallback));
        width: 100cqi;

        & [data-separator-content] {
          border-radius: 6px;
        }
      }

      & [data-separator="line-info"][data-expand-index] [data-separator-wrapper] [data-separator-content] {
        border-top-left-radius: unset;
        border-bottom-left-radius: unset;
      }
    }

    [data-gutter] {
      & [data-separator="line-info"] [data-separator-wrapper] {
        padding-left: var(--diffs-gap-inline, var(--diffs-gap-fallback));
      }

      & [data-separator="line-info"] [data-separator-content] {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      & [data-separator="line-info"][data-expand-index] [data-separator-content] {
        border-top-left-radius: unset;
        border-bottom-left-radius: unset;
      }
    }

    [data-additions] {
      & [data-content] [data-separator="line-info"] {
        background-color: var(--diffs-bg);

        & [data-separator-wrapper] {
          display: none;
        }
      }

      & [data-gutter] [data-separator="line-info"] [data-separator-wrapper] {
        background-color: var(--diffs-bg-separator);
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        height: 100%;
        display: block;

        & [data-separator-content], & [data-expand-button] {
          display: none;
        }
      }
    }

    [data-overflow="scroll"] [data-additions] [data-gutter] [data-separator="line-info"] [data-separator-wrapper] {
      width: calc(100cqi - var(--diffs-gap-inline, var(--diffs-gap-fallback)));
    }

    [data-overflow="wrap"] [data-additions] [data-content] [data-separator="line-info"] [data-separator-wrapper] {
      background-color: var(--diffs-bg-separator);
      height: 100%;
      margin-right: var(--diffs-gap-inline, var(--diffs-gap-fallback));
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      display: block;

      & [data-separator-content], & [data-expand-button] {
        display: none;
      }
    }

    [data-separator="line-info"] [data-separator-wrapper] {
      & [data-expand-both], & [data-expand-down], & [data-expand-up] {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }
    }

    @media (pointer: fine) {
      [data-separator="line-info"] [data-separator-wrapper] {
        &[data-separator-multi-button] {
          & [data-expand-up] {
            border-top-left-radius: 6px;
            border-bottom-left-radius: unset;
          }

          & [data-expand-down] {
            border-bottom-left-radius: 6px;
            border-top-left-radius: unset;
          }
        }
      }
    }
  }

  @media (pointer: coarse) {
    [data-separator="line-info-basic"] [data-separator-wrapper][data-separator-multi-button] {
      grid-template-columns: 34px 34px auto;

      & [data-separator-content] {
        grid-column: unset;
        grid-row: unset;
      }
    }

    @supports (width: 1cqi) {
      [data-separator="line-info"] [data-separator-wrapper] {
        & [data-expand-both], & [data-expand-down], & [data-expand-up] {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }

        &[data-separator-multi-button] {
          & [data-expand-up] {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
          }

          & [data-expand-down] {
            border-bottom-left-radius: unset;
            border-top-left-radius: unset;
          }
        }
      }
    }
  }

  @media (pointer: fine) {
    [data-separator-wrapper][data-separator-multi-button] {
      grid-template-rows: 50% 50%;
      display: grid;

      & [data-separator-content] {
        grid-area: 1 / 2 / -1;
        min-width: min-content;
      }

      & [data-expand-button] {
        grid-column: 1;
      }
    }

    [data-separator="line-info"] [data-separator-wrapper], [data-separator="line-info"] [data-separator-wrapper][data-separator-multi-button] {
      grid-template-columns: 34px auto;
    }

    [data-separator="line-info-basic"][data-expand-index] [data-separator-wrapper] {
      grid-template-columns: 100% auto;
    }

    [data-separator="line-info"], [data-separator="line-info-basic"] {
      & [data-separator-multi-button] {
        & [data-expand-up] {
          border-bottom: 1px solid var(--diffs-bg);
          border-right: 2px solid var(--diffs-bg);
        }

        & [data-expand-down] {
          border-top: 1px solid var(--diffs-bg);
          border-right: 2px solid var(--diffs-bg);
        }
      }
    }
  }

  [data-additions] [data-gutter] [data-separator-wrapper], [data-additions] [data-separator="line-info-basic"] [data-separator-wrapper], [data-content] [data-separator-wrapper] {
    display: none;
  }

  [data-line-annotation] {
    min-height: var(--diffs-annotation-min-height, 0);
    z-index: 2;
  }

  [data-merge-conflict-actions] {
    z-index: 2;
  }

  [data-separator="custom"] {
    grid-template-columns: subgrid;
    display: grid;
  }

  [data-line], [data-column-number], [data-no-newline] {
    padding-inline: 1ch;
    position: relative;
  }

  [data-indicators="classic"] [data-line] {
    padding-inline-start: 2ch;
  }

  [data-indicators="classic"] {
    & [data-line-type="change-addition"], & [data-line-type="change-deletion"] {
      &[data-no-newline], &[data-line] {
        &:before {
          user-select: none;
          width: 1ch;
          height: 1lh;
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }

    & [data-line-type="change-addition"] {
      &[data-line], &[data-no-newline] {
        &:before {
          content: "+";
          color: var(--diffs-addition-base);
        }
      }
    }

    & [data-line-type="change-deletion"] {
      &[data-line], &[data-no-newline] {
        &:before {
          content: "-";
          color: var(--diffs-deletion-base);
        }
      }
    }
  }

  [data-indicators="bars"] {
    & [data-line-type="change-deletion"], & [data-line-type="change-addition"] {
      &[data-column-number] {
        &:before {
          content: "";
          user-select: none;
          contain: strict;
          width: 4px;
          height: 100%;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }

    & [data-line-type="change-deletion"] {
      &[data-column-number] {
        &:before {
          background-image: linear-gradient(0deg,
            var(--diffs-bg-deletion) 50%,
            var(--diffs-deletion-base) 50%);
          background-repeat: repeat;
          background-size: 2px 2px;
          background-size: calc(1lh / round(1lh / 2px))
            calc(1lh / round(1lh / 2px));
        }
      }
    }

    & [data-line-type="change-addition"] {
      &[data-column-number] {
        &:before {
          background-color: var(--diffs-addition-base);
        }
      }
    }
  }

  [data-overflow="wrap"] {
    & [data-line], & [data-annotation-content] {
      white-space: pre-wrap;
      word-break: break-word;
    }
  }

  [data-overflow="scroll"] [data-line] {
    white-space: pre;
    min-height: 1lh;
  }

  [data-column-number] {
    box-sizing: content-box;
    text-align: right;
    user-select: none;
    color: var(--diffs-fg-number);
    padding-left: 2ch;
  }

  [data-line-number-content] {
    min-width: var(--diffs-min-number-column-width, var(--diffs-min-number-column-width-default, 3ch));
    z-index: 1;
    display: inline-block;
    position: relative;
  }

  [data-disable-line-numbers] {
    & [data-gutter-buffer], & [data-column-number] {
      min-width: 4px;
      padding: 0;

      &:before {
        min-width: 0;
      }
    }

    & [data-line-number-content] {
      display: none;
    }

    & [data-gutter-utility-slot] {
      right: unset;
      justify-content: flex-start;
      left: 0;
    }

    &[data-indicators="bars"] [data-gutter-utility-slot] {
      left: 6px;
    }
  }

  [data-file][data-disable-line-numbers] {
    & [data-gutter-buffer], & [data-column-number] {
      border-right: 0;
      min-width: 0;
    }
  }

  [data-diff-span] {
    box-decoration-break: clone;
    border-radius: 3px;
  }

  [data-line-type="change-addition"] [data-diff-span] {
    background-color: var(--diffs-bg-addition-emphasis);
  }

  [data-line-type="change-deletion"] [data-diff-span] {
    background-color: var(--diffs-bg-deletion-emphasis);
  }

  [data-merge-conflict="marker-start"], [data-merge-conflict="marker-base"], [data-merge-conflict="marker-separator"], [data-merge-conflict="marker-end"] {
    color: var(--diffs-fg);
    padding-left: 1ch;
  }

  [data-merge-conflict="marker-start"], [data-merge-conflict="marker-end"] {
    align-items: center;
    display: flex;

    &:after {
      color: var(--diffs-fg-conflict-marker);
      font-size: .75rem;
      font-style: normal;
      line-height: 1.25rem;
      font-family: var(--diffs-header-font-family, var(--diffs-header-font-fallback));
      padding-left: 1ch;
    }
  }

  [data-merge-conflict="marker-start"]:after {
    content: "(Current Change)";
  }

  [data-merge-conflict="marker-end"]:after {
    content: "(Incoming Change)";
  }

  [data-merge-conflict-actions-content] {
    min-height: 1.75rem;
    font-family: var(--diffs-header-font-family, var(--diffs-header-font-fallback));
    color: var(--diffs-fg);
    align-items: center;
    gap: .25rem;
    padding-inline: .5rem;
    font-size: .75rem;
    line-height: 1.2;
    display: flex;
  }

  [data-merge-conflict-action] {
    appearance: none;
    color: var(--diffs-fg-number);
    font: inherit;
    cursor: pointer;
    background: none;
    border: 0;
    padding: 0;
    font-style: normal;
  }

  [data-merge-conflict-action]:hover {
    color: var(--diffs-fg);
  }

  [data-merge-conflict-action="current"]:hover {
    color: var(--diffs-addition-base);
  }

  [data-merge-conflict-action="incoming"]:hover {
    color: var(--diffs-modified-base);
  }

  [data-merge-conflict-action-separator] {
    color: var(--diffs-fg-number);
    opacity: .6;
    user-select: none;
  }

  [data-diffs-header="default"] {
    background-color: var(--diffs-bg);
    justify-content: space-between;
    align-items: center;
    gap: var(--diffs-gap-inline, var(--diffs-gap-fallback));
    min-height: calc(1lh + (var(--diffs-gap-block, var(--diffs-gap-fallback)) * 3));
    z-index: 2;
    flex-direction: row;
    padding-inline: 16px;
    display: flex;
    position: relative;
    top: 0;
  }

  [data-header-content] {
    align-items: center;
    gap: var(--diffs-gap-inline, var(--diffs-gap-fallback));
    white-space: nowrap;
    flex-direction: row;
    min-width: 0;
    display: flex;
  }

  [data-header-content] [data-prev-name], [data-header-content] [data-title] {
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: rtl;
    min-width: 0;
    overflow: hidden;
  }

  [data-prev-name] {
    opacity: .7;
  }

  [data-rename-icon] {
    fill: currentColor;
    flex-grow: 0;
    flex-shrink: 0;
  }

  [data-diffs-header="default"] [data-metadata] {
    white-space: nowrap;
    align-items: center;
    gap: 1ch;
    display: flex;
  }

  [data-diffs-header="default"] [data-additions-count] {
    font-family: var(--diffs-font-family, var(--diffs-font-fallback));
    color: var(--diffs-addition-base);
  }

  [data-diffs-header="default"] [data-deletions-count] {
    font-family: var(--diffs-font-family, var(--diffs-font-fallback));
    color: var(--diffs-deletion-base);
  }

  [data-change-icon] {
    fill: currentColor;
    flex-shrink: 0;
  }

  [data-change-icon="change"], [data-change-icon="rename-pure"], [data-change-icon="rename-changed"] {
    color: var(--diffs-modified-base);
  }

  [data-change-icon="new"] {
    color: var(--diffs-addition-base);
  }

  [data-change-icon="deleted"] {
    color: var(--diffs-deletion-base);
  }

  [data-change-icon="file"] {
    opacity: .6;
  }

  [data-annotation-content] {
    z-index: 2;
    isolation: isolate;
    align-self: flex-start;
    min-width: 0;
    display: flow-root;
    position: relative;
  }

  [data-overflow="scroll"] [data-annotation-content], [data-overflow="scroll"] [data-merge-conflict-actions-content] {
    width: var(--diffs-column-content-width, auto);
    left: var(--diffs-column-number-width, 0);
    position: sticky;
  }

  [data-annotation-slot] {
    text-wrap-mode: wrap;
    word-break: normal;
    white-space-collapse: collapse;
  }

  [data-gutter-utility-slot] {
    touch-action: none;
    justify-content: flex-end;
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }

  [data-utility-button] {
    appearance: none;
    cursor: pointer;
    width: 1lh;
    height: 1lh;
    font-size: var(--diffs-font-size, 13px);
    line-height: var(--diffs-line-height, 20px);
    background-color: var(--diffs-modified-base);
    color: var(--diffs-bg);
    fill: currentColor;
    z-index: 4;
    touch-action: none;
    border: none;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    margin-right: calc(-1lh + 1ch);
    padding: 0;
    display: flex;
    position: relative;

    &:before {
      content: "";
      display: block;
      position: absolute;
      inset: 0 0 0 -4px;
    }
  }

  [data-decoration-bar-stack] {
    pointer-events: none;
    isolation: isolate;
    z-index: 1;
    background-color: var(--diffs-decoration-bar-color, transparent);
    box-sizing: content-box;
    border-left: 2px solid var(--diffs-bg);
    border-right: 2px solid var(--diffs-bg);
    width: 6px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -2px;

    [data-decoration-bar-depth="1"] & {
      background-color: color-mix(in lab,
        var(--diffs-bg) 20%,
        var(--diffs-decoration-bar-color, transparent));
    }

    [data-decoration-bar-depth="2"] & {
      background-color: color-mix(in lab,
        var(--diffs-bg) 45%,
        var(--diffs-decoration-bar-color, transparent));
    }

    [data-decoration-bar-depth="3"] & {
      background-color: color-mix(in lab,
        var(--diffs-bg) 65%,
        var(--diffs-decoration-bar-color, transparent));
    }

    [data-decoration-bar-start] & {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    [data-decoration-bar-end] & {
      z-index: 3;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }

  [data-placeholder] {
    contain: strict;
  }

  [data-error-wrapper] {
    padding: var(--diffs-gap-block, var(--diffs-gap-fallback))
      var(--diffs-gap-inline, var(--diffs-gap-fallback));
    scrollbar-width: none;
    max-height: 400px;
    overflow: auto;

    & [data-error-message] {
      color: var(--diffs-deletion-base);
      font-size: 18px;
      font-weight: bold;
    }

    & [data-error-stack] {
      color: var(--diffs-fg-number);
    }
  }
}

@layer theme, rendered, unsafe;
`;let P;function we(e){if(P!=null)return P;const n=e.host;if(typeof HTMLElement<"u"&&n instanceof HTMLElement&&!n.isConnected)return;const t=document.createElement("div");t.setAttribute("data-code",""),t.setAttribute(J,"true");const i=document.createElement("div");return i.style.position="relative",i.style.width="200%",i.style.height="200%",t.appendChild(i),e.appendChild(t),P=Math.max(t.offsetHeight-t.clientHeight,0),t.remove(),P}function _(e){return`${$}: ${e==null?"var(--diffs-scrollbar-gutter-fallback)":`${e}px`};`}const q="@layer base, theme, rendered, unsafe;",Le=new RegExp(`${Ee($)}\\s*:\\s*[^;]+;`);function Ze(e){return`${q}
@layer unsafe {
  ${e}
}`}function en(e,n="system",t){return`${q}
@layer rendered {
  :host {${n==="system"?"":`
  color-scheme: ${n};`}
  ${_(t)}
  ${e}
  }
}`}function nn(e,n){const t=_(n);return e.replace(Le,t)}function Ee(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function tn({code:e,pre:n,columnType:t,rowSpan:i,containerSize:a=!1}={}){return e==null&&(e=document.createElement("code"),e.setAttribute("data-code",""),t!=null&&e.setAttribute(`data-${t}`,""),n?.appendChild(e)),i!=null?e.style.setProperty("grid-row",`span ${i}`):e.style.removeProperty("grid-row"),a?e.setAttribute("data-container-size",""):e.removeAttribute("data-container-size"),e}function an(e,n){if(n==null)return;const t=e.shadowRoot??e.attachShadow({mode:"open"});t.innerHTML===""&&(t.innerHTML=n)}function rn(e,{type:n,diffIndicators:t,disableBackground:i,disableLineNumbers:a,overflow:r,split:s,totalLines:l,customProperties:o}){if(o!=null)for(const d in o){const c=o[d];c!=null&&e.setAttribute(d,`${c}`)}switch(n==="diff"?(e.setAttribute("data-diff",""),e.removeAttribute("data-file")):(e.setAttribute("data-file",""),e.removeAttribute("data-diff")),t){case"bars":case"classic":e.setAttribute("data-indicators",t);break;case"none":e.removeAttribute("data-indicators");break}return a?e.setAttribute("data-disable-line-numbers",""):e.removeAttribute("data-disable-line-numbers"),i?e.removeAttribute("data-background"):e.setAttribute("data-background",""),n==="diff"?e.setAttribute("data-diff-type",s?"split":"single"):e.removeAttribute("data-diff-type"),e.setAttribute("data-overflow",r),e.tabIndex=0,e.style.setProperty("--diffs-min-number-column-width-default",`${`${l}`.length}ch`),e}function on(e){if(typeof HTMLStyleElement<"u"&&e instanceof HTMLStyleElement)return!0;const n=e.tagName??e.nodeName;return typeof n=="string"&&n.toLowerCase()==="style"}function sn({shadowRoot:e,currentNode:n,themeCSS:t}){if(t.trim()===""){n?.remove();return}return n??=Pe(),n.textContent=t,n.parentNode!==e&&e.appendChild(n),n}function Pe(){const e=document.createElement("style");return e.setAttribute(Q,""),e}if(typeof HTMLElement<"u"&&customElements.get("diffs-container")==null){let e;class n extends HTMLElement{constructor(){if(super(),this.shadowRoot!=null)return;const i=this.attachShadow({mode:"open"});e==null&&(e=new CSSStyleSheet,e.replaceSync(Se)),i.adoptedStyleSheets=[e]}connectedCallback(){we(this.shadowRoot??this.attachShadow({mode:"open"}))}}customElements.define(Z,n)}export{en as A,U as B,_e as C,Ge as F,Ie as I,Ue as R,je as S,Te as a,He as b,ze as c,De as d,Re as e,Oe as f,Be as g,Ve as h,We as i,qe as j,$e as k,Fe as l,an as m,Xe as n,Je as o,Me as p,on as q,Qe as r,Ye as s,we as t,sn as u,nn as v,Ze as w,tn as x,Ke as y,rn as z};
