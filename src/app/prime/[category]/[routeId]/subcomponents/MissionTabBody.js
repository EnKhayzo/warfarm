'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';
import RelicTabCard from './RelicTabCard';
import useMissionPriorities from '@/hooks/useMissionPriorities';
import { ScrollPaneContext } from '@/contexts/ScrollPaneContext';



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

export default function MissionTabBody({ groupBy, hideFarmed, objectIds, rarityPriorities=null }){
    const router = useRouter();

  if(!rarityPriorities) rarityPriorities = com.getRarityPriorities();

  const [ missionPriorities, setMissionPriorities ] = useMissionPriorities();
  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
  const componentsRelicsMerged = objectIds.reduce((acc, trackedItemId) => {
    if(!acc.components) acc.components = [];
    if(!acc.missions) acc.missions = [];

    const trackedItem = com.getObjectFromId(trackedItemId);
    if(trackedItem == null){ console.warn(`trackedItem is null!`, trackedItemId); return acc; }

    if(trackedItem.category === "items"){
      const components = com.getSearchResultRelatedObjects(null, "Items", null, "components", trackedItem, { router: router })
                          .filter(componentInfo => !hideFarmed || !com.componentIsFarmed(componentInfo.rawObj, obtainedComponents));
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
                          .filter(componentInfo => !hideFarmed || !com.componentIsFarmed(componentInfo.rawObj, obtainedComponents));
      
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

  const rotationPriorities = com.getRotationPriorities();
  const relicMinRotation = (relic) => {
    return Math.min(...
      relic.rotations.map(rotation => rotationPriorities[rotation.rotation])
    );
  };

  const relicTypePriorities = com.getRelicTypePriorities();

  
  const mainScrollableRef = useContext(ScrollPaneContext).mainScrollableRef;
  const [ missionsToLoad, setMissionsToLoad ] = useState(5);
  const scrollListener = (ev) => {
    const scrollValue = ev.target.scrollTop+ev.target.getBoundingClientRect().height;
    const scrollLimit = ev.target.scrollHeight;
    const scrollPerc = scrollValue/scrollLimit;

    if(scrollPerc > .9){
        setMissionsToLoad(missionsToLoad+5);
    }
  }

  useEffect(() => {
    // console.log(`main scrollable!`, mainScrollableRef);
    mainScrollableRef.current.addEventListener('scroll', scrollListener);

    return () => {
        mainScrollableRef.current.removeEventListener('scroll', scrollListener);
    }
  }, [missionsToLoad])

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
              // .slice(0, 5)
              .slice(0, missionsToLoad)
              .map(([ missionId, missionGroup ], index) => (
                <div
                    key={`${index}-${missionGroup.infoObj.name}`} 
                    // onClick={() => router.push(missionGroup.infoObj.route)}
                    className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center`}
                    style={{
                      // cursor: 'pointer',
                      gap: '5px',
                      opacity: missionGroup.infoObj.vaulted ? '50%' : '100%',
                      alignSelf: 'stretch',
                      justifyContent: 'flex-start',
                      width: groupBy === "component" ? '350px' : '410px'
                    }}
                >
                    <Link  href={missionGroup.infoObj.route} className='sized-content mission-relic-component v-flex flex-center'>
                      <div className='sized-content h-flex flex-center' ><img style={{ height: '75px' }} src={missionGroup.infoObj.icon}/></div>
                      <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', fontWeight: 'bold' }}>{missionGroup.infoObj.rawObj.mission.type}</div>
                      <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{missionGroup.infoObj.id}</div>
                    </Link>
                    <div className='sized-content mission-relic-component v-flex flex-center' style={{ gap: '1px' }}>
                      <div className='sized-content v-flex' style={{ gap: '5px', marginTop: '5px' }}>
                          {
                              groupBy === "component" ?
                                components
                                    .filter(component => Object.entries(missionGroup.relics)
                                        .find(([ relicName, relic ]) => com.getRelicRewards(relic.relic)
                                            .findIndex(reward => reward.rewardFullName.localeCompare(component.rawObj.id) == 0) > -1
                                        )
                                    )
                                    .toSorted((a, b) => rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                                    .map((component,index) => (
                                        <Link href={component.route}
                                            key={`${component.id}-${index}`}
                                            className='sized-content h-flex flex-center'
                                            // onClick={ev => { ev.stopPropagation(); router.push(component.route); }}
                                            style={{
                                                borderRadius: '10px',
                                                backgroundColor: 'var(--color-quaternary)',
                                                gap: '10px',
                                                padding: '10px'
                                            }}
                                        >
                                            <div className={`sized-content v-flex flex-center`} style={{ minWidth: '70px' }}>
                                                <img className='sized-content h-flex flex-center' style={{ height: '15px' }} src={component.icon}/>
                                                <span 
                                                  className='sized-content h-flex flex-center' 
                                                  style={{ 
                                                    textAlign: 'center', 
                                                    fontSize: 'small',
                                                    color: !hideFarmed && com.objectIsFarmed(component.rawObj) ? 'var(--color-text-farmed)' : 'inherit' 
                                                  }}
                                                >
                                                  {component.rawObj.fullName}
                                                </span>
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
                                                        // .toSorted((relicEntryA, relicEntryB) =>{ console.warn(`entries SORT!`, relicEntryA, relicEntryB); return ( 
                                                        //   rarityPriorities[relicEntryB[1].rarity]
                                                        //   -
                                                        //   rarityPriorities[relicEntryA[1].rarity]
                                                        // )})
                                                        .map(([ relicName, relic ], index) => (
                                                            <Link href={com.getObjectRouteFromId(relic.relic.id)} 
                                                                key={`${relic.name}-${index}`} 
                                                                // onClick={(ev) => { ev.stopPropagation(); router.push(com.getObjectPathNameFromIdObj(relic.relic, "Relics"))}}
                                                                className={`sized-content h-flex flex-center object-page-mission-relic${` ${com.getComponentRarityInRelationToRelic(component.rawObj, relic.relic)}` ?? ''}`} 
                                                                style={{ gap: '5px', minWidth: '200px' }}
                                                            >
                                                                <div className='sized-content h-flex flex-center' ><img style={{ height: '30px' }} src={`${com.getBaseEnvPath().basePath}/images/${relic.relic.tier}.png`}/></div>
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
                                                            </Link>
                                                    ))
                                                }
                                            </div>
                                        </Link>
                                ))
                              : 
                              groupBy === "relic" ?
                                Object.entries(missionGroup.relics)
                                  .filter(([ relicId, relic ]) => 
                                    !components
                                      .filter(component => com.relicDropsComponent(relic.relic, component.rawObj))
                                      .every(component => hideFarmed && com.objectIsFarmed(component))
                                  )
                                  .toSorted(([ _, a ], [ __, b ]) => relicMinRotation(a) - relicMinRotation(b))
                                  .map(([ relicId, relic ], index) => (
                                    <div
                                      key={`${index}-${relicId}`}
                                      className='sized-content h-flex flex-center'
                                      style={{
                                        justifyContent: 'flex-start',
                                        alignSelf: 'stretch'
                                      }}
                                    >
                                      <div 
                                        className='sized-content h-flex flex-center'
                                        style={{
                                          backgroundColor: !hideFarmed && components
                                                            .filter(component => 
                                                              com.relicDropsComponent(relic.relic, component.rawObj)
                                                            ).every(component => com.objectIsFarmed(component.rawObj))
                                                            ? 'var(--color-quaternary-farmed)' : 'var(--color-quaternary)',
                                          borderRadius: '10px',
                                          padding: '10px',
                                          gap: '10px',
                                          alignSelf: 'stretch'
                                        }}
                                      >
                                        <Link href={com.getObjectRouteFromId(relic.relic.id)} 
                                            // onClick={(ev) => { ev.stopPropagation(); router.push(com.getObjectRouteFromId(relic.relic.id)); }}
                                            className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center`}
                                            style={{
                                                gap: '5px',
                                                opacity: relic.relic.vaulted ? '50%' : '100%',
                                                width: '75px',
                                                height: '75px'
                                            }}
                                        >
                                            <div className='sized-content h-flex flex-center' style={{ width: '35px', height: '35px' }}><img src={com.getObjectIcon(relic.relic)}/></div>
                                            <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                                <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{relic.relic.name}</div>
                                            </div>
                                        </Link>
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
                                        <div 
                                          className='sized-content v-flex flex-center'
                                          style={{
                                            gap: '5px'
                                          }}
                                        >
                                          {
                                            components
                                              .filter(component => com.relicDropsComponent(relic.relic, component.rawObj))
                                              .toSorted((a, b) => 
                                                rarityPriorities[com.getComponentRarityInRelationToRelic(a.rawObj, relic.relic)]
                                                -
                                                rarityPriorities[com.getComponentRarityInRelationToRelic(b.rawObj, relic.relic)]
                                              )
                                              .map(component => (
                                                <Link href={component.route}
                                                    key={`${index}-${component.rawObj.id}`} 
                                                    // onClick={() => router.push(component.route)}
                                                    className={`sized-content item-page-component-container tracker-item-parent h-flex flex-center${` ${com.getComponentRarityInRelationToRelic(component.rawObj, relic.relic)}` ?? ''}`}
                                                    style={{
                                                      width: '210px',
                                                      gap: '5px',
                                                      opacity: component.vaulted ? '50%' : '100%',
                                                      color: !hideFarmed && com.objectIsFarmed(component.rawObj) ? 'var(--color-text-farmed)' : 'inherit'
                                                    }}
                                                >
                                                    <div className='sized-content h-flex flex-center'><img style={{ height: '25px' }} src={component.icon}/></div>
                                                    <div className='sized-content h-flex flex-center' style={{ gap: '1px' }}>
                                                        <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', paddingRight: '5px' }}>{component.rawObj.fullName}</div>
                                                    </div>
                                                </Link>
                                              ))
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  ))
                              :null
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