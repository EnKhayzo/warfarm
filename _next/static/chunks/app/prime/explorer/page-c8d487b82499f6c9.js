(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[278],{5418:function(e,t,n){Promise.resolve().then(n.bind(n,2092))},2092:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});var i=n(7437);n(2265);var s=n(6463),r=n(7138);n(7449),n(8106),n(1356);var l=n(5183),c=n(5713),a=n(4553);n(6342);var o=n(1524),u=n(4899),d=n(1815),m=n(5342),f=n(6487),p=n(4598),x=n(8553);let h=e=>{let{objects:t,imageFunc:n,labelFunc:a,titleLabel:h,category:v}=e;(0,s.useRouter)();let[y,g]=(0,m.Z)(),j=Object.entries("Items"===v?t.reduce((e,t)=>(e[t.type]||(e[t.type]={title:t.type,objects:[]}),e[t.type].objects.push(t),e),{}):"Components"===v?t.reduce((e,t)=>{if(null==t.parentItem)return e;let n=c.fGE(t.parentItem);return e[n.type]||(e[n.type]={title:n.type,objects:[]}),e[n.type].objects.push(t),e},{}):"Relics"===v?t.reduce((e,t)=>(e[t.tier]||(e[t.tier]={title:t.tier,objects:[]}),e[t.tier].objects.push(t),e),{}):"Missions"===v?t.toSorted((e,t)=>(y[e.type]+1||1/0)-(y[t.type]+1||1/0)).reduce((e,t)=>(e[t.type]||(e[t.type]={title:t.type,objects:[]}),e[t.type].objects.push(t),e),{}):{}),[b,w]=(0,o.Z)(),N=e=>{let t=c.km8(e,b);return t>=1?" object-farmed":t>0?" object-partial-farmed":""},[C,I]=(0,x.Z)(),S=null==C||"farmMode"===C;return(0,i.jsx)("div",{className:"sized-remaining v-flex flex-center",style:{gap:"5px"},children:(0,i.jsx)("div",{className:"sized-content main-view-item-container h-flex flex-center",style:{flexWrap:"wrap",overflow:"auto",maxHeight:"80vh",gap:"30px"},children:j.map(e=>{let[t,{title:n,objects:s}]=e;return(0,i.jsxs)("div",{className:"sized-remaining v-flex flex-center",children:[(0,i.jsx)("div",{className:"sized-content h-flex flex-center",style:{padding:"10px",width:"100%",justifyContent:"center",fontSize:"small",fontStyle:"italic",color:"var(--color-text-section)"},children:c.fmv("undefined"===t?"?":t)}),(0,i.jsx)("div",{className:"sized-remaining h-flex flex-center",style:{flexWrap:"wrap",gap:"5px"},children:s.map((e,t)=>(0,i.jsx)(p.Z,{className:"sized-content v-flex flex-center",style:{width:"140px",minHeight:S?"140px":"190px",justifyContent:"flex-start",alignSelf:"stretch"},children:(0,i.jsxs)(r.default,{href:c.LnC(e.id),className:"sized-remaining main-view-item-single-container item-check-parent tracker-item-parent".concat(N(e)," v-flex flex-center"),style:{width:"140px",opacity:e.vaulted?"50%":"100%",position:"relative",cursor:"pointer",alignSelf:"stretch",justifyContent:"flex-start"},children:[(0,i.jsx)("div",{className:"sized-content h-flex flex-center",style:{objectFit:"contain",height:"90px"},children:(0,i.jsx)("img",{className:"sized-content h-flex main-view-item-image flex-center",style:{height:"100px",width:"100px",objectFit:"contain"},src:c.I6l(e)})}),(0,i.jsx)("div",{className:"sized-content main-view-item-label h-flex flex-center",style:{textAlign:"center"},children:a(e)}),(0,i.jsx)(l.Z,{itemId:c.MSp(e,v)}),(0,i.jsx)(d.Z,{itemId:c.MSp(e,v),positionAbsolute:!0}),(0,i.jsx)(u.Z,{object:e,exclusiveMode:"ducatMode"}),(0,i.jsx)(f.Z,{rawObj:e})]})},"".concat(t,"-").concat(e.name)))})]},"".concat(t))})})})},v=e=>{let{category:t}=e,n=c.hrm(),s=c.buF(),r=(0,i.jsx)("div",{children:"Unknown"});return c.S1v(t,{Items:()=>{let e=c.NxJ();r=(0,i.jsx)(h,{category:"Items",titleLabel:"Items",objects:Object.values(e).toSorted((e,t)=>e.vaulted-t.vaulted||s[e.type]-s[t.type]||e.name.localeCompare(t.name)),imageFunc:e=>"".concat(e.name),labelFunc:e=>"".concat(e.name)})},Components:()=>{let e=Object.values(c.yaW());r=(0,i.jsx)(h,{category:"Components",titleLabel:"Components",objects:e.toSorted((e,t)=>e.vaulted-t.vaulted||s[e.type]-s[t.type]||e.fullName.localeCompare(t.fullName)),imageFunc:e=>"".concat(e.fullName),labelFunc:e=>"".concat(e.fullName)})},Relics:()=>{let e=c.cEZ();r=(0,i.jsx)(h,{category:"Relics",titleLabel:"Relics",objects:Object.entries(e).map(e=>{let[t,n]=e;return n}).toSorted((e,t)=>e.vaulted-t.vaulted||n[c.VW5(e.name)]-n[c.VW5(t.name)]||e.name.localeCompare(t.name)),imageFunc:e=>"".concat(e.name.split(" ")[0].trim()),labelFunc:e=>"".concat(e.name)})},Missions:()=>{let e=c.Z1_();r=(0,i.jsx)(h,{category:"Missions",titleLabel:"Missions",objects:Object.values(e).toSorted((e,t)=>e.fullName.localeCompare(t.fullName)),imageFunc:e=>"".concat(e.planet),labelFunc:e=>"".concat(e.name,", ").concat(e.planet)})}}),r};function y(){return(0,s.useRouter)(),(0,i.jsx)("div",{className:"sized-remaining v-flex flex-center",style:{gap:"20px"},children:(0,i.jsx)(a.Z,{style:{width:"95vw"},defaultTab:"Items",tabs:{Items:(0,i.jsx)(v,{category:"Items"}),Components:(0,i.jsx)(v,{category:"Components"}),Relics:(0,i.jsx)(v,{category:"Relics"}),Missions:(0,i.jsx)(v,{category:"Missions"})}})})}},1356:function(e,t,n){"use strict";n(7437),n(2265),n(6463)},4598:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var i=n(7437);n(2265);var s=n(6044);function r(e){let{children:t,className:n,style:r}=e,{ref:l,inView:c}=(0,s.YD)({threshold:.1,triggerOnce:!1});return(0,i.jsx)("div",{ref:l,style:r,className:n,children:c?t:(0,i.jsx)("div",{className:"default-element-style blinking-slow",style:{backgroundColor:"var(--color-sextenary)",...r}})})}},6044:function(e,t,n){"use strict";n.d(t,{YD:function(){return o}});var i=n(2265),s=Object.defineProperty,r=new Map,l=new WeakMap,c=0,a=void 0;function o(){var e;let{threshold:t,delay:n,trackVisibility:s,rootMargin:o,root:u,triggerOnce:d,skip:m,initialInView:f,fallbackInView:p,onChange:x}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},[h,v]=i.useState(null),y=i.useRef(),[g,j]=i.useState({inView:!!f,entry:void 0});y.current=x,i.useEffect(()=>{let e;if(!m&&h)return e=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:a;if(void 0===window.IntersectionObserver&&void 0!==i){let s=e.getBoundingClientRect();return t(i,{isIntersecting:i,target:e,intersectionRatio:"number"==typeof n.threshold?n.threshold:0,time:0,boundingClientRect:s,intersectionRect:s,rootBounds:s}),()=>{}}let{id:s,observer:o,elements:u}=function(e){let t=Object.keys(e).sort().filter(t=>void 0!==e[t]).map(t=>{var n;return"".concat(t,"_").concat("root"===t?(n=e.root)?(l.has(n)||(c+=1,l.set(n,c.toString())),l.get(n)):"0":e[t])}).toString(),n=r.get(t);if(!n){let i;let s=new Map,l=new IntersectionObserver(t=>{t.forEach(t=>{var n;let r=t.isIntersecting&&i.some(e=>t.intersectionRatio>=e);e.trackVisibility&&void 0===t.isVisible&&(t.isVisible=r),null==(n=s.get(t.target))||n.forEach(e=>{e(r,t)})})},e);i=l.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),n={id:t,observer:l,elements:s},r.set(t,n)}return n}(n),d=u.get(e)||[];return u.has(e)||u.set(e,d),d.push(t),o.observe(e),function(){d.splice(d.indexOf(t),1),0===d.length&&(u.delete(e),o.unobserve(e)),0===u.size&&(o.disconnect(),r.delete(s))}}(h,(t,n)=>{j({inView:t,entry:n}),y.current&&y.current(t,n),n.isIntersecting&&d&&e&&(e(),e=void 0)},{root:u,rootMargin:o,threshold:t,trackVisibility:s,delay:n},p),()=>{e&&e()}},[Array.isArray(t)?t.toString():t,h,u,o,d,m,s,p,n]);let b=null==(e=g.entry)?void 0:e.target,w=i.useRef();h||!b||d||m||w.current===b||(w.current=b,j({inView:!!f,entry:void 0}));let N=[v,g.inView,g.entry];return N.ref=N[0],N.inView=N[1],N.entry=N[2],N}i.Component}},function(e){e.O(0,[125,4,138,713,976,971,23,744],function(){return e(e.s=5418)}),_N_E=e.O()}]);