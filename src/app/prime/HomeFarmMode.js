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

const ComponentTab = ({ hideFarmed, trackedItems}) => {
  const router = useRouter();

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  const componentsRelicsMerged = com.getComponentsRelicsMergedRelicTab(trackedItems, router);

  const components = componentsRelicsMerged.components
    .filter(component => !hideFarmed || !com.componentIsFarmed(component.rawObj, obtainedComponents));
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
                                      <Link  href={relic.route}
                                          key={`${index}-${relic.rawObj.relic.name}`} 
                                          // onClick={() => router.push(relic.route)}
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
                                            <ResurgenceItemIcon positionAbsolute={false} itemId={relic.id}/>
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
                          <Link href={com.getObjectRouteFromId(itemId)} 
                            key={`${itemId}-${index}`} 
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
              <div className='sized-content v-flex'>
                <div>You&apos;re not tracking any items. Add some by using the Search Bar or from the <Link href='/prime/explorer' style={{ cursor: 'pointer', color:'var(--color-link-text)' }}>Explorer</Link> page, or by selecting a Track List (if you saved any).</div>
                <div className='sized-content h-flex flex-center'>Track items using the star<img className='sized-content star-button-icon h-flex flex-center' style={{ height: '12px',  }} src={`${com.getBaseEnvPath().basePath}/icons/star_hollow.svg`}/>button.</div>
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