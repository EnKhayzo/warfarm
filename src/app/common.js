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


import * as po from "@/app/pathObjs.js"
import * as global from "@/app/globalNameVariables.js"
import { inflate, deflate } from "pako";

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

export function shallowMerge(a, b){
  if(b == null) return a;
  return { ...a, ...b };
}

export function loadSetting(name){
  let value = null;
  try{
    value = JSON.parse(localStorage.getItem(name));
  } catch(e){ 
    console.error(`failed to load setting!`, name, e); 
  }

  if(name === getBaseEnvPath().userData && value == null) { console.warn(`userData was null on disk! returning {}`, name, value); return {} };

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

export function parseVersion(versionStr){
  const splitVersion = versionStr.split(".");
  if(splitVersion.length < 3){ console.warn(`version length < 3!`); return; }
  return { major: splitVersion[0], minor: splitVersion[1], patch: splitVersion[2] };
}

export function loadStorageData(){
  const storageData = loadSetting("storageData");
  if(!storageData.version) storageData.version = "1.0.0";

  // current storage data version: 1.0.0
  // i'll update the storageData structure here if it becomes necessary


  return storageData;
}

export function saveStorageData(storageData){
  saveSetting("storageData", storageData);
}

// let currentUser = "default";

// this is the data specific to the current user
export function loadUserData(){
  // const storageData = loadStorageData();
  // const userData = storageData[currentUser];
  // if(userData == null) userData = {}


  const userData = loadSetting(getBaseEnvPath().userData);
  if(!userData.version) userData.version = "1.0.0";

  // current user data version: 1.0.1
  // i'll update the userData structure here if it becomes necessary



  return userData;
}

export function saveUserData(userData){
  if(userData == null) { console.warn(`trying to save userData as null! aborting`); return; }
  saveSetting(getBaseEnvPath().userData, userData);
}

export function getUserDataSetting(name, defaultValue=null){
  return loadUserData()[name] ?? defaultValue;
}

export function clearUserDataObtainedItems(){
  let userData = loadUserData();

  if(userData.componentsObtained != null) delete userData.componentsObtained;
  saveUserData(userData);

  obtainedObservable.set({});
}

export function setUserDataComponentObtainedSetting(componentId, name, value){
    let userData = loadUserData();

    if(userData == null) userData = {};

    if(!("componentsObtained" in userData)) userData.componentsObtained = {};
    if(!(componentId in userData.componentsObtained)) userData.componentsObtained[componentId] = {};

    // const oldObj = userData.componentsObtained[componentId][name];

    userData.componentsObtained[componentId][name] = value;
    saveUserData(userData);
    
    obtainedObservable.set(userData.componentsObtained);

    // keep in mind: the user can set a farmed object to not farmed, 
    // but if the crafted setting is true it will remain as is
    // implement a system that automatically sets the crafted to false in such a case?

    // if(name === "obtained"){
    //   const oldValue = oldObj.name ?? null;
    //   if(oldValue != null){

    //   }
    // }
}

export function incrementUserDataComponentObtained(componentId){
  let oldObtained = Number(getUserDataComponentSetting(componentId, "obtained"));
  oldObtained++;
  if(oldObtained > Number(getObjectFromId(componentId).required)) oldObtained = 0;

  setUserDataComponentObtainedSetting(componentId, "obtained", oldObtained);
}

export function decrementUserDataComponentObtained(componentId){
  let oldObtained = Number(getUserDataComponentSetting(componentId, "obtained"));
  oldObtained--;
  if(oldObtained < 0) oldObtained = Number(getObjectFromId(componentId).required);

  setUserDataComponentObtainedSetting(componentId, "obtained", oldObtained);
}

/** setting name refers to the setting inside the component, can be 'obtained' or others */
export function getUserDataComponentSetting(componentId, settingName){
    const userData = loadUserData();

    if(userData == null) return null;
    if(!("componentsObtained" in userData)) return null;
    if(!(componentId in userData.componentsObtained)) return null;

    return userData.componentsObtained[componentId][settingName];
}

export function getObtainedComponents(){
  const userData = loadUserData();
  return userData.componentsObtained ?? {};
}

export function getUserDataTrackedItems(){
  const userData = loadUserData();
  if(!userData.trackedItems) return {};

  return userData.trackedItems;
}

export function setUserDataTrackedItems(trackedItems){
  const userData = loadUserData();
  userData.trackedItems = trackedItems;
  saveUserData(userData);

  trackedItemsOvervable.set(trackedItems);
}

export function getUserDataTrackedItem(itemId){
  const trackedItems = getUserDataTrackedItems();
  return trackedItems[itemId];
}

export function clearUserDataTrackedItems(){
  let userData = loadUserData();
  
  if(userData.trackedItems != null) delete userData.trackedItems;
  saveUserData(userData);

  trackedItemsOvervable.set({});
}

export function setUserDataTrackedItem(itemId, value){
  const trackedItems = getUserDataTrackedItems();

  trackedItems[itemId] = value;
  setUserDataTrackedItems(trackedItems);

  const trackList = getUserDataCurrentActiveTrackList();
  trackList.trackedItems = trackedItems;
  setUserDataTrackList(trackList.id, trackList);
}

export function getUserDataCurrentActiveTrackList(){
  const trackLists = getUserDataTrackLists();
  if(trackLists == null || isDictEmpty(trackLists)) { console.warn(`no track lists!`); return {}; }

  const currentId = getUserDataCurrentTrackListId();
  if(trackLists[currentId] == null || isDictEmpty(trackLists[currentId])){ console.warn(`no current tracklist!`); return {}; }

  return trackLists[currentId];
}

export function getUserDataMissionPriorityPreferences(){
  const userData = loadUserData();

  const missionPriorities = userData.missionPriorityPreferences ?? {};

  return missionPriorities;
}

export function setUserDataMissionPriorityPreferences(missionPriorities){
  if(missionPriorities == null) { console.warn(`null passed to setUserDataMissionPriorityPreferences!`); return; }
  const userData = loadUserData();

  userData.missionPriorityPreferences = missionPriorities;
  saveUserData(userData);

  missionPrioritiesObservable.set(missionPriorities);
}

export function clearUserDataMissionPriorityPreferences(){
  let userData = loadUserData();
  
  if(userData.missionPriorityPreferences != null) delete userData.missionPriorityPreferences;
  saveUserData(userData);

  missionPrioritiesObservable.set({});
}

export function getUserDataHasFirstAccessed(){
  const userData = loadUserData();

  if(userData.hasFirstAccessed == null) return true;

  return userData.hasFirstAccessed;
}

export function setUserDataHasFirstAccessed(hasFirstAccessed){
  const userData = loadUserData();

  userData.hasFirstAccessed = hasFirstAccessed;

  saveUserData(userData);
}

export function getUserDataPreferences() {
  const userData = loadUserData();

  if(userData.userPreferences == null) return {};

  return userData.userPreferences;
}

export function setUserDataPreferences(userPreferences) {
  if(userPreferences == null) return;
  const userData = loadUserData();

  userData.userPreferences = userPreferences;
  saveUserData(userData);

  // console.log(`set user data preference, notifying observers`);

  preferencesObservable.set(userPreferences);
}

export function getUserDataPreference(preferenceName, defaultValue=null) {
  const userDataPreferences = getUserDataPreferences();
  if(userDataPreferences[preferenceName] == null) return defaultValue; // return defaultValue == null ? {} : defaultValue;

  return userDataPreferences[preferenceName];
}

export function setUserDataPreference(preferenceName, value) {
  if(value == null) { console.warn(`setting value to null for preference!`, preferenceName, value); }
  const userDataPreferences = getUserDataPreferences();
  
  userDataPreferences[preferenceName] = value;

  setUserDataPreferences(userDataPreferences);
}

export function getUserDataTrackLists(){
  const userData = loadUserData();
  if(!userData.trackLists) userData.trackLists = {};

  return userData.trackLists;
}

export function setUserDataTrackLists(trackLists){
  const userData = loadUserData();

  userData.trackLists = trackLists;
  saveUserData(userData);

  trackListsObservable.set(trackLists);
}

export function getUserDataTrackList(id){
  const trackLists = getUserDataTrackLists();
  return trackLists[id] ?? {};
}

export function createEmptyTrackListIfNoTrackLists(){
  const trackLists = getUserDataTrackLists();
  if(!isDictEmpty(trackLists)) return;

  const newName = generateTrackListName();
  addUserDataTrackList({ id: newName, trackedItems: getUserDataTrackedItems() });
  setUserDataActiveTrackList(newName);
}

export function setUserDataTrackList(id, trackList){
  const trackLists = getUserDataTrackLists();
  trackLists[id] = trackList;
  setUserDataTrackLists(trackLists);
}

export function renameUserDataTrackList(id, newId){
  if(id === newId) return;

  const trackLists = getUserDataTrackLists();
  if(!trackLists[id]) { console.warn(`no track list exists with id!`, id); return; }

  let trackList = cloneDict(trackLists[id]);
  trackList.id = newId;

  addUserDataTrackList(trackList);
  removeUserDataTrackList(id);

  setUserDataActiveTrackList(newId);
}

export function addUserDataTrackList(obj){
  if(obj == null || obj.id == null || obj.trackedItems == null){ console.warn(`incomplete obj!`, obj); return; }

  const trackLists = getUserDataTrackLists();
  trackLists[obj.id] = obj;

  setUserDataTrackLists(trackLists);
}

export function removeUserDataTrackList(id){
  if(id == null ){ console.warn(`id is null!`, id); return; }

  // this is because of the listener of trackedItems, it would copy the tracked items in the newly
  // created track list in case this removal makes track lists empty
  setUserDataTrackedItems({});

  let trackLists = getUserDataTrackLists();
  if(trackLists[id] != null) delete trackLists[id];

  setUserDataTrackLists(trackLists);

  createEmptyTrackListIfNoTrackLists();
  if(getUserDataCurrentTrackListId() === id) setUserDataActiveTrackList(Object.keys(getUserDataTrackLists())[0]);
}

/** sets the current active variable AND changes trackedItems to match said track list */
export function setUserDataActiveTrackList(id){
  const trackLists = getUserDataTrackLists();

  if(!trackLists[id]){ console.warn(`no track list of id found to set as active!`, id); return; }
  if(trackLists[id].trackedItems == null){ console.warn(`track list to set has no tracked items (null)!`, id); return; }

  setUserDataCurrentTrackListId(id);
  setUserDataTrackedItems(trackLists[id].trackedItems);
}

export function setUserDataCurrentTrackListId(id){
  const userData = loadUserData();

  userData.currentTrackList = id;
  saveUserData(userData);

  currentTrackListIdObservable.set(id);
}

export function getUserDataCurrentTrackListId(){
  const userData = loadUserData();
  return userData.currentTrackList;
}

export function generateTrackListName(){
  const trackLists = getUserDataTrackLists();

  let num = 1;
  let currentName = `Track List ${num}`;
  while(trackLists[currentName] != null) {
    num++;
    currentName = `Track List ${num}`;
  }

  return currentName;
}

/** statusObj = { hasClickedBanner: bool, lastClicked: Date, bannerTargetDate: Date } */
export function setUserDataBannerStatus(statusObj){
  if(statusObj == null) statusObj = {};

  const userData = loadUserData();
  userData.bannerStatus = statusObj;
  saveUserData(userData);
}

export function getUserDataBannerStatus(){
  const userData = loadUserData();
  return userData.bannerStatus ?? {};
}

export function setUserDataPrivacyConsentStatus(privacyConsentStatus){
  // const userData = loadUserData();
  // userData.privacyConsentStatus = consentStatus;

  // saveUserData(userData);

  setUserDataPreference("privacyConsentStatus", privacyConsentStatus);
}

export function getUserDataPrivacyConsentStatus(){
  // const userData = loadUserData();

  // if(!userData.consentStatus) return false;

  // return userData.consentStatus;

  // console.log(`getting getUserDataPrivacyConsentStatus!`, getUserDataPreference("privacyConsentStatus", null));

  return getUserDataPreference("privacyConsentStatus", null);
}


/* --------------- DUCAT USER DATA SECTION --------------- */

export function clearUserDataExtrasObtained(){
  let userData = loadUserData();

  if(userData.extrasObtained != null) delete userData.extrasObtained;
  saveUserData(userData);

  extrasObservable.set({});
}

export function setUserDataExtrasObtainedSetting(componentId, name, value){
    let userData = loadUserData();

    if(userData == null) userData = {};

    if(!("extrasObtained" in userData)) userData.extrasObtained = {};
    if(!(componentId in userData.extrasObtained)) userData.extrasObtained[componentId] = {};

    userData.extrasObtained[componentId][name] = value;
    saveUserData(userData);
    
    if(name === "owned"){
      // adjust the sell values in case some sell list has a sell value greater than the new duplicate value
      const sellValue = getUserDataSellItemValue(componentId);
      if(sellValue > value) setUserDataSellItemValue(componentId, value);

      Object.entries(getUserDataSellLists())
        .forEach(([idList, sellListObj]) => {
          if(sellListObj.sellItems == null) return;

          const sellList = sellListObj.sellItems;
          const sellValue = sellList[componentId] != null && sellList[componentId].sellValue != null ? sellList[componentId].sellValue : 0;

          if(sellValue > value){
            if(sellList[componentId] == null) sellList[componentId] = {};

            sellList[componentId].sellValue = value;
            setUserDataSellList(idList, sellListObj);
          }
        });
    }

    extrasObservable.set(userData.extrasObtained);
}

export function incrementUserDataExtrasObtained(componentId){
  let oldExtrasObtained = Number(getUserDataExtrasSetting(componentId, "owned") ?? 0);
  oldExtrasObtained++;

  setUserDataExtrasObtainedSetting(componentId, "owned", oldExtrasObtained);
}

export function decrementUserDataExtrasObtained(componentId){
  let oldExtrasObtained = Number(getUserDataExtrasSetting(componentId, "owned") ?? 0);
  oldExtrasObtained--;
  if(oldExtrasObtained < 0) oldExtrasObtained = 0;

  setUserDataExtrasObtainedSetting(componentId, "owned", oldExtrasObtained);
}

/** setting name refers to the setting inside the data object, can be 'owned' or others */
export function getUserDataExtrasSetting(componentId, settingName){
    const userData = loadUserData();

    if(userData == null) return null;
    if(!("extrasObtained" in userData)) return null;
    if(!(componentId in userData.extrasObtained)) return null;

    return userData.extrasObtained[componentId][settingName];
}

export function setUserDataExtrasObtained(componentId, value){
  return setUserDataExtrasObtainedSetting(componentId, "owned", value);
}

export function getUserDataExtrasObtained(componentId){
  return getUserDataExtrasSetting(componentId, "owned") ?? 0;
}

export function setUserDataExtrasCrafted(componentId, value){
  return setUserDataExtrasObtainedSetting(componentId, "crafted", value);
}

export function getUserDataExtrasCrafted(componentId){
  return getUserDataExtrasSetting(componentId, "crafted") ?? false;
}

export function getObtainedExtras(){
  const userData = loadUserData();
  return userData.extrasObtained ?? {};
}

export function setUserDataGlobalMode(mode){
  const userData = loadUserData();
  userData.globalMode = mode;
  saveUserData(userData);

  globalModeObservable.set(mode);
}

export function getUserDataGlobalMode(){
  const userData = loadUserData();
  return userData.globalMode ?? "farmMode";
}


/* --------- SELL LIST SECTION ---------- */

export function getUserDataSellItems(){
  const userData = loadUserData();
  if(!userData.sellItems) return {};

  return userData.sellItems;
}

export function setUserDataSellItems(sellItems){
  const userData = loadUserData();
  userData.sellItems = sellItems;
  saveUserData(userData);

  sellItemsOvervable.set(sellItems);
}

export function getUserDataSellItem(itemId){
  const sellItems = getUserDataSellItems();
  return sellItems[itemId] ?? {};
}

export function getUserDataSellItemValue(itemId){
  const sellItem = getUserDataSellItem(itemId);
  return sellItem != null && sellItem.sellValue != null ? sellItem.sellValue : 0;
}

export function clearUserDataSellItems(){
  let userData = loadUserData();
  
  if(userData.sellItems != null) delete userData.sellItems;
  saveUserData(userData);

  sellItemsOvervable.set({});
}

export function setUserDataSellItem(itemId, value){
  if(itemId == null) { console.warn("itemId id is null! aborting"); return; }

  const sellItems = getUserDataSellItems();

  sellItems[itemId] = value;
  setUserDataSellItems(sellItems);

  const sellList = getUserDataCurrentActiveSellList();
  sellList.sellItems = sellItems;
  setUserDataSellList(sellList.id, sellList);
}

export function setUserDataSellItemValue(itemId, value){
  if(itemId == null) { console.warn("itemId id is null! aborting"); return; }

  const sellItem = getUserDataSellItem(itemId);
  sellItem.sellValue = value;

  setUserDataSellItem(itemId, sellItem);
}

export function incrementUserDataSellItemValue(componentId){
  if(componentId == null) { console.warn("component id is null! aborting increment"); return; }
  
  let extrasObtained = getUserDataExtrasObtained(componentId);

  let oldSellItem = Number(getUserDataSellItemValue(componentId));
  oldSellItem++;
  if(oldSellItem > extrasObtained) oldSellItem = 0;

  setUserDataSellItemValue(componentId, oldSellItem);
}

export function decrementUserDataSellItemValue(componentId){
  if(componentId == null) { console.warn("component id is null! aborting decrement"); return; }

  let extrasObtained = getUserDataExtrasObtained(componentId);

  let oldSellItem = Number(getUserDataSellItemValue(componentId));
  oldSellItem--;
  if(oldSellItem < 0) oldSellItem = extrasObtained;

  setUserDataSellItemValue(componentId, oldSellItem);
}

export function getUserDataCurrentActiveSellList(){
  const sellLists = getUserDataSellLists();
  if(sellLists == null || isDictEmpty(sellLists)) { console.warn(`no sell lists!`); return {}; }

  const currentId = getUserDataCurrentSellListId();
  if(sellLists[currentId] == null || isDictEmpty(sellLists[currentId])){ console.warn(`no current selllist!`); return {}; }

  return sellLists[currentId];
}

export function getUserDataSellLists(){
  const userData = loadUserData();
  if(!userData.sellLists) userData.sellLists = {};

  return userData.sellLists;
}

export function setUserDataSellLists(sellLists){
  const userData = loadUserData();

  userData.sellLists = sellLists;
  saveUserData(userData);

  sellListsObservable.set(sellLists);
}

export function getUserDataSellList(id){
  const sellLists = getUserDataSellLists();
  return sellLists[id] ?? {};
}

export function createEmptySellListIfNoSellLists(){
  const sellLists = getUserDataSellLists();
  if(!isDictEmpty(sellLists)) return;

  const newName = generateSellListName();
  addUserDataSellList({ id: newName, sellItems: getUserDataSellItems() });
  setUserDataActiveSellList(newName);
}

export function setUserDataSellList(id, sellList){
  const sellLists = getUserDataSellLists();
  sellLists[id] = sellList;
  setUserDataSellLists(sellLists);
}

export function renameUserDataSellList(id, newId){
  if(id === newId) return;

  const sellLists = getUserDataSellLists();
  if(!sellLists[id]) { console.warn(`no sell list exists with id!`, id); return; }

  let sellList = cloneDict(sellLists[id]);
  sellList.id = newId;

  addUserDataSellList(sellList);
  removeUserDataSellList(id);

  setUserDataActiveSellList(newId);
}

export function addUserDataSellList(obj){
  if(obj == null || obj.id == null || obj.sellItems == null){ console.warn(`incomplete obj!`, obj); return; }

  const sellLists = getUserDataSellLists();
  sellLists[obj.id] = obj;

  setUserDataSellLists(sellLists);
}

export function removeUserDataSellList(id){
  if(id == null ){ console.warn(`id is null!`, id); return; }

  // this is because of the listener of sellItems, it would copy the sell items in the newly
  // created sell list in case this removal makes sell lists empty
  setUserDataSellItems({});

  let sellLists = getUserDataSellLists();
  if(sellLists[id] != null) delete sellLists[id];

  setUserDataSellLists(sellLists);

  createEmptySellListIfNoSellLists();
  if(getUserDataCurrentSellListId() === id) setUserDataActiveSellList(Object.keys(getUserDataSellLists())[0]);
}

/** sets the current active variable AND changes sellItems to match said sell list */
export function setUserDataActiveSellList(id){
  const sellLists = getUserDataSellLists();

  if(!sellLists[id]){ console.warn(`no sell list of id found to set as active!`, id); return; }
  if(sellLists[id].sellItems == null){ console.warn(`sell list to set has no sell items (null)!`, id); return; }

  setUserDataCurrentSellListId(id);
  setUserDataSellItems(sellLists[id].sellItems);
}

export function setUserDataCurrentSellListId(id){
  const userData = loadUserData();

  userData.currentSellList = id;
  saveUserData(userData);

  currentSellListIdObservable.set(id);
}

export function getUserDataCurrentSellListId(){
  const userData = loadUserData();
  return userData.currentSellList;
}

export function generateSellListName(){
  const sellLists = getUserDataSellLists();

  let num = 1;
  let currentName = `Sell List ${num}`;
  while(sellLists[currentName] != null) {
    num++;
    currentName = `Sell List ${num}`;
  }

  return currentName;
}

/* --------------- /DUCAT USER DATA SECTION --------------- */





export function isDictEmpty(dict){
  if(dict == null) return true;

  // console.log(`is dict empty?`, Object.keys(dict).length <= 0, dict)
  return Object.keys(dict).length <= 0;
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
            console.warn("No file selected.");
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

export function extractAlphanumericCharactersOnly(str){
  return str.replace(/[^\dA-Z]+/gi,"");
}

export function defaultMissionInitializeFilter(missionId){
  // return !missionId.includes("Event") && !missionId.includes(":");
  return true;
}

export function getRelicType(relicName){
  return relicName.split(" ")[0].trim();
}

export function getRelicRewards(relic){
    if(relic.rewards == null) return [];
    return [ ...Object.entries(relic.rewards).map(([ rewardFullName, rarity ]) => ({ rewardFullName: rewardFullName, rarity: rarity.rarity })).flat(1) ]
}

export function getRelicsThatDropComponent(componentId){
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
                .filter(([ missionId, relicIdList ]) => defaultMissionInitializeFilter(missionId))
                .filter(([ missionId, relicIdList ]) => { if(!missions[missionId]) console.warn(`mission id is null!`, missionId, relicIdList); return missions[missionId] != null; })
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

export let dialogsUiObservable = new CustomObservable();
export let notificationsUiObservable = new CustomObservable();
export let contextMenuUisObservable = new CustomObservable();

// user data observables
export let trackedItemsOvervable = new CustomObservable();
export let obtainedObservable = new CustomObservable();
export let missionPrioritiesObservable = new CustomObservable();


export let preferencesObservable = new CustomObservable();

export let trackListsObservable = new CustomObservable();
export let currentTrackListIdObservable = new CustomObservable();

export let extrasObservable = new CustomObservable();

export let globalModeObservable = new CustomObservable();

export let sellItemsOvervable = new CustomObservable();
export let sellListsObservable = new CustomObservable();
export let currentSellListIdObservable = new CustomObservable();


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
let nodeNameMap = null;

let relicsResurgence = null;

let relicRewardComponentMap = null;
let missionRewardComponentMap = null;
let idMap = null;

let components = null;

let objectPaths = null;
let objectPathsIds = null;

// let sitePaths = null;

let initialized = false;
export function getInitialized() { return initialized; }

export async function initialize(local=false) {
    if(initialized) return;
 
    items = (await import(`../../public/data/items.json`)).default;
    components = (await import(`../../public/data/components.json`)).default;
    relics = (await import(`../../public/data/relics.json`)).default;
    missions = filterDict(
      (await import(`../../public/data/missions.json`)).default, 
      ([ id, mission ]) => defaultMissionInitializeFilter(id)
    );
    nodeNameMap = (await import(`../../public/data/node_name_map.json`)).default;

    relicsResurgence = (await import(`../../public/data/relics_resurgence.json`)).default;

    relicRewardComponentMap = await import(`../../public/data/indices/relic_reward_component_map.json`);
    missionRewardComponentMap = await import(`../../public/data/indices/mission_reward_component_map.json`);
    idMap = await import(`../../public/data/indices/id_map.json`);

    
  
    let tempPaths = [];

    tempPaths = [ ...tempPaths, ...Object.entries(await getAllItems()).map(([ id, item ]) =>            ({ title: `${item.name}`,           category: "items",       route: `/prime/items/${extractAlphanumericCharactersOnly(id)}`,       routeId: extractAlphanumericCharactersOnly(id), id: id })).flat(1) ];
    tempPaths = [ ...tempPaths, ...Object.entries(await getAllComponents()).map(([ id, component ]) =>  ({ title: `${component.fullName}`,  category: "components",  route: `/prime/components/${extractAlphanumericCharactersOnly(id)}`,  routeId: extractAlphanumericCharactersOnly(id), id: id })).flat(1) ];
    tempPaths = [ ...tempPaths, ...Object.entries(await getAllRelics()).map(([ id, relic ]) =>          ({ title: `${relic.name}`,          category: "relics",      route: `/prime/relics/${extractAlphanumericCharactersOnly(id)}`,      routeId: extractAlphanumericCharactersOnly(id), id: id })).flat(1) ];
    tempPaths = [ ...tempPaths, ...Object.entries(await getAllMissions()).map(([ id, mission ]) =>      ({ title: `${mission.fullName}`,    category: "missions",    route: `/prime/missions/${extractAlphanumericCharactersOnly(id)}`,    routeId: extractAlphanumericCharactersOnly(id), id: id })).flat(1) ];
    

    objectPaths = Object.fromEntries(tempPaths.map(path => [ path.routeId, path ]));
    objectPathsIds = Object.fromEntries(tempPaths.map(path => [ path.id, path ]));

    // sitePaths = Object.fromEntries([ 
    //   ...objectPaths,
    //   { title: "About", category: "_misc", route: "/prime/about", routeId: "_about", id: "About" },
    //   { title: "Explorer", category: "_misc", route: "/prime/explorer", routeId: "_explorer", id: "Explorer" },
    //   { title: "Support Me", category: "_misc", route: "/prime/supportme", routeId: "_supportme", id: "Support Me" },
    //   { title: "Upcoming", category: "_misc", route: "/prime/upcoming", routeId: "_upcoming", id: "Upcoming" },
    //   { title: "Home", category: "_misc", route: "/prime", routeId: "_home", id: "Home" },
    // ].map(el => [ el.routeId, el ]));

    if(local){
      createEmptyTrackListIfNoTrackLists();
      createEmptySellListIfNoSellLists();

      dialogsUiObservable.set([]);
      notificationsUiObservable.set([]);
      contextMenuUisObservable.set([]);

      // user data observables
      trackedItemsOvervable.set(getUserDataTrackedItems());
      obtainedObservable.set(getObtainedComponents());
      missionPrioritiesObservable.set(getDefaultMissionTypePriorities());


      preferencesObservable.set(getUserDataPreferences());

      trackListsObservable.set(getUserDataTrackLists());
      currentTrackListIdObservable.set(getUserDataCurrentTrackListId());

      extrasObservable.set(getObtainedExtras());

      globalModeObservable.set(getUserDataGlobalMode());
      
      sellItemsOvervable.set(getUserDataSellItems());
      sellListsObservable.set(getUserDataSellLists());
      currentSellListIdObservable.set(getUserDataCurrentSellListId());
    }

    initialized = true;
  };

/**
 * when another tab updates the user data\
 * alias for refreshUserData but with some quirks (ie. farm mode doesn't update) 
 */
export function onOtherTabUpdate(newUserData){

  // this is set to getUserDataTrackedItems() instead of newUserData.trackedItems because
  // it seemed to create recursive loops with the listeners set up for trackLists
  // probably something regarding a shared reference?
  trackedItemsOvervable.set(getUserDataTrackedItems());  // .set(newUserData.trackedItems ?? {});

  obtainedObservable.set(newUserData.componentsObtained ?? {});
  missionPrioritiesObservable.set(newUserData.missionPriorityPreferences ?? getDefaultMissionTypePriorities());
  preferencesObservable.set(newUserData.preferencesObservable ?? getUserDataPreferences());
  // dialogsUiObservable.set([]);

  trackListsObservable.set(getUserDataTrackLists());
  currentTrackListIdObservable.set(getUserDataCurrentTrackListId());

  extrasObservable.set(getObtainedExtras());

  // globalModeObservable.set(getUserDataGlobalMode());

  sellItemsOvervable.set(getUserDataSellItems());
  sellListsObservable.set(getUserDataSellLists());
  currentSellListIdObservable.set(getUserDataCurrentSellListId());

  createEmptyTrackListIfNoTrackLists();
  createEmptySellListIfNoSellLists();
}

export function refreshUserData(newUserData) {

  // this is set to getUserDataTrackedItems() instead of newUserData.trackedItems because
  // it seemed to create recursive loops with the listeners set up for trackLists
  // probably something regarding a shared reference?
  trackedItemsOvervable.set(getUserDataTrackedItems());  // .set(newUserData.trackedItems ?? {});

  obtainedObservable.set(newUserData.componentsObtained ?? {});
  missionPrioritiesObservable.set(newUserData.missionPriorityPreferences ?? getDefaultMissionTypePriorities());
  preferencesObservable.set(newUserData.preferencesObservable ?? getUserDataPreferences());
  // dialogsUiObservable.set([]);

  trackListsObservable.set(getUserDataTrackLists());
  currentTrackListIdObservable.set(getUserDataCurrentTrackListId());

  extrasObservable.set(getObtainedExtras());

  globalModeObservable.set(getUserDataGlobalMode());

  sellItemsOvervable.set(getUserDataSellItems());
  sellListsObservable.set(getUserDataSellLists());
  currentSellListIdObservable.set(getUserDataCurrentSellListId());

  createEmptyTrackListIfNoTrackLists();
  createEmptySellListIfNoSellLists();
}

export function setAllUserData(userData){
  saveUserData(userData);
  trackedItemsOvervable.set(getUserDataTrackedItems());

  obtainedObservable.set(userData.componentsObtained ?? {});
  missionPrioritiesObservable.set(userData.missionPriorityPreferences ?? {});
  preferencesObservable.set(userData.preferencesObservable ?? getUserDataPreferences());

  trackListsObservable.set(getUserDataTrackLists());
  currentTrackListIdObservable.set(getUserDataCurrentTrackListId());

  extrasObservable.set(getObtainedExtras());

  globalModeObservable.set(getUserDataGlobalMode());

  sellItemsOvervable.set(getUserDataSellItems());
  sellListsObservable.set(getUserDataSellLists());
  currentSellListIdObservable.set(getUserDataCurrentSellListId());

  createEmptyTrackListIfNoTrackLists();
  createEmptySellListIfNoSellLists();
}

export function clearAllUserData(){
  saveUserData({});
  obtainedObservable.set({});
  trackedItemsOvervable.set({});
  missionPrioritiesObservable.set({});
  preferencesObservable.set({});

  currentTrackListIdObservable.set(null);
  trackListsObservable.set({});

  extrasObservable.set({});

  globalModeObservable.set("farmMode");

  sellItemsOvervable.set({});
  sellListsObservable.set({});
  currentSellListIdObservable.set(null);

  createEmptyTrackListIfNoTrackLists();
}


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
    "Interception": 7, 
    "Rescue": 8, 
    "Caches": 9, 
    "Assassination": 10, 
    "Excavation": 11, 
    "Mobile Defense": 12, 
    "Sabotage": 13, 
    "Pursuit": 14, 
    "Conclave": 15, 
    "Defection": 16, 
    "Ascension": 17, 
    "Arena": 18, 
    "Infested Salvage": 19, 
    "Rush": 20, 
    "Alchemy": 21, 
    "Sanctuary Onslaught": 22, 
    "Void Flood": 23, 
    "Void Cascade": 24, 
    "Void Armageddon": 25, 
    "Hard": 26
  }
}

export function getRotationPriorities(){
  return {
    "A": 1,
    "B": 2,
    "C": 3
  }
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


  _match(category, {
    "Items": () => {
      const item = objects.item;
      _match(activeTab, {
        "components": () => {
          const component = objects.component;
          res = {
            icon: getObjectIcon(component), 
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
            id: component.id,
            route: getObjectRouteFromId(component.id),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${item?item.id:""}-${component.id})`
          };
        },
        "relics": () => {
          const component = objects.component;
          const [ relicName, relicInfo ] = objects.relicEntry;
          res = ({
            icon: getObjectIcon(relicInfo.relic),
            vaulted: relicInfo.vaulted, 
            rarity: relicInfo.rarity, 
            componentName: component.name,
            componentFullName: component.fullName,
            labelHeading: `${component.name}`, 
            labelFooter: null,
            label: `${relicName}`, 
            onClick: () => router.push(getObjectRouteFromId(relicInfo.relic.id)),
            rawObj: relicInfo,
            id: relicInfo.relic.id,
            route: getObjectRouteFromId(relicInfo.relic.id),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${item?item.id:""}-${component.id}-${relicName})`
          });
        },
        "missions": () => {
          const component = objects.component;
          const [ missionName, mission ] = objects.missionEntry;
          res = ({
            icon: getObjectIcon(mission.mission),
            vaulted: mission.vaulted, 
            rarity: mission.rarity, 
            labelHeading: `${component.name}`, 
            labelFooter: `${mission.relic.name ?? '?'} (${
                mission.rotations
                    .toSorted((a,b) => Number(a.perc.replace("%", "")) - Number(b.perc.replace("%", "")))
                    .map(rotation => `${rotation.rotation ?? '?'} - ${rotation.perc ?? '?'}`).join(", ")
            })`,
            label: `${missionName} (${mission.mission.type})`, 
            onClick: () => router.push(getObjectRouteFromId(mission.mission.id)),
            rawObj: mission,
            id: mission.mission.id,
            route: getObjectRouteFromId(mission.mission.id),
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
            icon: getObjectIcon(relic.relic),
            vaulted: relic.vaulted, 
            rarity: relic.rarity, 
            componentName: component.componenName, 
            componentFullName: component.fullName, 
            labelHeading: `${relicName}`, 
            labelFooter: null,
            label: null, 
            onClick: () => router.push(getObjectRouteFromId(relic.relic.id)),
            rawObj: relic,
            id: relic.relic.id,
            route: getObjectRouteFromId(relic.relic.id),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${component.id}-${relicName})`
          });
        },
        "missions": () => {
          const [ missionName, mission ] = objects.missionEntry;
          res = ({
            icon: getObjectIcon(mission.mission),
            vaulted: mission.vaulted, 
            rarity: mission.rarity, 
            labelHeading: `${mission.mission.type}`, 
            labelFooter: `${mission.relic.name ?? '?'} (${
                mission.rotations
                    .toSorted((a,b) => Number(a.perc.replace("%", "")) - Number(b.perc.replace("%", "")))
                    .map(rotation => `${rotation.rotation ?? '?'} - ${rotation.perc ?? '?'}`).join(", ")
            })`,
            label: `${missionName}`, 
            onClick: () => router.push(getObjectRouteFromId(mission.mission.id)),
            rawObj: mission,
            id: mission.mission.id,
            route: getObjectRouteFromId(mission.mission.id),
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
            icon: getObjectIcon(component), 
            vaulted: relic.vaulted, 
            rarity: tier,
            labelHeading: `${component.parentItem ? component.parentItem : component.name}`, 
            label: component.parentItem ?  component.name : null, 
            labelFooter: component.parentItem ?  `${component.obtained ?? getUserDataComponentSetting(component.id, "obtained") ?? '0'}/${component.required}` : null,
            onClick: () => incrementUserDataComponentObtained(component.id), 
            type: relic.type,
            rawObj: component,
            id: component.id,
            route: getObjectRouteFromId(component.id),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${relic.id}-${tier}-${component.id})`
          });
        },
        "missions": () => {
          const mission = objects.mission;
          res = ({
            icon: getObjectIcon(mission),
            labelHeading: `${mission.type}`, 
            labelFooter: `(${
                Object.values(mission.rewards[`${relic.name} Relic`])
                    .toSorted((a,b) => Number(a.perc.replace("%", "")) - Number(b.perc.replace("%", "")))
                    .map(rotation => `${rotation.rotation ?? '?'} - ${rotation.perc ?? '?'}`).join(", ")
            })`,
            label: `${mission.planet}, ${mission.name}`, 
            onClick: () => router.push(getObjectRouteFromId(mission.id)),
            rotations: mission.rewards,
            rawObj: mission,
            id: mission.id,
            route: getObjectRouteFromId(mission.id),
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
          const relicName = relicMissionName.replace("Relic", "").replace("(Radiant)", "").trim();
          res = ({
            icon: getObjectIcon(relics[relicName]),
            vaulted: relics[relicName].vaulted, 
            rarity: null, 
            labelHeading: `${relicName}`, 
            label: null,
            labelFooter: `(${
                Object.values(relic)
                    .toSorted((a,b) => Number(a.perc.replace("%", "")) - Number(b.perc.replace("%", "")))
                    .map(rotation => `${rotation.rotation ?? '?'} - ${rotation.perc ?? '?'}`).join(", ")
            })`, 
            onClick: () => router.push(getObjectRouteFromId(relicName)),
            rawObj: relic,
            id: relicName,
            route: getObjectRouteFromId(relicName),
            category: category,
            tab: activeTab,
            searchObjId: `${category}-${activeTab}-(${mission.id}-${relicName})`
          });
        }
      })
    }
  });

  return res;
}

export function sortRelicFunc(a, b, relicTypePriorities, rarityPriorities){
  if(relicTypePriorities == null) relicTypePriorities = getRelicTypePriorities();
  if(rarityPriorities == null) rarityPriorities = getRarityPriorities();

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
                    .map((relicEntry) => (
                      getSearchResultRelatedObjectsSingle(category, activeTab, { component, relicEntry }, router) 
                    ))
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
                          .map(([ rewardFullName, reward ]) => ({ tier: reward.rarity, reward: rewardFullName }))
                          .map(({ tier, reward  }) => ({ tier, component: components[reward] }))
                          // .filter(component => component!=null && component.name!=null)
                          .map((rewardEntry) => (
                            getSearchResultRelatedObjectsSingle(category, activeTab, { relic, rewardEntry }, router) 
                          ))
                  : []
              )
              .flat(1)
          ]
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
                      .map(mission => (
                        getSearchResultRelatedObjectsSingle(category, activeTab, { relic, mission }, router) 
                      ))
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

/** please try using this as little as possible (see Observer Pattern and Custom Observer), pollInterval is in ms */
export async function waitUntil(predicate, pollInterval=250){
  while(!(await predicate())){
    await sleep(pollInterval);
  }
}

/** busy waits until the getValueFunc returns a value that is different from initialState, pollInterval is in ms */
export async function waitFor(getValueFunc, initialState, pollInterval=250){
  let lastValueFunc = await getValueFunc();
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
  if(itemId == null) return; // i don't warn because of spam/lag in the console window

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
}

export function getObjectIcon(rawObj, category=null){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return ''; }
  if(!category) category = rawObj.category;

  category = capitalizeFirstLetter(category);

  return category.localeCompare("Items") == 0 ? `${getBaseEnvPath().basePath}/images/${rawObj.name}.png` :
      category.localeCompare("Components") == 0 ? `${getBaseEnvPath().basePath}/images/${rawObj.fullName}.png` :
      category.localeCompare("Relics") == 0 ? `${getBaseEnvPath().basePath}/images/${rawObj.tier}.png` :
      category.localeCompare("Missions") == 0 ? `${getBaseEnvPath().basePath}/images/${ rawObj.planet.includes("Event: ") ? rawObj.planet.replace("Event: ","") : rawObj.planet}.png` : null
}

export function getObjectPathObjFromRouteId(routeId){
  if(!objectPaths) return null;
  return objectPaths[routeId];
}

export function getObjectRouteFromRouteId(routeId){
  return getObjectPathObjFromRouteId(routeId).route;
}

export function getObjectPathObjFromId(id){
  if(!objectPathsIds) return null;
  return objectPathsIds[id];
}

export function getObjectRouteFromId(id){
  const obj = getObjectPathObjFromId(id);
  if(obj == null){ console.warn(`object is null!`, id, obj); return '/prime'; }

  return obj.route;
}

export function getObjectPathNameFromIdObj(rawObj, category=null){
  if(!category) category = rawObj.category;

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

export function componentIsFarmedPerc(rawObj, obtainedComponents=null){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return false; }
  if(rawObj.required <= 0) return 0;

  if(!obtainedComponents) obtainedComponents = getObtainedComponents();
  if(obtainedComponents[rawObj.id] == null) return 0;

  return obtainedComponents[rawObj.id].obtained/rawObj.required;
}

export function itemIsFarmedPerc(rawObj, obtainedComponents=null){
  if(rawObj == null || rawObj.components == null) return 0;
  return (
            Object.keys(rawObj.components)
              .map(id => components[id])
              .reduce((acc, component) => {
                acc += componentIsFarmedPerc(component, obtainedComponents);
                return acc;
              }, 0)
          )
          /
            Object.keys(rawObj.components).length;
}

export function relicIsFarmedPerc(rawObj, obtainedComponents=null){
  if(rawObj == null || rawObj.rewards == null) return 0;

  if(!obtainedComponents) obtainedComponents = getObtainedComponents();

  const relicRewards = getRelicRewards(rawObj)
    .map(entry => getObjectFromId(entry.rewardFullName))
    .filter(obj => obj.anomalous == null || obj.anomalous == false);

  const res = relicRewards
          .reduce((acc, component) => {
            acc += componentIsFarmedPerc(component, obtainedComponents);
            return acc;
          }, 0)
          /
          relicRewards.length;

  // console.log(`is relic farmed?`, res);

  return res;
}

export function objectIsFarmedPerc(rawObj, obtainedComponents=null){
  if(rawObj == null){ console.warn(`rawObj is null!`, rawObj); return 0; }
  return  rawObj.category === 'items' ? 
            itemIsFarmedPerc(rawObj, obtainedComponents) 
          : 
          rawObj.category === 'components' ? 
            componentIsFarmedPerc(rawObj, obtainedComponents)
          :
          rawObj.category === 'relics' ? 
            relicIsFarmedPerc(rawObj, obtainedComponents)
          :
            0;
}

export function componentIsFarmed(rawObj, obtainedComponents=null){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return false; }
  if(rawObj.required <= 0) return false;

  if(!obtainedComponents) obtainedComponents = getObtainedComponents();

  return obtainedComponents[rawObj.id] != null && obtainedComponents[rawObj.id].obtained >= rawObj.required;
}

export function itemIsFarmed(rawObj, obtainedComponents=null){
  if(rawObj == null || rawObj.components == null) return true;

  if(!obtainedComponents) obtainedComponents = getObtainedComponents();

  return Object.keys(rawObj.components).map(id => components[id]).every(component => componentIsFarmed(component, obtainedComponents));
}

export function relicIsFarmed(rawObj, obtainedComponents=null){
  // console.log(`is relic farmed?`, rawObj, obtainedComponents);
  if(rawObj == null || rawObj.rewards == null) return false;

  if(!obtainedComponents) obtainedComponents = getObtainedComponents();

  const res = getRelicRewards(rawObj)
          .map(entry => getObjectFromId(entry.rewardFullName))
          .filter(obj => obj.anomalous == null || obj.anomalous == false)
          .every(
            rewardObj => objectIsFarmed(rewardObj, obtainedComponents)
          );

  // console.log(`is relic farmed?`, res);

  return res;
}

export function objectIsFarmed(rawObj, obtainedComponents=null){
  if(rawObj == null) return false;
  return  rawObj.category === 'items' ? 
            itemIsFarmed(rawObj, obtainedComponents) 
          : 
          rawObj.category === 'components' ? 
            componentIsFarmed(rawObj, obtainedComponents)
          :
          rawObj.category === 'relics' ? 
            relicIsFarmed(rawObj, obtainedComponents)
          :
            false;
}


export function setComponentToFarmed(rawObj, farmed, obtainedComponents=null){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return; }
  if(rawObj.required == null || rawObj.required <= 0) return;
  
  setUserDataComponentObtainedSetting(rawObj.id, "obtained", farmed ? rawObj.required : 0);
}

export function setItemToFarmed(rawObj, farmed){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return false; }

  getItemComponents(rawObj.id).forEach(component => setComponentToFarmed(component, farmed));
}

export function setObjectToFarmed(rawObj, farmed){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return; }
  
  _match(rawObj.category, {
    "items": () => {
      setItemToFarmed(rawObj, farmed);
    },
    "components": () => {
      setComponentToFarmed(rawObj, farmed);
    }
  })
}

export function componentIsCrafted(componentId){
  if(componentId == null) { console.warn(`componentId is null!`, componentId); return; }

  return getUserDataExtrasCrafted(componentId);
}

export function itemIsCrafted(itemId){
  if(itemId == null) { console.warn(`itemId is null!`, itemId); return; }

  return getItemComponentIds(itemId).every(componentId => componentIsCrafted(componentId));
}

export function objectIsCrafted(rawObj){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return; }

  return rawObj.category === "items" ? 
      itemIsCrafted(rawObj.id)
    : 
      componentIsCrafted(rawObj.id);
}

export function setComponentToCrafted(componentId, crafted){
  if(componentId == null) { console.warn(`componentId is null!`, componentId); return; }
  
  // console.log(`setComponentToCrafted!`, crafted, componentId);

  setUserDataExtrasCrafted(componentId, crafted);
}

export function setItemToCrafted(itemId, crafted){
  if(itemId == null) { console.warn(`itemId is null!`, itemId); return false; }

  getItemComponentIds(itemId).forEach(componentId => setComponentToCrafted(componentId, crafted));
}

export function setObjectToCrafted(rawObj, crafted){
  if(rawObj == null) { console.warn(`rawObj is null!`, rawObj); return; }
  
  // console.log(`setObjectToCrafted!`, crafted, rawObj);

  _match(rawObj.category, {
    "items": () => {
      setItemToCrafted(rawObj.id, crafted);
    },
    "components": () => {
      setComponentToCrafted(rawObj.id, crafted);
    }
  })
}

export function relicDropsComponent(rawRelic, rawComponent){
  return getRelicRewards(rawRelic).findIndex(reward => reward.rewardFullName.localeCompare(rawComponent.id) == 0) > -1;
}

export function getComponentsRelicsMergedRelicTab(trackedItems, router){
  const componentsRelicsMerged = trackedItems.reduce((acc, trackedItemId) => {
    if(!acc.components) acc.components = [];
    if(!acc.relics) acc.relics = [];

    const trackedItem = getObjectFromId(trackedItemId);
    if(trackedItem == null) { console.warn(`tracked item is null!`, trackedItemId); return acc; }

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

/** notification: { type: 'failure'|'success', label } */
export function showNotificationUi(notification) {
  notificationsUiObservable.set(notificationsUiObservable.get().concat(notification));
  if(notification.type === "success" || notification.type === "failure"){
    const timeoutId = () => {
      removeNotificationUi(notification, timeoutId);
    };

    setTimeout(timeoutId, 3000);
  }
}

export function removeNotificationUi(notification, options) {
  if(options && options.timeoutId != null) clearTimeout(options.timeoutId);

  const idx = notificationsUiObservable.get().indexOf(notification);
  if(idx < 0) { console.warn(`no notification found! trying to match`, notification); return; }

  let newList = [ ...notificationsUiObservable.get() ];
  newList.splice(idx, 1);
  notificationsUiObservable.set(newList);
}

export function getNotificationUis() {
  return notificationsUiObservable.get();
}

export function getContextMenuUisRemoveListener(contextMenu){
  const removeClickListener = (ev) => {
    if(!ev.target.classList.contains(".global-context-menu-ui") && ev.target.closest(".global-context-menu-ui") == null) {
      removeContextMenuUis(contextMenu);
      document.removeEventListener('click', removeClickListener);
    }
  }
  return removeClickListener;
}

/** contextMenu: { position, children: function(props) } */
export function showContextMenuUis(contextMenu) {
  contextMenuUisObservable.set(contextMenuUisObservable.get().concat(contextMenu));
  document.addEventListener('click', getContextMenuUisRemoveListener(contextMenu));
}


export function toggleContextMenuUis(contextMenu) {
  const idx = contextMenuUisObservable.get().indexOf(contextMenu);
  if(idx > -1) {
    removeContextMenuUis(contextMenu);
    document.removeEventListener('click', getContextMenuUisRemoveListener(contextMenu));
  }
  else showContextMenuUis(contextMenu);
}

export function removeContextMenuUis(contextMenu) {
  const idx = contextMenuUisObservable.get().indexOf(contextMenu);
  if(idx < 0) { console.warn(`no contextMenu found! trying to match`, contextMenu); return; }

  let newList = [ ...contextMenuUisObservable.get() ];
  newList.splice(idx, 1);
  contextMenuUisObservable.set(newList);
}

export function getContextMenuUis() {
  return contextMenuUisObservable.get();
}


export function getComponentRarity(rawComponent){
  // take the rarity with the highest chance
  const rarities = { "common": 0, "uncommon": 1, "rare": 2 };
  return getRelicsThatDropComponent(rawComponent.id).map(relic => [ relic.relic.name, relic ])
    .map(([ relicName, relic ]) => relic.rarity)
    .toSorted((rarityA, rarityB) => rarities[rarityA] - rarities[rarityB])
    [0]
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
  // console.log(`filterDict entries`, Object.entries(dict), Object.fromEntries(Object.entries(dict)))
  return Object.fromEntries(Object.entries(dict).filter(filterFunc));
}

export function generatePageTitleFromSiteMap(pathObjId) {
  const pathObj = po.pathObjs[pathObjId];
  if(pathObj == null) return "";
  
  // console.log(`generating page title from site map`, pathObjId, `${pathObj.title} | ${getBaseEnvPath().titleName}`);
  return `${pathObj.title} | ${getBaseEnvPath().titleName}`;
}

export function generatePageTitle(pageTitle) {
  return `${pageTitle} | ${getBaseEnvPath().titleName}`;
}

export function getItemComponentIds(itemId){
  const obj = getObjectFromId(itemId);
  if(!obj) { console.warn(`obj is null!`, itemId); return; }
  if(obj.components == null ) { console.warn(`obj components is null!`, itemId); return; }

  return Object.keys(obj.components);
}

export function getItemComponents(itemId){
  const obj = getObjectFromId(itemId);
  if(!obj) { console.warn(`obj is null!`, itemId); return; }
  if(obj.components == null ) { console.warn(`obj components is null!`, itemId); return; }

  return Object.keys(obj.components).map(componentId => getObjectFromId(componentId));
}

export function isRelicResurgence(id){
  return id in relicsResurgence;
}

export function isComponentResurgence(id){
  return getRelicsThatDropComponent(id).some(relicInfo => relicInfo.relic.id in relicsResurgence);
}

export function isItemResurgence(id){
  const obj = getObjectFromId(id);
  if(!obj) { console.warn(`obj is null!`, itemId); return; }
  
  return getItemComponents(id).some(component => isComponentResurgence(component.id));
}

export function isObjectResurgence(itemId){
  const obj = getObjectFromId(itemId);

  if(obj == null) return;

  if(!obj) { console.warn(`obj is null!`, itemId); return; }
  if(obj.category==="missions") return false;

  let res = false;
  _match(obj.category, {
    "items": () => {
      res = isItemResurgence(itemId);
    },
    "components": () => {
      res = isComponentResurgence(itemId);
    },
    "relics": () => {
      res = isRelicResurgence(itemId);
    }
  })
  return res;
}

export function scrollRestoreSave(mainScrollableRef, pathName) {
  const targetElement = mainScrollableRef.current;
  if (targetElement) {
    let locationMap = JSON.parse(sessionStorage.getItem("locationMap") ?? "{}");
    if(locationMap == null) locationMap = {};
    if(!locationMap[pathName]) locationMap[pathName] = { age: 0, scroll: 0 };

    locationMap[pathName].scroll = targetElement.scrollTop;

    sessionStorage.setItem("locationMap", JSON.stringify(locationMap ?? "{}"));
  }
}

export function scrollRestoreLoad(mainScrollableRef, pathName){
  let locationMap = JSON.parse(sessionStorage.getItem("locationMap") ?? "{}");
  if(locationMap == null) locationMap = {};
  if(!locationMap[pathName]) locationMap[pathName] = { age: 0, scroll: 0 };

  // locationMap[pathName].age++; 
  // if(locationMap[pathName].age > 4) delete locationMap[pathName];
  // else locationMap[pathName] = 0;

  const savedScrollPosition = locationMap && locationMap[pathName] ? locationMap[pathName].scroll : null; //sessionStorage.getItem('scrollPosition');
  if (savedScrollPosition !== null) {
    const targetElement = mainScrollableRef.current;
    if (targetElement) {
      targetElement.scrollTop = savedScrollPosition;
    }
    sessionStorage.removeItem('scrollPosition'); // Clear after restoring
  }
}

export function encodeToBase64(obj) {
  try{
    return Buffer.from(deflate(JSON.stringify(obj), { to: 'string' }), 'binary').toString("base64");
  } catch(exc) { 
    console.warn(`could not encode obj!`, exc, obj); 
    return null; 
  }
}

export function decodeFromBase64(base64Str) {
  try{
    return JSON.parse(inflate(Buffer.from(base64Str.replaceAll(" ", "+"), "base64"), { to: 'string' }));
  } catch(exc) { 
    console.warn(`corrupt base64 string object! returning null`, exc, base64Str); 
    return null; 
  }
}


export function mod(a, b){
  return ((a % b) + b) % b;
}

export function getTimestampAsDurationString(timestamp, shorten=false){
  const isNegative = timestamp < 0;
  if(isNegative) timestamp = -timestamp;

  let timeVals = [
      Math.floor(timestamp / 1000 / 60 / 60 / 24 / 31 / 12),       // years
      mod(Math.floor(timestamp / 1000 / 60 / 60 / 24 / 31), 12),   // months
      mod(Math.floor(timestamp / 1000 / 60 / 60 / 24), 31),        // days
      mod(Math.floor(timestamp / 1000 / 60 / 60), 24),             // hours
      mod(Math.floor(timestamp / 1000 / 60), 60),                  // minutes
      mod(Math.floor(timestamp / 1000), 60),                       // seconds
      mod(timestamp, 1000)                                         // milliseconds
  ]

  var finalStrParts = [];

  var stopPropagation = false;
  var isStillZero = true;
  timeVals.forEach((timeVal, i) => {
      isStillZero = timeVal == 0;
      if(isStillZero || stopPropagation) return;

      if(i == 0) { finalStrParts.push(`${timeVal} ${ shorten ? `y` : `year${timeVal > 1 ? "s" : ""}`}`); stopPropagation = true; }
      else if(i == 1) { finalStrParts.push(`${timeVal} ${ shorten ? `M` : `month${timeVal > 1 ? "s" : ""}`}`); stopPropagation = true; }
      else if(i == 2) { finalStrParts.push(`${timeVal} ${ shorten ? `d` : `day${timeVal > 1 ? "s" : ""}`}`); stopPropagation = true; }
      else if(i == 3) { finalStrParts.push(`${timeVal} ${ shorten ? `h` : `hour${timeVal > 1 ? "s" : ""}`}`); stopPropagation = true; }
      else if(i == 4) finalStrParts.push(`${timeVal} ${ shorten ? `m` : `minute${timeVal > 1 ? "s" : ""}`}`);
      else if(i == 5) { finalStrParts.push(`${timeVal} ${ shorten ? `s` : `second${timeVal > 1 ? "s" : ""}`}`); stopPropagation = true; }
      else if(i == 6) finalStrParts.push(`${timeVal} ${ shorten ? `ms` : `millisecond${timeVal > 1 ? "s" : ""}`}`);
  });

  return `${isNegative ? "-" : ""}${finalStrParts.join(" ")}`;
}

export function getBaseEnvPath() {
  return global.names;
}

export function getDucatValueComponent(rawObj){
  if(rawObj == null){ console.warn(`rawObj is null!`, rawObj); return 0; }

  if(!("ducats" in rawObj)) return -1;

  return rawObj.ducats;
}

export function getDucatValueItem(rawObj){
  if(rawObj == null){ console.warn(`rawObj is null!`, rawObj); return 0; }

  return getItemComponents(rawObj.id).reduce((acc, val) => {
    const value = getDucatValueComponent(val);
    if(value == -1) return acc;

    acc += value;
    return acc;
  }, 0);
}

export function getDucatValueRelic(rawObj){
  if(rawObj == null){ console.warn(`rawObj is null!`, rawObj); return 0; }

  return getRelicRewards(rawObj).reduce((acc, val) => {
    const value = getDucatValueComponent(getObjectFromId(val.rewardFullName));
    if(value == -1) return acc;

    acc += value;
    return acc;
  }, 0);
}

export function getDucatValue(rawObj){
  if(rawObj == null){ console.warn(`rawObj is null!`, rawObj); return 0; }
  return  rawObj.category === 'items' ? 
            getDucatValueItem(rawObj) 
          : 
          rawObj.category === 'components' ? 
            getDucatValueComponent(rawObj)
          :
          rawObj.category === 'relics' ? 
            getDucatValueRelic(rawObj)
          :
            0;
}

export function accessDateAPI(obj){
  return (
      obj != null && 
      obj["$date"] != null && 
      obj["$date"]["$numberLong"] != null 
      ? 
          Number(obj["$date"]["$numberLong"])
      : 
          null
  );

}

export function accessExpiryAPI(obj){
  return accessDateAPI(obj.Expiry);
}

export function getAPINodeObj(nodeId){
  if(nodeId == null) { console.warn(`nodeId is null!`, nodeId); return null; }
  if(nodeNameMap[nodeId] == null) { console.warn(`nodeMap has no nodeId of this value!`, nodeId); return null; }

  return nodeNameMap[nodeId];
}

export function getAPINodeName(nodeId){
  return getAPINodeObj(nodeId).id;
}
