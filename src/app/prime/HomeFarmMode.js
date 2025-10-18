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

'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'

import * as com from "../common.js"
import LazyLoaded from '@/components/LazyLoaded.js';
import ItemActionButton from '@/components/ItemActionButton.js';
import useTrackedItems from '@/hooks/useTrackedItems.js'
import ObjectStateLabel from '@/components/ObjectStateLabel.js';
import FallbackObject from './[category]/[routeId]/FallbackObject.js';
import useMissionPriorities from '@/hooks/useMissionPriorities.js';
import TabComponent from '@/components/TabComponent.js';
import useObtainedComponents from '@/hooks/useObtainedComponents.js';
import ComponentAddButton from './[category]/[routeId]/subcomponents/ComponentAddButton.js';
import ObtainedItemCheck from '@/components/ObtainedItemCheck.js';
import SelectorComponent from '@/components/SelectorComponent.js';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup.js';
import LabelCheckbox from '@/components/LabelCheckbox.js';
import useUserDataPreferences from '@/hooks/useUserDataPreferences.js';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon.js';
import TrackListSelector from './TrackListSelector.js';
import useTrackLists from '@/hooks/useTrackLists.js';
import RelicTabCard from './[category]/[routeId]/subcomponents/RelicTabCard.js';
import RelicTabBody from './[category]/[routeId]/subcomponents/RelicTabBody.js';
import MissionTabBody from './[category]/[routeId]/subcomponents/MissionTabBody.js';
import HideFarmedItemsCheckbox from './[category]/[routeId]/subcomponents/HideFarmedItemsCheckbox.js';
import DucatLabel from '@/components/DucatLabel.js';
import Collapsible from '@/components/Collapsible.js';
import RelicsOwnedButton from '@/components/RelicsOwnedButton.js';

const ComponentTab = ({ hideFarmed, trackedItems}) => {
  const router = useRouter();

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  const componentsRelicsMerged = com.getComponentsRelicsMergedRelicTab(trackedItems, router);

  const components = componentsRelicsMerged.components
    .filter(component => !hideFarmed || !com.componentIsFarmed(component.rawObj, obtainedComponents));
  const relics = componentsRelicsMerged.relics;

  const rarityPriorities = com.getRarityPriorities();
  const relicTypePriorities = com.getRelicTypePriorities();

  const totalMap = com.getTotalRelicsOwnedMap();

  return (
    <div
      className='sized-content component-page-relative-info-container h-flex flex-center'
      style={{ 
        maxWidth: '75vw', 
        flexWrap: 'wrap'
      }}
    >
      { 
        Object.entries(components
          // i group components by item
          .reduce((acc, component) => {
            if(component.rawObj.parentItem == null) { 
              acc[component.rawObj.id] = { 
                item: { 
                  category: "Components", 
                  fullName: component.rawObj.fullName,
                  icon: component.icon,
                  route: component.route,
                  id: component.rawObj.id, 
                  type: '?',
                  componentFullName: component.rawObj.fullName, 
                  name: component.rawObj.fullName 
                }, 
                components: [ component ]
              }; 
              return acc;
            }

            if(!acc[component.rawObj.parentItem]) acc[component.rawObj.parentItem] = { item: com.getObjectFromId(component.rawObj.parentItem), components: []};
            acc[component.rawObj.parentItem].components.push(component);
            return acc;
          }, {}))
          .map(([itemName, itemGroup], index) => (
            <div 
              key={`${index}-${itemName}`}
              className='sized-content v-flex flex-center item-check-parent'
              style={{
                borderRadius: '10px',
                backgroundColor: com.objectIsFarmed(com.getObjectFromId(itemName)) ? 'var(--color-secondary-farmed)' : 'var(--color-secondary)',
                padding: '10px',
                gap: '5px',
                alignSelf: 'stretch',
                justifyContent: 'flex-start'
              }}
            >
              <Link href={com.getObjectRouteFromId(itemGroup.item.id)} 
                className='sized-content v-flex flex-center'
                style={{
                  cursor: 'pointer'
                }}
                // onClick={() => router.push(com.getObjectPathNameFromIdObj(itemGroup.item))}
              >
                {/* <Image width={0} height={0} sizes="100vw" style={{ height: '50px' }} src={com.getObjectIcon(itemGroup.item)}/> */}
                <img style={{ height: '50px' }} src={com.getObjectIcon(itemGroup.item)}/>
                <div>{itemGroup.item.name}</div>
              </Link>
              <DucatLabel rawObj={com.getObjectFromId(itemName)}/>
              <div 
                className='sized-content v-flex flex-center'
                style={{
                  gap: '10px'
                }}
              >
                {
                  itemGroup.components.map((component, index) => (
                    <div 
                        key={`${index}-${component.name}`} 
                        className='sized-content h-flex flex-center' 
                        style={{ 
                            padding: '10px',
                            borderRadius: '10px',
                            gap: '10px',
                            backgroundColor: com.objectIsFarmed(com.getObjectFromId(component.id)) ? 'var(--color-quaternary-farmed)' : 'var(--color-quaternary)',
                            alignSelf: 'stretch',
                            justifyContent: 'flex-start'
                        }}
                    >   
                        <div className='sized-content v-flex flex-center'>
                            <ComponentAddButton width={'70px'} iconHeight={'45px'} component={component}/>
                        </div>
                        <div 
                          className='sized-content v-flex flex-center' 
                          style={{ 
                            maxWidth: '500px',
                            maxHeight: '300px',
                            overflow: 'auto',
                            gap: '5px', 
                            flexWrap: 'wrap',
                            alignItems: "flex-start" ,
                            justifyContent: 'flex-start'
                          }}
                        >
                            {
                              relics
                                  .filter(relic => relic.componentFullName.localeCompare(component.rawObj.fullName) == 0)
                                  .toSorted((a, b) => 
                                      (a.vaulted-b.vaulted)
                                      ||
                                      ((com.isRelicResurgence(b.id) ? 1 : -1) - (com.isRelicResurgence(a.id) ? 1 : -1))
                                      ||
                                      ((totalMap[b.id]??0)-(totalMap[a.id]??0))
                                      ||
                                      (rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                                      ||
                                      (relicTypePriorities[a.rawObj.relic.tier]-relicTypePriorities[b.rawObj.relic.tier])
                                      ||
                                      (a.rawObj.relic.name.localeCompare(b.rawObj.relic.name))
                                  )
                                  .map(relic => (
                                      <Link  href={relic.route}
                                          key={`${index}-${relic.rawObj.relic.name}`} 
                                          // onClick={() => router.push(relic.route)}
                                          className={`sized-content item-page-component-container tracker-item-parent h-flex flex-center${` ${relic.rarity}` ?? ''}`}
                                          style={{
                                            width: '140px',
                                            gap: '5px',
                                            opacity: relic.vaulted ? '50%' : '100%'
                                          }}
                                      >  
                                        <RelicsOwnedButton positionAbsolute={false} itemId={relic.id} showIfHas={false} iconStyle={{ width: '10px', height: '10px' }}/>
                                        <div className='sized-content h-flex flex-center'><img style={{ height: '25px' }} src={relic.icon}/></div>
                                        <div className='sized-content h-flex flex-center' style={{ gap: '1px' }}>
                                          <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', paddingRight: '5px' }}>{relic.label}</div>
                                          <ResurgenceItemIcon positionAbsolute={false} itemId={relic.id} iconStyle={{ minWidth: '10px', minHeight: '10px', width: '10px', height: '10px' }}/>
                                        </div>
                                      </Link>
                                  ))
                            }
                        </div>
                    </div>
                  )) 
                }
              </div>
              <ObtainedResurgenceGroup itemId={itemName} positionAbsolute={true}/>
            </div>
          ))
      }
    </div>
  );
}

function FarmingSheet({ trackedItems }){
  const [ groupBy, setGroupBy ] = useState("relic");
  const [ hideFarmed, setHideFarmed ] = useState(true);
  const [ userPreferences, setUserPreferences ] = useUserDataPreferences();

  const onChangeHideFarmedItems = (hide) => {
    setHideFarmed(hide);
  };

  return (
    <div className='sized-component v-flex flex-center' style={{ gap: '10px' }}>
      <div className='sized-content h-flex' style={{ fontSize: 'large', fontWeight: 'bold' }}>Farming Sheet</div>
      <TabComponent
        hasMinWidth={true}
        defaultTab={"Components"}
        tabs={{
          "Components": <ComponentTab hideFarmed={com.getUserDataPreference("hideFarmed", false)} trackedItems={trackedItems}/>,
          "Relics": <RelicTabBody hideFarmed={com.getUserDataPreference("hideFarmed", false)} objects={trackedItems}/>,
          ...(trackedItems.map(trackedItem => com.getObjectFromId(trackedItem).vaulted ?? false).some(vaultedVal => vaultedVal == false) ? { "Missions": <MissionTabBody groupBy={groupBy} hideFarmed={com.getUserDataPreference("hideFarmed", false)} objectIds={trackedItems}/> } : null)
        }}
        headerControls={{
          "Missions": (
            <div className='sized-content h-flex flex-center' style={{ gap: '10px' }}>
              <HideFarmedItemsCheckbox setHideFarmed={setHideFarmed}/>
              <SelectorComponent
                options={{
                  "Group By Relic":     { value: "relic", defaultOption: true },
                  "Group By Component": { value: "component" }
                }}
                onConfirm={([ text, entry ]) => setGroupBy(entry.value)}
              />
            </div>
          ),
          "Components": (
            <div className='sized-content h-flex flex-center' style={{ gap: '10px' }}>
              <HideFarmedItemsCheckbox setHideFarmed={setHideFarmed}/>
            </div>
          ),
          "Relics": (
            <div className='sized-content h-flex flex-center' style={{ gap: '10px' }}>
              <HideFarmedItemsCheckbox setHideFarmed={setHideFarmed}/>
            </div>
          )
        }}
      />
    </div>
  );
}

function VoidFissuresComponent(){
  const [ sortBy, setSortBy ] = useState("relicType");

  const [ seed, setSeed ] = useState(1);
  const [ worldState, setWorldState ] = useState(null);
  useEffect(() => {


    const fetchData = async(setTimer=true) => {
      try {
        // Fetch the JSON response from the URL
        const response = await fetch('https://enkhayzomachines.net:8443/activemissions');
        
        // Parse the response as JSON
        const data = await response.json();
        
        // console.log(`set world state!`, data);

        // Update state with the fetched data
        setWorldState(data);

        if(setTimer) setTimeout(timerFunc, 1000);

        if(data == null) setTimeout(() => fetchData(false), 5*60*1000); // 5 minutes
        
        let targetDate = Date.now()+5*60*1000; // 5 minutes
        const lowestDate = data.reduce((acc, fissure) => {
          const fissureExpiryDate = com.accessDateAPI(fissure.Expiry);
          if(fissureExpiryDate < acc) acc = fissureExpiryDate;

          return acc;
        }, targetDate);
        if(lowestDate < targetDate) targetDate = lowestDate;

        let timeToWait = targetDate-Date.now();
        if(timeToWait <= 0) timeToWait = 20*1000; // 20 seconds

        // console.log(`time until refetch`, com.getTimestampAsDurationString(timeToWait));
        setTimeout(refetchData, timeToWait);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const refetchData = () => fetchData(false);

    const timerFunc = () => {
      setSeed(Math.random());
      setTimeout(timerFunc, 1000);
    }

    fetchData();

    return () => {
      clearTimeout(timerFunc);
      clearTimeout(refetchData);
    }
  }, []);

  const fissureMissionCache = worldState == null ? null:
    Object.fromEntries(
      worldState?.map?.(
        fissure => {
          const nodeObj = com.getAPINodeObj(fissure.Node)
          const obj = com.getObjectFromId(nodeObj.id);
          return [ nodeObj.nodeId, obj ];
        }
      ) ?? []
    );

  
  const [ missionPriorities, setMissionPriorities ] = useMissionPriorities();

  const relicTypePriorities = com.getRelicTypePriorities();

  const calcRelicType = (modifier) => 
    modifier === "VoidT1" ?
      "Lith"
    : modifier === "VoidT2" ?
      "Meso"
    : modifier === "VoidT3" ?
      "Neo"
    : modifier === "VoidT4" ?
      "Axi"
    : modifier === "VoidT5" ?
      "Requiem"
    : null;

  //TODO check for status not for null or absence of properties
  
  return (
      worldState == null || worldState?.error != null ? null:
      <Collapsible 
        className='sized-content v-flex flex-center void-fissures-collapsible' 
        title={<span style={{ fontWeight: 'bold', fontSize: 'large' }}>Available Void Fissures</span>}
      >
          <SelectorComponent
            options={{
              "Relic Type": { value: "relicType", defaultOption: true },
              "Mission Type Preference":     { value: "preference" }
            }}
            onConfirm={([ text, entry ]) => setSortBy(entry.value)}
          />
          <div 
            className='sized-content h-flex flex-center'
            style={{
              flexWrap: 'wrap',
              padding: '10px',
              gap: '10px'
            }}
          >
            {
              worldState
                ?.toSorted?.((a,b) => { 
                  const missionA = fissureMissionCache[a.Node];
                  const missionB = fissureMissionCache[b.Node];

                  const relicTypeA = calcRelicType(a.Modifier);
                  const relicTypeB = calcRelicType(b.Modifier);

                  // console.log(`adasd `, sortBy, missionA.type, missionPriorities[missionA.type], missionB.type, missionPriorities[missionB.type]);

                  return (
                    (
                    sortBy === "preference" ? 
                      (
                        (missionPriorities[missionA.type] ?? Infinity) 
                        - 
                        (missionPriorities[missionB.type] ?? Infinity) 
                      )
                    :
                      (
                        (relicTypePriorities[relicTypeA] ?? Infinity) 
                        - 
                        (relicTypePriorities[relicTypeB] ?? Infinity) 
                      )
                    )
                    ||
                    (a.Hard != null ? 1 : -1)
                    -
                    (b.Hard != null ? 1 : -1)
                  ); 
                })
                .map((fissure, index) => { 
                  const nodeObj = com.getAPINodeObj(fissure.Node); 
                  const mission = com.getObjectFromId(nodeObj.id);

                  if(mission == null){ console.warn(`mission is null!`, nodeObj.id); return null; }
                  const expireTime = com.accessDateAPI(fissure.Expiry);
                  const expireTimeUntil = expireTime - Date.now();

                  const relicType = calcRelicType(fissure.Modifier);

                  return (
                    <div 
                      key={`${index}-${fissure.Node}-${mission.type}`}
                      className='sized-content v-flex flex-center' 
                      style={{
                        borderRadius: '10px',
                        padding: '10px',
                        backgroundColor: 'var(--color-tertiary)',
                        width: '250px',
                        textAlign: 'center',
                        justifyContent: 'flex-start',
                        alignSelf: 'stretch',
                        gap: '5px'
                      }}
                    >
                      <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
                        {
                          relicType != null ?
                            <img className='sized-content v-flex flex-center' style={{ width: '100px', height: '100px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/${relicType}.png`}/>
                          :
                            <div className='sized-content v-flex flex-center' style={{ width: '100px', height: '100px', objectFit: 'contain' }}><img className='sized-content v-flex flex-center icon-default-filter omnia-fissure' style={{ width: '60px', height: '60px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/icons/question.svg`}/></div>
                        }
                        <img className='sized-content v-flex flex-center' style={{ width: '50px', height: '50px', objectFit: 'contain' }} src={com.getObjectIcon(mission)}/>
                      </div>
                      <div className='sized-content v-flex flex-center'>
                        <span className='sized-content v-flex flex-center' style={{ fontStyle: 'italic' }}>{relicType ?? "Omnia"}</span>
                        <span className='sized-content v-flex flex-center' style={{ fontWeight: 'bold' }}>{mission.type}{ fissure.Hard == null ? null: <> (Steel Path)</>}</span>
                        <span className='sized-content v-flex flex-center'>{nodeObj.id}</span>
                        <span className='sized-content v-flex flex-center' style={{ whiteSpace: 'pre' }}>Expires in {com.getTimestampAsDurationString(expireTimeUntil, true)}</span>
                      </div>
                    </div>
                  )
                })
            }
          </div>
      </Collapsible>
  );
}

function PrimeResurgenceComponent(){
  const resurgenceDates = com.getResurgenceDates();
  const nowTime = new Date().getTime();

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  return (
    <Collapsible 
      className='sized-content v-flex flex-center void-fissures-collapsible' 
      title={<span style={{ fontWeight: 'bold', fontSize: 'large' }}>Prime Resurgence</span>}
    >
      <div className='sized-content v-flex' style={{ gap:'40px' }}>
        <div className='sized-content v-flex flex-center' style={{ gap:'10px' }}>
          <span className='sized-content h-flex flex-center' style={{ fontSize: 'large', fontWeight: 'bold' }}>Time Remaining</span>
          <div className='sized-content v-flex flex-center'>
            {
              resurgenceDates.map((resurgenceDate, i) => (
                <div key={`${i}-${resurgenceDate}`} className='sized-content h-flex' style={{ gap: '50px' }}>
                  <span 
                    style={{ 
                      fontWeight: 'bold', 
                      width: '300px'
                    }}
                  >
                    {resurgenceDate.subjects}
                  </span>
                  <span 
                    style={{ 
                      fontWeight: 'normal', 
                      color: (
                        resurgenceDate.expiryDate - new Date().getTime() < 86400*1000*5 ? 
                          'red' : 
                        resurgenceDate.expiryDate - new Date().getTime() < 86400*1000*10 ? 
                          'yellow' :
                          'rgb(0, 180, 0)'
                      ) 
                    }}
                  >
                    {`${com.getTimestampAsDurationString(resurgenceDate.expiryDate - new Date().getTime())} remaining (${com.formatYYYYMMDD(new Date(resurgenceDate.expiryDate))})`}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
        <div className='sized-content h-flex flex-center' style={{ gap:'10px', flexWrap: 'wrap' }}>
          {
            Object.entries(com.getAllItems())
              .filter(([ itemId, item ]) => com.isItemResurgence(itemId))
              .toSorted(([ a, _ ], [ b, __ ]) => 
                com.objectIsFarmedPerc(com.getObjectFromId(a)) - com.objectIsFarmedPerc(com.getObjectFromId(b))
              )
              .map(([ itemId, item ], index) => {
                const farmedPerc = com.objectIsFarmedPerc(com.getObjectFromId(itemId), obtainedComponents);
                return (
                  <ItemComponent key={`${itemId}-${index}`}  itemId={itemId} farmedPerc={farmedPerc} sharedTrackList={null}/>
                )
              })
          }
        </div>
      </div>
    </Collapsible>
  )
}

export function ItemComponent({ itemId, farmedPerc, sharedTrackList }) {
  return (
    <Link href={com.getObjectRouteFromId(itemId)} 
      className={`sized-content item-check-parent tracked-items-button v-flex flex-center${farmedPerc <= 0 ? `` : farmedPerc >= 1 ? ` object-farmed-main-page` : ` object-farmed-partial-main-page`}`}
      style={{ 
        position: 'relative', 
        cursor: 'pointer',
        alignSelf: 'stretch',
        minWidth: '150px' 
      }}
    >
      <img className='sized-content tracked-items-icon h-flex' style={{ minWidth: 'fit-content', height: '90px' }} src={com.getObjectIcon(com.getObjectFromId(itemId))}/>
      <div className='sized-content h-flex flex-center' style={{ minWidth: 'fit-content', textAlign: 'center' }}>{itemId}</div>
      { (() => { 
        const trackedObject = com.getObjectFromId(itemId); 
        if(trackedObject == null) return null;

        if(trackedObject.category === "items" || trackedObject.category === "components") return (
          <ObjectStateLabel object={trackedObject} />
        ); 

        return null; 
      })() }
      { sharedTrackList != null ? null: <ItemActionButton itemId={itemId} positionAbsolute={true}/> }
      <ObtainedResurgenceGroup itemId={itemId} positionAbsolute={true}/>
      <DucatLabel rawObj={com.getObjectFromId(itemId)}/>
    </Link>
  );
}

export function TrackedItemsComponent(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ _trackedItems, setTrackedItems ] = useTrackedItems();
  const [ trackLists, setTrackLists ] = useTrackLists();

  
  const sharedTrackList = searchParams.get("sharedTrackList") ? com.decodeFromBase64(searchParams.get("sharedTrackList")) : null;

  const trackedItems = sharedTrackList ? sharedTrackList.trackedItems : _trackedItems;

  const noTrackedItems = Object.entries(trackedItems ?? {}).filter(([ itemId, trackedItem ]) => trackedItem.tracked ?? false).length <= 0;

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  return (
      <div className='sized-content tracked-items v-flex flex-center' style={{ gap: '50px' }}>
        {
          (Object.keys(trackLists).length <= 1 && com.isDictEmpty(com.filterDict(trackedItems, entry => entry[1].tracked == true))) ? null:
            <div>
              <TrackListSelector/>
            </div>
        }
        {
          !noTrackedItems && trackedItems ? 
            <>
              <div className='sized-content tracked-items h-flex flex-center' style={{ gap: '10px' }}>
                <div 
                  className='sized-content h-flex flex-center' 
                  style={{ 
                    overflow: 'auto', 
                    maxWidth: '75vw', 
                    gap: '10px',
                    flexWrap: 'wrap' 
                  }}
                >
                  {
                      Object.entries(trackedItems)
                        .filter(([ itemId, trackedItem ]) => trackedItem.tracked ?? false)
                        .sort(([ a, _ ], [ b, __ ]) => 
                          com.objectIsFarmedPerc(com.getObjectFromId(a)) - com.objectIsFarmedPerc(com.getObjectFromId(b))
                        )
                        .map(([ itemId, trackedItem ], index) => { const farmedPerc = com.objectIsFarmedPerc(com.getObjectFromId(itemId), obtainedComponents); return (
                          <ItemComponent key={`${itemId}-${index}`}  itemId={itemId} farmedPerc={farmedPerc} sharedTrackList={sharedTrackList}/>
                        )})
                  }  
                </div>
              </div>
            </>
          :null
        }
        { noTrackedItems ? 
            <div className='sized-content v-flex' style={{ gap: '10px', fontSize: 'small', fontStyle: 'italic', whiteSpace: 'pre' }}>
              <div className='sized-content h-flex flex-center'>
                  <div 
                    className='sized-content tracked-items-button v-flex flex-center'
                    style={{ fontStyle: 'normal', cursor: 'pointer' }}
                    onClick={() => router.push("/prime/explorer")}
                  >
                    +
                  </div>
                </div>
              <div className='sized-content v-flex' style={{ textWrap: 'wrap', flexWrap: 'wrap' }}>
                <div>You&apos;re not tracking any items. Add some by using the Search Bar or from the <Link href='/prime/explorer' style={{ cursor: 'pointer', color:'var(--color-link-text)' }}>Explorer</Link> page, or by selecting a Track List (if you saved any).</div>
                <div className='sized-content h-flex flex-center'>Track items using the star<img className='sized-content star-button-icon h-flex flex-center' style={{ height: '12px',  }} src={`${com.getBaseEnvPath().basePath}/icons/star_hollow.svg`}/>button.</div>
              </div>
            </div> 
          : 
            null 
        }

        <VoidFissuresComponent/>

        <PrimeResurgenceComponent/>

        {
          // progress string
          Object.entries(trackedItems).filter(([ _, tracked ]) => tracked.tracked).length <= 0 ? null:
            <span 
              className="sized-content h-flex flex-center" 
              style={{ 
                whiteSpace: 'pre',
                fontSize: 'large',
              }}
            >
              You&apos;ve farmed {
                (() => {
                  const farmed = Object.entries(trackedItems)
                    .filter(([ _, tracked ]) => tracked?.tracked)
                    .reduce((acc, [ trackedItem, _ ]) => {
                      const obj = com.getObjectFromId(trackedItem);
                
                      if(obj.category === "items") acc += com.getItemComponentIds(obj.id).reduce((acc, componentId) => acc + com.getUserDataComponentObtainedValue(componentId), 0);
                      else if(obj.category === "components") acc += com.componentIsFarmed(obj);
                      
                      return acc;
                    }, 0);

                  const total = Object.entries(trackedItems)
                    .filter(([ _, tracked ]) => tracked?.tracked)
                    .reduce((acc, [ trackedItem, _ ]) => {
                      const obj = com.getObjectFromId(trackedItem);
                
                      if(obj.category === "items") acc += com.getItemComponents(obj.id).reduce((acc, component) => acc + component.required, 0);
                      else if(obj.category === "components") acc += 1;
                      
                      return acc;
                    }, 0)

                    const perc = farmed/total * 100.0
                  return <><span className="sized-content h-flex home-farm-mode-progress-text">{farmed} / {total}</span> components (<span className="sized-content h-flex home-farm-mode-progress-text">{perc.toFixed(0)}%</span>, missing <span className="sized-content h-flex home-farm-mode-progress-text">{total-farmed}</span> components)</>
                })()
              }
            </span>
        }

        {
          !noTrackedItems ? (
            <FarmingSheet 
              trackedItems={
                Object.entries(trackedItems)
                  .filter(([ trackedId, trackedItem ]) => trackedItem.tracked == true)
                  .map(([ trackedId, trackedItem ]) => trackedId)
              }
            />
          )
          :null
        }
      </div>
  );
}

export default function HomeFarmMode() {
  const router = useRouter();
  const [ trackedItems, setTrackedItems ] = useTrackedItems();
  const noTrackedItems = Object.entries(trackedItems ?? {}).filter(([ itemId, trackedItem ]) => trackedItem.tracked ?? false).length <= 0;
  
  // useEffect(() => {
  //   document.title = com.generatePageTitle("Home");
  // }, []);

  return (
    <div className='sized-remaining v-flex' style={{ justifyContent: 'center', gap: '0px' }}>
      {
        !noTrackedItems ? null :
        <div className='sized-content h-flex flex-center' style={{ padding: '10px' }}>
          <img className='sized-content h-flex flex-center' style={{ width: '400px' }} src={`${com.getBaseEnvPath().basePath}/icons/logo_prime.svg`}/>
        </div>
      }
      <div className='sized-remaining v-flex flex-center' style={{ gap: '20px' }}>
        <div style={{ fontWeight: 'bold' }}>Tracked Items</div>
        <TrackedItemsComponent/>
      </div>
    </div>
  );
}
