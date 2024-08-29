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
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image'

import * as com from "../common.js"
import LazyLoaded from '@/components/LazyLoaded.js';
import TrackItemButton from '@/components/TrackItemButton.js';
import useTrackedItems from '@/hooks/useTrackedItems.js'
import ObtainedLabelObject from '@/components/ObtainedLabelObject.js';
import FallbackObject from './[category]/[routeId]/FallbackObject.js';
import useMissionPriorities from '@/hooks/useMissionPriorities.js';
import TabComponent from '@/components/TabComponent.js';
import useObtainedComponents from '@/hooks/useObtainedComponents.js';
import ComponentAddButton from './[category]/[routeId]/subcomponents/ComponentAddButton.js';
import ObtainedItemCheck from '@/components/ObtainedItemCheck.js';

const ComponentTab = ({trackedItems}) => {
  const router = useRouter();

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  const componentsRelicsMerged = com.getComponentsRelicsMerged(trackedItems, router);

  const components = componentsRelicsMerged.components
    .filter(component => !com.componentIsFarmed(component.rawObj, obtainedComponents));
  const relics = componentsRelicsMerged.relics;

  const rarityPriorities = com.getRarityPriorities();
  const relicTypePriorities = com.getRelicTypePriorities();

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
          .reduce((acc, component) => {
            if(component.rawObj.parentItem == null) { 
              acc[component.rawObj.id] = { 
                item: { category: "Components", componentFullName: component.rawObj.fullName, name: component.rawObj.fullName }, 
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
              className='sized-content v-flex flex-center'
              style={{
                borderRadius: '10px',
                backgroundColor: 'var(--color-secondary)',
                padding: '10px',
                gap: '5px',
                alignSelf: 'stretch',
                justifyContent: 'flex-start'
              }}
            >
              <div 
                className='sized-content v-flex flex-center'
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => router.push(com.getObjectPathNameFromIdObj(itemGroup.item))}
              >
                {/* <Image width={0} height={0} sizes="100vw" style={{ height: '50px' }} src={com.getObjectIcon(itemGroup.item)}/> */}
                <img style={{ height: '50px' }} src={com.getObjectIcon(itemGroup.item)}/>
                <div>{itemGroup.item.name}</div>
              </div>
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
                            backgroundColor: 'var(--color-quaternary)',
                            alignSelf: 'stretch',
                            justifyContent: 'flex-start'
                        }}
                    >   
                        <div className='sized-content v-flex flex-center'>
                            <ComponentAddButton width={'70px'} iconHeight={'45px'} component={component}/>
                        </div>
                        <div 
                          className='sized-content h-flex flex-center' 
                          style={{ 
                            maxWidth: '500px',
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
                                      (rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                                      ||
                                      (relicTypePriorities[a.rawObj.relic.tier]-relicTypePriorities[b.rawObj.relic.tier])
                                      ||
                                      (a.rawObj.relic.name.localeCompare(b.rawObj.relic.name))
                                  )
                                  .map(relic => (
                                      <button 
                                          key={`${index}-${relic.rawObj.relic.name}`} 
                                          onClick={() => router.push(relic.route)}
                                          className={`sized-content item-page-component-container tracker-item-parent h-flex flex-center${` ${relic.rarity}` ?? ''}`}
                                          style={{
                                            width: '110px',
                                            gap: '5px',
                                            opacity: relic.vaulted ? '50%' : '100%'
                                          }}
                                      >
                                          <div className='sized-content h-flex flex-center'><img style={{ height: '25px' }} src={relic.icon}/></div>
                                          <div className='sized-content h-flex flex-center' style={{ gap: '1px' }}>
                                              <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', paddingRight: '5px' }}>{relic.label}</div>
                                          </div>
                                      </button>
                                  ))
                            }
                        </div>
                    </div>
                  )) 
                }
              </div>
            </div>
          ))
      }
    </div>
  );
}

function RelicTab({trackedItems}){
  const router = useRouter();
  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  const rarityPriorities = com.getRarityPriorities();
  const relicTypePriorities = com.getRelicTypePriorities();

  const componentsRelicsMerged = com.getComponentsRelicsMerged(trackedItems, router);

  const components = componentsRelicsMerged.components
    .filter(component => !com.componentIsFarmed(component.rawObj, obtainedComponents));

  const relics = com.duplicatesRemoved(
    componentsRelicsMerged.relics
      .filter(relic => !com.getRelicRewards(relic.rawObj.relic)
        .filter(reward => components
            .map(component => component.rawObj.id)
            .includes(reward.rewardFullName)
        )
        .every(reward => { 
          const obj = com.getObjectFromId(reward.rewardFullName); 
          if(obj == null) return true;

          return com.componentIsFarmed(obj);
        })
      ),
      relic => relic.rawObj.relic.name
    )
    .toSorted((relicA, relicB) => 
      (relicA.vaulted-relicB.vaulted)
      ||
      (relicTypePriorities[relicA.rawObj.relic.tier]-relicTypePriorities[relicB.rawObj.relic.tier])
      ||
      (relicA.rawObj.relic.name.localeCompare(relicB.rawObj.relic.name))
    );

  const relicComponentScore = (relic) => {
    return components
      .filter(component => com.relicDropsComponent(relic.rawObj.relic, component.rawObj)).length
  };

  const relicComponentRarityScore = (relic) => {
    return Math.max(
      ...components
        .filter(component => com.relicDropsComponent(relic.rawObj.relic, component.rawObj))
        .map(component => rarityPriorities[component.rarity])
    )
  };

  return (
    <div
      className='sized-content component-page-relative-info-container h-flex flex-center'
      style={{ 
        maxWidth: '75vw', 
        flexWrap: 'wrap'
      }}
    >
      {
        relics
          .toSorted((a, b) => 
            (a.vaulted-b.vaulted)
            ||
            (relicComponentScore(b)-relicComponentScore(a))
            ||
            (relicComponentRarityScore(a)-relicComponentRarityScore(b))
            ||
            (relicTypePriorities[a.rawObj.relic.tier]-relicTypePriorities[b.rawObj.relic.tier])
            ||
            (a.rawObj.relic.name.localeCompare(b.rawObj.relic.name))
          )
          .map((relic,index) => (
          <div 
            key={`${index}-${relic.name}`} 
            className='sized-content h-flex flex-center'
            style={{
              backgroundColor: 'var(--color-secondary)',
              borderRadius: '10px',
              padding: '10px',
              gap: '10px',
              alignSelf: 'stretch'
            }}
          >
            <button 
                onClick={() => router.push(relic.route)}
                className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center`}
                style={{
                    gap: '5px',
                    opacity: relic.vaulted ? '50%' : '100%'
                }}
            >
                <div className='sized-content h-flex flex-center' style={{ width: '75px', height: '75px' }}><img src={relic.icon}/></div>
                <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                    <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{relic.rawObj.relic.name}</div>
                </div>
            </button>
            <div 
              className='sized-content v-flex flex-center'
              style={{
                gap: '5px'
              }}
            >
              {
                components
                  .filter(component => com.relicDropsComponent(relic.rawObj.relic, component.rawObj))
                  .toSorted((a, b) => 
                    rarityPriorities[com.getComponentRarityInRelationToRelic(a.rawObj, relic.rawObj.relic)]
                    -
                    rarityPriorities[com.getComponentRarityInRelationToRelic(b.rawObj, relic.rawObj.relic)]
                  )
                  .map(component => (
                    <button 
                        key={`${index}-${component.rawObj.id}`} 
                        onClick={() => router.push(component.route)}
                        className={`sized-content item-page-component-container tracker-item-parent h-flex flex-center${` ${com.getComponentRarityInRelationToRelic(component.rawObj, relic.rawObj.relic)}` ?? ''}`}
                        style={{
                          width: '210px',
                          gap: '5px',
                          opacity: component.vaulted ? '50%' : '100%'
                        }}
                    >
                        <div className='sized-content h-flex flex-center'><img style={{ height: '25px' }} src={component.icon}/></div>
                        <div className='sized-content h-flex flex-center' style={{ gap: '1px' }}>
                            <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', paddingRight: '5px' }}>{component.rawObj.fullName}</div>
                        </div>
                    </button>
                  ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}

function getMissionGroups(missions, rarityPriorities, missionTypesPriorities){

  return missions
    // .toSorted((a, b) => com.sortMissionFunc(a.rawObj.mission, b.rawObj.mission, a.rawObj.relic, b.rawObj.relic, missionTypesPriorities))
    // .toSorted((a, b) => customMissionSort(a.rawObj.mission, b.rawObj.mission, a.rawObj.relic, b.rawObj.relic, ))
    .reduce((acc, mission) => {
      if(!acc[mission.id]) 
        acc[mission.id] = {
          infoObj: mission,
          mission: mission.rawObj.mission,
          relics: {}
        };

      if(!acc[mission.id].relics[mission.rawObj.relic.name])
        acc[mission.id].relics[mission.rawObj.relic.name] = { 
          rarity: mission.rarity,
          rotations: mission.rawObj.rotations, 
          relic: mission.rawObj.relic 
        };

      return acc;
    }, {});
}

const MissionTab = ({trackedItems, rarityPriorities=null}) => {
  const router = useRouter();

  if(!rarityPriorities) rarityPriorities = com.getRarityPriorities();

  const [ missionPriorities, setMissionPriorities ] = useMissionPriorities();
  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
  const componentsRelicsMerged = trackedItems.reduce((acc, trackedItemId) => {
    if(!acc.components) acc.components = [];
    if(!acc.missions) acc.missions = [];

    const trackedItem = com.getObjectFromId(trackedItemId);

    if(trackedItem.category === "items"){
      const components = com.getSearchResultRelatedObjects(null, "Items", null, "components", trackedItem, { router: router })
                          .filter(componentInfo => !com.componentIsFarmed(componentInfo.rawObj, obtainedComponents));
      acc.components = com.duplicatesRemoved(
        acc.components.concat(components), 
        component => component.searchObjId
      );

      const missions = com.getSearchResultRelatedObjects(null, "Items", null, "missions", trackedItem, { router: router });
      acc.missions = com.duplicatesRemoved(
        acc.missions.concat(missions), 
        mission => mission.searchObjId
      );
    }
    else if(trackedItem.category === "components"){
      const parentItem = com.getObjectFromId(trackedItem.parentItem);
      const components = [ com.getSearchResultRelatedObjectsSingle("Items", "components", { item: parentItem, component: trackedItem }, router) ]
                          .filter(componentInfo => !com.componentIsFarmed(componentInfo.rawObj, obtainedComponents));
      acc.components = com.duplicatesRemoved(
        acc.components.concat(components), 
        component => component.searchObjId
      );
    
      const missions = com.getSearchResultRelatedObjects(null, "Components", null, "missions", trackedItem, { router: router });
      acc.missions = com.duplicatesRemoved(
        acc.missions.concat(missions), 
        mission => mission.searchObjId
      );
    }
    
    return acc;
  }, {});

  const missionsComponents = componentsRelicsMerged;

  const components = missionsComponents.components;

  const missionGroups = getMissionGroups(missionsComponents.missions, rarityPriorities, missionPriorities);

  
  const relicNumberScore = (missionId) => 
    missionsComponents.missions.filter(mission => mission.id === missionId).length;
    // missionsComponents.missions
    //   .filter(mission => mission.id === missionId)
    //   .reduce((acc, mission) => {
    //     acc += (mission.rawObj.rotations || []).length;
    //     return acc;
    //   }, 0);

  const relicAvgProbabilityScore = (missionId) => 
    missionsComponents.missions
      .filter(mission => mission.id === missionId)
      .reduce((acc, mission) => {
        mission.rawObj.rotations.forEach(rotation => 
          acc.push(Number(rotation.perc.replaceAll("%", "").trim()))
        );
        
        return acc;
      }, [])
      .reduce((acc, composite, index, array) => {
        acc += Number(composite)
        if(index == array.length-1) acc /= array.length;
      }, 0);

  const relicMaxProbabilityScore = (missionId) => 
    Math.max(
      ...missionsComponents.missions
        .filter(mission => mission.id === missionId)
        .map(mission => mission.rawObj.rotations.map(rotation => Number(rotation.perc.replace("%", "").trim())))
        .flat(1)
    )

  const customMissionSort = (idA, idB, missionGroupInfoA, missionGroupInfoB) => (
      (relicMaxProbabilityScore(idB)-relicMaxProbabilityScore(idA))
      ||
      (relicNumberScore(idB)-relicNumberScore(idA))
      ||
      (
        (missionPriorities[missionGroupInfoA.mission.type]+1 || Infinity) 
        -
        (missionPriorities[missionGroupInfoB.mission.type]+1 || Infinity) 
      )
      
  );

  const relicTypePriorities = com.getRelicTypePriorities();

  return (
    <div 
      className='sized-content component-page-relative-info-container v-flex flex-center'
      style={{ maxWidth: '75vw' }}
    >
      {
        <div
          className='sized-content component-page-relative-info-container h-flex flex-center'
          style={{ 
            maxWidth: '75vw', 
            flexWrap: 'wrap' 
          }}
        >
          { 
            Object.entries(missionGroups)
              .toSorted(([ idA, missionA ], [ idB, missionB ]) => customMissionSort(idA, idB, missionA, missionB))
              .map(([missionId, missionGroup], index) => (
                <div 
                    key={`${index}-${missionGroup.infoObj.name}`} 
                    onClick={() => router.push(missionGroup.infoObj.route)}
                    className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center`}
                    style={{
                      cursor: 'pointer',
                      gap: '5px',
                      opacity: missionGroup.infoObj.vaulted ? '50%' : '100%',
                      alignSelf: 'stretch',
                      justifyContent: 'flex-start',
                      width: '350px'
                    }}
                >
                    <div className='sized-content h-flex flex-center' ><img style={{ height: '75px' }} src={missionGroup.infoObj.icon}/></div>
                    <div className='sized-content mission-relic-component v-flex flex-center' style={{ gap: '1px' }}>
                      <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', fontWeight: 'bold' }}>{missionGroup.infoObj.rawObj.mission.type}</div>
                      <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{missionGroup.infoObj.id}</div>
                      <div className='sized-content v-flex' style={{ gap: '5px', marginTop: '5px' }}>
                          {
                              components
                                  .filter(component => Object.entries(missionGroup.relics)
                                      .find(([ relicName, relic ]) => com.getRelicRewards(relic.relic)
                                          .findIndex(reward => reward.rewardFullName.localeCompare(component.rawObj.id) == 0) > -1
                                      )
                                  )
                                  .toSorted((a, b) => rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                                  .map((component,index) => (
                                      <div
                                          key={`${component.id}-${index}`}
                                          className='sized-content h-flex flex-center'
                                          onClick={ev => { ev.stopPropagation(); router.push(component.route); }}
                                          style={{
                                              borderRadius: '10px',
                                              backgroundColor: 'var(--color-sextenary)',
                                              gap: '10px',
                                              padding: '5px'
                                          }}
                                      >
                                          <div className={`sized-content v-flex flex-center`} style={{ minWidth: '70px' }}>
                                              <img className='sized-content h-flex flex-center' style={{ height: '15px' }} src={component.icon}/>
                                              <span className='sized-content h-flex flex-center' style={{ textAlign: 'center', fontSize: 'small' }}>{component.rawObj.fullName}</span>
                                          </div>
                                          <div 
                                              className='sized-content v-flex flex-center'
                                              style={{
                                                  gap: '5px'
                                              }}
                                          >
                                              {
                                                  Object.entries(missionGroup.relics)
                                                      .filter(([ relicName, relic ]) => com.getRelicRewards(relic.relic)
                                                          .findIndex(reward => reward.rewardFullName.localeCompare(component.rawObj.id) == 0) > -1
                                                      )
                                                      // .filter(relicEntry => { console.log(`entry!`, relicEntry[1].rarity, relicEntry); return true})
                                                      // .toSorted((relicEntryA, relicEntryB) =>{ console.warn(`entries SORT!`, relicEntryA, relicEntryB); return ( 
                                                      //   rarityPriorities[relicEntryB[1].rarity]
                                                      //   -
                                                      //   rarityPriorities[relicEntryA[1].rarity]
                                                      // )})
                                                      .map(([ relicName, relic ], index) => (
                                                          <button 
                                                              key={`${relic.name}-${index}`} 
                                                              onClick={(ev) => { ev.stopPropagation(); router.push(com.getObjectPathNameFromIdObj(relic.relic, "Relics"))}}
                                                              className={`sized-content h-flex flex-center object-page-mission-relic${` ${relic.rarity}` ?? ''}`} 
                                                              style={{ gap: '5px', minWidth: '200px' }}
                                                          >
                                                              <div className='sized-content h-flex flex-center' ><img style={{ height: '30px' }} src={`/warfarm/images/${relic.relic.tier}.png`}/></div>
                                                              <div className='sized-content h-flex flex-center' style={{ fontSize: 'small' }}>{relic.relic.name}</div>
                                                              <div className='sized-content v-flex flex-center' style={{ alignItems: 'flex-start', marginLeft: '5px' }}>
                                                                  {
                                                                      relic.rotations.map((rotation, index) => (
                                                                          <div 
                                                                              key={`${rotation.rotation}-${index}`} 
                                                                              className='sized-content h-flex flex-center' 
                                                                              style={{fontSize: 'small', whiteSpace: 'pre' }}
                                                                          >
                                                                              <span style={{ fontWeight: 'bold' }}>{rotation.rotation}</span> - <span style={{ fontStyle: 'italic' }}>{rotation.perc}</span>
                                                                          </div>
                                                                      ))
                                                                  }
                                                              </div>
                                                          </button>
                                                  ))
                                              }
                                          </div>
                                      </div>
                              ))
                          }
                      </div>
                    </div>
                </div>
            )) 
          }
        </div>
      }
    </div>
  );
}

function FarmingSheet({ trackedItems }){
  return (
    <div className='sized-component v-flex flex-center' style={{ gap: '10px' }}>
      <div className='sized-content h-flex' style={{ fontSize: 'large', fontWeight: 'bold' }}>Farming Sheet</div>
      <TabComponent
        defaultTab={"Components"}
        tabs={{
          "Components": <ComponentTab trackedItems={trackedItems}/>,
          "Relics": <RelicTab trackedItems={trackedItems}/>,
          "Missions": <MissionTab trackedItems={trackedItems}/>
        }}
      />
    </div>
  );
}

export function TrackedItemsComponent(){
  const router = useRouter();
  const [ trackedItems, setTrackedItems ] = useTrackedItems();

  const noTrackedItems = Object.entries(trackedItems ?? {}).filter(([ itemId, trackedItem ]) => trackedItem.tracked ?? false).length <= 0;

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  return (
      <div className='sized-content tracked-items v-flex flex-center' style={{ gap: '50px' }}>
        {
          !noTrackedItems && trackedItems ? <div className='sized-content tracked-items h-flex flex-center' style={{ gap: '10px' }}>
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
                      com.objectIsFarmed(com.getObjectFromId(a)) - com.objectIsFarmed(com.getObjectFromId(b))
                    )
                    .map(([ itemId, trackedItem ], index) => (
                      <div 
                        key={`${itemId}-${index}`} 
                        onClick={() => { 
                          router.push(com.getObjectPathNameFromIdObj(com.getObjectFromId(itemId))); 
                        }}
                        className={`sized-content tracked-items-button v-flex flex-center${com.objectIsFarmed(com.getObjectFromId(itemId), obtainedComponents) ? ` object-farmed-main-page` : ``}`}
                        style={{ 
                          position: 'relative', 
                          cursor: 'pointer',
                          alignSelf: 'stretch',
                          minWidth: '110px' 
                        }}
                      >
                        <img className='sized-content tracked-items-icon h-flex' style={{ minWidth: 'fit-content', height: '90px' }} src={com.getObjectIcon(com.getObjectFromId(itemId))}/>
                        <div className='sized-content h-flex flex-center' style={{ minWidth: 'fit-content', textAlign: 'center' }}>{itemId}</div>
                        { (() => { 
                          const trackedObject = com.getObjectFromId(itemId); 
                          if(trackedObject.category === "items" || trackedObject.category === "components") return (
                            <ObtainedLabelObject object={trackedObject} />
                          ); 

                          return null; 
                        })() }
                        <TrackItemButton itemId={itemId} positionAbsolute={true}/>
                        <ObtainedItemCheck itemId={itemId} positionAbsolute={true}/>
                      </div>
                    ))
              }  
            </div>
          </div>
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
              <div className='sized-content v-flex'>
                <div>You&apos;re not tracking any items. Add some by using the Search Bar or from the <a style={{ cursor: 'pointer' }} onClick={() => router.push('/prime/explorer')}>Explorer</a> page.</div>
                <div className='sized-content h-flex flex-center'>Track items using the star<img className='sized-content star-button-icon h-flex flex-center' style={{ height: '12px',  }} src="/warfarm/icons/star_hollow.svg"/>button.</div>
              </div>
            </div> 
          : 
            null 
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

export default function Home() {
  const router = useRouter();
  const [ trackedItems, setTrackedItems ] = useTrackedItems();
  const noTrackedItems = Object.entries(trackedItems ?? {}).filter(([ itemId, trackedItem ]) => trackedItem.tracked ?? false).length <= 0;

  return (
    <div className='sized-remaining v-flex' style={{ justifyContent: 'center', gap: '0px' }}>
      {
        !noTrackedItems ? null :
        <div className='sized-content h-flex flex-center' style={{ padding: '10px' }}>
          <img className='sized-content h-flex flex-center' style={{ width: '400px' }} src={`/warfarm/icons/logo_prime.svg`}/>
        </div>
      }
      <div className='sized-remaining v-flex flex-center' style={{ gap: '20px' }}>
        <div style={{ fontWeight: 'bold' }}>Tracked Items</div>
        <TrackedItemsComponent/>
      </div>
    </div>
  );
}
