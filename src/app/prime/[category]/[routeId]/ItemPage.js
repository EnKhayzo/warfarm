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

import { React, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

import * as com from "../../../common.js";
import LazyLoaded from '@/components/LazyLoaded.js';
import FillSpinner from '@/components/FillSpinner.js';

import MainItemTitleComponent from './subcomponents/MainItemTitleComponent.js';
import ComponentAddButton from './subcomponents/ComponentAddButton.js';
import useMissionPriorities from '@/hooks/useMissionPriorities.js';
import TabHeaderButtonsComponent from '@/components/TabHeaderButtonsComponent.js';
import TabComponent from '@/components/TabComponent.js';
import FallbackObject from './FallbackObject.js';
import SelectorComponent from '@/components/SelectorComponent.js';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon.js';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup.js';
import RelicTabCard from './subcomponents/RelicTabCard.js';
import RelicTabBody from './subcomponents/RelicTabBody.js';
import MissionTabBody from './subcomponents/MissionTabBody.js';
import HideFarmedItemsCheckbox from './subcomponents/HideFarmedItemsCheckbox.js';
import useUserDataPreferences from '@/hooks/useUserDataPreferences.js';

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
                            <Link href={component.route}
                                // onClick={() => router.push(component.route)}
                                className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center${` ${component.rarity}` ?? ''}`}
                                style={{
                                    gap: '5px',
                                    position: 'relative'
                                }}
                            >
                                <div className='sized-content h-flex flex-center' style={{ width: '75px', height: '75px' }}><img src={component.icon}/></div>
                                <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                    <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{component.labelHeading}</div>
                                </div>
                                <ObtainedResurgenceGroup itemId={component.id}/>
                            </Link>
                        </div>
                        <div 
                            className='sized-content h-flex flex-center' 
                            style={{ 
                                gap: '10px', 
                                justifyContent: 'flex-start', 
                                alignItems: "flex-start"  
                            }}
                        >
                            {
                                [  
                                    [ 
                                        "Unvaulted Relics", 
                                        relics
                                            .filter(relic => !relic.vaulted && relic.componentName.localeCompare(component.rawObj.name) == 0)
                                    ],
                                    [ 
                                        "Vaulted Relics", 
                                        relics
                                            .filter(relic => relic.vaulted && relic.componentName.localeCompare(component.rawObj.name) == 0)
                                    ]
                                ].map(([ sectionName, relicSection ], index) => (
                                    <div
                                        key={`Section${sectionName}${index}`}
                                        className='sized-content component-page-relative-info-container v-flex flex-center'
                                        style={{ 
                                            display: relicSection.length <= 0 ? 'none' : '',
                                            maxWidth: '75vw', 
                                            gap: '20px',
                                            backgroundColor: 'var(--color-quaternary)',
                                            borderRadius: '10px',
                                            padding: '10px' 
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
                                                        <Link href={relic.route}
                                                            key={`${index}-${relic.rawObj.relic.name}`} 
                                                            // onClick={() => router.push(relic.route)}
                                                            className={`sized-content item-page-component-container relic-button-container item-check-parent tracker-item-parent v-flex flex-center${` ${relic.rarity}` ?? ''}`}
                                                            style={{
                                                                gap: '5px',
                                                                opacity: relic.vaulted ? '50%' : '100%'
                                                            }}
                                                        >
                                                            <div className='sized-content h-flex flex-center' style={{ width: '50px', height: '50px' }}><img src={relic.icon}/></div>
                                                            <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                                                <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', textWrap: 'nowrap' }}>{relic.label}</div>
                                                            </div>
                                                            <ResurgenceItemIcon itemId={relic.rawObj.relic.id}/>
                                                        </Link>
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
    
        if(!acc[mission.id].relics[mission.rawObj.relic.name])
            acc[mission.id].relics[mission.rawObj.relic.name] = { 
                rarity: mission.rarity,
                rotations: mission.rawObj.rotations, 
                relic: mission.rawObj.relic 
            };
    
        return acc;
        }, {});
  }

export default function ItemPage({ routeId, pathObj }) {
    const router = useRouter();
    const [ groupBy, setGroupBy ] = useState("relic");
    const [ hideFarmed, setHideFarmed ] = useState(true);
    const [ userPreferences, setUserPreferences ] = useUserDataPreferences();

    useEffect(() => {
        document.title = com.generatePageTitle(pathObj.id);
      }, []);

    const item =  com.getObjectFromId(pathObj.id); // await com.getAllItems().find(item => item.name.localeCompare(pathObj.id) == 0);
    const components = com.getSearchResultRelatedObjects(null, "Items", null, "components", item, { router: router });


    return (
        <div className='sized-content v-flex'>
            <Head>
                <title>{com.generatePageTitle(pathObj.id)}</title>
            </Head>
            <div className='sized-remaining h-flex flex-center'>
                <div className='sized-remaining v-flex flex-center' style={{ gap: '50px' }}>
                    <div className='sized-content h-flex' style={{ marginTop: '20px' }}></div>
                    { item.vaulted ? (<div className='sized-content h-flex flex-center'>{`${item.name} is`}<span style={{ fontWeight: 'bold', whiteSpace: 'pre' }}> vaulted</span>.</div>) : null}
                    <MainItemTitleComponent itemId={item.id} iconUrl={com.getObjectIcon(com.getObjectFromId(pathObj.id))} label={pathObj.id}/>
                    <div 
                        className='sized-content item-page-item-components-container h-flex flex-center'
                        style={{
                            flexWrap: 'wrap'
                        }}
                    >
                        { 
                            components.map((component, index) => (
                                <Link key={`${index}-${component.id}`}  href={com.getObjectRouteFromId(component.id)}><ComponentAddButton component={component}/></Link>
                            )) 
                        }
                    </div>
                    <TabComponent
                        hasMinWidth={true}
                        defaultTab={"Components"}
                        tabs={{
                            "Components": <ComponentTab item={item} components={components}/>,
                            "Relics": <RelicTabBody hideFarmed={com.getUserDataPreference("hideFarmed", false)} objects={components.map(component => component.rawObj.id)}/>,
                            ...(!item.vaulted ? { "Missions": <MissionTabBody hideFarmed={com.getUserDataPreference("hideFarmed", false)} groupBy={groupBy} item={item} objectIds={components.map(component => component.rawObj.id)}/> } : null),
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
                        // "Components": (
                        //     <div className='sized-content h-flex flex-center' style={{ gap: '10px' }}>
                        //     <HideFarmedItemsCheckbox setHideFarmed={setHideFarmed}/>
                        //     </div>
                        // ),
                        "Relics": (
                            <div className='sized-content h-flex flex-center' style={{ gap: '10px' }}>
                            <HideFarmedItemsCheckbox setHideFarmed={setHideFarmed}/>
                            </div>
                        )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}