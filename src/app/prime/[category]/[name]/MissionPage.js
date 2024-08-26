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

import { React, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import * as com from "../../../common.js";
import LazyLoaded from '@/components/LazyLoaded.js';
import MainItemTitleComponent from './subcomponents/MainItemTitleComponent.js';
import TabComponent from '@/components/TabComponent.js';
import FallbackObject from './FallbackObject.js';

  const RelicTab = ({mission, rarityPriorities}) => {
    const router = useRouter();
  
    const relicTypePriorities = com.getRelicTypePriorities();
    const relics = com.getSearchResultRelatedObjects(null, "Missions", null, "relics", mission, { router: router });

    return (
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
                        <button 
                            key={`${index}-${relic.name}`} 
                            onClick={() => router.push(relic.route)}
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
                                            <span style={{ fontWeight: 'bold' }}>{rotation.rotation}</span> - <span style={{ fontStyle: 'italic' }}>{rotation.perc}</span>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </button>
                    )) 
                }
            </div>
        </div>
    );
  }

  const RotationTab = ({mission, rarityPriorities}) => {
    const router = useRouter();

    const relicTypePriorities = com.getRelicTypePriorities();
    const relics = com.getSearchResultRelatedObjects(null, "Missions", null, "relics", mission, { router: router });

  
    return (
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
                                        gap: '10px',
                                        alignSelf: 'stretch'
                                    }}
                                >
                                    <div className='sized-content h-flex flex-center' style={{ fontSize: 'large', fontWeight: 'bold' }}>{rotationName}</div>
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
                                                    <button 
                                                        key={`${index}-${relic.id}`} 
                                                        onClick={() => router.push(relic.route)}
                                                        className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center${` ${relic.rarity}` ?? ''}`}
                                                        style={{
                                                            gap: '5px',
                                                            opacity: relic.vaulted ? '50%' : '100%'
                                                        }}
                                                    >
                                                        <div className='sized-content h-flex flex-center' style={{ width: '75px', height: '75px' }}><img src={relic.icon}/></div>
                                                        <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                                            <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{relic.labelHeading}</div>
                                                            <div className='sized-content v-flex' style={{ gap: '5px', marginTop: '5px' }}>
                                                            {
                                                                relic.rawObj
                                                                    .filter(rotation => rotation.rotation.localeCompare(rotationName) == 0)
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
                                                    </button>
                                                ))
                                        }
                                    </div>
                                </div>
                            )) 
                        : null
                    }
                </div>
            </div>
    );
  }

export default function RelicPage({ name, pathObj }) {
  const router = useRouter();

  const [ activeTab, setActiveTab ] = useState("Rotations");

  const changeTab = tab => {
    setActiveTab(tab);
  }


  const mission = com.getObjectFromId(pathObj.id);

    return (
        <div className='sized-content v-flex'>
            <div className='sized-remaining h-flex flex-center'>
                <div className='sized-remaining v-flex flex-center' style={{ gap: '50px' }}>
                    <div className='sized-content h-flex' style={{ marginTop: '20px' }}></div>
                    <MainItemTitleComponent itemId={mission.id} iconUrl={`/images/${mission.planet}.png`} label={pathObj.id} labelFooter={mission.detailName} />
                    <TabComponent
                        defaultTab={"Rotations"}
                        tabs={{
                            "Rotations": <RotationTab mission={mission}/>,
                            "Relics": <RelicTab mission={mission}/>,
                        }}
                    />
                </div>
            </div>
        </div>
    );  
}