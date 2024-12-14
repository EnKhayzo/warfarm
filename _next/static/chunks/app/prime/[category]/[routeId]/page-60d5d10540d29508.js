(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[211],{8481:function(e,t,n){Promise.resolve().then(n.bind(n,7065))},7065:function(e,t,n){"use strict";n.d(t,{default:function(){return G}});var l=n(7437),i=n(2265),s=n(6463);n(8106),n(4400);var a=n(7138);n(7449);var r=n(5713);n(1356);var c=n(5255),o=n(4899),d=n(5721),x=n(1815),m=n(6487);function p(e){let{itemId:t,iconUrl:n,labelHeader:i,label:s,labelFooter:a}=e;return(0,l.jsxs)("div",{className:"sized-content main-title-page-view-element item-check-parent tracker-item-parent v-flex flex-center",style:{backgroundColor:"var(--color-quaternary)",borderRadius:"10px",padding:"10px",gap:"5px",position:"relative"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"150px"},src:n})}),i?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:i}):null,s?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontWeight:"bold"},children:s}):null,a?(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontStyle:"italic"},children:a}):null,(0,l.jsx)(o.Z,{object:r.fGE(t),collapseWhenNull:!1}),(0,l.jsx)(c.Z,{itemId:t}),(0,l.jsx)(x.Z,{itemId:t}),(0,l.jsx)(m.Z,{rawObj:r.fGE(t)})]})}var f=n(4751),h=n(5342);n(2147);var j=n(4553),v=n(7957);n(7940);var u=n(4530),g=n(7427),y=n(5969),b=n(5758),N=n(5507);let z=e=>{let{item:t,components:n}=e,i=(0,s.useRouter)(),c=r.Nly(),o=r.hrm(),m=r.njK(null,"Items",null,"relics",t,{router:i});return(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"99vw",flexWrap:"wrap",justifyContent:"space-evenly",alignItems:"flex-start"},children:n.map((e,t)=>{var n;return(0,l.jsxs)("div",{className:"sized-content v-flex",style:{backgroundColor:"var(--color-secondary)",padding:"10px",borderRadius:"10px",gap:"30px",alignSelf:"stretch"},children:[(0,l.jsx)("div",{className:"sized-content v-flex flex-center",children:(0,l.jsxs)(a.default,{href:e.route,className:"sized-content item-page-component-container tracker-item-parent v-flex flex-center".concat(null!==(n=" ".concat(e.rarity))&&void 0!==n?n:""),style:{gap:"5px",position:"relative"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{width:"75px",height:"75px"},children:(0,l.jsx)("img",{src:e.icon})}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:e.labelHeading})}),(0,l.jsx)(x.Z,{itemId:e.id})]})}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{gap:"10px",justifyContent:"flex-start",alignItems:"flex-start"},children:[["Unvaulted Relics",m.filter(t=>!t.vaulted&&0==t.componentName.localeCompare(e.rawObj.name))],["Vaulted Relics",m.filter(t=>t.vaulted&&0==t.componentName.localeCompare(e.rawObj.name))]].map((e,t)=>{let[n,i]=e;return(0,l.jsxs)("div",{className:"sized-content component-page-relative-info-container v-flex flex-center",style:{display:i.length<=0?"none":"",maxWidth:"75vw",gap:"20px",backgroundColor:"var(--color-quaternary)",borderRadius:"10px",padding:"10px"},children:[(0,l.jsx)("div",{style:{fontStyle:"italic",minWidth:"max-content"},children:n}),(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{gap:"5px",flexWrap:"wrap",maxWidth:"15vw"},children:i.toSorted((e,t)=>c[e.rarity]-c[t.rarity]||o[e.rawObj.relic.tier]-o[t.rawObj.relic.tier]||e.rawObj.relic.name.localeCompare(t.rawObj.relic.name)).map(e=>{var n;return(0,l.jsxs)(a.default,{href:e.route,className:"sized-content item-page-component-container relic-button-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(n=" ".concat(e.rarity))&&void 0!==n?n:""),style:{gap:"5px",opacity:e.vaulted?"50%":"100%"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{width:"50px",height:"50px"},children:(0,l.jsx)("img",{src:e.icon})}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",textWrap:"nowrap"},children:e.label})}),(0,l.jsx)(d.Z,{itemId:e.rawObj.relic.id}),(0,l.jsx)(N.Z,{positionAbsolute:!0,itemId:e.rawObj.relic.id})]},"".concat(t,"-").concat(e.rawObj.relic.name))})})]},"Section".concat(n).concat(t))})})]},"".concat(t,"-").concat(e.name))})})};var w=n(3104);let O=e=>{let{component:t,rarityPriorities:n}=e,i=(0,s.useRouter)(),c=r.hrm(),o=r.njK(null,"Components",null,"relics",t,{router:i});return(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container v-flex flex-center",style:{maxWidth:"75vw"},children:[["Unvaulted Relics",o.filter(e=>!e.vaulted)],["Vaulted Relics",o.filter(e=>e.vaulted)]].map((e,t)=>{let[i,s]=e;return(0,l.jsxs)("div",{className:"sized-content component-page-relative-info-container v-flex flex-center",style:{display:s.length<=0?"none":"",maxWidth:"75vw",gap:"20px"},children:[(0,l.jsx)("div",{style:{fontStyle:"italic"},children:i}),(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:s.toSorted((e,t)=>n[e.rarity]-n[t.rarity]||c[e.rawObj.relic.tier]-c[t.rawObj.relic.tier]||e.rawObj.relic.name.localeCompare(t.rawObj.relic.name)).map((e,t)=>{var n;return(0,l.jsxs)(a.default,{href:e.route,className:"sized-content item-page-component-container item-check-parent tracker-item-parent v-flex flex-center".concat(null!==(n=" ".concat(e.rarity))&&void 0!==n?n:""),style:{gap:"5px",opacity:e.vaulted?"50%":"100%"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{width:"75px",height:"75px"},children:(0,l.jsx)("img",{src:e.icon})}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:e.labelHeading})}),(0,l.jsx)(d.Z,{itemId:e.id}),(0,l.jsx)(N.Z,{positionAbsolute:!0,itemId:e.id})]},"".concat(t,"-").concat(e.name))})})]},"Section".concat(i).concat(t))})})},S=e=>{let{component:t,rarityPriorities:n}=e,i=(0,s.useRouter)(),[c,o]=(0,h.Z)(),d=r.njK(null,"Components",null,"missions",t,{router:i}).toSorted((e,t)=>r.K$5(e.rawObj.mission,t.rawObj.mission,e.rawObj.relic,t.rawObj.relic,c)).reduce((e,t)=>(e[t.id]||(e[t.id]={infoObj:t,mission:t.rawObj.mission,relics:{}}),e[t.id].relics[t.rawObj.relic.id]||(e[t.id].relics[t.rawObj.relic.id]={rarity:t.rarity,rotations:t.rawObj.rotations,relic:t.rawObj.relic}),e),{});return(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container v-flex flex-center",style:{maxWidth:"75vw"},children:(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:Object.entries(d).map((e,t)=>{let[i,s]=e;return(0,l.jsxs)(a.default,{href:s.infoObj.route,className:"sized-content item-page-component-container tracker-item-parent v-flex flex-center",style:{cursor:"pointer",gap:"5px",opacity:s.infoObj.vaulted?"50%":"100%",alignSelf:"stretch",width:"220px",justifyContent:"flex-start"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"75px"},src:s.infoObj.icon})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",fontWeight:"bold"},children:s.infoObj.labelHeading}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:s.infoObj.label}),(0,l.jsx)("div",{className:"sized-content v-flex",style:{gap:"5px",marginTop:"5px"},children:Object.entries(s.relics).toSorted((e,t)=>{let[l,i]=e,[s,a]=t;return n[i.rarity]-n[a.rarity]}).map((e,t)=>{var n;let[i,s]=e;return(0,l.jsxs)(a.default,{href:r.LnC(s.relic.id),className:"sized-content h-flex flex-center object-page-mission-relic".concat(null!==(n=" ".concat(s.rarity))&&void 0!==n?n:""),style:{gap:"5px"},children:[(0,l.jsx)(N.Z,{positionAbsolute:!1,itemId:s.relic.id,showIfHas:!1,iconStyle:{width:"10px",height:"10px"}}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"30px"},src:"".concat(r.wHH().basePath,"/images/").concat(s.relic.tier,".png")})}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small"},children:s.relic.name}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{alignItems:"flex-start",marginLeft:"5px"},children:s.rotations.map((e,t)=>(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",whiteSpace:"pre"},children:[(0,l.jsx)("span",{style:{fontWeight:"bold"},children:e.rotation})," - ",(0,l.jsx)("span",{style:{fontStyle:"italic"},children:e.perc})]},"".concat(e.rotation,"-").concat(t)))})]},"".concat(s.name,"-").concat(t))})})]})]},"".concat(t,"-").concat(s.infoObj.name))})})})},W=e=>{let{components:t}=e;return(0,s.useRouter)(),(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:t.map((e,t)=>(0,l.jsx)(f.Z,{component:e,fullName:!0},"".concat(t,"-").concat(e.id)))})},C=e=>{let{relic:t,missions:n,rarityPriorities:i}=e;return(0,s.useRouter)(),(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container v-flex flex-center",style:{maxWidth:"75vw"},children:(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:n.map((e,n)=>(0,l.jsxs)(a.default,{href:e.route,className:"sized-content item-page-component-container tracker-item-parent v-flex flex-center",style:{cursor:"pointer",gap:"5px",alignSelf:"stretch",justifyContent:"flex-start",width:"150px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"75px"},src:e.icon})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",fontWeight:"bold",textAlign:"center"},children:e.labelHeading}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",textAlign:"center"},children:e.label}),(0,l.jsx)("div",{className:"sized-content v-flex",style:{gap:"5px",marginTop:"5px"},children:e.rotations["".concat(t.name," Relic")].map((e,t)=>(0,l.jsxs)("div",{className:"sized-content",style:{fontSize:"small",whiteSpace:"pre",borderRadius:"10px",padding:"10px",backgroundColor:"var(--color-sextenary)"},children:[(0,l.jsx)("span",{style:{fontWeight:"bold"},children:e.rotation})," - ",(0,l.jsx)("span",{style:{fontStyle:"italic"},children:e.perc})]},"".concat(e.rotation,"-").concat(t)))})]})]},"".concat(n,"-").concat(e.id)))})})};var I=n(1524),R=n(8231);let Z=e=>{let{mission:t,hideFarmed:n}=e,i=(0,s.useRouter)(),[c,o]=(0,I.Z)(),[p,h]=(0,R.Z)(),j=Object.entries(p).filter(e=>{var t;let[n,l]=e;return null!==(t=l.tracked)&&void 0!==t&&t}).map(e=>{let[t,n]=e;return t}),v=r.RHD(j,i),u=v.components.filter(e=>!n||!r.Wk9(e.rawObj,c)),g=v.relics,y=r.Nly(),b=r.hrm(),z=r.S$I(),w=r.fsP(t);return(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:Object.entries(u.reduce((e,t)=>(null==t.rawObj.parentItem?e[t.rawObj.id]={item:{category:"Components",fullName:t.rawObj.fullName,icon:t.icon,route:t.route,id:t.rawObj.id,type:"?",componentFullName:t.rawObj.fullName,name:t.rawObj.fullName},components:[t]}:(e[t.rawObj.parentItem]||(e[t.rawObj.parentItem]={item:r.fGE(t.rawObj.parentItem),components:[]}),e[t.rawObj.parentItem].components.push(t)),e),{})).map((e,t)=>{let[n,i]=e;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center item-check-parent",style:{borderRadius:"10px",backgroundColor:r.WqU(r.fGE(n))?"var(--color-secondary-farmed)":"var(--color-secondary)",padding:"10px",gap:"5px",alignSelf:"stretch",justifyContent:"flex-start"},children:[(0,l.jsxs)(a.default,{href:r.LnC(i.item.id),className:"sized-content v-flex flex-center",style:{cursor:"pointer"},children:[(0,l.jsx)("img",{style:{height:"50px"},src:r.I6l(i.item)}),(0,l.jsx)("div",{children:i.item.name})]}),(0,l.jsx)(m.Z,{rawObj:r.fGE(n)}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{gap:"10px"},children:i.components.map((e,t)=>{let n=g.filter(t=>t.id in w&&0==t.componentFullName.localeCompare(e.rawObj.fullName));return(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{padding:"10px",borderRadius:"10px",gap:"10px",backgroundColor:r.WqU(r.fGE(e.id))?"var(--color-quaternary-farmed)":"var(--color-quaternary)",alignSelf:"stretch",justifyContent:"flex-start",opacity:n.length<=0?"50%":"100%"},children:[(0,l.jsx)("div",{className:"sized-content v-flex flex-center",children:(0,l.jsx)(f.Z,{width:"70px",iconHeight:"45px",component:e})}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{maxWidth:"500px",maxHeight:"300px",overflow:"auto",gap:"5px",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"flex-start"},children:n.toSorted((e,t)=>{var n,l;return e.vaulted-t.vaulted||(r.iCw(t.id)?1:-1)-(r.iCw(e.id)?1:-1)||(null!==(n=z[t.id])&&void 0!==n?n:0)-(null!==(l=z[e.id])&&void 0!==l?l:0)||y[e.rarity]-y[t.rarity]||b[e.rawObj.relic.tier]-b[t.rawObj.relic.tier]||e.rawObj.relic.name.localeCompare(t.rawObj.relic.name)}).map(e=>{var n;return(0,l.jsxs)(a.default,{href:e.route,className:"sized-content item-page-component-container tracker-item-parent h-flex flex-center".concat(null!==(n=" ".concat(e.rarity))&&void 0!==n?n:""),style:{width:"220px",gap:"5px",opacity:e.vaulted?"50%":"100%"},children:[(0,l.jsx)(N.Z,{positionAbsolute:!1,itemId:e.id,showIfHas:!1,iconStyle:{width:"10px",height:"10px"}}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",children:(0,l.jsx)("img",{style:{height:"25px"},src:e.icon})}),(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content",paddingRight:"5px"},children:e.label}),(0,l.jsx)(d.Z,{positionAbsolute:!1,itemId:e.id,iconStyle:{minWidth:"10px",minHeight:"10px",width:"10px",height:"10px"}})]}),(0,l.jsx)("div",{className:"sized-content v-flex flex-center",style:{alignItems:"flex-start",marginLeft:"5px"},children:w[e.id].percObj.map((e,t)=>(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",whiteSpace:"pre"},children:[(0,l.jsx)("span",{style:{fontWeight:"bold"},children:e.rotation})," - ",(0,l.jsx)("span",{style:{fontStyle:"italic"},children:e.perc})]},"".concat(e.rotation,"-").concat(t)))})]},"".concat(t,"-").concat(e.rawObj.relic.name))})})]},"".concat(t,"-").concat(e.name))})}),(0,l.jsx)(x.Z,{itemId:n,positionAbsolute:!0})]},"".concat(t,"-").concat(n))})})},k=e=>{let{mission:t,rarityPriorities:n}=e,i=(0,s.useRouter)();r.hrm();let c=r.njK(null,"Missions",null,"relics",t,{router:i});return(0,l.jsx)(l.Fragment,{children:c.length<=0?(0,l.jsx)("div",{children:"This mission doesn't drop any relic."}):(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container v-flex flex-center",style:{maxWidth:"75vw"},children:(0,l.jsx)("div",{className:"sized-remaining component-page-relative-info-container h-flex",style:{alignItems:"flex-start"},children:c?Object.entries(c.reduce((e,t)=>(t.rawObj.forEach(n=>{e[n.rotation]||(e[n.rotation]=[]),e[n.rotation].push({rotation:n,relic:t})}),e),{})).toSorted((e,t)=>e[0].localeCompare(t[0])).map((e,t)=>{let[n,i]=e;return(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{backgroundColor:"var(--color-tertiary)",borderRadius:"10px",padding:"10px",gap:"10px",alignSelf:"stretch",justifyContent:"flex-start"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"large",fontWeight:"bold"},children:"null"!==n?n:"(no rotation)"}),(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{gap:"20px",flexWrap:"wrap"},children:i.map(e=>{var i;let{rotation:s,relic:r}=e;return(0,l.jsxs)(a.default,{href:r.route,className:"sized-content item-page-component-container tracker-item-parent v-flex flex-center".concat(null!==(i=" ".concat(r.rarity))&&void 0!==i?i:""),style:{gap:"5px",opacity:r.vaulted?"50%":"100%",alignSelf:"stretch",justifyContent:"flex-start"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{width:"75px",height:"75px"},children:(0,l.jsx)("img",{src:r.icon})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:r.labelHeading}),(0,l.jsx)("div",{className:"sized-content v-flex",style:{gap:"5px",marginTop:"5px"},children:r.rawObj.filter(e=>{var t;return 0==(null!==(t=e.rotation)&&void 0!==t?t:"").localeCompare(n)}).map((e,t)=>(0,l.jsx)("div",{className:"sized-content",style:{fontSize:"small",whiteSpace:"pre",borderRadius:"10px",padding:"10px",backgroundColor:"var(--color-sextenary)"},children:(0,l.jsx)("span",{style:{fontWeight:"bold",fontStyle:"italic"},children:e.perc})},"".concat(e.rotation,"-").concat(t)))})]})]},"".concat(t,"-").concat(r.id))})})]},"".concat(t,"-").concat(n))}):null})})})},H=e=>{let{mission:t,rarityPriorities:n}=e,i=(0,s.useRouter)();r.hrm();let c=r.njK(null,"Missions",null,"relics",t,{router:i});return(0,l.jsx)(l.Fragment,{children:c.length<=0?(0,l.jsx)("div",{children:"This mission doesn't drop any relic."}):(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container v-flex flex-center",style:{maxWidth:"75vw"},children:(0,l.jsx)("div",{className:"sized-content component-page-relative-info-container h-flex flex-center",style:{maxWidth:"75vw",flexWrap:"wrap"},children:c.map((e,t)=>{var n;return(0,l.jsxs)(a.default,{href:e.route,className:"sized-content item-page-component-container tracker-item-parent v-flex flex-center".concat(null!==(n=" ".concat(e.rarity))&&void 0!==n?n:""),style:{gap:"5px",opacity:e.vaulted?"50%":"100%",alignSelf:"stretch",justifyContent:"flex-start"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{width:"75px",height:"75px"},children:(0,l.jsx)("img",{src:e.icon})}),(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",style:{gap:"1px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{fontSize:"small",minWidth:"fit-content"},children:e.labelHeading}),(0,l.jsx)("div",{className:"sized-content v-flex",style:{gap:"5px",marginTop:"5px"},children:e.rawObj.map((e,t)=>(0,l.jsxs)("div",{className:"sized-content",style:{fontSize:"small",whiteSpace:"pre",borderRadius:"10px",padding:"10px",backgroundColor:"var(--color-sextenary)"},children:[(0,l.jsx)("span",{style:{fontWeight:"bold"},children:e.rotation}),e.rotation?" - ":null,(0,l.jsx)("span",{style:{fontStyle:"italic"},children:e.perc})]},"".concat(e.rotation,"-").concat(t)))})]})]},"".concat(t,"-").concat(e.name))})})})})},E={items:function(e){let{routeId:t,pathObj:n}=e,a=(0,s.useRouter)(),[c,o]=(0,i.useState)("relic"),[d,x]=(0,i.useState)(!0),[m,h]=(0,b.Z)(),N=r.fGE(n.id),w=r.njK(null,"Items",null,"components",N,{router:a});return(0,l.jsx)("div",{className:"sized-content v-flex",children:(0,l.jsx)("div",{className:"sized-remaining h-flex flex-center",children:(0,l.jsxs)("div",{className:"sized-remaining v-flex flex-center",style:{gap:"50px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex",style:{marginTop:"20px"}}),N.vaulted?(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",children:["".concat(N.name," is"),(0,l.jsx)("span",{style:{fontWeight:"bold",whiteSpace:"pre"},children:" vaulted"}),"."]}):null,(0,l.jsx)(p,{itemId:N.id,iconUrl:r.I6l(r.fGE(n.id)),label:n.id}),(0,l.jsx)("div",{className:"sized-content item-page-item-components-container h-flex flex-center",style:{flexWrap:"wrap"},children:w.map((e,t)=>(0,l.jsx)(f.Z,{component:e},"".concat(t,"-").concat(e.id)))}),(0,l.jsx)(j.Z,{hasMinWidth:!0,defaultTab:"Components",tabs:{Components:(0,l.jsx)(z,{item:N,components:w}),Relics:(0,l.jsx)(u.Z,{hideFarmed:r.ZAN("hideFarmed",!1),objects:w.map(e=>e.rawObj.id)}),...N.vaulted?null:{Missions:(0,l.jsx)(g.Z,{hideFarmed:r.ZAN("hideFarmed",!1),groupBy:c,item:N,objectIds:w.map(e=>e.rawObj.id)})}},headerControls:{Missions:(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",style:{gap:"10px"},children:[(0,l.jsx)(y.Z,{setHideFarmed:x}),(0,l.jsx)(v.Z,{options:{"Group By Relic":{value:"relic",defaultOption:!0},"Group By Component":{value:"component"}},onConfirm:e=>{let[t,n]=e;return o(n.value)}})]}),Relics:(0,l.jsx)("div",{className:"sized-content h-flex flex-center",style:{gap:"10px"},children:(0,l.jsx)(y.Z,{setHideFarmed:x})})}})]})})})},components:function(e){let{routeId:t,pathObj:n}=e;(0,s.useRouter)();let[c,o]=(0,i.useState)("Relics"),d=r.fGE(n.id);r.fGE(d.parentItem);let x=r.Nly();return(0,l.jsx)("div",{className:"sized-content v-flex",children:(0,l.jsx)("div",{className:"sized-remaining h-flex",children:(0,l.jsxs)("div",{className:"sized-remaining v-flex flex-center",style:{gap:"60px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex",style:{marginTop:"20px"}}),d.vaulted?(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",children:["".concat(d.fullName," is"),(0,l.jsx)("span",{style:{fontWeight:"bold",whiteSpace:"pre"},children:" vaulted"}),"."]}):null,(0,l.jsxs)("div",{className:"sized-content v-flex flex-center",children:[null==d.parentItem?null:(0,l.jsxs)(a.default,{href:r.LnC(d.parentItem),className:"sized-content component-page-parent-item-button h-flex flex-center",style:{marginBottom:"20px",gap:"10px"},children:[(0,l.jsx)("img",{style:{height:"30px"},src:r.I6l(r.fGE(d.parentItem))}),(0,l.jsx)("div",{children:d.parentItem})]}),(0,l.jsx)(p,{itemId:d.id,iconUrl:"".concat(r.wHH().basePath,"/images/").concat(d.fullName,".png"),label:n.id}),(0,l.jsx)("div",{style:{marginTop:"5px"},children:(0,l.jsx)(w.Z,{component:d,isRawObj:!0,showLabel:!1})})]}),(0,l.jsx)(j.Z,{hasMinWidth:!0,defaultTab:"Relics",tabs:{Relics:(0,l.jsx)(O,{component:d,rarityPriorities:x}),...d.vaulted?null:{Missions:(0,l.jsx)(S,{component:d,rarityPriorities:x})}}})]})})})},relics:function(e){let{routeId:t,pathObj:n}=e,i=(0,s.useRouter)(),[a,c]=(0,h.Z)(),o=r.fGE(n.id),d=r.njK(null,"Relics",null,"components",o,{router:i}),x=r.njK(null,"Relics",null,"missions",o,{missionPriorities:a,router:i});return(0,l.jsx)("div",{className:"sized-content v-flex",children:(0,l.jsx)("div",{className:"sized-remaining h-flex flex-center",children:(0,l.jsxs)("div",{className:"sized-remaining v-flex flex-center",style:{gap:"50px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex",style:{marginTop:"20px"}}),o.vaulted?(0,l.jsxs)("div",{className:"sized-content h-flex flex-center",children:["".concat(o.name," is"),(0,l.jsx)("span",{style:{fontWeight:"bold",whiteSpace:"pre"},children:" vaulted"}),"."]}):null,(0,l.jsx)(p,{itemId:o.id,iconUrl:"".concat(r.wHH().basePath,"/images/").concat(n.id.split(" ")[0].trim(),".png"),label:n.id}),(0,l.jsx)(W,{components:d}),o.vaulted?null:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"sized-content h-flex",style:{marginTop:"50px",fontSize:"large",fontStyle:"italic",fontWeight:"bold"},children:"Missions"}),(0,l.jsx)(C,{relic:o,missions:x})]})]})})})},missions:function(e){let{routeId:t,pathObj:n}=e;(0,s.useRouter)();let[a,c]=(0,i.useState)("Rotations"),o=r.fGE(n.id);return(0,l.jsx)("div",{className:"sized-content v-flex",children:(0,l.jsx)("div",{className:"sized-remaining h-flex flex-center",children:(0,l.jsxs)("div",{className:"sized-remaining v-flex flex-center",style:{gap:"50px"},children:[(0,l.jsx)("div",{className:"sized-content h-flex",style:{marginTop:"20px"}}),(0,l.jsx)(p,{itemId:o.id,iconUrl:r.I6l(r.fGE(n.id)),label:n.id,labelFooter:o.type}),(0,l.jsx)(j.Z,{hasMinWidth:!0,defaultTab:"Rotations",tabs:{"Farming Sheet":(0,l.jsx)(Z,{mission:o}),Rotations:(0,l.jsx)(k,{mission:o}),Relics:(0,l.jsx)(H,{mission:o})}})]})})})}};function G(e){let{category:t,routeId:n}=e;(0,s.useParams)();let i=E[t],a=r.U6u(n);return(0,l.jsx)(i,{routeId:n,pathObj:a})}},1356:function(e,t,n){"use strict";n(7437),n(2265),n(6463)}},function(e){e.O(0,[125,4,138,713,497,749,971,23,744],function(){return e(e.s=8481)}),_N_E=e.O()}]);