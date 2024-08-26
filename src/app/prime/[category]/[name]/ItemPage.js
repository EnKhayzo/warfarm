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
import FillSpinner from '@/components/FillSpinner.js';

import MainItemTitleComponent from './subcomponents/MainItemTitleComponent.js';
import ComponentAddButton from './subcomponents/ComponentAddButton.js';
import useMissionPriorities from '@/hooks/useMissionPriorities.js';
import TabHeaderButtonsComponent from '@/components/TabHeaderButtonsComponent.js';
import TabComponent from '@/components/TabComponent.js';
import FallbackObject from './FallbackObject.js';

const ComponentTab = ({item, components}) => {
    const router = useRouter();

    const rarityPriorities = com.getRarityPriorities();
    const relicTypePriorities = com.getRelicTypePriorities();

    const relics = com.getSearchResultRelatedObjects(null, "Items", null, "relics", item, { router: router });

    return (
        <div
            className='sized-content component-page-relative-info-container h-flex flex-center'
            style={{ 
                maxWidth: '99vw', 
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                alignItems: 'flex-start'
            }}
            >
            { 
                components.map((component, index) => (
                    <div 
                        key={`${index}-${component.name}`} 
                        className='sized-content v-flex' 
                        style={{ 
                            backgroundColor: 'var(--color-secondary)',
                            padding: '10px',
                            borderRadius: '10px',
                            gap: '30px',
                            alignSelf: 'stretch'
                        }}
                    >   
                        <div className='sized-content v-flex flex-center'>
                            <button 
                                onClick={() => router.push(component.route)}
                                className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center${` ${component.rarity}` ?? ''}`}
                                style={{
                                    gap: '5px'
                                }}
                            >
                                <div className='sized-content h-flex flex-center' style={{ width: '75px', height: '75px' }}><img src={component.icon}/></div>
                                <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                    <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{component.labelHeading}</div>
                                </div>
                            </button>
                        </div>
                        <div className='sized-content h-flex flex-center' style={{ gap: '10px', justifyContent: 'flex-start', alignItems: "flex-start" }}>
                            {
                                [  
                                    [ 
                                        "Unvaulted Relics", 
                                        relics
                                            .filter(relic => !relic.vaulted && relic.componentName.localeCompare(component.rawObj.component) == 0)
                                    ],
                                    [ 
                                        "Vaulted Relics", 
                                        relics
                                            .filter(relic => relic.vaulted && relic.componentName.localeCompare(component.rawObj.component) == 0)
                                    ]
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
                                        <div style={{ fontStyle: 'italic', minWidth: 'max-content' }}>{sectionName}</div>
                                        <div
                                            className='sized-content component-page-relative-info-container h-flex flex-center'
                                            style={{ 
                                                gap: '5px', 
                                                flexWrap: 'wrap',
                                                maxWidth: '15vw'
                                                // alignItems: 'flex-start'
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
                                                    .map(relic => (
                                                        <button 
                                                            key={`${index}-${relic.rawObj.relic.name}`} 
                                                            onClick={() => router.push(relic.route)}
                                                            className={`sized-content item-page-component-container relic-button-container tracker-item-parent v-flex flex-center${` ${relic.rarity}` ?? ''}`}
                                                            style={{
                                                                gap: '5px',
                                                                opacity: relic.vaulted ? '50%' : '100%'
                                                            }}
                                                        >
                                                            <div className='sized-content h-flex flex-center' style={{ width: '50px', height: '50px' }}><img src={relic.icon}/></div>
                                                            <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                                                <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{relic.label}</div>
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

function RelicTab({_components}){
    const router = useRouter();
  
    const rarityPriorities = com.getRarityPriorities();
    const relicTypePriorities = com.getRelicTypePriorities();

    const componentsRelicsMerged = com.getComponentsRelicsMerged(_components.map(component => component.rawObj.componentFullName), router);

    const components = componentsRelicsMerged.components;

    const relics = com.duplicatesRemoved(
            componentsRelicsMerged.relics,
            relic => relic.rawObj.relic.name
        )
        .toSorted((relicA, relicB) => 
            (relicA.vaulted-relicB.vaulted)
            ||
            (relicTypePriorities[relicA.rawObj.relic.tier]-relicTypePriorities[relicB.rawObj.relic.tier])
            ||
            (relicA.rawObj.relic.name.localeCompare(relicB.rawObj.relic.name))
        );

    return (
        <div
            className='sized-content component-page-relative-info-container h-flex flex-center'
            style={{ 
            maxWidth: '75vw', 
            flexWrap: 'wrap'
            }}
        >
            {
            relics.map((relic,index) => (
                <div 
                key={`${index}-${relic.name}`} 
                className='sized-content h-flex flex-center'
                style={{
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: '10px',
                    padding: '10px',
                    gap: '10px'
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
                        .map(component => { return (
                        <button 
                            key={`${index}-${component.rawObj.componentFullName}`} 
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
                                <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', paddingRight: '5px' }}>{component.rawObj.componentFullName}</div>
                            </div>
                        </button>
                        )})
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
        .toSorted((a, b) => com.sortMissionFunc(a.rawObj.relic, b.rawObj.relic, a.rawObj.mission, b.rawObj.mission, missionTypesPriorities))
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

const MissionTab = ({item, components, rarityPriorities}) => {
    const router = useRouter();

    const [ missionPriorities, setMissionPriorities ] = useMissionPriorities();

    const missions = com.getSearchResultRelatedObjects(null, "Items", null, "missions", item, { router: router });

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
                        flexWrap: 'wrap' 
                    }}
                >
                    { 
                    Object.entries(missionGroups).map(([missionId, missionGroup], index) => (
                        <div 
                            key={`${index}-${missionGroup.infoObj.name}`} 
                            onClick={() => router.push(missionGroup.infoObj.route)}
                            className={`sized-content item-page-component-container mission-relic-component tracker-item-parent v-flex flex-center`}
                            style={{
                                cursor: 'pointer',
                                gap: '5px',
                                opacity: missionGroup.infoObj.vaulted ? '50%' : '100%',
                                alignSelf: 'stretch'
                            }}
                        >
                            <div className='sized-remaining v-flex flex-center' style={{ justifyContent: 'flex-start' }}>
                                <div className='sized-content h-flex flex-center'><img style={{ height: '75px' }} src={missionGroup.infoObj.icon}/></div>
                                    <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                        <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', fontWeight: 'bold' }}>{missionGroup.infoObj.rawObj.mission.detailName}</div>
                                        <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{missionGroup.infoObj.id}</div>
                                        <div className='sized-content v-flex' style={{ gap: '5px', marginTop: '5px' }}>
                                            {
                                                components
                                                    .filter(component => Object.entries(missionGroup.relics)
                                                        .find(([ relicName, relic ]) => com.getRelicRewards(relic.relic)
                                                            .findIndex(reward => reward.rewardFullName.localeCompare(component.rawObj.componentFullName) == 0) > -1
                                                        )
                                                    )
                                                    .map((component,index) => (
                                                        <div
                                                            key={`${component.componentFullName}-${index}`}
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
                                                                <span className='sized-content h-flex flex-center' style={{ fontSize: 'small' }}>{component.rawObj.component}</span>
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
                                                                            .findIndex(reward => reward.rewardFullName.localeCompare(component.rawObj.componentFullName) == 0) > -1
                                                                        )
                                                                        .map(([ relicName, relic ], index) => (
                                                                            <button 
                                                                                key={`${relic.name}-${index}`} 
                                                                                onClick={(ev) => { ev.stopPropagation(); router.push(com.getObjectPathNameFromIdObj(relic.relic, "Relics"))}}
                                                                                className={`sized-content h-flex flex-center object-page-mission-relic${` ${relic.rarity}` ?? ''}`} 
                                                                                style={{ gap: '5px', minWidth: '200px' }}
                                                                            >
                                                                                <div className='sized-content h-flex flex-center' ><img style={{ height: '30px' }} src={`/images/${relic.relic.tier}.png`}/></div>
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
                        </div>
                    )) 
                    }
                </div>
                }
        </div>
    );
  }

export default function ItemPage({ name, pathObj }) {
    const router = useRouter();
    const item =  com.getObjectFromId(pathObj.id); // await com.getAllItems().find(item => item.name.localeCompare(pathObj.id) == 0);
    const components = com.getSearchResultRelatedObjects(null, "Items", null, "components", item, { router: router });

    return (
        <div className='sized-content v-flex'>
            <div className='sized-remaining h-flex flex-center'>
                <div className='sized-remaining v-flex flex-center' style={{ gap: '50px' }}>
                    <div className='sized-content h-flex' style={{ marginTop: '20px' }}></div>
                    { item.vaulted ? (<div className='sized-content h-flex flex-center'>{`${item.name} is`}<span style={{ fontWeight: 'bold', whiteSpace: 'pre' }}> vaulted</span>.</div>) : null}
                    <MainItemTitleComponent itemId={item.id} iconUrl={`/images/${pathObj.id}.png`} label={pathObj.id}/>
                    <div className='sized-content item-page-item-components-container h-flex flex-center'>
                        { 
                            components.map((component, index) => (
                                <ComponentAddButton key={`${index}-${component.componentFullName}`} component={component}/>
                            )) 
                        }
                    </div>
                    <TabComponent
                        defaultTab={"Components"}
                        tabs={{
                            "Components": <ComponentTab item={item} components={components}/>,
                            "Relics": <RelicTab item={item} _components={components}/>,
                            ...(!item.vaulted ? { "Missions": <MissionTab item={item} components={components}/> } : null),
                        }}
                    />
                </div>
            </div>
        </div>
    )
}