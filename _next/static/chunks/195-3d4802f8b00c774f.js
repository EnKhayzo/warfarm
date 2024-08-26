"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[195],{6195:function(e,n,t){function r(e,n){if(Array.isArray(n)){for(var t=0;t<n.length;t++)if(0==e.localeCompare(n[t].case)){n[t].func();break}}else for(let[t,r]of Object.entries(n))0==t.localeCompare(e)&&r()}function o(e){let n=JSON.parse(localStorage.getItem(e));return"userData"===e&&null==n?(console.warn("userData was null on disk! returning {}",e,n),{}):n}function a(e,n){localStorage.setItem(e,JSON.stringify(n))}function l(e){var n,t,r;a("userData",e),Y.set(null!==(n=e.componentsObtained)&&void 0!==n?n:{}),Q.set(null!==(t=e.trackedItems)&&void 0!==t?t:{}),ee.set(null!==(r=e.missionPriorityPreferences)&&void 0!==r?r:{})}function c(){a("userData",{}),Y.set({}),Q.set({}),ee.set({})}function i(){let e=o("userData");null!=e.componentsObtained&&delete e.componentsObtained,Y.set({}),a("userData",e)}function u(e,n,t){let r=o("userData");null==r&&(r={}),"componentsObtained"in r||(r.componentsObtained={}),e in r.componentsObtained||(r.componentsObtained[e]={}),r.componentsObtained[e][n]=t,Y.set(r.componentsObtained),a("userData",r)}function s(e){let n=p(e,"obtained");++n>el(e).required&&(n=0),u(e,"obtained",n)}function m(e){let n=p(e,"obtained");--n<0&&(n=el(e).required),u(e,"obtained",n)}function p(e,n){let t=o("userData");return null!=t&&"componentsObtained"in t&&e in t.componentsObtained?t.componentsObtained[e][n]:null}function d(){var e;return null!==(e=o("userData").componentsObtained)&&void 0!==e?e:{}}function f(){let e=o("userData");return e.trackedItems?e.trackedItems:{}}function b(e){return f()[e]}function y(){let e=o("userData");null!=e.trackedItems&&delete e.trackedItems,Q.set({}),a("userData",e)}function g(e,n){let t=f();t[e]=n,Q.set(t),function(e){let n=o("userData");n.trackedItems=e,a("userData",n)}(t)}function v(e){if(null==e){console.warn("null passed to setUserDataMissionPriorityPreferences!");return}let n=o("userData");n.missionPriorityPreferences=e,ee.set(e),a("userData",n)}function w(){let e=o("userData");null!=e.missionPriorityPreferences&&delete e.missionPriorityPreferences,ee.set({}),a("userData",e)}function h(e,n){let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(t),r.download=n,document.body.appendChild(r),r.click(),document.body.removeChild(r)}async function O(){return new Promise((e,n)=>{let t=document.createElement("input");t.type="file",t.accept=".json",t.addEventListener("change",function(t){let r=t.target.files[0];if(r){let t=new FileReader;t.onload=function(t){try{let n=JSON.parse(t.target.result);e(n)}catch(e){console.error("Error parsing JSON:",e),n(e)}},t.readAsText(r)}else console.log("No file selected."),n(error)}),t.click()})}function N(e){return e.charAt(0).toUpperCase()+e.slice(1)}function C(e){return e.split(" ")[0].trim()}function j(e){return null==e.rewards?[]:[...Object.entries(e.rewards).map(e=>{let[n,t]=e;return t.map(e=>({rewardFullName:e,rarity:n}))}).flat(1)]}function F(e){return e in D.map?D.map[e].map(e=>D.relics[e]).map(e=>[e,k[e]]).map(n=>{let[t,r]=n;return{vaulted:r.vaulted,rarity:j(r).find(n=>0==n.rewardFullName.localeCompare(e)).rarity,relic:r}}):[]}function I(e){return e in A.map?Object.entries(A.map[e]).map(n=>{let[t,r]=n;return r.map(n=>({vaulted:k[A.relics[n]].vaulted,rarity:j(k[A.relics[n]]).find(n=>0==n.rewardFullName.localeCompare(e)).rarity,mission:M[t],relic:k[A.relics[n]],rotations:M[t].relicRewards[A.relics[n]]}))}).flat(1):[]}t.d(n,{$o:function(){return w},AA:function(){return g},Cu:function(){return O},EX:function(){return es},H7:function(){return U},I6:function(){return ei},JO:function(){return s},K$:function(){return $},KS:function(){return eu},MS:function(){return ec},Nl:function(){return B},Nq:function(){return W},Nx:function(){return H},PO:function(){return j},Po:function(){return ey},S1:function(){return r},U_:function(){return ea},VW:function(){return C},Vk:function(){return Q},Wk:function(){return ep},Wq:function(){return ed},X3:function(){return Y},X_:function(){return er},Z1:function(){return L},_A:function(){return l},_s:function(){return p},ae:function(){return ev},bb:function(){return h},bu:function(){return V},cE:function(){return _},d0:function(){return X},dN:function(){return Z},dX:function(){return f},eN:function(){return en},eP:function(){return v},fG:function(){return el},fm:function(){return N},hr:function(){return K},i1:function(){return y},iH:function(){return eh},j2:function(){return x},k5:function(){return m},l6:function(){return b},lw:function(){return em},nj:function(){return G},oB:function(){return eg},qU:function(){return o},t1:function(){return i},u4:function(){return d},uZ:function(){return eo},vt:function(){return ef},wI:function(){return c},xg:function(){return ee},y:function(){return J},y7:function(){return eb}});let S=null,k=null,M=null,R=null,D=null,A=null,P=null,q=null,E=null,T=!1;async function x(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];T||(S=await t.e(211).then(t.t.bind(t,8211,19)),k=await t.e(894).then(t.t.bind(t,9894,19)),M=await t.e(294).then(t.t.bind(t,5294,19)),q=Object.values((await t.e(803).then(t.t.bind(t,8803,19))).default),R=await t.e(700).then(t.t.bind(t,9700,19)),D=await t.e(783).then(t.t.bind(t,5783,19)),A=await t.e(982).then(t.t.bind(t,2982,19)),P=await t.e(546).then(t.t.bind(t,5546,19)),R=Object.fromEntries(q.map((e,n)=>[e.componentFullName,n])),E=Object.fromEntries((E=[...E=[...E=[...E=[...E=[],...await H().map(e=>({category:"items",name:e.name.replaceAll(" ","").replaceAll("&",""),id:e.name})).flat(1)],...await J().map(e=>({category:"components",name:e.componentFullName.replaceAll(" ","").replaceAll("&",""),id:e.componentFullName})).flat(1)],...Object.entries(await _()).map(e=>{let[n,t]=e;return{category:"relics",name:n.replaceAll(" ","").replaceAll("&",""),id:n}}).flat(1)],...await L().map(e=>({category:"missions",name:"".concat(e.name).concat(e.planet),id:"".concat(e.name,", ").concat(e.planet)})).flat(1)]).map(e=>[e.name,e])),e&&(Q.set(f()),Y.set(d()),ee.set(W()),en.set([])),T=!0)}function H(){return S?S.default:null}function J(){return q||null}function _(){return k?k.default:null}function L(){return M?M.default.filter(e=>!e.planet.includes("Mission Types")):null}function U(e){let n=null;return r(e.category,{Items:()=>{n="components"},Components:()=>{n="relics"},Relics:()=>{n="components"},Missions:()=>{n="relics"}}),n}function X(e){let n=null;return r(e.category,{Items:()=>{n=["Components","Relics",e.vaulted?null:"Missions"].filter(e=>null!=e)},Components:()=>{n=["Relics",e.vaulted?null:"Missions"].filter(e=>null!=e)},Relics:()=>{n=["Components",e.vaulted?null:"Missions"].filter(e=>null!=e)},Missions:()=>{n=["Relics"]}}),n}function W(){var e;let n=null!==(e=o("userData").missionPriorityPreferences)&&void 0!==e?e:{};return null!=n&&Object.keys(n).length>0?n:{Disruption:1,Capture:2,Exterminate:3,Survival:4,Defense:5,Spy:6,Interception:7}}function B(){return{common:1,uncommon:2,rare:3}}function K(){return{Lith:1,Meso:2,Neo:3,Axi:4,Requiem:5}}function V(){return{warframes:1,"primary weapons":2,"secondary weapons":3,"melee weapons":4,"arch weapons":5,companions:6}}function Z(e,n,t){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=null;return r(e,{Items:()=>{let l=t.item;r(n,{components:()=>{var r,o;let c=t.component;a={icon:"/warfarm/images/".concat(c.componentFullName,".png"),vaulted:!!l&&l.vaulted,rarity:(()=>{let e={common:0,uncommon:1,rare:2};return F(c.componentFullName).map(e=>[e.relic.name,e]).filter(e=>{let[n,t]=e;return!!l&&l.vaulted||!t.vaulted}).map(e=>{let[n,t]=e;return t.rarity}).toSorted((n,t)=>e[n]-e[t])[0]})(),labelHeading:"".concat(c.component),labelFooter:null,label:"".concat(null!==(o=null!==(r=c.obtained)&&void 0!==r?r:p(c.componentFullName,"obtained"))&&void 0!==o?o:"0","/").concat(c.required),onClick:()=>s(c.componentFullName),type:l?l.type:"",rawObj:c,id:"".concat(c.componentFullName),route:es(c,"Components"),category:e,tab:n,searchObjId:"".concat(e,"-").concat(n,"-(").concat(l?l.id:"","-").concat(c.id,")")}},relics:()=>{let r=t.component,[c,i]=t.relicEntry;a={icon:"/warfarm/images/".concat(c.split(" ")[0].trim(),".png"),vaulted:i.vaulted,rarity:i.rarity,componentName:r.component,componentFullName:r.componentFullName,labelHeading:"".concat(r.component),labelFooter:null,label:"".concat(c),onClick:()=>o.push(es(i.relic)),rawObj:i,id:"".concat(i.relic.name),route:es(i.relic,"Relics"),category:e,tab:n,searchObjId:"".concat(e,"-").concat(n,"-(").concat(l?l.id:"","-").concat(r.id,"-").concat(c,")")}},missions:()=>{var r;let c=t.component,[i,u]=t.missionEntry;a={icon:"/warfarm/images/".concat(i.split(",")[1].trim(),".png"),vaulted:u.vaulted,rarity:u.rarity,labelHeading:"".concat(c.component),labelFooter:"".concat(null!==(r=u.relic.name)&&void 0!==r?r:"?"," (").concat(u.rotations.toSorted((e,n)=>Number(e.perc.replace("%",""))-Number(n.perc.replace("%",""))).map(e=>{var n,t;return"".concat(null!==(n=e.rotation)&&void 0!==n?n:"?"," - ").concat(null!==(t=e.perc)&&void 0!==t?t:"?")}).join(", "),")"),label:"".concat(i," (").concat(u.mission.detailName,")"),onClick:()=>o.push(es(u.mission)),rawObj:u,id:"".concat(u.mission.name,", ").concat(u.mission.planet),route:es(u.mission,"Missions"),category:e,tab:n,searchObjId:"".concat(e,"-").concat(n,"-(").concat(l.id,"-").concat(c.id,"-").concat(i,")")}}})},Components:()=>{let l=t.component;r(n,{relics:()=>{let[r,c]=t.relicEntry;a={icon:"/warfarm/images/".concat(r.split(" ")[0].trim(),".png"),vaulted:c.vaulted,rarity:c.rarity,componentName:l.componenName,componentFullName:l.componentFullName,labelHeading:"".concat(r),labelFooter:null,label:null,onClick:()=>o.push(es(c.relic)),rawObj:c,id:"".concat(c.relic.name),route:es(c.relic,"Relics"),category:e,tab:n,searchObjId:"".concat(e,"-").concat(n,"-(").concat(l.id,"-").concat(r,")")}},missions:()=>{var r;let[c,i]=t.missionEntry;a={icon:"/warfarm/images/".concat(c.split(",")[1].trim(),".png"),vaulted:i.vaulted,rarity:i.rarity,labelHeading:"".concat(i.mission.detailName),labelFooter:"".concat(null!==(r=i.relic.name)&&void 0!==r?r:"?"," (").concat(i.rotations.toSorted((e,n)=>Number(e.perc.replace("%",""))-Number(n.perc.replace("%",""))).map(e=>{var n,t;return"".concat(null!==(n=e.rotation)&&void 0!==n?n:"?"," - ").concat(null!==(t=e.perc)&&void 0!==t?t:"?")}).join(", "),")"),label:"".concat(c),onClick:()=>o.push(es(i.mission)),rawObj:i,id:"".concat(i.mission.name,", ").concat(i.mission.planet),route:es(i.mission,"Missions"),category:e,tab:n,searchObjId:"".concat(e,"-").concat(n,"-(").concat(l.id,"-").concat(c,")")}}})},Relics:()=>{let l=t.relic;r(n,{components:()=>{var r,o;let{tier:c,component:i}=t.rewardEntry;a={icon:"/warfarm/images/".concat(i.componentFullName,".png"),vaulted:l.vaulted,rarity:c,labelHeading:"".concat(i.componentFullName),labelFooter:null,label:"".concat(null!==(o=null!==(r=i.obtained)&&void 0!==r?r:p(i.componentFullName,"obtained"))&&void 0!==o?o:"0","/").concat(i.required),onClick:e=>s(i.componentFullName),type:l.type,rawObj:i,id:"".concat(i.componentFullName),route:es(i,"Components"),category:e,tab:n,searchObjId:"".concat(e,"-").concat(n,"-(").concat(l.id,"-").concat(c,"-").concat(i.id,")")}},missions:()=>{let r=t.mission;a={icon:"/warfarm/images/".concat(r.planet,".png"),labelHeading:"".concat(r.detailName),labelFooter:"(".concat(Object.values(r.relicRewards[l.name]).toSorted((e,n)=>Number(e.perc.replace("%",""))-Number(n.perc.replace("%",""))).map(e=>{var n,t;return"".concat(null!==(n=e.rotation)&&void 0!==n?n:"?"," - ").concat(null!==(t=e.perc)&&void 0!==t?t:"?")}).join(", "),")"),label:"".concat(r.planet,", ").concat(r.name),onClick:()=>o.push(es(r)),rotations:r.relicRewards,rawObj:r,id:"".concat(r.name,", ").concat(r.planet),route:es(r,"Missions"),category:e,tab:n,searchObjId:"".concat(e,"-").concat(n,"-(").concat(l.id,"-").concat(r.id,")")}}})},Missions:()=>{let l=t.mission;r(n,{relics:()=>{let[r,c]=t.relicEntry;a={icon:"/warfarm/images/".concat(r.split(" ")[0].trim(),".png"),vaulted:k[r].vaulted,rarity:null,labelHeading:"".concat(r),label:null,labelFooter:"(".concat(Object.values(c).toSorted((e,n)=>Number(e.perc.replace("%",""))-Number(n.perc.replace("%",""))).map(e=>{var n,t;return"".concat(null!==(n=e.rotation)&&void 0!==n?n:"?"," - ").concat(null!==(t=e.perc)&&void 0!==t?t:"?")}).join(", "),")"),onClick:()=>o.push(es(c)),rawObj:c,id:"".concat(r),route:es(k[r],"Relics"),category:e,tab:n,searchObjId:"".concat(e,"-").concat(n,"-(").concat(l.id,"-").concat(r,")")}}})}}),a}function $(e,n,t,r,o){return Math.max(...r.relicRewards[n.name].map(e=>Number(e.perc.replace("%",""))))-Math.max(...t.relicRewards[e.name].map(e=>Number(e.perc.replace("%",""))))||(o[t.detailName]||1/0)-(o[r.detailName]||1/0)}function G(e,n,t,o,a,l){let c=null,i=B(),u=K(),s=l&&l.missionPriorities?l.missionPriorities:ee.get()?ee.get():W(),m=l&&l.router?l.router:null;return r(n,{Items:()=>{r(o,{components:()=>{c=[...a.requiredComponents?a.requiredComponents.map(e=>Z(n,o,{item:a,component:e},m)).toSorted((e,n)=>i[e.rarity]-i[n.rarity]):[]]},relics:()=>{c=[...a.requiredComponents?a.requiredComponents.map(e=>F(e.componentFullName).map(e=>[e.relic.name,e]).toSorted((e,n)=>{let[t,r]=e,[o,a]=n;return(a.vaulted?-1:1)-(r.vaulted?-1:1)}).map(t=>Z(n,o,{item:a,component:e,relicEntry:t},m))).flat(1).toSorted((e,n)=>e.vaulted-n.vaulted||i[e.rarity]-i[n.rarity]):[]]},missions:()=>{c=[...a.requiredComponents?a.requiredComponents.map(e=>I(e.componentFullName).map(e=>["".concat(e.mission.name,", ").concat(e.mission.planet),e]).filter(e=>{let[n,t]=e;return!n.includes("Mission Types")}).toSorted((e,n)=>{let[t,r]=e,[o,a]=n;return $(r.relic,a.relic,r.mission,a.mission,s)}).map(t=>Z(n,o,{item:a,component:e,missionEntry:t},m))).flat(1):[]]}})},Components:()=>{r(o,{relics:()=>{c=[...F(a.componentFullName).map(e=>[e.relic.name,e]).map(e=>Z(n,o,{component:a,relicEntry:e},m)).flat(1).toSorted((e,n)=>e.vaulted-n.vaulted||i[e.rarity]-i[n.rarity]||u[e.rawObj.relic.tier]-u[n.rawObj.relic.tier]||e.rawObj.relic.name.localeCompare(n.rawObj.relic.name))]},missions:()=>{c=[...I(a.componentFullName).map(e=>["".concat(e.mission.name,", ").concat(e.mission.planet),e]).filter(e=>{let[n,t]=e;return!n.includes("Mission Types")}).toSorted((e,n)=>{let[t,r]=e,[o,a]=n;return $(r.relic,a.relic,r.mission,a.mission,s)}).map(e=>Z(n,o,{component:a,missionEntry:e},m)).flat(1)]}})},Relics:()=>{r(o,{components:()=>{c=[...(a.rewards?Object.entries(a.rewards).toSorted((e,n)=>{let[t,r]=e,[o,a]=n;return i[t]-i[o]}).map(e=>{let[n,t]=e;return t.map(e=>({tier:n,reward:e}))}).flat(1).map(e=>{let{tier:n,reward:t}=e;return{tier:n,component:q[R[t]]}}).filter(e=>e&&e.component).map(e=>Z(n,o,{relic:a,rewardEntry:e},m)):[]).flat(1)]},missions:()=>{c=[...M.default.filter(e=>!e.planet.includes("Mission Types")&&"relicRewards"in e).filter(e=>Object.keys(e.relicRewards).some(e=>0==e.localeCompare(a.name))).toSorted((e,n)=>$(a,a,e,n,s)).map(e=>Z(n,o,{relic:a,mission:e},m)).flat(1)]}})},Missions:()=>{r(o,{relics:()=>{c=[...Object.entries(a.relicRewards).map(e=>Z(n,o,{mission:a,relicEntry:e},m)).flat(1).toSorted((e,n)=>e.vaulted-n.vaulted)]}})}}),c}class z{set(e){this.objToObserve=e,this.notifyAll()}get(){return this.objToObserve}addListener(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.listeners.push(e),n&&e(this.objToObserve)}removeListener(e){this.listeners=this.listeners.filter(n=>n!==e)}notifyAll(){for(let e of this.listeners)e(this.objToObserve)}constructor(e=null){this.objToObserve=null,this.listeners=[],this.objToObserve=e,this.listeners=[]}}let Q=new z,Y=new z,ee=new z,en=new z;async function et(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250;for(;!await e();)await function(e){return new Promise(n=>setTimeout(n,e))}(n)}async function er(e,n){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:250,r=e();return await et(async()=>(r=await e())!=n,t),r}function eo(e,n,t){return Math.min(t,Math.max(n,e))}function ea(e){return null==e?{}:JSON.parse(JSON.stringify(e))}function el(e){let n=null;if(!P[e])return console.warn("item not found in idMap!",e),null;let[t,o]=P[e];return o||console.warn("category is undefined! you're about to get an error"),r(o=N(o),{Items:()=>{n=S[t]},Components:()=>{n=q.find(n=>0==n.componentFullName.localeCompare(e))},Relics:()=>{n=k[e]},Missions:()=>{n=M[t]}}),n}function ec(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return n||(n=e.category),0==(n=N(n)).localeCompare("Items")?e.name:0==n.localeCompare("Components")?e.componentFullName:0==n.localeCompare("Relics")?e.name:0==n.localeCompare("Missions")?"".concat(e.name,", ").concat(e.planet):null}function ei(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return n||(n=e.category),0==(n=N(n)).localeCompare("Items")?"/warfarm/images/".concat(e.name,".png"):0==n.localeCompare("Components")?"/warfarm/images/".concat(e.componentFullName,".png"):0==n.localeCompare("Relics")?"/warfarm/images/".concat(e.tier,".png"):0==n.localeCompare("Missions")?"/warfarm/images/".concat(e.planet,".png"):null}function eu(e){return E?E[e]:null}function es(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return n||(n=e.category),0==(n=N(n)).localeCompare("Items")?"/prime/items/".concat(e.name.replaceAll(" ","").replaceAll("&","")):0==n.localeCompare("Components")?"/prime/components/".concat(e.componentFullName.replaceAll(" ","").replaceAll("&","")):0==n.localeCompare("Relics")?"/prime/relics/".concat(e.name.replaceAll(" ","").replaceAll("&","")):0==n.localeCompare("Missions")?"/prime/missions/".concat(e.name).concat(e.planet):null}function em(e,n){let t={};for(let r of e)t[n(r)]||(t[n(r)]=r);return Object.values(t)}function ep(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return null==e?(console.warn("rawObj is null!",e),!1):!(e.required<=0)&&(n||(n=d()),null!=n[e.id]&&n[e.id].obtained>=e.required)}function ed(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return"items"===e.category?function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return null==e.requiredComponents||e.requiredComponents.every(e=>ep(e,n))}(e,n):"components"===e.category&&ep(e,n)}function ef(e,n){return j(e).findIndex(e=>0==e.rewardFullName.localeCompare(n.componentFullName))>-1}function eb(e,n){return e.reduce((e,t)=>{e.components||(e.components=[]),e.relics||(e.relics=[]);let r=el(t);if("items"===r.category){let t=G(null,"Items",null,"components",r,{router:n});e.components=em(e.components.concat(t),e=>e.searchObjId);let o=G(null,"Items",null,"relics",r,{router:n});e.relics=em(e.relics.concat(o),e=>e.searchObjId)}else if("components"===r.category){let t=el(r.parentItem);e.components=em(e.components.concat(Z("Items","components",{item:t,component:r},n)),e=>e.searchObjId);let o=F(r.id).map(e=>Z("Items","relics",{item:t,component:r,relicEntry:[e.relic.id,e]},n));e.relics=em(e.relics.concat(o),e=>e.searchObjId)}return e},{})}function ey(e){en.set(en.get().concat(e))}function eg(e){let n=en.get().indexOf(e);if(n<0){console.warn("no dialog found! trying to match",e);return}let t=[...en.get()];t.splice(n,1),en.set(t)}function ev(){return en.get()}let ew={};function eh(e,n){let t="".concat(n.name,"-").concat(e.componentFullName);if(null!=ew[t])return ew[t];let r=j(n).find(n=>0==n.rewardFullName.localeCompare(e.componentFullName));return null==r?(console.warn("no relation found between relic and component!",e,n),null):(ew[t]=r.rarity,r.rarity)}}}]);