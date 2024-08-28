/*
 * This file is part of Warfarm.
 *
 * Warfarm is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Warfarm is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Warfarm. If not, see <https://www.gnu.org/licenses/>.
 */

export function _match(value, cases){
  if(Array.isArray(cases)){
      for(var i=0; i<cases.length; i++){
          if(value.localeCompare(cases[i]["case"]) == 0){
              cases[i]["func"]();
              break;
          }
      }
  }
  else{
      for(const [ key, _value ] of Object.entries(cases)){
          if(key.localeCompare(value) == 0){
              _value();
          }
      }
  }
}

export async function _matchAsync(value, cases){
  if(Array.isArray(cases)){
      for(var i=0; i<cases.length; i++){
          if(value.localeCompare(cases[i]["case"]) == 0){
              await cases[i]["func"]();
              break;
          }
      }
  }
  else{
      for(const [ key, _value ] of Object.entries(cases)){
          if(key.localeCompare(value) == 0){
              await _value();
          }
      }
  }
}

export function loadSetting(name){
    const value = JSON.parse(localStorage.getItem(name));
    if(name === "userData" && value == null) { console.warn(`userData was null on disk! returning {}`, name, value); return {} };

    return value;
}

export function saveSetting(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}

export function editSetting(name, func){
    let setting = loadSetting(name);

    const res = func(setting);
    if(res != null) setting = res;

    saveSetting(name, setting);
}

export function setAllUserData(userData){
  saveSetting("userData", userData);
  obtainedObservable.set(userData.componentsObtained ?? {});
  trackedItemsOvervable.set(userData.trackedItems ?? {});
  missionPrioritiesObservable.set(userData.missionPriorityPreferences ?? {});
}

export function clearAllUserData(){
  saveSetting("userData", {});
  obtainedObservable.set({});
  trackedItemsOvervable.set({});
  missionPrioritiesObservable.set({});
}

export function getUserDataSetting(name, defaultValue=null){
  return loadSetting("userData")[name] ?? defaultValue;
}

export function clearUserDataObtainedItems(){
  let userData = loadSetting("userData");

  if(userData.componentsObtained != null) delete userData.componentsObtained;
  obtainedObservable.set({});

  saveSetting("userData", userData);
}

export function setUserDataComponentSetting(componentId, name, value){
    let userData = loadSetting("userData");

    if(userData == null) userData = {};

    if(!("componentsObtained" in userData)) userData.componentsObtained = {};
    if(!(componentId in userData.componentsObtained)) userData.componentsObtained[componentId] = {};


    userData.componentsObtained[componentId][name] = value;
    obtainedObservable.set(userData.componentsObtained);

    saveSetting("userData", userData);
}

export function incrementUserDataComponentObtained(componentId){
  let oldObtained = Number(getUserDataComponentSetting(componentId, "obtained"));
  oldObtained++;
  if(oldObtained > Number(getObjectFromId(componentId).required)) oldObtained = 0;

  setUserDataComponentSetting(componentId, "obtained", oldObtained);
}

export function decrementUserDataComponentObtained(componentId){
  let oldObtained = Number(getUserDataComponentSetting(componentId, "obtained"));
  oldObtained--;
  if(oldObtained < 0) oldObtained = Number(getObjectFromId(componentId).required);

  setUserDataComponentSetting(componentId, "obtained", oldObtained);
}

/** setting name refers to the setting inside the component, can be 'obtained' or others */
export function getUserDataComponentSetting(componentId, settingName){
    const userData = loadSetting("userData");

    if(userData == null) return null;
    if(!("componentsObtained" in userData)) return null;
    if(!(componentId in userData.componentsObtained)) return null;

    return userData.componentsObtained[componentId][settingName];
}

export function getObtainedComponents(){
  const userData = loadSetting("userData");
  return userData.componentsObtained ?? {};
}

export function getUserDataTrackedItems(){
  const userData = loadSetting("userData");
  if(!userData.trackedItems) return {};

  return userData.trackedItems;
}

export function setUserDataTrackedItems(trackedItems){
  const userData = loadSetting("userData");
  userData.trackedItems = trackedItems;
  saveSetting("userData", userData);
}

export function getUserDataTrackedItem(itemId){
  const trackedItems = getUserDataTrackedItems();
  return trackedItems[itemId];
}

export function clearUserDataTrackedItems(){
  let userData = loadSetting("userData");
  
  if(userData.trackedItems != null) delete userData.trackedItems;
  trackedItemsOvervable.set({});

  saveSetting("userData", userData);
}

export function setUserDataTrackedItem(itemId, value){
  const trackedItems = getUserDataTrackedItems();

  trackedItems[itemId] = value;

  trackedItemsOvervable.set(trackedItems);
  
  setUserDataTrackedItems(trackedItems);
}

export function getUserDataMissionPriorityPreferences(){
  const userData = loadSetting("userData");

  const missionPriorities = userData.missionPriorityPreferences ?? {};

  return missionPriorities;
}

export function setUserDataMissionPriorityPreferences(missionPriorities){
  if(missionPriorities == null) { console.warn(`null passed to setUserDataMissionPriorityPreferences!`); return; }
  const userData = loadSetting("userData");

  userData.missionPriorityPreferences = missionPriorities;
  missionPrioritiesObservable.set(missionPriorities);

  saveSetting("userData", userData);
}

export function clearUserDataMissionPriorityPreferences(){
  let userData = loadSetting("userData");
  
  if(userData.missionPriorityPreferences != null) delete userData.missionPriorityPreferences;
  missionPrioritiesObservable.set({});

  saveSetting("userData", userData);
}

// Function to download the object as a JSON file
export function downloadJSON(obj, filename) {
  // Convert the object to a JSON string
  const jsonStr = JSON.stringify(obj, null, 2);

  // Create a Blob from the JSON string
  const blob = new Blob([jsonStr], { type: "application/json" });

  // Create a temporary anchor element
  const a = document.createElement("a");

  // Create a URL for the Blob and set it as the href attribute
  a.href = URL.createObjectURL(blob);

  // Set the download attribute with the desired file name
  a.download = filename;

  // Append the anchor element to the document body (required for Firefox)
  document.body.appendChild(a);

  // Programmatically click the anchor element to trigger the download
  a.click();

  // Remove the anchor element from the document
  document.body.removeChild(a);
}

// Function to trigger the file picker and handle the file upload
export async function triggerFileUpload() {
  return new Promise((resolve, reject) => {
    // Create a new input element of type "file"
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json"; // Optionally restrict to JSON files

    // Attach an event listener to handle the file selection
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader();

            // Define what happens when the file is successfully read
            reader.onload = function(e) {
                try {
                    // Parse the JSON string into a JavaScript object
                    const jsonObject = JSON.parse(e.target.result);

                    resolve(jsonObject);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    reject(error);
                }
            };

            // Read the file as a text string
            reader.readAsText(file);
        } else {
            console.log("No file selected.");
            reject(error);
        }
    });

    // Programmatically click the file input to open the file picker
    fileInput.click();
  });
}


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
* Creates a custom context menu for a table with specified buttons.
*
* @param {Event} event - The event object from the context menu event.
* @param {{label: string, showCondition: () => boolean|undefined, func: (ev: MouseEvent) => void}[]} buttons - An array of objects representing the buttons to be added to the context menu.
* @param {string} buttons[].label - The label text of the button.
* @param {() => boolean} [buttons[].showCondition] - Optional conditional function that returns whether or not to show this option in the context menu.
* @param {(ev: MouseEvent) => void} buttons[].func - The function to be called when the button is clicked.
*/
export function createContextMenu(event, buttons){
 event.preventDefault();

 if(document.querySelector(".context-menu"))
   document.querySelector(".context-menu").remove();

 const contextMenu = document.createElement('div');
 contextMenu.classList.add('context-menu');
 contextMenu.style.position = 'absolute';
 contextMenu.style.top = `${event.clientY}px`;
 contextMenu.style.left = `${event.clientX}px`;

 buttons.forEach(button => {
   if("showCondition" in button && button.showCondition != null && !button.showCondition()) return;

   const el = document.createElement('div');
   el.textContent = button.label;
   el.addEventListener('click', ev => button.func(ev));
   contextMenu.append(el);
 });

 // Append the context menu to the body
 document.body.appendChild(contextMenu);

 const contextMenuBB = contextMenu.getBoundingClientRect();
 if(event.clientX + contextMenuBB.width > window.innerWidth) {
  contextMenu.style.left = `${window.innerWidth - contextMenuBB.width}px`;
 }
 
 if(event.clientY + contextMenuBB.height > window.innerHeight) {
  contextMenu.style.top = `${window.innerHeight - contextMenuBB.height}px`;
 }

 // Remove the context menu when clicking outside of it
 document.addEventListener('click', () => contextMenu.remove(), { once: true });

 setTimeout(() => {
   contextMenu.classList.add("showed");
 }, 1);
}

export function getRelicType(relicName){
  return relicName.split(" ")[0].trim();
}

export function getRelicRewards(relic){
    if(relic.rewards == null) return [];
    return [ ...Object.entries(relic.rewards).map(([ rewardFullName, rarity ]) => ({ rewardFullName: rewardFullName, rarity: rarity.rarity })).flat(1) ]
}

export function getRelicsThatDropComponent(componentId){
  // console.log(`getRelicsThatDropComponent`, componentId);
    return componentId in relicRewardComponentMap.map ?
        relicRewardComponentMap.map[componentId]
          .map(relicId => relicRewardComponentMap.relics[relicId])
          .map(relicName => [ relicName, relics[relicName] ])
          .map(([ relicName, relic ]) => { return ({
              vaulted: relic.vaulted,
              rarity: getRelicRewards(relic).find(reward => reward.rewardFullName.localeCompare(componentId) == 0).rarity,
              relic: relic
          })})
      : [];
}

export function getMissionRelicRewards(mission){
    if(!mission.rewards) { console.warn(`mission has no relicRewards!`, mission); return; }

    const missionRelicRewards = Object.keys(mission.rewards).filter(reward => reward.includes("Relic"));

    return Object.entries(relics)
        .filter(([ relicName, relic ]) => missionRelicRewards.findIndex(relicName => relicName.localeCompare(relic.name) == 0) != -1)
        .map(([ relicName, relic ]) => getRelicRewards(relic).map(reward => { reward.relicName = relic.name; return reward; }))
        .flat(1);
}

/** 
 * each result contains the mission and relic that drop said component, plus some QoL fields that would be 
 * obtainable from those two 
*/
export function getMissionsThatDropComponent(componentId){
    return  componentId in missionRewardComponentMap.map ? 
              Object.entries(missionRewardComponentMap.map[componentId])
                .map(([ missionIdx, relicIdList ]) => [ missionRewardComponentMap.missions[Number(missionIdx)], relicIdList ])
                // this (filter) is only necessary if you filter the source missions array, make sure it's the same exact condition
                .filter(([ missionId, relicIdList ]) => !missionId.includes("Event") && !missionId.includes(":"))
                .map(([ missionId, relicIdList ]) => relicIdList.map(relicId => ({
                  vaulted: relics[missionRewardComponentMap.relics[relicId]].vaulted, 
                  rarity: getRelicRewards(relics[missionRewardComponentMap.relics[relicId]]).find(reward => reward.rewardFullName.localeCompare(componentId) == 0).rarity, 
                  mission: missions[missionId], 
                  relic: relics[missionRewardComponentMap.relics[relicId]],
                  rotations: missions[missionId].rewards[`${missionRewardComponentMap.relics[relicId]} Relic`]
                })))
              .flat(1)
      : []
}

let initializing = true;

export function setInitializing(_initializing){
  initializing = _initializing;
}

export function getInitializing(){
  return initializing;
}


let items = null;
let relics = null;
let missions = null;

let relicRewardComponentMap = null;
let missionRewardComponentMap = null;
let idMap = null;

let components = null;

let objectPaths = null;

let initialized = false;
export function getInitialized() { return initialized; }

export async function initialize(local=false) {
    if(initialized) return;
 
    items = (await import(`../../public/data/items.json`)).default;
    relics = (await import(`../../public/data/relics.json`)).default;
    missions = filterDict(
      (await import(`../../public/data/missions.json`)).default, 
      ([ id, mission ]) => !id.includes("Event") && !id.includes(":")
    );

    components = (await import(`../../public/data/components.json`)).default;

    relicRewardComponentMap = await import(`../../public/data/indices/relic_reward_component_map.json`);
    missionRewardComponentMap = await import(`../../public/data/indices/mission_reward_component_map.json`);
    idMap = await import(`../../public/data/indices/id_map.json`);

    
  
    objectPaths = []

    objectPaths = [ ...objectPaths, ...Object.entries(await getAllItems()).map(([ id, item ]) =>                                  ({ category: "items",       name: item.name.replaceAll(" ", "").replaceAll("&", ""), id: id })).flat(1) ];
    objectPaths = [ ...objectPaths, ...Object.entries(await getAllComponents()).map(([ id, component ]) =>                        ({ category: "components",  name: id.replaceAll(" ", "").replaceAll("&", ""), id: id })).flat(1) ];
    objectPaths = [ ...objectPaths, ...Object.entries(await getAllRelics()).map(([ id, relic ]) =>                                ({ category: "relics",      name: id.replaceAll(" ", "").replaceAll("&", ""), id: id })).flat(1) ];
    objectPaths = [ ...objectPaths, ...Object.entries(await getAllMissions()).map(([ id, mission ]) =>                            ({ category: "missions",    name: `${mission.name}${mission.planet}`, id: id })).flat(1) ];
  
    objectPaths = Object.fromEntries(objectPaths.map(path => [ path.name, path ]));

    if(local){
      trackedItemsOvervable.set(getUserDataTrackedItems());
      obtainedObservable.set(getObtainedComponents());
      missionPrioritiesObservable.set(getDefaultMissionTypePriorities());
      dialogsUiObservable.set([]);
    }

    initialized = true;
  };

export function getIdMap() { return idMap; }

export function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

export function getAllItems(){ return items; }
export function getAllComponents(){ return components; }
export function getAllRelics(){ return relics; }
export function getAllMissions(){ return missions; }

export async function getAllObjects(category) {
  let result = null;

  await _matchAsync(category, {
    "items": async () => {
      result = await getAllItems();
    },
    "components": async () => {
      result = await getAllComponents();
    },
    "relics": async () => {
      result = await getAllRelics();
    },
    "missions": async () => {
      result = await getAllMissions();
    }
  });

  return result.res;
}

export function getDefaultActiveTabForSearchResult(rawObj){
  let result = null;

  _match(rawObj.category, {
    "Items":      () => { result = "components"; },
    "Components": () => { result = "relics"; },
    "Relics":     () => { result = "components"; },
    "Missions":   () => { result = "relics"; },
  })

  return result;
}

export function getTabsForSearchResult(rawObj){
  let result = null;

  _match(rawObj.category, {
    "Items":      () => { result = [ "Components",  "Relics",   rawObj.vaulted ? null : "Missions" ].filter(el => el != null); },
    "Components": () => { result = [ "Relics",                  rawObj.vaulted ? null : "Missions" ].filter(el => el != null); },
    "Relics":     () => { result = [ "Components",              rawObj.vaulted ? null : "Missions" ].filter(el => el != null); },
    "Missions":   () => { result = [ "Relics" ]; },
  })

  return result;
}

export function getDefaultMissionTypePriorities(){
  const userDataMissions = getUserDataMissionPriorityPreferences();
  return userDataMissions != null && Object.keys(userDataMissions).length > 0 ? userDataMissions :
    {
      "Disruption": 1,
      "Capture": 2,
      "Exterminate": 3,
      "Survival": 4,
      "Defense": 5,
      "Spy": 6,
      "Interception": 7
    };
}

export function getRarityPriorities(){
  return {
    "common": 1,
    "uncommon": 2,
    "rare": 3
};
}

export function getRelicTypePriorities(){
  return {
    "Lith": 1,
    "Meso": 2,
    "Neo": 3,
    "Axi": 4,
    "Requiem": 5
  };
}

export function getItemTypePriorities(){
  return {
    "Warframe": 1,
    "Primary Weapon": 2,
    "Secondary Weapon": 3,
    "Melee Weapon": 4,
    "Arch Gun": 5,
    "Companion": 6
  }
}

/**
 * objects value depends on the first two parameters (category and activeTab), i'm sorry for this mess: \
 * category == Items: \
 *  activeTab == components -> { item, component } \
 *  activeTab == relics -> { item, component, relicEntry } \
 *  activeTab == missions -> { item, component, missionEntry } \
 * category == Components:\
 *  activeTab == relics -> { component, relicEntry } \
 *  activeTab == missions -> { item, component, relicEntry } \
 * category == Relics:\
 *  activeTab == components -> { relic, rewardEntry: { tier, component } } \
 *  activeTab == missions -> { relic, mission } \
 * category == Missions:\
 *  activeTab == relics -> { mission, relicEntry } \
 * @param {string} category 
 * @param {string} activeTab 
 * @param {{}} objects 
 * @returns 
 */
export function getSearchResultRelatedObjectsSingle(category, activeTab, objects, router=null){
  let res = null;

  // console.log(`getSearchResultRelatedObjectsSingle called`, category, activeTab, objects);

  _match(category, {
    "Items": () => {
      const item = objects.item;
      _match(activeTab, {
        "components": () => {
          const component = objects.component;
          res = {
            icon: `/warfarm/images/${component.fullName}.png`, 
            vaulted: item ? item.vaulted : false, 
            rarity: (() => { 
                // take the rarity with the highest chance
                const rarities = { "common": 0, "uncommon": 1, "rare": 2 };
                return getRelicsThatDropComponent(component.id).map(relic => [ relic.relic.name, relic ])
                  .filter(([ relicName, relic ]) => (item ? item.vaulted:false) || !relic.vaulted)  
                  .map(([ relicName, relic ]) => relic.rarity)
                  .toSorted((rarityA, rarityB) => rarities[rarityA] - rarities[rarityB])
                  [0]
            })(),
            labelHeading: `${component.name}`, 
            labelFooter: null,
            label: `${component.obtained ?? getUserDataComponentSetting(component.id, "obtained") ?? '0'}/${component.required}`, 
            onClick: () => incrementUserDataComponentObtained(component.id), 
            type: item ? item.type:"",
            rawObj: component,
            id: `${component.id}`,
            route: getObjectPathNameFromIdObj(component, "Components"),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${item?item.id:""}-${component.id})`
          };
        },
        "relics": () => {
          const component = objects.component;
          const [ relicName, relicInfo ] = objects.relicEntry;
          res = ({
            icon: `/warfarm/images/${relicName.split(" ")[0].trim()}.png`,
            vaulted: relicInfo.vaulted, 
            rarity: relicInfo.rarity, 
            componentName: component.name,
            componentFullName: component.fullName,
            labelHeading: `${component.name}`, 
            labelFooter: null,
            label: `${relicName}`, 
            onClick: () => router.push(getObjectPathNameFromIdObj(relicInfo.relic)),
            rawObj: relicInfo,
            id: `${relicInfo.relic.name}`,
            route: getObjectPathNameFromIdObj(relicInfo.relic, "Relics"),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${item?item.id:""}-${component.id}-${relicName})`
          });
          // console.log(`res`, res);
        },
        "missions": () => {
          const component = objects.component;
          const [ missionName, mission ] = objects.missionEntry;
          res = ({
            icon: `/warfarm/images/${missionName.split(",")[1].trim()}.png`,
            vaulted: mission.vaulted, 
            rarity: mission.rarity, 
            labelHeading: `${component.name}`, 
            labelFooter: `${mission.relic.name ?? '?'} (${
                mission.rotations
                    .toSorted((a,b) => Number(a.perc.replace("%", "")) - Number(b.perc.replace("%", "")))
                    .map(rotation => `${rotation.rotation ?? '?'} - ${rotation.perc ?? '?'}`).join(", ")
            })`,
            label: `${missionName} (${mission.mission.type})`, 
            onClick: () => router.push(getObjectPathNameFromIdObj(mission.mission)),
            rawObj: mission,
            id: `${mission.mission.name}, ${mission.mission.planet}`,
            route: getObjectPathNameFromIdObj(mission.mission, "Missions"),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${item.id}-${component.id}-${missionName})`
          });
        }
      })
    },
    "Components": () => {
      const component = objects.component;
      _match(activeTab, {
        "relics": () => {
          const [ relicName, relic ] = objects.relicEntry;
          res = ({
            icon: `/warfarm/images/${relicName.split(" ")[0].trim()}.png`,
            vaulted: relic.vaulted, 
            rarity: relic.rarity, 
            componentName: component.componenName, 
            componentFullName: component.fullName, 
            labelHeading: `${relicName}`, 
            labelFooter: null,
            label: null, 
            onClick: () => router.push(getObjectPathNameFromIdObj(relic.relic)),
            rawObj: relic,
            id: `${relic.relic.name}`,
            route: getObjectPathNameFromIdObj(relic.relic, "Relics"),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${component.id}-${relicName})`
          });
        },
        "missions": () => {
          const [ missionName, mission ] = objects.missionEntry;
          res = ({
            icon: `/warfarm/images/${missionName.split(",")[1].trim()}.png`,
            vaulted: mission.vaulted, 
            rarity: mission.rarity, 
            labelHeading: `${mission.mission.type}`, 
            labelFooter: `${mission.relic.name ?? '?'} (${
                mission.rotations
                    .toSorted((a,b) => Number(a.perc.replace("%", "")) - Number(b.perc.replace("%", "")))
                    .map(rotation => `${rotation.rotation ?? '?'} - ${rotation.perc ?? '?'}`).join(", ")
            })`,
            label: `${missionName}`, 
            onClick: () => router.push(getObjectPathNameFromIdObj(mission.mission)),
            rawObj: mission,
            id: `${mission.mission.name}, ${mission.mission.planet}`,
            route: getObjectPathNameFromIdObj(mission.mission, "Missions"),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${component.id}-${missionName})`
          });
        }
      })
    },
    "Relics": () => {
      const relic = objects.relic;
      _match(activeTab, {
        "components": () => {
          const { tier, component } = objects.rewardEntry;
          res = ({
            icon: `/warfarm/images/${component.fullName}.png`, 
            vaulted: relic.vaulted, 
            rarity: tier,
            labelHeading: `${component.fullName}`, 
            labelFooter: null,
            label: `${component.obtained ?? getUserDataComponentSetting(component.id, "obtained") ?? '0'}/${component.required}`, 
            onClick: () => incrementUserDataComponentObtained(component.id), 
            type: relic.type,
            rawObj: component,
            id: `${component.id}`,
            route: getObjectPathNameFromIdObj(component, "Components"),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${relic.id}-${tier}-${component.id})`
          });
        },
        "missions": () => {
          const mission = objects.mission;
          res = ({
            icon: `/warfarm/images/${mission.planet}.png`,
            labelHeading: `${mission.type}`, 
            labelFooter: `(${
                Object.values(mission.rewards[`${relic.name} Relic`])
                    .toSorted((a,b) => Number(a.perc.replace("%", "")) - Number(b.perc.replace("%", "")))
                    .map(rotation => `${rotation.rotation ?? '?'} - ${rotation.perc ?? '?'}`).join(", ")
            })`,
            label: `${mission.planet}, ${mission.name}`, 
            onClick: () => router.push(getObjectPathNameFromIdObj(mission)),
            rotations: mission.rewards,
            rawObj: mission,
            id: `${mission.name}, ${mission.planet}`,
            route: getObjectPathNameFromIdObj(mission, "Missions"),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${relic.id}-${mission.id})`
          });
        }
      })
    },
    "Missions": () => {
      const mission = objects.mission;
      _match(activeTab, {
        "relics": () => {
          const [ relicMissionName, relic ] = objects.relicEntry;
          res = ({
            icon: `/warfarm/images/${relicMissionName.split(" ")[0].trim()}.png`,
            vaulted: relics[relicMissionName.replace("Relic", "").trim()].vaulted, 
            rarity: null, 
            labelHeading: `${relicMissionName.replace("Relic", "").trim()}`, 
            label: null,
            labelFooter: `(${
                Object.values(relic)
                    .toSorted((a,b) => Number(a.perc.replace("%", "")) - Number(b.perc.replace("%", "")))
                    .map(rotation => `${rotation.rotation ?? '?'} - ${rotation.perc ?? '?'}`).join(", ")
            })`, 
            onClick: () => router.push(getObjectPathNameFromIdObj(relic)),
            rawObj: relic,
            id: `${relicMissionName.replace("Relic").trim()}`,
            route: getObjectPathNameFromIdObj(relics[relicMissionName.replace("Relic", "").trim()], "Relics"),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${mission.id}-${relicMissionName.replace("Relic", "").trim()})`
          });
        }
      })
    }
  });

  return res;
}

export function sortRelicFunc(a, b, relicTypePriorities, rarityPriorities){
  return (
    (a.vaulted-b.vaulted)
    ||
    (rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
    ||
    (relicTypePriorities[a.rawObj.relic.tier]-relicTypePriorities[b.rawObj.relic.tier])
    ||
    (a.rawObj.relic.name.localeCompare(b.rawObj.relic.name))
  );
}

export function sortMissionFunc(missionA, missionB, relicA, relicB, missionTypesPriorities) {
    return  ( 
                Math.max(
                    ...missionB.rewards[`${relicB.id} Relic`]
                        .map(rotation => Number(rotation.perc.replace("%", "")))
                )
                -
                Math.max(
                    ...missionA.rewards[`${relicA.id} Relic`]
                        .map(rotation => Number(rotation.perc.replace("%", "")))
                )
            )
            ||
            (
              (missionTypesPriorities[missionA.type] || -Infinity) 
              - 
              (missionTypesPriorities[missionB.type] || -Infinity) 
          )
}

export function getSearchResultRelatedObjects(name, category, type, activeTab, rawObj, options) {
  let result = null;

  const rarityPriorities = getRarityPriorities();
  const relicTypePriorities = getRelicTypePriorities();

  const missionTypesPriorities = options && options.missionPriorities ? 
    options.missionPriorities
      : 
    missionPrioritiesObservable.get() ?
      missionPrioritiesObservable.get()
      :
    getDefaultMissionTypePriorities();

  const router = options && options.router ? options.router : null;

  _match(category, {
    "Items": () => {
      const item = rawObj;
      _match(activeTab, {
        "components": () => {
          result = [
              ...(item.components ? 
                      Object.keys(item.components)
                        .map(componentId => components[componentId])
                        .map(component => ( 
                          getSearchResultRelatedObjectsSingle(category, activeTab, { item, component }, router) 
                        ))
                        .toSorted((a, b) => rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                  : []
              )
          ];
        },
        "relics": () => {
          result = [
              ...(item.components ?
                        Object.keys(item.components).map(componentId => components[componentId])
                          .map(component => {
                                return getRelicsThatDropComponent(component.id).map(relic => [ relic.relic.name, relic ])
                                  .toSorted(([ relicNameA, relicA ], [ relicNameB, relicB ]) => (relicB.vaulted ? -1 : 1) - (relicA.vaulted ? -1 : 1))
                                  .map((relicEntry) => (
                                    getSearchResultRelatedObjectsSingle(category, activeTab, { item, component, relicEntry }, router) 
                                  ))
                          })
                          .flat(1)
                          .toSorted((a, b) => (a.vaulted-b.vaulted) || (rarityPriorities[a.rarity]-rarityPriorities[b.rarity]))
                  : []
              )
          ]
        },
        "missions": () => {
          result = [
              ...(item.components ?
                        Object.keys(item.components).map(componentId => components[componentId])
                          .map(component => {
                                return getMissionsThatDropComponent(component.id).map(mission => [ `${mission.mission.name}, ${mission.mission.planet}`, mission ])
                                  // .filter(([ missionName, mission ]) => !missionName.includes("Mission Types"))
                                  .toSorted(([ ka, a ], [ kb, b ]) => sortMissionFunc(a.mission, b.mission, a.relic, b.relic, missionTypesPriorities))
                                  .map((missionEntry) => (
                                    getSearchResultRelatedObjectsSingle(category, activeTab, { item, component, missionEntry }, router) 
                                  ))
                          })
                          .flat(1)
                  : []
              )
          ]
        }
      })
    },
    "Components": () => {
      const component = rawObj;
      _match(activeTab, {
        "relics": () => {
          result = [
              ...(
                  getRelicsThatDropComponent(component.id).map(relic => [ relic.relic.name, relic ])
                    // .toSorted((a, b) => (b.vaulted - a.vaulted) || (rarityPriorities[b.rarity] - rarityPriorities[a.rarity]))    
                    .map((relicEntry) => { console.log(`got relic entry final`, relicEntry); return (
                      getSearchResultRelatedObjectsSingle(category, activeTab, { component, relicEntry }, router) 
                    )})
                //   : []
              )
              .flat(1)
              .toSorted((a, b) => sortRelicFunc(a, b, relicTypePriorities, rarityPriorities))    
            ]
        },
        "missions": () => {
          result = [
              ...(
                        getMissionsThatDropComponent(component.id).map(mission => [ `${mission.mission.name}, ${mission.mission.planet}`, mission ])
                          .filter(([ missionName, mission ]) => !missionName.includes("Mission Types"))
                          .toSorted(([ ka, a ], [ kb, b ]) => sortMissionFunc(a.mission, b.mission, a.relic, b.relic, missionTypesPriorities))
                          .map((missionEntry) => (
                            getSearchResultRelatedObjectsSingle(category, activeTab, { component, missionEntry }, router) 
                          ))
                //   : []
              )
              .flat(1)
          ]
        }
      })
    }, 
    "Relics": () => {
      const relic = rawObj;
      _match(activeTab, {
        "components": () => {
          result = [
              ...(relic.rewards ? 
                      Object.entries(relic.rewards)
                          .toSorted((rewardA, rewardB) => rarityPriorities[rewardA[1].rarity]-rarityPriorities[rewardB[1].rarity])
                          .map(([ rewardFullName, reward ]) => { console.log(`got`, rewardFullName, reward); return ({ tier: reward.rarity, reward: rewardFullName })})
                          .map(({ tier, reward  }) => { console.log(`got2`, tier, reward); return ({ tier, component: components[reward] })})
                          // .filter(component => component!=null && component.name!=null)
                          .map((rewardEntry) => { console.log(`reward entry`, rewardEntry); return (
                            getSearchResultRelatedObjectsSingle(category, activeTab, { relic, rewardEntry }, router) 
                          )})
                  : []
              )
              .flat(1)
          ]
          console.log(`result`, result);
        },
        "missions": () => {
          result = [
              ...(
                  Object.values(missions)
                      .filter(mission => !mission.planet.includes("Mission Types") && "rewards" in mission)
                      .filter(mission => Object.keys(mission.rewards).filter(reward => reward.includes("Relic"))
                          .some(relicName => relicName.localeCompare(`${relic.name} Relic`) == 0)
                      )
                      .toSorted((a, b) => sortMissionFunc(a, b, relic, relic, missionTypesPriorities))
                      .map(mission => {  console.log(`got mission`, mission); return (
                        getSearchResultRelatedObjectsSingle(category, activeTab, { relic, mission }, router) 
                      )})
              )
              .flat(1)
          ]
        }
      })
    },
    "Missions": () => {
      const mission = rawObj;
      _match(activeTab, {
        "relics": () => {
          result = [
              ...(
                  Object.entries(mission.rewards).filter(([ reward, rotations ]) => reward.includes("Relic"))
                      .map((relicEntry) => (
                        getSearchResultRelatedObjectsSingle(category, activeTab, { mission, relicEntry }, router) 
                      ))
              )
              .flat(1)
              .toSorted((a, b) => a.vaulted-b.vaulted)
          ]
        }
      })
    },
  });

  return result;
}

export class CustomObservable {
  objToObserve = null;
  listeners = [];

  constructor(_objToObserve=null) {
      this.objToObserve = _objToObserve;
      this.listeners = [];
  }

  set(_objToObserve){
      this.objToObserve = _objToObserve;
      this.notifyAll();
  }

  get() { return this.objToObserve; }

  /** callImmediately: calls this listener's function only once immediately after being added to the listeners list. */
  addListener(func, callImmediately=false){
      this.listeners.push(func);
      if(callImmediately) func(this.objToObserve);
  }

  removeListener(func){
      this.listeners = this.listeners.filter(_func => _func !== func);
  }

  notifyAll(){
      for(const listener of this.listeners){
          listener(this.objToObserve);
      }
  }
};

export let trackedItemsOvervable = new CustomObservable();
export let obtainedObservable = new CustomObservable();
export let missionPrioritiesObservable = new CustomObservable();
export let dialogsUiObservable = new CustomObservable();

/** please try using this as little as possible (see Observer Pattern and Custom Observer), pollInterval is in ms */
export async function waitUntil(predicate, pollInterval=250){
  while(!(await predicate())){
    await sleep(pollInterval);
  }
}

/** busy waits until the getValueFunc returns a value that is different from initialState, pollInterval is in ms */
export async function waitFor(getValueFunc, initialState, pollInterval=250){
  let lastValueFunc = getValueFunc();
  await waitUntil(async () => { lastValueFunc = await getValueFunc(); return lastValueFunc != initialState }, pollInterval);
  return lastValueFunc;
}

export function clamp(val, min, max){
  return Math.min(max, Math.max(min, val))
}

export function getChildIndex(child){
  return Array.prototype.indexOf.call(child.parentElement.children, child);
}

export function cloneDict(dictToClone){
  if(dictToClone == null) return {};
  return JSON.parse(JSON.stringify(dictToClone));
}

export function cloneList(listToClone){
  if(listToClone == null) return [];
  return JSON.parse(JSON.stringify(listToClone));
}

export function clone(variable){
  if(Array.isArray(variable)) return cloneList(variable);
  else if(variable.constructor == Object) return cloneDict(variable);
  else return variable;
}

export function getStaticObjectPaths(){
  return objectPaths;
}

export function getObjectFromId(itemId){
  let res = null;

  if(!idMap[itemId]) { console.warn(`item not found in idMap!`, itemId); return null; }

  let category = idMap[itemId];


  if(!category) console.warn(`category is undefined! you're about to get an error`);

  category = capitalizeFirstLetter(category);

  _match(category, {
    "Items":      () => { res = items[itemId]; },
    "Components": () => { res = components[itemId]; },
    "Relics":     () => { res = relics[itemId]; },
    "Missions":   () => { res = missions[itemId]; }
  });

  return res;
}

export function getObjectId(rawObj, category=null){
  if(!category) category = rawObj.category;

  category = capitalizeFirstLetter(category);

  return rawObj.id;

  // return category.localeCompare("Items") == 0 ? rawObj.id :
  //     category.localeCompare("Components") == 0 ? rawObj.id :
  //     category.localeCompare("Relics") == 0 ? rawObj.id :
  //     category.localeCompare("Missions") == 0 ? rawObj.id : null
}

export function getObjectIcon(rawObj, category=null){
  if(!category) category = rawObj.category;

  category = capitalizeFirstLetter(category);

  return category.localeCompare("Items") == 0 ? `/warfarm/images/${rawObj.name}.png` :
      category.localeCompare("Components") == 0 ? `/warfarm/images/${rawObj.fullName}.png` :
      category.localeCompare("Relics") == 0 ? `/warfarm/images/${rawObj.tier}.png` :
      category.localeCompare("Missions") == 0 ? `/warfarm/images/${rawObj.planet}.png` : null
}

export function getObjectPath(name){
  if(!objectPaths) return null;
  return objectPaths[name];
}

export function getObjectPathNameFromIdObj(rawObj, category=null){
  if(!category) category = rawObj.category;

  // console.log(`rawObj`, rawObj);

  category = capitalizeFirstLetter(category);

  return category.localeCompare("Items") == 0 ? `/prime/items/${rawObj.name.replaceAll(" ", "").replaceAll("&", "")}` :
    category.localeCompare("Components") == 0 ? `/prime/components/${rawObj.id.replaceAll(" ", "").replaceAll("&", "")}` :
    category.localeCompare("Relics") == 0 ? `/prime/relics/${rawObj.name.replaceAll(" ", "").replaceAll("&", "")}` :
    category.localeCompare("Missions") == 0 ? `/prime/missions/${rawObj.name}${rawObj.planet}` : null
}

export function getObjectPathId(rawObj){
  if(!objectPaths) return null;
  const pathName = Object.entries(objectPaths)
    .map(([ name, path ]) => path)
    .find(path => path.id.localeCompare(getObjectId(rawObj)) == 0).id;

  return pathName;
}

export function resizeArray(array, newSize, defaultValue) {
  if (newSize > array.length) {
    // Add new elements with the default value
    return array.concat(new Array(newSize - array.length).fill(defaultValue));
  } else {
    // If the new size is smaller or the same, return a truncated array
    return array.slice(0, newSize);
  }
}

/** pads the array to a specific size; nothing happens if the array's length <= newSize */
export function padArray(arr, newSize, defaultValue){
  if (newSize > arr.length) {
    defaultValue = cloneList(defaultValue);

    const newArr = [];
    arr.forEach((el, index) => newArr.push(el));
    for(let i=0; i<(newSize-arr.length); i++){
      newArr.push(clone(defaultValue));
    }
    return newArr;
  }


  return arr;
}

export function jsonStringify(obj){
  return JSON.stringify(obj);
}

/** idFunction: function that generates a distinct (hashable) value for said element */
export function duplicatesRemoved(list, idFunction){
  let map = {};

  for(const el of list){
    if(!map[idFunction(el)]) map[idFunction(el)] = el;
  }

  return Object.values(map);
}

export function componentIsFarmed(rawObj, obtainedComponents=null){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return false; }
  if(rawObj.required <= 0) return false;

  if(!obtainedComponents) obtainedComponents = getObtainedComponents();

  // console.log(`component is famred?`, rawObj, obtainedComponents);

  return obtainedComponents[rawObj.id] != null && obtainedComponents[rawObj.id].obtained >= rawObj.required;
}

export function itemIsFarmed(rawObj, obtainedComponents=null){
  if(rawObj.components == null) return true;
  return Object.keys(rawObj.components).map(id => components[id]).every(component => componentIsFarmed(component, obtainedComponents));
}

export function objectIsFarmed(rawObj, obtainedComponents=null){
  return  rawObj.category === 'items' ? 
            itemIsFarmed(rawObj, obtainedComponents) 
          : 
          rawObj.category === 'components' ? 
            componentIsFarmed(rawObj, obtainedComponents)
          :
            false;
}

export function relicDropsComponent(rawRelic, rawComponent){
  return getRelicRewards(rawRelic).findIndex(reward => reward.rewardFullName.localeCompare(rawComponent.id) == 0) > -1;
}

export function getComponentsRelicsMerged(trackedItems, router){
  const componentsRelicsMerged = trackedItems.reduce((acc, trackedItemId) => {
    if(!acc.components) acc.components = [];
    if(!acc.relics) acc.relics = [];

    const trackedItem = getObjectFromId(trackedItemId);

    // console.log(`tracked iertm`, trackedItemId, trackedItem, trackedItems);

    if(trackedItem.category === "items"){
      const components = getSearchResultRelatedObjects(null, "Items", null, "components", trackedItem, { router: router });
      acc.components = duplicatesRemoved(
        acc.components.concat(components),
        component => component.searchObjId
      );

      const relics = getSearchResultRelatedObjects(null, "Items", null, "relics", trackedItem, { router: router });
      acc.relics = duplicatesRemoved(
        acc.relics.concat(relics),
        relic => relic.searchObjId
      );
    }
    else if(trackedItem.category === "components"){
      const parentItem = getObjectFromId(trackedItem.parentItem)
      acc.components = duplicatesRemoved(
        acc.components.concat(getSearchResultRelatedObjectsSingle("Items", "components", { item: parentItem, component: trackedItem }, router) ),
        component => component.searchObjId
      );
    
      const relics = getRelicsThatDropComponent(trackedItem.id)
        .map(relicInfo => getSearchResultRelatedObjectsSingle("Items", "relics", { item: parentItem, component: trackedItem, relicEntry: [ relicInfo.relic.id, relicInfo ] }, router));
      
      acc.relics = duplicatesRemoved(
        acc.relics.concat(relics), 
        relic => relic.searchObjId
      );
    }
    
    return acc;
  }, {});

  return componentsRelicsMerged;
}

export function showDialogUi(dialog){
  dialogsUiObservable.set(dialogsUiObservable.get().concat(dialog));
}

export function removeDialogUi(dialog){
  const idx = dialogsUiObservable.get().indexOf(dialog);
  if(idx < 0) { console.warn(`no dialog found! trying to match`, dialog); return; }

  let newList = [ ...dialogsUiObservable.get() ];
  newList.splice(idx, 1);
  dialogsUiObservable.set(newList);
}

export function getDialogUis(){
  return dialogsUiObservable.get();
}

let componentRelicRarityRelationCache = {};
export function getComponentRarityInRelationToRelic(rawComponent, rawRelic){
  const cacheId = `${rawRelic.name}-${rawComponent.id}`;
  if(componentRelicRarityRelationCache[cacheId] != null) return componentRelicRarityRelationCache[cacheId];

  const relicRewards = getRelicRewards(rawRelic);
  const componentRelicRecord = relicRewards.find(reward => reward.rewardFullName.localeCompare(rawComponent.id) == 0);
  if(componentRelicRecord == null) { console.warn(`no relation found between relic and component!`, rawComponent, rawRelic); return null; }

  componentRelicRarityRelationCache[cacheId] = componentRelicRecord.rarity;

  return componentRelicRecord.rarity;
}

export function getObjectDisplayName(rawObj, category=null){
  if(!category) category = rawObj.category;

  category = capitalizeFirstLetter(category);

  return  category.localeCompare("Items") == 0 ? `${rawObj.name}` :
          category.localeCompare("Components") == 0 ? `${rawObj.fullName}` :
          category.localeCompare("Relics") == 0 ? `${rawObj.name}` :
          category.localeCompare("Missions") == 0 ? `${rawObj.name}, ${rawObj.planet}` : null
}

/** 
 * wrapper around Object.fromEntries(Object.entries(dict).filter(filterFunc)) \
 * takes a dict as input, converts it into a list and filters it; then reassembles it into 
 * a dict to then return.
 */
export function filterDict(dict, filterFunc) {
  return Object.fromEntries(Object.entries(dict).filter(filterFunc));
}
