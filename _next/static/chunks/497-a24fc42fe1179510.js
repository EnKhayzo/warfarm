"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[497],{4751:function(e,t,n){n.d(t,{Z:function(){return x}});var l=n(7437);n(2265);var c=n(6463),a=n(7138),o=n(5255),s=n(5713),i=n(1524);n(5721);var r=n(1815),u=n(6487),d=n(4899);n(3744);var f=n(3104);function x(e){var t;let{component:n,showCorrespondingItem:x=!1,darkenIfVaulted:p=!1,showButtons:h=!0,isRawObj:m=!1,forceMode:g=null,fullName:v=!1,iconHeight:b="75px",width:y=null,className:j,style:w}=e;(0,c.useRouter)();let[N,z]=(0,i.Z)();if(null==n)return console.warn("component is null!"),null;let Z=m?s.LnC(n.id):n.route,S=m?s.U$T(n):n.rarity;m||(n=n.rawObj);let k=n.required<=0;return(0,l.jsxs)("div",{className:"sized-content v-flex".concat(j?" ".concat(j):""),style:s.unj({alignSelf:"stretch",gap:"5px"},w),children:[(0,l.jsxs)(a.default,{href:Z,className:"sized-content item-page-component-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(t=" ".concat(S))&&void 0!==t?t:""),style:{gap:"5px",position:"relative",cursor:"pointer",width:null!=y?y:"auto",alignSelf:"stretch",opacity:p?n.vaulted?"50%":"100%":"unset"},children:[(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",children:[x?(0,l.jsx)("img",{style:{height:"".concat(Number(b.replace("px",""))/1.7,"px")},src:"".concat(s.wHH().basePath,"/images/").concat(n.parentItem,".png")}):null,(0,l.jsx)("img",{style:{height:b},src:"".concat(s.wHH().basePath,"/images/").concat(n.fullName,".png")})]}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",textAlign:"center"},children:v?n.fullName:n.name}),k?null:(0,l.jsx)(d.Z,{forceMode:g,object:s.fGE(n.id)})]}),(0,l.jsx)(o.Z,{itemId:n.id}),(0,l.jsx)(r.Z,{itemId:n.id,positionAbsolute:!0,showEyeButton:!1}),"farmMode"!==g?(0,l.jsx)(u.Z,{rawObj:s.fGE(n.id)}):null]}),h?(0,l.jsx)(f.Z,{component:n,isRawObj:!0,forceMode:g,showLabel:!1}):null]})}},8733:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437);n(2265),n(6463);var c=n(5713);n(9274),n(5334);var a=n(4751);n(5255),n(1815),n(6487),n(4899),n(5721),n(1672),n(235),n(7841),n(2080),n(6309);var o=n(1524);function s(e){let{positionAbsolute:t=!0,itemId:n,showLabel:s=!1,alwaysShow:i=!1,alwaysHide:r=!1,mobileAlwaysShow:u=!0,mobileAlwaysHide:d=!1}=e,[f,x]=(0,o.Z)(),p=c.fGE(n);if(null==p||"components"!==p.category&&"items"!==p.category&&"relics"!==p.category)return null;let h=c.UKh(p),m=h.reduce((e,t)=>e+=c.rJB(t.id),0);return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("button",{title:"Set obtained/farmed components",className:"sized-content sell-button".concat(t?" absolute":"").concat(i?" always-show":"").concat(r?" always-hide":"").concat(u?" mobile-always-show":"").concat(d?" mobile-always-hide":""," h-flex"),style:{gap:"5px"},onClick:e=>{e.stopPropagation(),e.preventDefault();let t=e.target.getBoundingClientRect();c.uQD({position:{top:"".concat(t.top+10,"px"),left:"".concat(t.left+10,"px")},children:e=>(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{cursor:"default",borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},onClick:e=>{e.stopPropagation(),e.preventDefault()},children:h.map((e,t)=>(0,l.jsx)(a.Z,{fullName:!0,component:e,isRawObj:!0,forceMode:"farmMode"},"".concat(t,"-").concat(e.id)))})})},children:[(0,l.jsx)("img",{src:"".concat(c.wHH().basePath,"/icons/eye.svg"),className:"sized-content ".concat(m>0?"eye-icon":"sell-button-icon").concat(i?" always-show":"").concat(r?" always-hide":"").concat(u?" mobile-always-show":"").concat(d?" mobile-always-hide":""," icon-default-filter flex-center"),style:{}}),m>0?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px",fontSize:"small",fontStyle:"italic"},children:m}):null,s?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px",fontSize:"small"},children:"Obtained/Farmed"}):null]})})}},5334:function(e,t,n){var l=n(7437),c=n(2265),a=n(5713);(0,c.forwardRef)((e,t)=>{let{position:n={top:"50px"},children:o,buttons:s=null,className:i="",style:r={},showInitial:u=!1,pulseShowCallback:d=null}=e,f=(0,c.useRef)(null),[x,p]=(0,c.useState)(u),h=e=>{f.current&&!f.current.contains(e.target)&&p(!1)};(0,c.useEffect)(()=>(x?document.addEventListener("mousedown",h):document.removeEventListener("mousedown",h),()=>{document.removeEventListener("mousedown",h)}),[x]),(0,c.useImperativeHandle)(t,()=>({show:e=>{e&&g(e),p(!0)},hide:()=>p(!1),toggle:e=>{e&&g(e),p(e=>!e)}}));let[m,g]=(0,c.useState)(n);return(0,l.jsx)("div",{ref:f,className:" ".concat(i),style:a.unj({display:x?"block":"none",position:"absolute",top:m.top,left:m.left,listStyleType:"none",padding:"10px",margin:"5px",backgroundColor:"var(--color-sextenary)",borderRadius:"5px",zIndex:1e3,overflow:"auto",maxHeight:"80vh",...r}),children:x&&o?o({closeMenu:()=>p(!1)}):s?(0,l.jsx)("ul",{children:s.map((e,t)=>(0,l.jsx)("li",{style:{padding:"5px 0",cursor:"pointer"},children:e.label},"".concat(t,"-").concat(e.label)))}):null})}).displayName="ContextMenu"},1007:function(e,t,n){var l=n(7437),c=n(2265),a=n(5713);t.Z=e=>{let{top:t,children:n,title:o,buttons:s,headerContent:i,className:r,style:u,forceShowState:d=null}=e,[f,x]=(0,c.useState)(null!=d&&d),p=(0,c.useRef)(null),h=e=>{p.current&&!p.current.contains(e.target)&&x(!1)};return(0,c.useEffect)(()=>(f?document.addEventListener("mousedown",h):document.removeEventListener("mousedown",h),()=>{document.removeEventListener("mousedown",h)}),[f]),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{padding:"0px",margin:"0px"},children:[(0,l.jsx)("button",{title:o,onClick:()=>{x(!f)},className:"sized-content h-flex global-settings-button".concat(r?" ".concat(r):""),style:{borderRadius:"5px",padding:"5px"},children:i}),(0,l.jsx)("div",{ref:p,className:r,style:a.unj({display:f?"":"none",top:t,position:"absolute",top:"50px",listStyleType:"none",padding:"10px",margin:0,backgroundColor:"var(--color-sextenary)",borderRadius:"5px",zIndex:1e3,margin:"5px",overflow:"auto",maxHeight:"80vh"},u),children:n?n({closeMenu:()=>x(!1)}):(0,l.jsx)("ul",{children:s.map((e,t)=>(0,l.jsx)("li",{style:{padding:"5px 0"},children:e.label},"".concat(t,"-").concat(e.label)))})})]})}},415:function(e,t,n){n.d(t,{Z:function(){return r}});var l=n(7437);n(2265);var c=n(6463);n(5255);var a=n(5713),o=n(1524);n(4899);var s=n(235);n(193);var i=n(9343);function r(e){let{positionAbsolute:t=!1,object:n,isRawObj:r=!1,onlyShowOnHover:u=!1,iconStyle:d}=e;(0,c.useRouter)();let[f,x]=(0,o.Z)(),[p,h]=(0,s.Z)(),m=r?n:n.rawObj;if(null==m||"items"!==m.category&&"components"!==m.category||!a.WqU(n))return null;let g=a.tuS(m);return(0,l.jsx)(i.Z,{label:"",title:"Set object to".concat(g?" not":""," crafted"),iconClassName:"icon-default-filter".concat(u&&!g?" icon-default-show-hover":"").concat(t?"absolute":""),iconStyle:a.unj({width:"30px",height:"30px",objectFit:"contain"},d),iconUrl:g?"".concat(a.wHH().basePath,"/icons/crafted.svg"):"".concat(a.wHH().basePath,"/icons/crafted_hollow.svg"),onClick:e=>{e.preventDefault(),e.stopPropagation(),a.wI4(m,!g)}})}},6487:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265);var c=n(6463);n(5255);var a=n(5713);n(1524);var o=n(235),s=n(8553);function i(e){let{rawObj:t,className:n,forceShow:i=!1,style:r}=e;(0,c.useRouter)();let[u,d]=(0,o.Z)(),[f,x]=(0,s.Z)();if((null==t||"ducatMode"!==f)&&!i)return null;let p=a.Vp9(t.id),h=a.QEb(t),m=p*h;return"items"===t.category&&(m=a.pxc(t.id).reduce((e,t)=>e+=a.QEb(a.fGE(t))*a.Vp9(t),0)),(0,l.jsx)(l.Fragment,{children:h<=0?null:(0,l.jsxs)("div",{className:"sized-content obtained-extra-component h-flex flex-center".concat(null!=n?n:""),style:a.unj({},r),children:[(0,l.jsx)("img",{style:{marginTop:"2px",width:"20px",height:"20px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/Orokin Ducats.png")}),(0,l.jsxs)("span",{className:"sized-content h-flex",style:{whiteSpace:"pre"},children:["".concat(h),m<=0?null:(0,l.jsxs)("div",{className:"sized-content h-flex",children:[" (",(0,l.jsxs)("span",{className:"sized-content h-flex",style:{gap:"2px"},children:[(0,l.jsx)("img",{style:{marginTop:"2px",width:"20px",height:"20px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/Orokin Ducats.png")}),"".concat(m)]}),")"]})]})]})})}},4838:function(e,t,n){n.d(t,{Z:function(){return u}});var l=n(7437);n(2265),n(6463);var c=n(5713);n(9274),n(5334),n(4751),n(5255),n(1815);var a=n(6487),o=n(4899),s=n(5721);n(1672);var i=n(235),r=n(7841);function u(e){let{positionAbsolute:t=!0,itemId:n,showLabel:u=!1,alwaysShow:d=!1,alwaysHide:f=!1,mobileAlwaysShow:x=!0,mobileAlwaysHide:p=!1}=e,[h,m]=(0,i.Z)(),g=c.fGE(n);return null==g||"items"!==g.category&&"components"!==g.category?null:(c.Vp9(n),c.WqU(g),(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("button",{title:"Set duplicate components",className:"sized-content sell-button".concat(t?" absolute":"").concat(d?" always-show":"").concat(f?" always-hide":"").concat(x?" mobile-always-show":"").concat(p?" mobile-always-hide":""," h-flex flex-center"),style:{gap:"5px"},onClick:e=>{e.stopPropagation(),e.preventDefault();let t=e.target.getBoundingClientRect();c.uQD({position:{top:"".concat(t.top+10,"px"),left:"".concat(t.left+10,"px")},children:e=>{var t;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{cursor:"default",borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},onClick:e=>{e.stopPropagation(),e.preventDefault()},children:[(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{whiteSpace:"pre"},children:[null!==(t=g.fullName)&&void 0!==t?t:g.name,"'s duplicates"]}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},children:("items"===g.category?c.UKN(g.id):[g]).map((e,t)=>{var i;let u=e.required<=0;return(0,l.jsxs)("div",{className:"sized-content v-flex",style:{alignSelf:"stretch",gap:"5px"},children:[(0,l.jsxs)("div",{className:"sized-remaining item-page-component-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(i=" ".concat(c.U$T(e)))&&void 0!==i?i:""),style:{gap:"5px",position:"relative",cursor:"pointer",alignSelf:"stretch",minWidth:"80px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{width:"80px",height:"80px",objectFit:"contain"},src:"".concat(c.wHH().basePath,"/images/").concat(e.fullName,".png")})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",textAlign:"center"},children:e.name}),u?null:(0,l.jsx)(o.Z,{forceMode:"ducatMode",object:e})]}),(0,l.jsx)(s.Z,{positionAbsolute:!1,itemId:n}),(0,l.jsx)(a.Z,{forceShow:!0,rawObj:c.fGE(e.id)})]}),u?null:(0,l.jsx)(r.Z,{component:e,isRawObj:!0,showLabel:!1})]},"".concat(t,"-").concat(e.id))})})]})}})},children:[(0,l.jsx)("img",{src:"".concat(c.wHH().basePath,"/icons/duplicates.svg"),className:"sized-content sell-button-icon flex-center".concat(d?" always-show":"").concat(f?" always-hide":"").concat(x?" mobile-always-show":"").concat(p?" mobile-always-hide":""),style:{}}),u?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px",fontSize:"small"},children:"Duplicates"}):null]})}))}},7774:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437);n(2265);var c=n(6463);n(5255);var a=n(5713);n(1524);var o=n(235);function s(e){let{object:t,className:n,style:s,collapseWhenNull:i=!0,labelPrefix:r=null}=e;(0,c.useRouter)();let[u,d]=(0,o.Z)(),f=null;if("items"===t.category){let e=a.pxc(t.id).reduce((e,t)=>e+=a.Vp9(t),0);f="".concat(e," duplicates")}else if("components"===t.category){let e=a.Vp9(t.id);f="".concat(e," duplicate").concat(1==e?"":"s")}else f=null;return(0,l.jsx)("div",{className:"sized-content obtained-label-component".concat(null!=f&&f?"":" hidden"," v-flex").concat(null!=n?n:""),style:s,children:"".concat(null!=r?r:"").concat(null!=f?f:i?"":"x")})}},9343:function(e,t,n){n.d(t,{Z:function(){return o}});var l=n(7437),c=n(2265);n(6463);var a=n(5713);function o(e){let{label:t,title:n=null,iconUrl:o,onClick:s,className:i,style:r,iconClassName:u,iconStyle:d=null,highlight:f=!1,blinkEnabled:x=!0,forceBlinking:p=null,iconHeight:h="15px"}=e,[m,g]=(0,c.useState)(!1),v=(0,c.useRef)(null),b=(0,c.useRef)(null),y=()=>{let e=()=>{g(!0),v.current=setTimeout(()=>{g(!1)},250)};m&&(v.current&&(clearTimeout(v.current),v.current=null),b.offsetHeight,e(),b.offsetHeight),(f||p)&&e()};return(0,c.useEffect)(()=>(p?y():g(!1),()=>{}),[p]),(0,l.jsx)("div",{ref:b,className:"sized-content icon-button".concat(f?" highlight":""," h-flex flex-center").concat(i?" ".concat(i):"").concat(m?" blinking":""),style:r,title:n,onClick:e=>{x&&y(),s&&s(e)},children:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"5px"},children:[(0,l.jsx)("img",{className:"sized-content v-flex flex-center icon-default".concat(u?" ".concat(u):""),style:a.unj({height:h},d),src:o}),null==t||t.length<=0?null:(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{marginBottom:"2px"},children:t})]})})}},5255:function(e,t,n){n.d(t,{Z:function(){return d}});var l=n(7437);n(2265),n(6463);var c=n(8231);n(5713);var a=n(8553),o=n(3595),s=n(616),i=n(4838);function r(e){let{positionAbsolute:t=!0,itemId:n,horizontal:a=!1,mobileAlwaysHide:o=!1,mobileAlwaysShow:r=!0}=e,[u,d]=(0,c.Z)();return(0,l.jsxs)("div",{className:"sized-content ".concat(a?"h-flex":"v-flex"," flex-center sell-button").concat(t?" absolute":""),style:{gap:"5px"},children:[(0,l.jsx)(s.Z,{itemId:n,positionAbsolute:!1,mobileAlwaysShow:r,mobileAlwaysHide:o}),(0,l.jsx)(i.Z,{itemId:n,positionAbsolute:!1,mobileAlwaysShow:r,mobileAlwaysHide:o})]})}function u(e){let{positionAbsolute:t=!0,itemId:n,horizontal:c=!1,mobileAlwaysHide:a=!1,mobileAlwaysShow:s=!0}=e;return(0,l.jsxs)("div",{className:"sized-content ".concat(c?"h-flex":"v-flex"," flex-center sell-button").concat(t?" absolute":""),style:{gap:"5px"},children:[(0,l.jsx)(o.Z,{itemId:n,positionAbsolute:!1,mobileAlwaysShow:s,mobileAlwaysHide:a}),(0,l.jsx)(i.Z,{itemId:n,positionAbsolute:!1,mobileAlwaysShow:s,mobileAlwaysHide:a})]})}function d(e){let{positionAbsolute:t=!0,itemId:n,horizontal:o=!1,mobileAlwaysHide:s=!1,mobileAlwaysShow:i=!0}=e,[d,f]=(0,c.Z)(),[x,p]=(0,a.Z)();return null==x||"farmMode"===x?(0,l.jsx)(u,{horizontal:o,positionAbsolute:t,itemId:n,mobileAlwaysHide:s,mobileAlwaysShow:i}):(0,l.jsx)(r,{horizontal:o,positionAbsolute:t,itemId:n,mobileAlwaysHide:s,mobileAlwaysShow:i})}n(8733)},193:function(e,t,n){var l=n(7437),c=n(2265),a=n(5713);t.Z=e=>{let{textLabel:t,name:n,value:o,onChange:s,onClick:i,checked:r,containerClassName:u,containerStyle:d}=e,f=(0,c.useRef)();return(0,l.jsxs)("div",{className:"sized-content h-flex".concat(null!=u?" ".concat(u):""),style:a.unj({gap:"5px",padding:"0px",margin:"0px"},d),onClick:e=>{e.stopPropagation(),e.preventDefault();let t=!f.current.checked;f.current.checked=t;let n=new Event("input",{bubbles:!1}),l={target:f.current,preventDefault:()=>{},stopPropagation:()=>{}};s&&s(l),f.current.dispatchEvent(n)},children:[(0,l.jsx)("input",{ref:f,className:"sized-content",type:"checkbox",name:n,value:o,onClick:e=>{e.stopPropagation(),i&&i(e)},onChange:e=>{e.stopPropagation(),s&&s(e)},defaultChecked:null!=r&&r}),(0,l.jsx)("div",{className:"sized-content",style:{marginBottom:"2px"},children:t})]})}},8106:function(e,t,n){n.d(t,{Z:function(){return o}});var l=n(7437),c=n(2265);function a(e){let{loadFunc:t,fallback:n}=e,[a,o]=(0,c.useState)(null);return(0,c.useRef)(!1),!function(e){let t=(0,c.useRef)(!1),n=(0,c.useRef)(!1);(0,c.useEffect)(()=>{!t.current&&e&&e.mount&&(e.mount(),t.current=!0)},[]),(0,c.useEffect)(()=>{e&&e.dataUpdate&&e.dataUpdate()},e&&e.dataArray?e.dataArray:[]),(0,c.useEffect)(()=>{e&&e.anyUpdate&&e.anyUpdate()}),(0,c.useEffect)(()=>{if(e&&e.clearOrUnmount)return e.clearOrUnmount()},e&&e.dataArray?e.dataArray:[]),(0,c.useEffect)(()=>{if(!n.current&&e&&e.unmount)return n.current=!0,e.unmount()},[])}({mount:()=>{t().then(e=>{let t=()=>e;t.displayName="LazyLoadedComponent",o(()=>t)})}}),a?(0,l.jsx)(a,{}):n}function o(e){let{fallback:t,loadFunc:n}=e;return(0,l.jsx)(a,{loadFunc:n,fallback:t})}n(5713)},4899:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265);var c=n(6463);n(5255),n(5713),n(1524);var a=n(3744),o=n(7774),s=n(8553);function i(e){let{object:t,className:n,style:i,forceMode:r=null,exclusiveMode:u=null,collapseWhenNull:d=!0,labelPrefix:f=null}=e;(0,c.useRouter)();let[x,p]=(0,s.Z)();if(null!=r){if("farmMode"===r)return(0,l.jsx)(a.Z,{object:t,className:n,style:i,collapseWhenNull:d,labelPrefix:f});if("ducatMode"===r)return(0,l.jsx)(o.Z,{object:t,className:n,style:i,collapseWhenNull:d,labelPrefix:f})}let h=null==u||x===u;return null==x||"farmMode"===x?h?(0,l.jsx)(a.Z,{object:t,className:n,style:i,collapseWhenNull:d,labelPrefix:f}):null:h?(0,l.jsx)(o.Z,{object:t,className:n,style:i,collapseWhenNull:d,labelPrefix:f}):null}},6342:function(e,t,n){n.d(t,{Z:function(){return o}});var l=n(7437);n(2265),n(6463);var c=n(1524),a=n(5713);function o(e){let{positionAbsolute:t=!0,hollowAbsolute:n=!0,itemId:o,showPartial:s=!0,obtainedComponents:i=null}=e,[r,u]=(0,c.Z)(),d=a.fGE(o);if(null==d||"missions"===d.category)return null;let f=s?a.km8(d,r):a.WqU(d,r)?1:0;return(0,l.jsx)("div",{className:"sized-content h-flex obtained-check".concat(t?" absolute":""," v-flex flex-center").concat(f<=0?" obtained-item-check-container-unfarmed":""),style:{position:t?"absolute":"relative",width:"20px",height:"20px"},children:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{position:"relative",width:"20px",height:"20px"},children:[s&&f>0&&f<1?(0,l.jsx)("div",{style:{position:"absolute",bottom:"0px",right:"0px",backgroundColor:"#145d7996",borderRadius:"5px",borderTopLeftRadius:"0px",borderTopRightRadius:"0px",width:"20px",height:"".concat(20*f,"px"),opacity:"50%",pointerEvents:"none"}}):null,(0,l.jsx)("img",{title:"Item is".concat(f<=0?" not":f<1?" partially":""," farmed"),src:f<1?"".concat(a.wHH().basePath,"/icons/success_hollow.svg"):"".concat(a.wHH().basePath,"/icons/success.svg"),className:"sized-content icon-default-filter flex-center obtained-check-hollow",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.jdG(a.fGE(o),!a.WqU(a.fGE(o)))},style:{opacity:f<1?"100%":"0%",position:"absolute",top:n?"0px":"inherit",right:n?"0px":"inherit",width:"20px",height:"20px"}}),f<=0?null:(0,l.jsx)("img",{src:f<=0?"".concat(a.wHH().basePath,"/icons/success_hollow.svg"):f<1?"".concat(a.wHH().basePath,"/icons/square.svg"):"".concat(a.wHH().basePath,"/icons/success.svg"),className:"sized-content obtained-check-icon".concat(f<1?" icon-partial-filter":""," flex-center").concat(f<=0?" obtained-check-hollow":""),style:{opacity:"50%",pointerEvents:"none"}})]})})}},3104:function(e,t,n){n.d(t,{Z:function(){return u}});var l=n(7437);n(2265);var c=n(6463);n(5255);var a=n(5713),o=n(1524);function s(e){let{component:t,isRawObj:n=!1,width:s=null,showLabel:i=!0,style:r}=e;(0,c.useRouter)();let[u,d]=(0,o.Z)(),f=n?t:t.rawObj,x=f.required<=0;return(0,l.jsx)("div",{className:"sized-content v-flex",style:{alignSelf:"stretch",gap:"5px",width:null!=s?s:"auto"},children:x?null:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:a.unj({gap:"5px"},r),children:[(0,l.jsx)("button",{title:"Increase farmed amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.JOi(f.id)},children:"+"}),i?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",fontStyle:"italic",minWidth:"fit-content"},children:"".concat(u&&u[f.id]?u[f.id].obtained:"0","/").concat(f.required)}):null,(0,l.jsx)("button",{title:"Decrease farmed amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.k5c(f.id)},children:"-"})]})})}n(4899);var i=n(7841),r=n(8553);function u(e){let{component:t,isRawObj:n=!1,forceMode:a=null,width:o=null,showLabel:u=!0,style:d}=e;(0,c.useRouter)();let[f,x]=(0,r.Z)();if(null!=a){if("farmMode"===a)return(0,l.jsx)(s,{component:t,isRawObj:n,width:o,showLabel:u,style:d});if("ducatMode"===a)return(0,l.jsx)(i.Z,{component:t,isRawObj:n,width:o,showLabel:u,style:d})}return null==f||"farmMode"===f?(0,l.jsx)(s,{component:t,isRawObj:n,width:o,showLabel:u,style:d}):(0,l.jsx)(i.Z,{component:t,isRawObj:n,width:o,showLabel:u,style:d})}},7841:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265);var c=n(6463);n(5255);var a=n(5713),o=n(1524);n(4899);var s=n(235);function i(e){let{component:t,isRawObj:n=!1,width:i=null,showLabel:r=!0,style:u}=e;(0,c.useRouter)();let[d,f]=(0,o.Z)(),[x,p]=(0,s.Z)(),h=n?t:t.rawObj,m=h.required<=0;a.WqU(h),a.Xxp(h.id);let g=a.Vp9(h.id);return(0,l.jsx)("div",{className:"sized-content v-flex",style:{alignSelf:"stretch",gap:"5px",width:null!=i?i:"auto"},children:m?null:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:a.unj({gap:"5px"},u),children:[(0,l.jsx)("button",{title:"Increase duplicates amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.F49(h.id)},children:"+"}),r?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",fontStyle:"italic",minWidth:"fit-content"},children:"".concat(g," duplicates")}):null,(0,l.jsx)("button",{title:"Decrease duplicates amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),0>=a.Vp9(h.id)?a.IjR(h.id,!1):a.oLX(h.id)},children:"-"})]})})}n(193),n(9343),n(415)},3744:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437);n(2265);var c=n(6463);n(5255);var a=n(5713),o=n(1524);function s(e){let{object:t,className:n,style:s,collapseWhenNull:i=!0,labelPrefix:r=null}=e;(0,c.useRouter)();let[u,d]=(0,o.Z)(),f=null;if("items"===t.category){let e=t.components;null==e?f="Farmed":u&&Object.keys(e).map(e=>a.fGE(e)).every(e=>u[e.id]&&u[e.id].obtained>=e.required)&&(f="Farmed")}else f="components"===t.category?t.required<=0?null:"".concat(u&&u[t.id]?u[t.id].obtained:"0","/").concat(t.required):null;return(0,l.jsx)("div",{className:"sized-content obtained-label-component".concat(null!=f&&f?"":" hidden"," v-flex").concat(null!=n?n:""),style:s,children:"".concat(null!=r?r:"").concat(null!=f?f:i?"":"x")})}},1815:function(e,t,n){n.d(t,{Z:function(){return u}});var l=n(7437);n(2265),n(6463),n(1524);var c=n(5713),a=n(6342),o=n(5721),s=n(415),i=n(5507),r=n(8733);function u(e){let{itemId:t,showEyeButton:n=!0,positionAbsolute:u=!1,obtainedComponents:d=null}=e;return(0,l.jsxs)("div",{className:"sized-content v-flex item-check-parent",style:{position:"absolute",top:"5px",left:"5px",width:"20px",height:"20px",gap:"5px"},children:[(0,l.jsx)(o.Z,{positionAbsolute:!1,itemId:t}),(0,l.jsx)(a.Z,{positionAbsolute:!1,itemId:t}),n?(0,l.jsx)(r.Z,{itemId:t,positionAbsolute:!1}):null,(0,l.jsx)(i.Z,{positionAbsolute:!1,itemId:t}),(0,l.jsx)(s.Z,{positionAbsolute:!1,object:c.fGE(t),isRawObj:!0,onlyShowOnHover:!0,iconStyle:{width:"20px",height:"20px"}})]})}},5507:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437);n(2265),n(6463);var c=n(5713);n(9274),n(5334),n(4751),n(5255),n(1815),n(6487),n(4899),n(5721),n(1672),n(235),n(7841);var a=n(2080),o=n(6309);function s(e){let{positionAbsolute:t=!0,itemId:n,style:s,showIfHas:i=!0,iconStyle:r,showLabel:u=!1,alwaysShow:d=!1,alwaysHide:f=!1,mobileAlwaysShow:x=!0,mobileAlwaysHide:p=!1}=e,[h,m]=(0,a.Z)(),g=c.fGE(n);if(null==g||"relics"!==g.category)return null;let v=c.ilb(g.id);return i||!i&&v>0?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("button",{title:"Set owned relics (per refinement level)",className:"sized-content sell-button".concat(t?" absolute":"").concat(d?" always-show":"").concat(f?" always-hide":"").concat(x?" mobile-always-show":"").concat(p?" mobile-always-hide":""," h-flex"),style:c.unj({gap:"5px",alignItems:"center"},s),onClick:e=>{e.stopPropagation(),e.preventDefault();let t=e.target.getBoundingClientRect();c.uQD({position:{top:"".concat(t.top+10,"px"),left:"".concat(t.left+10,"px")},children:e=>(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{cursor:"default",borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},onClick:e=>{e.stopPropagation(),e.preventDefault()},children:c.mjy().map((e,t)=>(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",children:[(0,l.jsx)("img",{style:{width:"100px",height:"100px",objectFit:"cover"},src:"".concat(c.wHH().basePath,"/images/").concat(g.tier," ").concat(c.fmv(e),".png")}),(0,l.jsx)("span",{style:{fontWeight:"bold"},children:g.name}),(0,l.jsx)("span",{children:c.fmv(e)}),(0,l.jsx)(o.Z,{relic:g,refinement:e})]},"".concat(t,"-").concat(e)))})})},children:[(0,l.jsx)("img",{src:"".concat(c.wHH().basePath,"/icons/owned.svg"),className:"sized-content ".concat(v>0?"eye-icon":"sell-button-icon").concat(d?" always-show":"").concat(f?" always-hide":"").concat(x?" mobile-always-show":"").concat(p?" mobile-always-hide":""," icon-default-filter flex-center"),style:c.unj({},r)}),v>0?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px",fontSize:"small",fontStyle:"italic"},children:v}):null,u?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px",fontSize:"small"},children:"Owned"}):null]})}):null}},6309:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437);n(2265);var c=n(6463);n(5255);var a=n(5713);n(1524),n(4899),n(235),n(193),n(9343),n(415);var o=n(2080);function s(e){let{relic:t,refinement:n="intact",width:s=null,showLabel:i=!0,style:r}=e;(0,c.useRouter)();let[u,d]=(0,o.Z)();if("relics"!==t.category)return null;let f=a.HGo(t.id,n);return(0,l.jsx)("div",{className:"sized-content v-flex",style:{alignSelf:"stretch",gap:"5px",width:null!=s?s:"auto"},children:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:a.unj({gap:"5px"},r),children:[(0,l.jsx)("button",{title:"Increase relics owned amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.mlR(t.id,n)},children:"+"}),i?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",fontStyle:"italic",minWidth:"fit-content"},children:"".concat(f," owned")}):null,(0,l.jsx)("button",{title:"Decrease relics owned amount",className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),a.lNy(t.id,n)},children:"-"})]})})}},5721:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(7437);n(2265),n(6463),n(1524);var c=n(5713);function a(e){let{positionAbsolute:t=!0,itemId:n,obtainedComponents:a=null,iconStyle:o}=e;return"Forma Blueprint"!==n&&c.M4H(n)?(0,l.jsx)("div",{className:"sized-content resurgence-check".concat(t?" absolute":""," v-flex flex-center"),children:(0,l.jsx)("img",{style:c.unj({opacity:"100%"},o),src:"".concat(c.wHH().basePath,"/icons/resurgence.svg"),className:"sized-content resurgence-check-icon flex-center"})}):null}},616:function(e,t,n){n.d(t,{Z:function(){return f}});var l=n(7437);n(2265),n(6463);var c=n(5713),a=n(9274);n(5334),n(4751),n(5255),n(1815);var o=n(6487),s=n(4899),i=n(5721),r=n(1672),u=n(235),d=n(1886);function f(e){let{positionAbsolute:t=!0,itemId:n,showLabel:f=!1,alwaysShow:x=!1,alwaysHide:p=!1,mobileAlwaysShow:h=!0,mobileAlwaysHide:m=!1}=e,[g,v]=(0,u.Z)(),[b,y]=(0,a.Z)(),j=c.fGE(n);if("items"!==j.category&&"components"!==j.category)return null;let w="items"===j.category?c.pxc(n).reduce((e,t)=>e+=c.$7W(t),0):c.$7W(n),N=w>0;return c.WqU(j),(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("button",{title:"Sell components",className:"sized-content h-flex sell-button".concat(t?" absolute":"").concat(x?" always-show":"").concat(p?" always-hide":"").concat(h?" mobile-always-show":"").concat(m?" mobile-always-hide":""," v-flex flex-center"),style:{gap:"5px"},onClick:e=>{e.stopPropagation(),e.preventDefault(),c.GzE(n);let t=e.target.getBoundingClientRect();c.uQD({position:{top:"".concat(t.top+10,"px"),left:"".concat(t.left+10,"px")},children:e=>{var t;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{cursor:"default",borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},onClick:e=>{e.stopPropagation(),e.preventDefault()},children:[(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{whiteSpace:"pre"},children:["Sell ",null!==(t=j.fullName)&&void 0!==t?t:j.name,"items"!==j.category?null:"'s duplicates"]}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{borderRadius:"10px",padding:"10px",alignSelf:"stretch",gap:"20px"},children:("items"===j.category?c.UKN(j.id):[j]).map((e,t)=>{var a;let u=e.required<=0;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{alignSelf:"stretch",gap:"5px"},children:[(0,l.jsxs)("div",{className:"sized-remaining item-page-component-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(a=" ".concat(c.U$T(e)))&&void 0!==a?a:""),style:{gap:"5px",position:"relative",cursor:"pointer",alignSelf:"stretch",minWidth:"80px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{width:"80px",height:"80px",objectFit:"contain"},src:"".concat(c.wHH().basePath,"/images/").concat(e.fullName,".png")})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",textAlign:"center"},children:e.name}),u?null:(0,l.jsx)(s.Z,{object:e})]}),(0,l.jsx)(i.Z,{positionAbsolute:!1,itemId:n}),(0,l.jsx)(o.Z,{rawObj:e})]}),(0,l.jsx)(d.Z,{component:e}),(0,l.jsx)(r.Z,{object:e,collapseWhenNull:!1})]},"".concat(t,"-").concat(e.id))})})]})}})},children:[(0,l.jsx)("img",{src:N?"".concat(c.wHH().basePath,"/icons/sell_filled.svg"):"".concat(c.wHH().basePath,"/icons/sell_hollow.svg"),className:"sized-content sell-button-icon flex-center".concat(N?" sell":"").concat(x?" always-show":"").concat(p?" always-hide":"").concat(h?" mobile-always-show":"").concat(m?" mobile-always-hide":""),style:{}}),w>0?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px",fontSize:"small",fontStyle:"italic"},children:w}):null,f?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px",fontSize:"small"},children:"Sell Items"}):null]})})}},1886:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437);n(2265),n(6463);var c=n(5713),a=n(9274);n(5334),n(4751),n(5255),n(1815),n(6487),n(4899),n(5721);var o=n(1672),s=n(235);function i(e){let{component:t,showLabel:n=!1,alwaysShowLabel:i=!1}=e,[r,u]=(0,s.Z)(),[d,f]=(0,a.Z)(),x=t.required<=0,p=c.Vp9(t.id);return x?null:p?(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"5px"},children:[(0,l.jsx)("div",{title:"Increase sell amount",className:"sized-content h-flex object-page-component-owned-button flex-center",style:{cursor:"pointer"},onClick:e=>{e.preventDefault(),e.stopPropagation(),c.kRT(t.id)},children:"+"}),n?(0,l.jsx)(o.Z,{alwaysShowLabel:i,object:t}):null,(0,l.jsx)("div",{title:"Decrease sell amount",className:"sized-content h-flex object-page-component-owned-button flex-center",style:{cursor:"pointer"},onClick:e=>{e.preventDefault(),e.stopPropagation(),c.qmt(t.id)},children:"-"})]}):(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{maxWidth:"80px",textAlign:"center",fontSize:"x-small",fontStyle:"italic"},children:"You don't have duplicates for this component"})}},1672:function(e,t,n){n.d(t,{Z:function(){return s}});var l=n(7437);n(2265);var c=n(6463);n(5255);var a=n(5713);n(1524),n(235);var o=n(9274);function s(e){let{object:t,className:n,style:s,alwaysShowLabel:i=!1,collapseWhenNull:r=!0,labelPrefix:u=null}=e;(0,c.useRouter)();let[d,f]=(0,o.Z)(),x=null;if("components"===t.category){let e=a.$7W(t.id);if(e>0){let n=a.QEb(t);x=(0,l.jsxs)("span",{className:"sized-content h-flex",style:{whiteSpace:"pre"},children:["selling ",e," - ",(0,l.jsx)("img",{style:{marginTop:"2px",width:"20px",height:"20px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/Orokin Ducats.png")}),n*e]})}else x=i?(0,l.jsxs)("span",{className:"sized-content h-flex",style:{whiteSpace:"pre"},children:["selling 0 - ",(0,l.jsx)("img",{style:{marginTop:"2px",width:"20px",height:"20px",objectFit:"contain"},src:"".concat(a.wHH().basePath,"/images/Orokin Ducats.png")}),"0"]}):null}else x=null;return(0,l.jsxs)("div",{className:"sized-content obtained-label-component".concat(null!=x&&x?"":" hidden"," v-flex").concat(null!=n?n:""),style:s,children:["".concat(null!=u?u:""),null!=x||i?x:r?"":"x"]})}},4553:function(e,t,n){n.d(t,{Z:function(){return i}});var l=n(7437),c=n(2265),a=n(6463),o=n(5713),s=n(2147);function i(e){let{tabs:t,defaultTab:n,onTabChange:i,className:r,style:u,hasMinWidth:d=!1,headerControls:f=null}=e;(0,a.useRouter)();let x=(0,a.useSearchParams)(),p=(0,c.useRef)(null),h=x.get("tab")||n,[m,g]=(0,c.useState)(h);return(0,l.jsxs)("div",{className:"sized-content v-flex tab-component-container flex-center".concat(r?" ".concat(r):""),style:o.unj({},u),children:[(0,l.jsx)(s.Z,{tabs:Object.keys(t).map(e=>({title:e,id:e,label:e})),changeTab:e=>{g(e),i&&i(e)},activeTab:m,headerControls:f}),(0,l.jsx)("div",{className:"sized-content tab-component-body-container v-flex flex-center",ref:p,children:t[m]})]})}n(1498)},2147:function(e,t,n){n.d(t,{Z:function(){return u}});var l=n(7437),c=n(2265),a=n(7138),o=n(6463),s=n(5713);n(9343);var i=n(1007),r=n(1498);function u(e){let{tabs:t,activeTab:n,changeTab:u,headerControls:d=null}=e;(0,o.useRouter)();let f=(0,o.usePathname)(),x=(0,o.useSearchParams)();return(0,c.useContext)(r.A),(0,l.jsxs)("div",{className:"sized-content tab-header h-flex flex-center",style:{position:"relative",alignSelf:"stretch"},children:[(0,l.jsx)("div",{className:"sized-remaining tab-header-tab-button-container h-flex flex-center",style:{overflow:"auto",flexWrap:"wrap"},children:t.map((e,t)=>(0,l.jsx)(a.default,{href:"?".concat((()=>{let t=new URLSearchParams(x.toString());return t.set("tab",e.id),t.toString()})()),title:e.title,onClick:t=>{if("".concat(f,"?").concat(x.toString())==="".concat(f,"?tab=").concat(e.id)){t.preventDefault(),t.stopPropagation();return}u(e.id)},className:"tab-header-link tab-header-tab-button".concat(0==n.localeCompare(e.id)?" selected":""),children:e.label},"".concat(t,"-").concat(e.title)))}),d&&d[n]?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)(i.Z,{className:"sized-content h-flex tab-component-header-control-button",headerContent:(0,l.jsx)("img",{className:"sized-content h-flex flex-center icon-default-filter",style:{width:"20px",height:"20px"},src:"".concat(s.wHH().basePath,"/icons/filter.svg")}),children:e=>d[n]})}):null]})}},3595:function(e,t,n){n.d(t,{Z:function(){return o}});var l=n(7437);n(2265),n(6463);var c=n(8231),a=n(5713);function o(e){let{positionAbsolute:t=!0,itemId:n,showLabel:o=!1,alwaysShow:s=!1,alwaysHide:i=!1,mobileAlwaysShow:r=!0,mobileAlwaysHide:u=!1}=e,[d,f]=(0,c.Z)();if(i)return null;let x=d&&d[n]&&d[n].tracked;return(0,l.jsxs)("button",{title:"Track/Untrack Item",className:"sized-content star-button".concat(t?" absolute":"").concat(s?" always-show":"").concat(i?" always-hide":"").concat(r?" mobile-always-show":"").concat(u?" mobile-always-hide":""," h-flex flex-center"),style:{gap:"5px"},onClick:e=>{var t,l;e.stopPropagation(),e.preventDefault();let c=null!==(t=a.l6q(n))&&void 0!==t?t:{};c.tracked=!(null!==(l=c.tracked)&&void 0!==l&&l),a.AA7(n,c)},children:[(0,l.jsx)("img",{src:x?"".concat(a.wHH().basePath,"/icons/star_hollow_filled.svg"):"".concat(a.wHH().basePath,"/icons/star_hollow.svg"),className:"sized-content star-button-icon flex-center".concat(x?" tracked":"").concat(s?" always-show":"").concat(i?" always-hide":"").concat(r?" mobile-always-show":"").concat(u?" mobile-always-hide":""),style:{}}),o?(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{fontSize:"small"},children:"Track Item"}):null]})}n(8553)},1498:function(e,t,n){n.d(t,{A:function(){return l}});let l=(0,n(2265).createContext)()},8553:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.rNL()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.ugz.addListener(n,!0),()=>{c.ugz.removeListener(n)}),[]),[e,t]}},5342:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.Nqd()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.xgN.addListener(n,!0),()=>{c.xgN.removeListener(n)}),[]),[e,t]}},1524:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.u4o()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.X3W.addListener(n,!0),()=>{c.X3W.removeListener(n)}),[]),[e,t]}},235:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.l3M()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.hwG.addListener(n,!0),()=>{c.hwG.removeListener(n)}),[]),[e,t]}},2080:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.nSb()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.dug.addListener(n,!0),()=>{c.dug.removeListener(n)}),[]),[e,t]}},9274:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.S_9()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.HQe.addListener(n,!0),()=>{c.HQe.removeListener(n)}),[]),[e,t]}},8231:function(e,t,n){n.d(t,{Z:function(){return a}});var l=n(2265),c=n(5713);function a(){let[e,t]=(0,l.useState)(c.dXH()),n=e=>{t(e)};return(0,l.useEffect)(()=>(c.Vkx.addListener(n,!0),()=>{c.Vkx.removeListener(n)}),[]),[e,t]}}}]);