(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[285],{4975:function(e,t,n){Promise.resolve().then(n.bind(n,9306))},4400:function(e,t,n){"use strict";n(7437),n(2265),n(6463)},4751:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var l=n(7437);n(2265);var r=n(6463),i=n(3595),s=n(6195),c=n(1524);n(5721);var a=n(1815);function o(e){var t;let{component:n,fullName:o=!1,iconHeight:d="75px",width:x=null}=e,m=(0,r.useRouter)(),[f,p]=(0,c.Z)(),h=n.rawObj.required<=0;return(0,l.jsxs)("div",{className:"sized-content v-flex",style:{alignSelf:"stretch",gap:"5px"},children:[(0,l.jsxs)("div",{onClick:()=>m.push(n.route),className:"sized-content item-page-component-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(t=" ".concat(n.rarity))&&void 0!==t?t:""),style:{gap:"5px",position:"relative",cursor:"pointer",width:null!=x?x:"auto",alignSelf:"stretch"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:d},src:"/warfarm/images/".concat(n.rawObj.fullName,".png")})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:o?n.rawObj.fullName:n.rawObj.name}),h?null:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",fontStyle:"italic",minWidth:"fit-content"},children:"".concat(f&&f[n.rawObj.id]?f[n.rawObj.id].obtained:"0","/").concat(n.rawObj.required)})]}),(0,l.jsx)(i.Z,{itemId:n.rawObj.id}),(0,l.jsx)(a.Z,{itemId:n.rawObj.id,positionAbsolute:!0})]}),h?null:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"5px"},children:[(0,l.jsx)("button",{className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),e.preventDefault(),s.JO(n.rawObj.id)},children:"+"}),(0,l.jsx)("button",{className:"sized-content h-flex object-page-component-owned-button flex-center",onClick:e=>{e.preventDefault(),e.stopPropagation(),e.preventDefault(),s.k5(n.rawObj.id)},children:"-"})]})]})}},9306:function(e,t,n){"use strict";n.r(t),n.d(t,{TrackedItemsComponent:function(){return z},default:function(){return k}});var l=n(7437),r=n(2265),i=n(6463),s=n(7138),c=n(7449),a=n.n(c);n(6648);var o=n(6195);n(938);var d=n(3595),x=n(8231),m=n(3744);n(4400);var f=n(5342),p=n(4553),h=n(1524),u=n(4751);n(6342);var j=n(7957),v=n(1815),g=n(193);let b=e=>{let{hideFarmed:t,trackedItems:n}=e,r=(0,i.useRouter)(),[c,a]=(0,h.Z)(),d=o.y7(n,r),x=d.components.filter(e=>!t||!o.Wk(e.rawObj,c)),m=d.relics,f=o.Nl(),p=o.hr();return(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:Object.entries(x.reduce((e,t)=>(null==t.rawObj.parentItem?e[t.rawObj.id]={item:{category:"Components",fullName:t.rawObj.fullName,icon:t.icon,route:t.route,id:t.rawObj.id,type:"?",componentFullName:t.rawObj.fullName,name:t.rawObj.fullName},components:[t]}:(e[t.rawObj.parentItem]||(e[t.rawObj.parentItem]={item:o.fG(t.rawObj.parentItem),components:[]}),e[t.rawObj.parentItem].components.push(t)),e),{})).map((e,t)=>{let[n,r]=e;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center item-check-parent",style:{borderRadius:"10px",backgroundColor:o.Wq(o.fG(n))?"var(--color-secondary-farmed)":"var(--color-secondary)",padding:"10px",gap:"5px",alignSelf:"stretch",justifyContent:"flex-start"},children:[(0,l.jsxs)(s.default,{href:o.Ln(r.item.id),className:"sized-content v-flex flex-center",style:{cursor:"pointer"},children:[(0,l.jsx)("img",{style:{height:"50px"},src:o.I6(r.item)}),(0,l.jsx)("div",{children:r.item.name})]}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"10px"},children:r.components.map((e,t)=>(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{padding:"10px",borderRadius:"10px",gap:"10px",backgroundColor:o.Wq(o.fG(e.id))?"var(--color-quaternary-farmed)":"var(--color-quaternary)",alignSelf:"stretch",justifyContent:"flex-start"},children:[(0,l.jsx)("div",{className:"sized-content v-flex flex-center",children:(0,l.jsx)(s.default,{href:o.Ln(e.id),children:(0,l.jsx)(u.Z,{width:"70px",iconHeight:"45px",component:e})})}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{maxWidth:"500px",gap:"5px",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"flex-start"},children:m.filter(t=>0==t.componentFullName.localeCompare(e.rawObj.fullName)).toSorted((e,t)=>e.vaulted-t.vaulted||f[e.rarity]-f[t.rarity]||p[e.rawObj.relic.tier]-p[t.rawObj.relic.tier]||e.rawObj.relic.name.localeCompare(t.rawObj.relic.name)).map(e=>{var n;return(0,l.jsxs)(s.default,{href:e.route,className:"sized-content item-page-component-container tracker-item-parent h-flex flex-center".concat(null!==(n=" ".concat(e.rarity))&&void 0!==n?n:""),style:{width:"110px",gap:"5px",opacity:e.vaulted?"50%":"100%"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"25px"},src:e.icon})}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",paddingRight:"5px"},children:e.label})})]},"".concat(t,"-").concat(e.rawObj.relic.name))})})]},"".concat(t,"-").concat(e.name)))}),(0,l.jsx)(v.Z,{itemId:n,positionAbsolute:!0})]},"".concat(t,"-").concat(n))})})};function y(e){let{hideFarmed:t,trackedItems:n}=e,r=(0,i.useRouter)(),[c,a]=(0,h.Z)(),d=o.Nl(),x=o.hr(),m=o.y7(n,r),f=m.components.filter(e=>!t||!o.Wk(e.rawObj,c)),p=o.lw(m.relics.filter(e=>!o.PO(e.rawObj.relic).filter(e=>f.map(e=>e.rawObj.id).includes(e.rewardFullName)).every(e=>{let n=o.fG(e.rewardFullName);return null==n||t&&o.Wk(n)})),e=>e.rawObj.relic.name).toSorted((e,t)=>e.vaulted-t.vaulted||x[e.rawObj.relic.tier]-x[t.rawObj.relic.tier]||e.rawObj.relic.name.localeCompare(t.rawObj.relic.name)),u=e=>f.filter(t=>o.vt(e.rawObj.relic,t.rawObj)).length,j=e=>Math.max(...f.filter(t=>o.vt(e.rawObj.relic,t.rawObj)).map(t=>d[o.iH(t.rawObj,e.rawObj.relic)]));return(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:p.toSorted((e,t)=>e.vaulted-t.vaulted||u(t)-u(e)||j(e)-j(t)||x[e.rawObj.relic.tier]-x[t.rawObj.relic.tier]||e.rawObj.relic.name.localeCompare(t.rawObj.relic.name)).map((e,n)=>(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{backgroundColor:!t&&f.filter(t=>o.vt(e.rawObj.relic,t.rawObj)).every(e=>o.Wq(e.rawObj))?"var(--color-secondary-farmed)":"var(--color-secondary)",borderRadius:"10px",padding:"10px",gap:"10px",alignSelf:"stretch"},children:[(0,l.jsxs)(s.default,{href:e.route,className:"sized-content item-page-component-container tracker-item-parent v-flex flex-center",style:{gap:"5px",opacity:e.vaulted?"50%":"100%"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{width:"75px",height:"75px"},children:(0,l.jsx)("img",{src:e.icon})}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:e.rawObj.relic.name})})]}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"5px"},children:f.filter(t=>o.vt(e.rawObj.relic,t.rawObj)).toSorted((t,n)=>d[o.iH(t.rawObj,e.rawObj.relic)]-d[o.iH(n.rawObj,e.rawObj.relic)]).map(r=>{var i;return(0,l.jsxs)(s.default,{href:r.route,className:"sized-content item-page-component-container tracker-item-parent h-flex flex-center".concat(null!==(i=" ".concat(o.iH(r.rawObj,e.rawObj.relic)))&&void 0!==i?i:""),style:{width:"210px",gap:"5px",opacity:r.vaulted?"50%":"100%",color:!t&&o.Wq(r.rawObj)?"var(--color-text-farmed)":"inherit"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"25px"},src:r.icon})}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",paddingRight:"5px"},children:r.rawObj.fullName})})]},"".concat(n,"-").concat(r.rawObj.id))})})]},"".concat(n,"-").concat(e.name)))})}let w=e=>{let{groupBy:t,hideFarmed:n,trackedItems:r,rarityPriorities:c=null}=e,a=(0,i.useRouter)();c||(c=o.Nl());let[d,x]=(0,f.Z)(),[m,p]=(0,h.Z)(),u=r.reduce((e,t)=>{e.components||(e.components=[]),e.missions||(e.missions=[]);let l=o.fG(t);if("items"===l.category){let t=o.nj(null,"Items",null,"components",l,{router:a}).filter(e=>!n||!o.Wk(e.rawObj,m));e.components=o.lw(e.components.concat(t),e=>e.searchObjId);let r=o.nj(null,"Items",null,"missions",l,{router:a});e.missions=o.lw(e.missions.concat(r),e=>e.searchObjId)}else if("components"===l.category){let t=o.fG(l.parentItem),r=[o.dN("Items","components",{item:t,component:l},a)].filter(e=>!n||!o.Wk(e.rawObj,m));e.components=o.lw(e.components.concat(r),e=>e.searchObjId);let i=o.nj(null,"Components",null,"missions",l,{router:a});e.missions=o.lw(e.missions.concat(i),e=>e.searchObjId)}return e},{}),j=u.components,v=u.missions.reduce((e,t)=>(e[t.id]||(e[t.id]={infoObj:t,mission:t.rawObj.mission,relics:{}}),e[t.id].relics[t.rawObj.relic.name]||(e[t.id].relics[t.rawObj.relic.name]={rarity:t.rarity,rotations:t.rawObj.rotations,relic:t.rawObj.relic}),e),{}),g=e=>u.missions.filter(t=>t.id===e).length,b=e=>Math.max(...u.missions.filter(t=>t.id===e).map(e=>e.rawObj.rotations.map(e=>Number(e.perc.replace("%","").trim()))).flat(1)),y=(e,t,n,l)=>b(t)-b(e)||g(t)-g(e)||(d[n.mission.type]+1||1/0)-(d[l.mission.type]+1||1/0),w=o.Ij(),N=e=>Math.min(...e.rotations.map(e=>w[e.rotation]));return o.hr(),(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container v-flex flex-center",style:{maxWidth:"75vw"},children:(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:Object.entries(v).toSorted((e,t)=>{let[n,l]=e,[r,i]=t;return y(n,r,l,i)}).map((e,r)=>{let[i,a]=e;return(0,l.jsxs)("div",{className:"sized-content item-page-component-container tracker-item-parent v-flex flex-center",style:{gap:"5px",opacity:a.infoObj.vaulted?"50%":"100%",alignSelf:"stretch",justifyContent:"flex-start",width:"component"===t?"350px":"410px"},children:[(0,l.jsxs)(s.default,{href:a.infoObj.route,className:"sized-content mission-relic-component v-flex flex-center",children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"75px"},src:a.infoObj.icon})}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",fontWeight:"bold"},children:a.infoObj.rawObj.mission.type}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:a.infoObj.id})]}),(0,l.jsx)("div",{className:"sized-content mission-relic-component v-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content v-flex",style:{gap:"5px",marginTop:"5px"},children:"component"===t?j.filter(e=>Object.entries(a.relics).find(t=>{let[n,l]=t;return o.PO(l.relic).findIndex(t=>0==t.rewardFullName.localeCompare(e.rawObj.id))>-1})).toSorted((e,t)=>c[e.rarity]-c[t.rarity]).map((e,t)=>(0,l.jsxs)(s.default,{href:e.route,className:"sized-content h-flex flex-center",style:{borderRadius:"10px",backgroundColor:"var(--color-quaternary)",gap:"10px",padding:"10px"},children:[(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{minWidth:"70px"},children:[(0,l.jsx)("img",{className:"sized-content h-flex flex-center",style:{height:"15px"},src:e.icon}),(0,l.jsx)("span",{className:"sized-content h-flex flex-center",style:{textAlign:"center",fontSize:"small",color:!n&&o.Wq(e.rawObj)?"var(--color-text-farmed)":"inherit"},children:e.rawObj.fullName})]}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"5px"},children:Object.entries(a.relics).filter(t=>{let[n,l]=t;return o.PO(l.relic).findIndex(t=>0==t.rewardFullName.localeCompare(e.rawObj.id))>-1}).map((t,n)=>{var r;let[i,c]=t;return(0,l.jsxs)(s.default,{href:o.Ln(c.relic.id),className:"sized-content h-flex flex-center object-page-mission-relic".concat(null!==(r=" ".concat(o.iH(e.rawObj,c.relic)))&&void 0!==r?r:""),style:{gap:"5px",minWidth:"200px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"30px"},src:"/warfarm/images/".concat(c.relic.tier,".png")})}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small"},children:c.relic.name}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{alignItems:"flex-start",marginLeft:"5px"},children:c.rotations.map((e,t)=>(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",whiteSpace:"pre"},children:[(0,l.jsx)("span",{style:{fontWeight:"bold"},children:e.rotation})," - ",(0,l.jsx)("span",{style:{fontStyle:"italic"},children:e.perc})]},"".concat(e.rotation,"-").concat(t)))})]},"".concat(c.name,"-").concat(n))})})]},"".concat(e.id,"-").concat(t))):"relic"===t?Object.entries(a.relics).filter(e=>{let[t,l]=e;return!j.filter(e=>o.vt(l.relic,e.rawObj)).every(e=>n&&o.Wq(e))}).toSorted((e,t)=>{let[n,l]=e,[r,i]=t;return N(l)-N(i)}).map((e,t)=>{let[r,i]=e;return(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{justifyContent:"flex-start",alignSelf:"stretch"},children:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{backgroundColor:!n&&j.filter(e=>o.vt(i.relic,e.rawObj)).every(e=>o.Wq(e.rawObj))?"var(--color-quaternary-farmed)":"var(--color-quaternary)",borderRadius:"10px",padding:"10px",gap:"10px",alignSelf:"stretch"},children:[(0,l.jsxs)(s.default,{href:o.Ln(i.relic.id),className:"sized-content item-page-component-container tracker-item-parent v-flex flex-center",style:{gap:"5px",opacity:i.relic.vaulted?"50%":"100%",width:"75px",height:"75px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{width:"35px",height:"35px"},children:(0,l.jsx)("img",{src:o.I6(i.relic)})}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:i.relic.name})})]}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{alignItems:"flex-start",marginLeft:"5px"},children:i.rotations.map((e,t)=>(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",whiteSpace:"pre"},children:[(0,l.jsx)("span",{style:{fontWeight:"bold"},children:e.rotation})," - ",(0,l.jsx)("span",{style:{fontStyle:"italic"},children:e.perc})]},"".concat(e.rotation,"-").concat(t)))}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"5px"},children:j.filter(e=>o.vt(i.relic,e.rawObj)).toSorted((e,t)=>c[o.iH(e.rawObj,i.relic)]-c[o.iH(t.rawObj,i.relic)]).map(e=>{var r;return(0,l.jsxs)(s.default,{href:e.route,className:"sized-content item-page-component-container tracker-item-parent h-flex flex-center".concat(null!==(r=" ".concat(o.iH(e.rawObj,i.relic)))&&void 0!==r?r:""),style:{width:"210px",gap:"5px",opacity:e.vaulted?"50%":"100%",color:!n&&o.Wq(e.rawObj)?"var(--color-text-farmed)":"inherit"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"25px"},src:e.icon})}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",paddingRight:"5px"},children:e.rawObj.fullName})})]},"".concat(t,"-").concat(e.rawObj.id))})})]})},"".concat(t,"-").concat(r))}):null})})]},"".concat(r,"-").concat(a.infoObj.name))})})})};function N(e){let{setHideFarmed:t}=e;return(0,l.jsx)(g.Z,{type:"checkbox",value:"farmed",textLabel:"Hide Farmed Items",onChange:e=>{o.pK("hideFarmed",e.target.checked)},checked:o.ZA("hideFarmed")})}function O(e){let{trackedItems:t}=e,[n,i]=(0,r.useState)("relic"),[s,c]=(0,r.useState)(!0),[a,d]=function(){let[e,t]=(0,r.useState)(o.Dq()),n=e=>{t(e)};return(0,r.useEffect)(()=>(o.Ov.addListener(n,!0),()=>{o.Ov.removeListener(n)}),[]),[e,t]}();return(0,l.jsxs)("div",{className:"sized-component v-flex flex-center",style:{gap:"10px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex",style:{fontSize:"large",fontWeight:"bold"},children:"Farming Sheet"}),(0,l.jsx)(p.Z,{defaultTab:"Components",tabs:{Components:(0,l.jsx)(b,{hideFarmed:o.ZA("hideFarmed",!1),trackedItems:t}),Relics:(0,l.jsx)(y,{hideFarmed:o.ZA("hideFarmed",!1),trackedItems:t}),Missions:(0,l.jsx)(w,{groupBy:n,hideFarmed:o.ZA("hideFarmed",!1),trackedItems:t})},headerControls:{Missions:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"10px"},children:[(0,l.jsx)(N,{setHideFarmed:c}),(0,l.jsx)(j.Z,{options:{"Group By Relic":{value:"relic",defaultOption:!0},"Group By Component":{value:"component"}},onConfirm:e=>{let[t,n]=e;return i(n.value)}})]}),Components:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{gap:"10px"},children:(0,l.jsx)(N,{setHideFarmed:c})}),Relics:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{gap:"10px"},children:(0,l.jsx)(N,{setHideFarmed:c})})}})]})}function z(){let e=(0,i.useRouter)(),[t,n]=(0,x.Z)(),r=Object.entries(null!=t?t:{}).filter(e=>{var t;let[n,l]=e;return null!==(t=l.tracked)&&void 0!==t&&t}).length<=0,[c,a]=(0,h.Z)();return(0,l.jsxs)("div",{className:"sized-content tracked-items v-flex flex-center",style:{gap:"50px"},children:[!r&&t?(0,l.jsx)("div",{className:"sized-content tracked-items h-flex flex-center",style:{gap:"10px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{overflow:"auto",maxWidth:"75vw",gap:"10px",flexWrap:"wrap"},children:Object.entries(t).filter(e=>{var t;let[n,l]=e;return null!==(t=l.tracked)&&void 0!==t&&t}).sort((e,t)=>{let[n,l]=e,[r,i]=t;return o.km(o.fG(n))-o.km(o.fG(r))}).map((e,t)=>{let[n,r]=e;return(0,l.jsxs)(s.default,{href:o.Ln(n),className:"sized-content item-check-parent tracked-items-button v-flex flex-center".concat(o.Wq(o.fG(n),c)?" object-farmed-main-page":""),style:{position:"relative",cursor:"pointer",alignSelf:"stretch",minWidth:"150px"},children:[(0,l.jsx)("img",{className:"sized-content tracked-items-icon h-flex",style:{minWidth:"fit-content",height:"90px"},src:o.I6(o.fG(n))}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{minWidth:"fit-content",textAlign:"center"},children:n}),(()=>{let e=o.fG(n);return"items"===e.category||"components"===e.category?(0,l.jsx)(m.Z,{object:e}):null})(),(0,l.jsx)(d.Z,{itemId:n,positionAbsolute:!0}),(0,l.jsx)(v.Z,{itemId:n,positionAbsolute:!0})]},"".concat(n,"-").concat(t))})})}):null,r?(0,l.jsxs)("div",{className:"sized-content v-flex",style:{gap:"10px",fontSize:"small",fontStyle:"italic",whiteSpace:"pre"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("div",{className:"sized-content tracked-items-button v-flex flex-center",style:{fontStyle:"normal",cursor:"pointer"},onClick:()=>e.push("/prime/explorer"),children:"+"})}),(0,l.jsxs)("div",{className:"sized-content v-flex",children:[(0,l.jsxs)("div",{children:["You're not tracking any items. Add some by using the Search Bar or from the ",(0,l.jsx)("a",{style:{cursor:"pointer"},onClick:()=>e.push("/prime/explorer"),children:"Explorer"})," page."]}),(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",children:["Track items using the star",(0,l.jsx)("img",{className:"sized-content star-button-icon h-flex flex-center",style:{height:"12px"},src:"/warfarm/icons/star_hollow.svg"}),"button."]})]})]}):null,r?null:(0,l.jsx)(O,{trackedItems:Object.entries(t).filter(e=>{let[t,n]=e;return!0==n.tracked}).map(e=>{let[t,n]=e;return t})})]})}function k(){(0,i.useRouter)();let[e,t]=(0,x.Z)(),n=Object.entries(null!=e?e:{}).filter(e=>{var t;let[n,l]=e;return null!==(t=l.tracked)&&void 0!==t&&t}).length<=0;return(0,r.useEffect)(()=>{document.title=o.pR("Home")},[]),(0,l.jsxs)("div",{className:"sized-remaining v-flex",style:{justifyContent:"center",gap:"0px"},children:[(0,l.jsx)(a(),{children:(0,l.jsx)("title",{children:o.pR("Home")})}),n?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{padding:"10px"},children:(0,l.jsx)("img",{className:"sized-content h-flex flex-center",style:{width:"400px"},src:"/warfarm/icons/logo_prime.svg"})}):null,(0,l.jsxs)("div",{className:"sized-remaining v-flex flex-center",style:{gap:"20px"},children:[(0,l.jsx)("div",{style:{fontWeight:"bold"},children:"Tracked Items"}),(0,l.jsx)(z,{})]})]})}},193:function(e,t,n){"use strict";var l=n(7437);n(2265),n(6195),t.Z=e=>{let{textLabel:t,name:n,value:r,onChange:i,checked:s}=e;return(0,l.jsxs)("div",{className:"sized-content h-flex",style:{gap:"5px",padding:"0px",margin:"0px"},children:[(0,l.jsx)("input",{className:"sized-content",type:"checkbox",name:n,value:r,onChange:i,defaultChecked:null!=s&&s}),(0,l.jsx)("div",{className:"sized-content",children:t})]})}},7957:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var l=n(7437),r=n(2265),i=n(6463);function s(e){var t;let{options:n,onConfirm:s}=e;(0,i.useRouter)();let c=null!==(t=Object.entries(n).find(e=>{let[t,n]=e;return n.defaultOption})[0])&&void 0!==t?t:null,[a,o]=(0,r.useState)(c),[d,x]=(0,r.useState)(!1),m=(0,r.useRef)(null),f=e=>{m.current&&!m.current.contains(e.target)&&x(!1)};(0,r.useEffect)(()=>(d?document.addEventListener("mousedown",f):document.removeEventListener("mousedown",f),()=>{document.removeEventListener("mousedown",f)}),[d]);let p=e=>{let[t,n]=e;s&&s([t,n]),o(t)};return(0,l.jsxs)("div",{className:"sized-content selector-component h-flex flex-center",style:{position:"relative",gap:"5px"},onClick:e=>{x(!d)},children:[(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"5px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{marginBottom:"2px"},children:null!=a?a:"?"}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{className:"sized-content h-flex icon-default-filter flex-center",src:"/warfarm/icons/arrow.svg",style:{width:"10px",transform:"rotate(90deg)"}})})]}),d?(0,l.jsx)("div",{ref:m,className:"sized-content selector-option-wrapper v-flex flex-center",style:{width:"400px",overflow:"hidden",position:"absolute",top:"50px"},children:(0,l.jsx)("div",{className:"sized-content selector-option-container v-flex flex-center",style:{gap:"5px"},children:Object.entries(n).map((e,t)=>{let[n,r]=e;return(0,l.jsx)("div",{className:"sized-content h-flex selector-option flex-center",style:{minWidth:"fit-content",textAlign:"center",width:"auto",padding:"10px"},onClick:()=>p([n,r]),children:n},"".concat(t,"-").concat(n))})})}):null]})}n(3595),n(6195),n(1524)}},function(e){e.O(0,[3,648,195,915,971,23,744],function(){return e(e.s=4975)}),_N_E=e.O()}]);