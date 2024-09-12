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

import { React, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

import * as com from "../../../common.js";
import LazyLoaded from '@/components/LazyLoaded.js';
import MainItemTitleComponent from './subcomponents/MainItemTitleComponent.js';
import TabComponent from '@/components/TabComponent.js';
import FallbackObject from './FallbackObject.js';
import ComponentAddButtons from '@/components/ComponentAddButtons.js';
import useMissionPriorities from '@/hooks/useMissionPriorities.js';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon.js';

const RelicTab = ({component, rarityPriorities}) => {
  const router = useRouter();

  const relicTypePriorities = com.getRelicTypePriorities();
  const relics = com.getSearchResultRelatedObjects(null, "Components", null, "relics", component, { router: router });

  return (
    <div 
      className='sized-content component-page-relative-info-container v-flex flex-center'
      style={{ 
        maxWidth: '75vw'
      }}
    >
      {
        [  
          [ "Unvaulted Relics", relics.filter(relic => !relic.vaulted) ],
          [ "Vaulted Relics", relics.filter(relic => relic.vaulted) ]
        ].map(([ sectionName, relicSection ], index) => (
          <div
            key={`Section${sectionName}${index}`}
            className='sized-content component-page-relative-info-container v-flex flex-center'
            style={{ 
              display: relicSection.length <= 0 ? 'none' : '',
              maxWidth: '75vw', 
              gap: '20px' 
            }}
          >
            <div style={{ fontStyle: 'italic' }}>{sectionName}</div>
            <div
              className='sized-content component-page-relative-info-container h-flex flex-center'
              style={{ 
                maxWidth: '75vw', 
                flexWrap: 'wrap' 
              }}
            >
              { 
                relicSection
                  .toSorted((a, b) => 
                    (rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                    ||
                    (relicTypePriorities[a.rawObj.relic.tier]-relicTypePriorities[b.rawObj.relic.tier])
                    ||
                    (a.rawObj.relic.name.localeCompare(b.rawObj.relic.name))
                  )
                  .map((relic, index) => (
                    <Link href={relic.route}
                        key={`${index}-${relic.name}`} 
                        // onClick={() => router.push(relic.route)}
                        className={`sized-content item-page-component-container item-check-parent tracker-item-parent v-flex flex-center${` ${relic.rarity}` ?? ''}`}
                        style={{
                            gap: '5px',
                            opacity: relic.vaulted ? '50%' : '100%'
                        }}
                    >
                        <div className='sized-content h-flex flex-center' style={{ width: '75px', height: '75px' }}><img src={relic.icon}/></div>
                        <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                            <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{relic.labelHeading}</div>
                        </div>
                        <ResurgenceItemIcon itemId={relic.id}/>
                    </Link>
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
    .toSorted((a, b) => com.sortMissionFunc(a.rawObj.mission, b.rawObj.mission, a.rawObj.relic, b.rawObj.relic, missionTypesPriorities))
    .reduce((acc, mission) => {
      if(!acc[mission.id]) 
        acc[mission.id] = {
          infoObj: mission,
          mission: mission.rawObj.mission,
          relics: {}
        };

      if(!acc[mission.id].relics[mission.rawObj.relic.id])
        acc[mission.id].relics[mission.rawObj.relic.id] = { 
          rarity: mission.rarity,
          rotations: mission.rawObj.rotations, 
          relic: mission.rawObj.relic 
        };

      return acc;
    }, {});
}

const MissionTab = ({component, rarityPriorities}) => {
  const router = useRouter();

  const [ missionPriorities, setMissionPriorities ] = useMissionPriorities();

  const missions = com.getSearchResultRelatedObjects(null, "Components", null, "missions", component, { router: router });
  const missionGroups = getMissionGroups(missions, rarityPriorities, missionPriorities);
  
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
            flexWrap: 'wrap', 
          }}
        >
          { 
            Object.entries(missionGroups)
              .map(([missionId, missionGroup], index) => (
                <Link href={missionGroup.infoObj.route}
                    key={`${index}-${missionGroup.infoObj.name}`} 
                    className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center`}
                    style={{
                      cursor: 'pointer',
                      gap: '5px',
                      opacity: missionGroup.infoObj.vaulted ? '50%' : '100%',
                      alignSelf: 'stretch',
                      width: '200px',
                      justifyContent: 'flex-start'
                    }}
                >
                    <div className='sized-content h-flex flex-center' ><img style={{ height: '75px' }} src={missionGroup.infoObj.icon}/></div>
                    <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                      <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', fontWeight: 'bold' }}>{missionGroup.infoObj.labelHeading}</div>
                      <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{missionGroup.infoObj.label}</div>
                      <div className='sized-content v-flex' style={{ gap: '5px', marginTop: '5px' }}>
                        {
                          Object.entries(missionGroup.relics)
                            .toSorted(([_,a], [__,b]) => rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                            .map(([ relicName, relic ], index) => (
                            <Link href={com.getObjectRouteFromId(relic.relic.id)}
                              key={`${relic.name}-${index}`} 
                              className={`sized-content h-flex flex-center object-page-mission-relic${` ${relic.rarity}` ?? ''}`} 
                              style={{ gap: '5px' }}
                            >
                              <div className='sized-content h-flex flex-center' ><img style={{ height: '30px' }} src={`${com.getBaseEnvPath().basePath}/images/${relic.relic.tier}.png`}/></div>
                              <div className='sized-content h-flex flex-center' style={{ fontSize: 'small' }}>{relic.relic.name}</div>
                              <div className='sized-content v-flex flex-center' style={{ alignItems: 'flex-start', marginLeft: '5px' }}>
                                {
                                  relic.rotations.map((rotation, index) => (
                                    <div 
                                      key={`${rotation.rotation}-${index}`} 
                                      className='sized-content h-flex flex-center' 
                                      style={{ fontSize: 'small', whiteSpace: 'pre' }}
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
                    </div>
                </Link>
            )) 
          }
        </div>
      }
    </div>
  );
}

export default function ComponentPage({ routeId, pathObj }) {
  const router = useRouter();
  const [ activeTab, setActiveTab ] = useState("Relics");

  useEffect(() => {
    document.title = com.generatePageTitle(pathObj.id);
  }, []);

  const component =  com.getObjectFromId(pathObj.id);

  const parentItem = com.getObjectFromId(component.parentItem);

  const rarityPriorities = com.getRarityPriorities();
  return (
    <div className='sized-content v-flex'>
        <Head>
            <title>{com.generatePageTitle(pathObj.id)}</title>
        </Head>
        <div className='sized-remaining h-flex'>
            <div className='sized-remaining v-flex flex-center' style={{ gap: '60px' }}>
                <div className='sized-content h-flex' style={{ marginTop: '20px' }}></div>
                { component.vaulted ? (<div className='sized-content h-flex flex-center'>{`${component.fullName} is`}<span style={{ fontWeight: 'bold', whiteSpace: 'pre' }}> vaulted</span>.</div>) : null}
                <div className='sized-content v-flex flex-center'>
                  {
                    component.parentItem == null ? null:
                      <Link href={com.getObjectRouteFromId(component.parentItem)}
                        className='sized-content component-page-parent-item-button h-flex flex-center' 
                        style={{ marginBottom: '20px', gap: '10px' }}
                        // onClick={() => router.push(`/prime/items/${component.parentItem.replaceAll(" ", "").replaceAll("&", "")}`)}
                      >
                        <img style={{ height: '30px' }} src={com.getObjectIcon(com.getObjectFromId(component.parentItem))}/>
                        <div>{component.parentItem}</div>
                      </Link>
                  }
                  <MainItemTitleComponent itemId={component.id} iconUrl={`${com.getBaseEnvPath().basePath}/images/${component.fullName}.png`} label={pathObj.id} />
                  <div style={{ marginTop: '5px' }}><ComponentAddButtons component={component}/></div>
                </div>
                <TabComponent
                  hasMinWidth={true}
                  defaultTab={"Relics"}
                  tabs={{
                    "Relics": <RelicTab component={component} rarityPriorities={rarityPriorities}/>,
                    ...(!component.vaulted ? { "Missions": <MissionTab component={component} rarityPriorities={rarityPriorities}/> } : null)
                  }}
                />
            </div>
        </div>
    </div>
    
  );
}