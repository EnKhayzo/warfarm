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
import useObtainedComponents from '@/hooks/useObtainedComponents.js';
import useTrackedItems from '@/hooks/useTrackedItems.js';
import DucatLabel from '@/components/DucatLabel.js';
import ComponentAddButton from './subcomponents/ComponentAddButton.js';
import RelicsOwnedButton from '@/components/RelicsOwnedButton.js';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon.js';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup.js';

const FarmingSheetTab = ({ mission, hideFarmed }) => {
    const router = useRouter();
  
    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    const [ _trackedItems, setTrackedItems ] = useTrackedItems();

    const trackedItems = Object.entries(_trackedItems)
        .filter(([ itemId, trackedItem ]) => trackedItem.tracked ?? false)
        .map(([ itemId, trackedItem ]) => itemId);
  
    const componentsRelicsMerged = com.getComponentsRelicsMergedRelicTab(trackedItems, router);
  
    const components = componentsRelicsMerged.components
      .filter(component => !hideFarmed || !com.componentIsFarmed(component.rawObj, obtainedComponents));
    const relics = componentsRelicsMerged.relics;
  
    const rarityPriorities = com.getRarityPriorities();
    const relicTypePriorities = com.getRelicTypePriorities();
  
    const totalMap = com.getTotalRelicsOwnedMap();

    const missionRelics = com.getMissionRelics(mission);
  
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
                    itemGroup.components.map((component, index) => { 
                        let _relics = relics
                            .filter(relic => relic.id in missionRelics && relic.componentFullName.localeCompare(component.rawObj.fullName) == 0);
                        
                        return (
                            <div 
                                key={`${index}-${component.name}`} 
                                className='sized-content h-flex flex-center' 
                                style={{ 
                                    padding: '10px',
                                    borderRadius: '10px',
                                    gap: '10px',
                                    backgroundColor: com.objectIsFarmed(com.getObjectFromId(component.id)) ? 'var(--color-quaternary-farmed)' : 'var(--color-quaternary)',
                                    alignSelf: 'stretch',
                                    justifyContent: 'flex-start',
                                    opacity: _relics.length <= 0 ? '50%' : '100%'
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
                                        _relics.toSorted((a, b) => 
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
                                                    width: '220px',
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
                                                    <div className='sized-content v-flex flex-center' style={{ alignItems: 'flex-start', marginLeft: '5px' }}>
                                                        {
                                                            missionRelics[relic.id].percObj.map((rotation, index) => (
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
                            </div>
                        )}
                    ) 
                  }
                </div>
                <ObtainedResurgenceGroup itemId={itemName} positionAbsolute={true}/>
              </div>
            ))
        }
      </div>
    );
  }

const RotationTab = ({mission, rarityPriorities}) => {
    const router = useRouter();

    const relicTypePriorities = com.getRelicTypePriorities();
    const relics = com.getSearchResultRelatedObjects(null, "Missions", null, "relics", mission, { router: router });

  
    return (
        <>
            { 
                relics.length <= 0 ? <div>This mission doesn&apos;t drop any relic.</div>:
                    <div 
                        className='sized-content component-page-relative-info-container v-flex flex-center'
                        style={{ maxWidth: '75vw' }}
                    >
                        <div
                            className='sized-remaining component-page-relative-info-container h-flex'
                            style={{
                                alignItems: 'flex-start'
                            }}
                        >
                            {   
                                relics ?
                                    Object.entries(relics
                                    // .toSorted((a, b) => 
                                    //     (rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                                    //     ||
                                    //     (relicTypePriorities[a.rawObj.relic.tier]-relicTypePriorities[b.rawObj.relic.tier])
                                    //     ||
                                    //     (a.rawObj.relic.name.localeCompare(b.rawObj.relic.name))
                                    // )
                                        .reduce((acc, relic) => {
                                            relic.rawObj.forEach(rotation => { 
                                                if(!acc[rotation.rotation]) acc[rotation.rotation] = [] 

                                                acc[rotation.rotation].push({ rotation, relic });
                                            });
                                            
                                            return acc;
                                        }, {}))
                                        .toSorted((a, b) => a[0].localeCompare(b[0]))
                                        .map(([ rotationName, relicList ], index) => (
                                            <div 
                                                key={`${index}-${rotationName}`} 
                                                className='sized-content v-flex flex-center' 
                                                style={{ 
                                                    backgroundColor: 'var(--color-tertiary)',
                                                    borderRadius: '10px',
                                                    padding: '10px',
                                                    gap: '10px',
                                                    alignSelf: 'stretch',
                                                    justifyContent: 'flex-start'
                                                }}
                                            >
                                                <div className='sized-content h-flex flex-center' style={{ fontSize: 'large', fontWeight: 'bold' }}>{(rotationName !== "null" ? rotationName : '(no rotation)')}</div>
                                                <div 
                                                    className='sized-content h-flex flex-center' 
                                                    style={{ 
                                                        gap: '20px', 
                                                        flexWrap: 'wrap'
                                                    }}
                                                >
                                                    {
                                                        relicList
                                                            .map(({ rotation, relic }) => (
                                                                <Link href={relic.route}
                                                                    key={`${index}-${relic.id}`} 
                                                                    // onClick={() => router.push(relic.route)}
                                                                    className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center${` ${relic.rarity}` ?? ''}`}
                                                                    style={{
                                                                        gap: '5px',
                                                                        opacity: relic.vaulted ? '50%' : '100%',
                                                                        alignSelf: 'stretch',
                                                                        justifyContent: 'flex-start'
                                                                    }}
                                                                >
                                                                    <div className='sized-content h-flex flex-center' style={{ width: '75px', height: '75px' }}><img src={relic.icon}/></div>
                                                                    <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                                                        <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{relic.labelHeading}</div>
                                                                        <div className='sized-content v-flex' style={{ gap: '5px', marginTop: '5px' }}>
                                                                        {
                                                                            relic.rawObj
                                                                                .filter(rotation => (rotation.rotation ?? '').localeCompare(rotationName) == 0)
                                                                                .map((rotation, index) => (
                                                                                    <div 
                                                                                        key={`${rotation.rotation}-${index}`} 
                                                                                        className='sized-content' 
                                                                                        style={{ fontSize: 'small', whiteSpace: 'pre', borderRadius: '10px', padding: '10px', backgroundColor: 'var(--color-sextenary)' }}
                                                                                    >
                                                                                        <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{rotation.perc}</span>
                                                                                    </div>
                                                                                ))
                                                                        }
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))
                                                    }
                                                </div>
                                            </div>
                                        )) 
                                    : null
                                }
                            </div>
                        </div> 
                }
        </>
    );
  }

  const RelicTab = ({mission, rarityPriorities}) => {
    const router = useRouter();
  
    const relicTypePriorities = com.getRelicTypePriorities();
    const relics = com.getSearchResultRelatedObjects(null, "Missions", null, "relics", mission, { router: router });

    return (
        <>
            { 
                relics.length <= 0 ? <div>This mission doesn&apos;t drop any relic.</div>:
                    <div 
                        className='sized-content component-page-relative-info-container v-flex flex-center'
                        style={{ 
                            maxWidth: '75vw'
                        }}
                    >
                        <div
                            className='sized-content component-page-relative-info-container h-flex flex-center'
                            style={{ 
                                maxWidth: '75vw', 
                                flexWrap: 'wrap' 
                            }}
                        >
                            { 
                                relics
                                // .toSorted((a, b) => 
                                //     (rarityPriorities[a.rarity]-rarityPriorities[b.rarity])
                                //     ||
                                //     (relicTypePriorities[a.rawObj.relic.tier]-relicTypePriorities[b.rawObj.relic.tier])
                                //     ||
                                //     (a.rawObj.relic.name.localeCompare(b.rawObj.relic.name))
                                // )
                                .map((relic, index) => (
                                    <Link href={relic.route}
                                        key={`${index}-${relic.name}`} 
                                        // onClick={() => router.push(relic.route)}
                                        className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center${` ${relic.rarity}` ?? ''}`}
                                        style={{
                                            gap: '5px',
                                            opacity: relic.vaulted ? '50%' : '100%',
                                            alignSelf: 'stretch',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        <div className='sized-content h-flex flex-center' style={{ width: '75px', height: '75px' }}><img src={relic.icon}/></div>
                                        <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                            <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{relic.labelHeading}</div>
                                            <div className='sized-content v-flex' style={{ gap: '5px', marginTop: '5px' }}>
                                            {
                                                relic.rawObj.map((rotation, index) => (
                                                    <div 
                                                        key={`${rotation.rotation}-${index}`} 
                                                        className='sized-content' 
                                                        style={{ fontSize: 'small', whiteSpace: 'pre', borderRadius: '10px', padding: '10px', backgroundColor: 'var(--color-sextenary)' }}
                                                    >
                                                        <span style={{ fontWeight: 'bold' }}>{rotation.rotation}</span>{ rotation.rotation ? ' - ' :null }<span style={{ fontStyle: 'italic' }}>{rotation.perc}</span>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </Link>
                                )) 
                            }
                        </div>
                    </div>
                }
        </>
    );
  }

export default function RelicPage({ routeId, pathObj }) {
  const router = useRouter();

  const [ activeTab, setActiveTab ] = useState("Rotations");

  const changeTab = tab => {
    setActiveTab(tab);
  }


  const mission = com.getObjectFromId(pathObj.id);


//   useEffect(() => {
//     document.title = com.generatePageTitle(pathObj.id);
//   }, []);

    return (
        <div className='sized-content v-flex'>
            <div className='sized-remaining h-flex flex-center'>
                <div className='sized-remaining v-flex flex-center' style={{ gap: '50px' }}>
                    <div className='sized-content h-flex' style={{ marginTop: '20px' }}></div>
                    <MainItemTitleComponent itemId={mission.id} iconUrl={com.getObjectIcon(com.getObjectFromId(pathObj.id))} label={pathObj.id} labelFooter={mission.type} />
                    <TabComponent
                        hasMinWidth={true}
                        defaultTab={"Rotations"}
                        tabs={{
                            "Farming Sheet": <FarmingSheetTab mission={mission}/>,
                            "Rotations": <RotationTab mission={mission}/>,
                            "Relics": <RelicTab mission={mission}/>,
                        }}
                    />
                </div>
            </div>
        </div>
    );  
}