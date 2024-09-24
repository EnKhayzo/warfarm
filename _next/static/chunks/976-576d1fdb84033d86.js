"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[976],{4751:function(e,t,n){n.d(t,{Z:function(){return f}});var l=n(7437);n(2265);var c=n(6463),a=n(7138),s=n(5183),o=n(5713),i=n(1524);n(5721);var r=n(1815),u=n(6487),d=n(4899);n(3744);var x=n(3104);function f(e){var t;let{component:n,showCorrespondingItem:f=!1,showButtons:p=!0,isRawObj:h=!1,fullName:m=!1,iconHeight:v="75px",width:g=null,className:b,style:j}=e;(0,c.useRouter)();let[y,N]=(0,i.Z)();if(null==n)return console.warn("component is null!"),null;let w=h?o.LnC(n.id):n.route,z=h?o.U$T(n):n.rarity;h||(n=n.rawObj);let Z=n.required<=0;return(0,l.jsxs)("div",{className:"sized-content v-flex".concat(b?" ".concat(b):""),style:o.unj({alignSelf:"stretch",gap:"5px"},j),children:[(0,l.jsxs)(a.default,{href:w,className:"sized-content item-page-component-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(t=" ".concat(z))&&void 0!==t?t:""),style:{gap:"5px",position:"relative",cursor:"pointer",width:null!=g?g:"auto",alignSelf:"stretch"},children:[(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",children:[f?(0,l.jsx)("img",{style:{height:"".concat(Number(v.replace("px",""))/1.7,"px")},src:"".concat(o.wHH().basePath,"/images/").concat(n.parentItem,".png")}):null,(0,l.jsx)("img",{style:{height:v},src:"".concat(o.wHH().basePath,"/images/").concat(n.fullName,".png")})]}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",textAlign:"center"},children:m?n.fullName:n.name}),Z?null:(0,l.jsx)(d.Z,{object:o.fGE(n.id)})]}),(0,l.jsx)(s.Z,{itemId:n.id}),(0,l.jsx)(r.Z,{itemId:n.id,positionAbsolute:!0}),(0,l.jsx)(u.Z,{rawObj:o.fGE(n.id)})]}),p?(0,l.jsx)(x.Z,{component:n,isRawObj:!0,showLabel:!1}):null]})}},5334:function(e,t,n){var l=n(7437),c=n(2265),a=n(5713);(0,c.forwardRef)((e,t)=>{let{position:n={top:"50px"},children:s,buttons:o=null,className:i="",style:r={},showInitial:u=!1,pulseShowCallback:d=null}=e,x=(0,c.useRef)(null),[f,p]=(0,c.useState)(u),h=e=>{x.current&&!x.current.contains(e.target)&&p(!1)};(0,c.useEffect)(()=>(f?document.addEventListener("mousedown",h):document.removeEventListener("mousedown",h),()=>{document.removeEventListener("mousedown",h)}),[f]),(0,c.useImperativeHandle)(t,()=>({show:e=>{e&&v(e),p(!0)},hide:()=>p(!1),toggle:e=>{e&&v(e),p(e=>!e)}}));let[m,v]=(0,c.useState)(n);return(0,l.jsx)("div",{ref:x,className:" ".concat(i),style:a.unj({display:f?"block":"none",position:"absolute",top:m.top,left:m.left,listStyleType:"none",padding:"10px",margin:"5px",backgroundColor:"var(--color-sextenary)",borderRadius:"5px",zIndex:1e3,overflow:"auto",maxHeight:"80vh",...r}),children:f&&s?s({closeMenu:()=>p(!1)}):o?(0,l.jsx)("ul",{children:o.map((e,t)=>(0,l.jsx)("li",{style:{padding:"5px 0",cursor:"pointer"},children:e.label},"".concat(t,"-").concat(e.label)))}):null})}).displayName="ContextMenu"},1007:function(e,t,n){var l=n(7437),c=n(2265),a=n(5713);t.Z=e=>{let{top:t,children:n,title:s,buttons:o,headerContent:i,className:r,style:u,forceShowState:d=null}=e,[x,f]=(0,c.useState)(null!=d&&d),p=(0,c.useRef)(null),h=e=>{p.current&&!p.current.contains(e.target)&&f(!1)};return(0,c.useEffect)(()=>(x?document.addEventListener("mousedown",h):document.removeEventListener("mousedown",h),()=>{document.removeEventListener("mousedown",h)}),[x]),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{padding:"0px",margin:"0px"},children:[(0,l.jsx)("button",{title:s,onClick:()=>{f(!x)},className:"sized-content h-flex global-settings-button".concat(r?" ".concat(r):""),style:{borderRadius:"5px",padding:"5px"},children:i}),(0,l.jsx)("div",{ref:p,className:r,style:a.unj({display:x?"":"none",top:t,position:"absolute",top:"50px",listStyleType:"none",padding:"10px",margin:0,backgroundColor:"var(--color-sextenary)",borderRadius:"5px",zIndex:1e3,margin:"5px",overflow:"auto",maxHeight:"80vh"},u),children:n?n({closeMenu:()=>f(!1)}):(0,l.jsx)("ul",{children:o.map((e,t)=>(0,l.jsx)("li",{style:{padding:"5px 0"},children:e.label},"".concat(t,"-").concat(e.label)))})})]})}},415:function(e,t,n){n.d(t,{Z:function(){return r}});var l=n(7437);n(2265);var c=n(6463);n(5183);var a=n(5713),s=n(1524);n(4899);var o=n(235);n(193);var i=n(9343);function r(e){let{positionAbsolute:t=!1,object:n,isRawObj:r=!1,onlyShowOnHover:u=!1,iconStyle:d}=e;(0,c.useRouter)();let[x,f]=(0,s.Z)(),[p,h]=(0,o.Z)(),m=r?n:n.rawObj;if(null==m||"items"!==m.category&&"components"!==m.category||!a.WqU(n))return null;let v=a.tuS(m);return(0,l.jsx)(i.Z,{label:"",title:"Set object to".concat(v?" not":""," crafted"),iconClassName:"icon-default-filter".concat(u&&!v?" icon-default-show-hover":"").concat(t?"absolute":""),iconStyle:a.unj({width:"30px",height:"30px",objectFit:"contain"},d),iconUrl:v?"".concat(a.wHH().basePath,"/icons/crafted.svg"):"".concat(a.wHH().basePath,"/icons/crafted_hollow.svg"),onClick:e=>{e.preventDefault(),e.stopPropagation(),a.wI4(m,!v)}})}},6487:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265);var c=n(6463);n(5183);var a=n(5713);n(1524);var s=n(235),o=n(8553);function i(e){let{rawObj:t,className:n,style:i}=e;(0,c.useRouter)();let[r,u]=(0,s.Z)(),[d,x]=(0,o.Z)();if(null==t||"ducatMode"!==d)return null;let f=a.Vp9(t.id),p=a.QEb(t),h=f*p;return"items"===t.category&&(h=a.pxc(t.id).reduce((e,t)=>e+=a.QEb(a.fGE(t))*a.Vp9(t),0)),(0,l.jsx)(l.Fragment,{children:p<=0?null:(0,l.jsxs)("div",{className:"sized-content obtained-extra-component h-flex flex-center".concat(null!=n?n:""),style:a.unj({},i),children:[(0,l.jsx)("img",{style:{marginTop:"2px",width:"20px",height:"20px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/Orokin Ducats.png")}),(0,l.jsxs)("span",{className:"sized-content h-flex",style:{whiteSpace:"pre"},children:["".concat(p),h<=0?null:(0,l.jsxs)("div",{className:"sized-content h-flex",children:[" (",(0,l.jsxs)("span",{className:"sized-content h-flex",style:{gap:"2px"},children:[(0,l.jsx)("img",{style:{marginTop:"2px",width:"20px",height:"20px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/Orokin Ducats.png")}),"".concat(h)]}),")"]})]})]})})}},7774:function(e,t,n){n.d(t,{Z:function(){return o}});var l=n(7437);n(2265);var c=n(6463);n(5183);var a=n(5713);n(1524);var s=n(235);function o(e){let{object:t,className:n,style:o,collapseWhenNull:i=!0,labelPrefix:r=null}=e;(0,c.useRouter)();let[u,d]=(0,s.Z)(),x=null;if("items"===t.category){let e=a.pxc(t.id).reduce((e,t)=>e+=a.Vp9(t),0);x="".concat(e," duplicates")}else if("components"===t.category){let e=a.Vp9(t.id);x="".concat(e," duplicate").concat(1==e?"":"s")}else x=null;return(0,l.jsx)("div",{className:"sized-content obtained-label-component".concat(null!=x&&x?"":" hidden"," v-flex").concat(null!=n?n:""),style:o,children:"".concat(null!=r?r:"").concat(null!=x?x:i?"":"x")})}},9343:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437),c=n(2265);n(6463);var a=n(5713);function s(e){let{label:t,title:n=null,iconUrl:s,onClick:o,className:i,style:r,iconClassName:u,iconStyle:d=null,highlight:x=!1,blinkEnabled:f=!0,forceBlinking:p=null,iconHeight:h="15px"}=e,[m,v]=(0,c.useState)(!1),g=(0,c.useRef)(null),b=(0,c.useRef)(null),j=()=>{let e=()=>{v(!0),g.current=setTimeout(()=>{v(!1)},250)};m&&(g.current&&(clearTimeout(g.current),g.current=null),b.offsetHeight,e(),b.offsetHeight),(x||p)&&e()};return(0,c.useEffect)(()=>(p?j():v(!1),()=>{}),[p]),(0,l.jsx)("div",{ref:b,className:"sized-content icon-button".concat(x?" highlight":""," h-flex flex-center").concat(i?" ".concat(i):"").concat(m?" blinking":""),style:r,title:n,onClick:e=>{f&&j(),o&&o(e)},children:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"5px"},children:[(0,l.jsx)("img",{className:"sized-content v-flex flex-center icon-default".concat(u?" ".concat(u):""),style:a.unj({height:h},d),src:s}),null==t||t.length<=0?null:(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{marginBottom:"2px"},children:t})]})})}},5183:function(e,t,n){n.d(t,{Z:function(){return b}});var l=n(7437);n(2265),n(6463);var c=n(8231),a=n(5713),s=n(8553);function o(e){let{positionAbsolute:t=!0,itemId:n}=e,[s,o]=(0,c.Z)(),i=s&&s[n]&&s[n].tracked;return(0,l.jsx)("button",{title:"Track/Untrack Item",className:"sized-content star-button".concat(t?" absolute":""," v-flex flex-center"),onClick:e=>{var t,l;e.stopPropagation(),e.preventDefault();let c=null!==(t=a.l6q(n))&&void 0!==t?t:{};c.tracked=!(null!==(l=c.tracked)&&void 0!==l&&l),a.AA7(n,c)},children:(0,l.jsx)("img",{src:i?"".concat(a.wHH().basePath,"/icons/star_hollow_filled.svg"):"".concat(a.wHH().basePath,"/icons/star_hollow.svg"),className:"sized-content star-button-icon flex-center".concat(i?" tracked":""),style:{}})})}var i=n(9274);n(5334),n(4751),n(1815);var r=n(6487),u=n(4899),d=n(5721),x=n(1672),f=n(235),p=n(1886);function h(e){let{positionAbsolute:t=!0,itemId:n}=e,[c,s]=(0,f.Z)(),[o,h]=(0,i.Z)(),m=a.fGE(n);if("items"!==m.category&&"components"!==m.category)return null;let v="items"===m.category?a.pxc(n).reduce((e,t)=>e+=a.$7W(t),0):a.$7W(n),g=v>0;return a.WqU(m),(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("button",{title:"Sell components",className:"sized-content h-flex sell-button".concat(t?" absolute":""," v-flex flex-center"),style:{gap:"5px"},onClick:e=>{e.stopPropagation(),e.preventDefault(),a.GzE(n);let t=e.target.getBoundingClientRect();a.uQD({position:{top:"".concat(t.top+10,"px"),left:"".concat(t.left+10,"px")},children:e=>{var t;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{cursor:"default",borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},onClick:e=>{e.stopPropagation(),e.preventDefault()},children:[(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{whiteSpace:"pre"},children:["Sell ",null!==(t=m.fullName)&&void 0!==t?t:m.name,"items"!==m.category?null:"'s duplicates"]}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},children:("items"===m.category?a.UKN(m.id):[m]).map((e,t)=>{var c;let s=e.required<=0;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{alignSelf:"stretch",gap:"5px"},children:[(0,l.jsxs)("div",{className:"sized-remaining item-page-component-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(c=" ".concat(a.U$T(e)))&&void 0!==c?c:""),style:{gap:"5px",position:"relative",cursor:"pointer",alignSelf:"stretch",minWidth:"80px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{width:"80px",height:"80px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/").concat(e.fullName,".png")})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",textAlign:"center"},children:e.name}),s?null:(0,l.jsx)(u.Z,{object:e})]}),(0,l.jsx)(d.Z,{positionAbsolute:!1,itemId:n}),(0,l.jsx)(r.Z,{rawObj:e})]}),(0,l.jsx)(p.Z,{component:e}),(0,l.jsx)(x.Z,{object:e,collapseWhenNull:!1})]},"".concat(t,"-").concat(e.id))})})]})}})},children:[(0,l.jsx)("img",{src:g?"".concat(a.wHH().basePath,"/icons/sell_filled.svg"):"".concat(a.wHH().basePath,"/icons/sell_hollow.svg"),className:"sized-content sell-button-icon flex-center".concat(g?" sell":""),style:{}}),v>0?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px",fontSize:"small",fontStyle:"italic"},children:v}):null]})})}var m=n(7841);function v(e){let{positionAbsolute:t=!0,itemId:n}=e,[c,s]=(0,f.Z)(),o=a.fGE(n);return"items"!==o.category&&"components"!==o.category?null:(a.Vp9(n),a.WqU(o),(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("button",{title:"Set duplicate components",className:"sized-content sell-button".concat(t?" absolute":""," v-flex flex-center"),onClick:e=>{e.stopPropagation(),e.preventDefault();let t=e.target.getBoundingClientRect();a.uQD({position:{top:"".concat(t.top+10,"px"),left:"".concat(t.left+10,"px")},children:e=>{var t;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{cursor:"default",borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},onClick:e=>{e.stopPropagation(),e.preventDefault()},children:[(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{whiteSpace:"pre"},children:[null!==(t=o.fullName)&&void 0!==t?t:o.name,"'s duplicates"]}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},children:("items"===o.category?a.UKN(o.id):[o]).map((e,t)=>{var c;let s=e.required<=0;return(0,l.jsxs)("div",{className:"sized-content v-flex",style:{alignSelf:"stretch",gap:"5px"},children:[(0,l.jsxs)("div",{className:"sized-remaining item-page-component-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(c=" ".concat(a.U$T(e)))&&void 0!==c?c:""),style:{gap:"5px",position:"relative",cursor:"pointer",alignSelf:"stretch",minWidth:"80px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{width:"80px",height:"80px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/").concat(e.fullName,".png")})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",textAlign:"center"},children:e.name}),s?null:(0,l.jsx)(u.Z,{object:e})]}),(0,l.jsx)(d.Z,{positionAbsolute:!1,itemId:n}),(0,l.jsx)(r.Z,{rawObj:a.fGE(e.id)})]}),s?null:(0,l.jsx)(m.Z,{component:e,isRawObj:!0,showLabel:!1})]},"".concat(t,"-").concat(e.id))})})]})}})},children:(0,l.jsx)("img",{src:"".concat(a.wHH().basePath,"/icons/duplicates.svg"),className:"sized-content sell-button-icon flex-center",style:{}})})}))}function g(e){let{positionAbsolute:t=!0,itemId:n,horizontal:a=!1}=e,[s,o]=(0,c.Z)();return(0,l.jsxs)("div",{className:"sized-content ".concat(a?"h-flex":"v-flex"," flex-center sell-button").concat(t?" absolute":""),style:{gap:"5px"},children:[(0,l.jsx)(h,{itemId:n,positionAbsolute:!1}),(0,l.jsx)(v,{itemId:n,positionAbsolute:!1})]})}function b(e){let{positionAbsolute:t=!0,itemId:n,horizontal:a=!1}=e,[i,r]=(0,c.Z)(),[u,d]=(0,s.Z)();return null==u||"farmMode"===u?(0,l.jsx)(o,{positionAbsolute:t,itemId:n}):(0,l.jsx)(g,{horizontal:a,positionAbsolute:t,itemId:n})}},193:function(e,t,n){var l=n(7437),c=n(2265),a=n(5713);t.Z=e=>{let{textLabel:t,name:n,value:s,onChange:o,onClick:i,checked:r,containerClassName:u,containerStyle:d}=e,x=(0,c.useRef)();return(0,l.jsxs)("div",{className:"sized-content h-flex".concat(null!=u?" ".concat(u):""),style:a.unj({gap:"5px",padding:"0px",margin:"0px"},d),onClick:e=>{e.stopPropagation(),e.preventDefault();let t=!x.current.checked;x.current.checked=t;let n=new Event("input",{bubbles:!1}),l={target:x.current,preventDefault:()=>{},stopPropagation:()=>{}};console.log("triggering synthetic event"),o&&o(l),x.current.dispatchEvent(n)},children:[(0,l.jsx)("input",{ref:x,className:"sized-content",type:"checkbox",name:n,value:s,onClick:e=>{e.stopPropagation(),i&&i(e)},onChange:e=>{e.stopPropagation(),o&&o(e)},defaultChecked:null!=r&&r}),(0,l.jsx)("div",{className:"sized-content",style:{marginBottom:"2px"},children:t})]})}},8106:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437),c=n(2265);function a(e){let{loadFunc:t,fallback:n}=e,[a,s]=(0,c.useState)(null);return(0,c.useRef)(!1),!function(e){let t=(0,c.useRef)(!1),n=(0,c.useRef)(!1);(0,c.useEffect)(()=>{!t.current&&e&&e.mount&&(e.mount(),t.current=!0)},[]),(0,c.useEffect)(()=>{e&&e.dataUpdate&&e.dataUpdate()},e&&e.dataArray?e.dataArray:[]),(0,c.useEffect)(()=>{e&&e.anyUpdate&&e.anyUpdate()}),(0,c.useEffect)(()=>{if(e&&e.clearOrUnmount)return e.clearOrUnmount()},e&&e.dataArray?e.dataArray:[]),(0,c.useEffect)(()=>{if(!n.current&&e&&e.unmount)return n.current=!0,e.unmount()},[])}({mount:()=>{t().then(e=>{let t=()=>e;t.displayName="LazyLoadedComponent",s(()=>t)})}}),a?(0,l.jsx)(a,{}):n}function s(e){let{fallback:t,loadFunc:n}=e;return(0,l.jsx)(a,{loadFunc:n,fallback:t})}n(5713)},4899:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265);var c=n(6463);n(5183),n(5713),n(1524);var a=n(3744),s=n(7774),o=n(8553);function i(e){let{object:t,className:n,style:i,exclusiveMode:r=null,collapseWhenNull:u=!0,labelPrefix:d=null}=e;(0,c.useRouter)();let[x,f]=(0,o.Z)(),p=null==r||x===r;return null==x||"farmMode"===x?p?(0,l.jsx)(a.Z,{object:t,className:n,style:i,collapseWhenNull:u,labelPrefix:d}):null:p?(0,l.jsx)(s.Z,{object:t,className:n,style:i,collapseWhenNull:u,labelPrefix:d}):null}},6342:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437);n(2265),n(6463);var c=n(1524),a=n(5713);function s(e){let{positionAbsolute:t=!0,hollowAbsolute:n=!0,itemId:s,showPartial:o=!0,obtainedComponents:i=null}=e,[r,u]=(0,c.Z)(),d=a.fGE(s);if(null==d||"missions"===d.category)return null;let x=o?a.km8(d,r):a.WqU(d,r)?1:0;return(0,l.jsx)("div",{className:"sized-content h-flex obtained-check".concat(t?" absolute":""," v-flex flex-center").concat(x<=0?" obtained-item-check-container-unfarmed":""),style:{position:t?"absolute":"relative",width:"20px",height:"20px"},children:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{position:"relative",width:"20px",height:"20px"},children:[o&&x>0&&x<1?(0,l.jsx)("div",{style:{position:"absolute",bottom:"0px",right:"0px",backgroundColor:"#145d7996",borderRadius:"5px",borderTopLeftRadius:"0px",borderTopRightRadius:"0px",width:"20px",height:"".concat(20*x,"px"),opacity:"50%",pointerEvents:"none"}}):null,(0,l.jsx)("img",{title:"Item is".concat(x<=0?" not":x<1?" partially":""," farmed"),src:x<1?"".concat(a.wHH().basePath,"/icons/success_hollow.svg"):"".concat(a.wHH().basePath,"/icons/success.svg"),className:"sized-content icon-default-filter flex-center obtained-check-hollow",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.jdG(a.fGE(s),!a.WqU(a.fGE(s)))},style:{opacity:x<1?"100%":"0%",position:"absolute",top:n?"0px":"inherit",right:n?"0px":"inherit",width:"20px",height:"20px"}}),x<=0?null:(0,l.jsx)("img",{src:x<=0?"".concat(a.wHH().basePath,"/icons/success_hollow.svg"):x<1?"".concat(a.wHH().basePath,"/icons/square.svg"):"".concat(a.wHH().basePath,"/icons/success.svg"),className:"sized-content obtained-check-icon".concat(x<1?" icon-partial-filter":""," flex-center").concat(x<=0?" obtained-check-hollow":""),style:{opacity:"50%",pointerEvents:"none"}})]})})}},3104:function(e,t,n){n.d(t,{Z:function(){return u}});var l=n(7437);n(2265);var c=n(6463);n(5183);var a=n(5713),s=n(1524);function o(e){let{component:t,isRawObj:n=!1,width:o=null,showLabel:i=!0}=e;(0,c.useRouter)();let[r,u]=(0,s.Z)(),d=n?t:t.rawObj,x=d.required<=0;return(0,l.jsx)("div",{className:"sized-content v-flex",style:{alignSelf:"stretch",gap:"5px",width:null!=o?o:"auto"},children:x?null:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"5px"},children:[(0,l.jsx)("button",{title:"Increase farmed amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.JOi(d.id)},children:"+"}),i?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",fontStyle:"italic",minWidth:"fit-content"},children:"".concat(r&&r[d.id]?r[d.id].obtained:"0","/").concat(d.required)}):null,(0,l.jsx)("button",{title:"Decrease farmed amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.k5c(d.id)},children:"-"})]})})}n(4899);var i=n(7841),r=n(8553);function u(e){let{component:t,isRawObj:n=!1,width:a=null,showLabel:s=!0}=e;(0,c.useRouter)();let[u,d]=(0,r.Z)();return null==u||"farmMode"===u?(0,l.jsx)(o,{component:t,isRawObj:n,width:a,showLabel:s}):(0,l.jsx)(i.Z,{component:t,isRawObj:n,width:a,showLabel:s})}},7841:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265);var c=n(6463);n(5183);var a=n(5713),s=n(1524);n(4899);var o=n(235);function i(e){let{component:t,isRawObj:n=!1,width:i=null,showLabel:r=!0}=e;(0,c.useRouter)();let[u,d]=(0,s.Z)(),[x,f]=(0,o.Z)(),p=n?t:t.rawObj,h=p.required<=0;a.WqU(p),a.Xxp(p.id);let m=a.Vp9(p.id);return(0,l.jsx)("div",{className:"sized-content v-flex",style:{alignSelf:"stretch",gap:"5px",width:null!=i?i:"auto"},children:h?null:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"5px"},children:[(0,l.jsx)("button",{title:"Increase duplicates amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.F49(p.id)},children:"+"}),r?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",fontStyle:"italic",minWidth:"fit-content"},children:"".concat(m," duplicates")}):null,(0,l.jsx)("button",{title:"Decrease duplicates amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),0>=a.Vp9(p.id)?a.IjR(p.id,!1):a.oLX(p.id)},children:"-"})]})})}n(193),n(9343),n(415)},3744:function(e,t,n){n.d(t,{Z:function(){return o}});var l=n(7437);n(2265);var c=n(6463);n(5183);var a=n(5713),s=n(1524);function o(e){let{object:t,className:n,style:o,collapseWhenNull:i=!0,labelPrefix:r=null}=e;(0,c.useRouter)();let[u,d]=(0,s.Z)(),x=null;if("items"===t.category){let e=t.components;null==e?x="Farmed":u&&Object.keys(e).map(e=>a.fGE(e)).every(e=>u[e.id]&&u[e.id].obtained>=e.required)&&(x="Farmed")}else x="components"===t.category?t.required<=0?null:"".concat(u&&u[t.id]?u[t.id].obtained:"0","/").concat(t.required):null;return(0,l.jsx)("div",{className:"sized-content obtained-label-component".concat(null!=x&&x?"":" hidden"," v-flex").concat(null!=n?n:""),style:o,children:"".concat(null!=r?r:"").concat(null!=x?x:i?"":"x")})}},1815:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265),n(6463),n(1524);var c=n(5713),a=n(6342),s=n(5721),o=n(415);function i(e){let{itemId:t,positionAbsolute:n=!1,obtainedComponents:i=null}=e;return(0,l.jsxs)("div",{className:"sized-content v-flex item-check-parent",style:{position:"absolute",top:"5px",left:"5px",width:"20px",height:"20px",gap:"5px"},children:[(0,l.jsx)(s.Z,{positionAbsolute:!1,itemId:t}),(0,l.jsx)(a.Z,{positionAbsolute:!1,itemId:t}),(0,l.jsx)(o.Z,{positionAbsolute:!1,object:c.fGE(t),isRawObj:!0,onlyShowOnHover:!0,iconStyle:{width:"20px",height:"20px"}})]})}},5721:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(7437);n(2265),n(6463),n(1524);var c=n(5713);function a(e){let{positionAbsolute:t=!0,itemId:n,obtainedComponents:a=null}=e;return"Forma Blueprint"!==n&&c.M4H(n)?(0,l.jsx)("div",{className:"sized-content resurgence-check".concat(t?" absolute":""," v-flex flex-center"),children:(0,l.jsx)("img",{style:{opacity:"100%"},src:"".concat(c.wHH().basePath,"/icons/resurgence.svg"),className:"sized-content resurgence-check-icon flex-center"})}):null}},1886:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265),n(6463);var c=n(5713),a=n(9274);n(5334),n(4751),n(5183),n(1815),n(6487),n(4899),n(5721);var s=n(1672),o=n(235);function i(e){let{component:t,showLabel:n=!1,alwaysShowLabel:i=!1}=e,[r,u]=(0,o.Z)(),[d,x]=(0,a.Z)(),f=t.required<=0,p=c.Vp9(t.id);return f?null:p?(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"5px"},children:[(0,l.jsx)("div",{title:"Increase sell amount",className:"sized-content h-flex object-page-component-owned-button flex-center",style:{cursor:"pointer"},onClick:e=>{e.preventDefault(),e.stopPropagation(),c.kRT(t.id)},children:"+"}),n?(0,l.jsx)(s.Z,{alwaysShowLabel:i,object:t}):null,(0,l.jsx)("div",{title:"Decrease sell amount",className:"sized-content h-flex object-page-component-owned-button flex-center",style:{cursor:"pointer"},onClick:e=>{e.preventDefault(),e.stopPropagation(),c.qmt(t.id)},children:"-"})]}):(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{maxWidth:"80px",textAlign:"center",fontSize:"x-small",fontStyle:"italic"},children:"You don't have duplicates for this component"})}},1672:function(e,t,n){n.d(t,{Z:function(){return o}});var l=n(7437);n(2265);var c=n(6463);n(5183);var a=n(5713);n(1524),n(235);var s=n(9274);function o(e){let{object:t,className:n,style:o,alwaysShowLabel:i=!1,collapseWhenNull:r=!0,labelPrefix:u=null}=e;(0,c.useRouter)();let[d,x]=(0,s.Z)(),f=null;if("components"===t.category){let e=a.$7W(t.id);if(e>0){let n=a.QEb(t);f=(0,l.jsxs)("span",{className:"sized-content h-flex",style:{whiteSpace:"pre"},children:["selling ",e," - ",(0,l.jsx)("img",{style:{marginTop:"2px",width:"20px",height:"20px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/Orokin Ducats.png")}),n*e]})}else f=i?(0,l.jsxs)("span",{className:"sized-content h-flex",style:{whiteSpace:"pre"},children:["selling 0 - ",(0,l.jsx)("img",{style:{marginTop:"2px",width:"20px",height:"20px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/Orokin Ducats.png")}),"0"]}):null}else f=null;return(0,l.jsxs)("div",{className:"sized-content obtained-label-component".concat(null!=f&&f?"":" hidden"," v-flex").concat(null!=n?n:""),style:o,children:["".concat(null!=u?u:""),null!=f||i?f:r?"":"x"]})}},4553:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437),c=n(2265),a=n(6463),s=n(5713),o=n(2147);function i(e){let{tabs:t,defaultTab:n,onTabChange:i,className:r,style:u,hasMinWidth:d=!1,headerControls:x=null}=e;(0,a.useRouter)();let f=(0,a.useSearchParams)(),p=(0,c.useRef)(null),h=f.get("tab")||n,[m,v]=(0,c.useState)(h);return(0,l.jsxs)("div",{className:"sized-content v-flex tab-component-container flex-center".concat(r?" ".concat(r):""),style:s.unj({},u),children:[(0,l.jsx)(o.Z,{tabs:Object.keys(t).map(e=>({title:e,id:e,label:e})),changeTab:e=>{v(e),i&&i(e)},activeTab:m,headerControls:x}),(0,l.jsx)("div",{className:"sized-content tab-component-body-container v-flex flex-center",ref:p,children:t[m]})]})}n(1498)},2147:function(e,t,n){n.d(t,{Z:function(){return u}});var l=n(7437),c=n(2265),a=n(7138),s=n(6463),o=n(5713);n(9343);var i=n(1007),r=n(1498);function u(e){let{tabs:t,activeTab:n,changeTab:u,headerControls:d=null}=e;(0,s.useRouter)();let x=(0,s.usePathname)(),f=(0,s.useSearchParams)();return(0,c.useContext)(r.A),(0,l.jsxs)("div",{className:"sized-content tab-header h-flex flex-center",style:{position:"relative",alignSelf:"stretch"},children:[(0,l.jsx)("div",{className:"sized-remaining tab-header-tab-button-container h-flex flex-center",style:{overflow:"auto"},children:t.map((e,t)=>(0,l.jsx)(a.default,{href:"?".concat((()=>{let t=new URLSearchParams(f.toString());return t.set("tab",e.id),t.toString()})()),title:e.title,onClick:t=>{if("".concat(x,"?").concat(f.toString())==="".concat(x,"?tab=").concat(e.id)){t.preventDefault(),t.stopPropagation();return}u(e.id)},className:"tab-header-link tab-header-tab-button".concat(0==n.localeCompare(e.id)?" selected":""),children:e.label},"".concat(t,"-").concat(e.title)))}),d&&d[n]?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)(i.Z,{className:"sized-content h-flex tab-component-header-control-button",headerContent:(0,l.jsx)("img",{className:"sized-content h-flex flex-center icon-default-filter",style:{width:"20px",height:"20px"},src:"".concat(o.wHH().basePath,"/icons/filter.svg")}),children:e=>d[n]})}):null]})}},1498:function(e,t,n){n.d(t,{A:function(){return l}});let l=(0,n(2265).createContext)()},8553:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.rNL()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.ugz.addListener(n,!0),()=>{c.ugz.removeListener(n)}),[]),[e,t]}},5342:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.Nqd()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.xgN.addListener(n,!0),()=>{c.xgN.removeListener(n)}),[]),[e,t]}},1524:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.u4o()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.X3W.addListener(n,!0),()=>{c.X3W.removeListener(n)}),[]),[e,t]}},235:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.l3M()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.hwG.addListener(n,!0),()=>{c.hwG.removeListener(n)}),[]),[e,t]}},9274:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.S_9()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.HQe.addListener(n,!0),()=>{c.HQe.removeListener(n)}),[]),[e,t]}},8231:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.dXH()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.Vkx.addListener(n,!0),()=>{c.Vkx.removeListener(n)}),[]),[e,t]}}}]);