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
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

import LazyLoaded from '@/components/LazyLoaded.js';
import FillSpinner from '@/components/FillSpinner.js';
import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import TabComponent from '@/components/TabComponent';
import ObtainedItemCheck from '@/components/ObtainedItemCheck';

import useObtainedComponents from '@/hooks/useObtainedComponents.js';
import ObtainedLabelObject from '@/components/ObtainedLabelObject';


const ObjectSection = ({ objects, imageFunc, labelFunc, titleLabel, category }) => {
  const router = useRouter();

  const groups = Object.entries(
    category === "Items" ?
      objects.reduce((acc, item) => {
        if(!acc[item.type]) acc[item.type] = { title: item.type, objects: [] };

        acc[item.type].objects.push(item);

        return acc;
      }, {})
      : 
    category === "Components" ?
      objects.reduce((acc, component) => {
        if(component.parentItem == null) return acc;

        const parentItem = com.getObjectFromId(component.parentItem);
        if(!acc[parentItem.type]) acc[parentItem.type] = { title: parentItem.type, objects: [] };

        acc[parentItem.type].objects.push(component);

        return acc;
      }, {})
      :
    category === "Relics" ?
      objects.reduce((acc, relic) => {
        if(!acc[relic.tier]) acc[relic.tier] = { title: relic.tier, objects: [] };

        acc[relic.tier].objects.push(relic);

        return acc;
      }, {})
      :
    category === "Missions" ?
      objects.reduce((acc, mission) => {
        if(!acc[mission.type]) acc[mission.type] = { title: mission.type, objects: [] };

        acc[mission.type].objects.push(mission);

        return acc;
      }, {})
      : {});

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  return (
    <div className='sized-remaining v-flex flex-center' style={{ gap: '5px' }}>
      <div 
        className='sized-content main-view-item-container h-flex flex-center' 
        style={{ 
          flexWrap: 'wrap', 
          overflow: 'auto', 
          maxHeight: '65vh',
          gap: '30px' 
        }}
      >
        {
          groups.map(([ groupName, { title, objects: group } ]) => (
            <div key={`${groupName}`} className='sized-remaining v-flex flex-center'>
              <div 
                className='sized-content h-flex flex-center' 
                style={{ 
                  padding: '10px', 
                  width: '100%', 
                  justifyContent: 'flex-start',
                  fontSize: 'small',
                  fontStyle: 'italic',
                  color: 'var(--color-text-section)' 
                }}
                >
                  {com.capitalizeFirstLetter(groupName)}
              </div>
              <div 
                className='sized-remaining h-flex flex-center'
                style={{
                  flexWrap: 'wrap',
                  gap: '5px'
                }}
              >
                { 
                  group.map((object, index) => (
                    <Link href={com.getObjectRouteFromId(object.id)}
                      key={`${index}-${object.name}`} 
                      className={`sized-content main-view-item-single-container tracker-item-parent${com.objectIsFarmed(object, obtainedComponents) ? ` object-farmed` : ``} v-flex flex-center`}
                      style={{ 
                        width: '140px',
                        opacity: object.vaulted ? '50%' : '100%', 
                        position: 'relative',
                        cursor: 'pointer',
                        alignSelf: 'stretch' 
                      }}
                      // onClick={() => router.push(
                      //   com.getObjectRouteFromId(object.id)
                      //   // category.localeCompare("Items") == 0 ? `/prime/items/${object.name.replaceAll(" ", "").replaceAll(" ", "").replaceAll("&", "")}` :
                      //   // category.localeCompare("Components") == 0 ? `/prime/components/${object.fullName.replaceAll(" ", "").replaceAll(" ", "").replaceAll("&", "")}` :
                      //   // category.localeCompare("Relics") == 0 ? `/prime/relics/${object.name.replaceAll(" ", "").replaceAll(" ", "").replaceAll("&", "")}` :
                      //   // category.localeCompare("Missions") == 0 ? `/prime/missions/${`${object.name}${object.planet}`}` : ''
                      // )}
                    >
                      <div className='sized-content h-flex flex-center' style={{ objectFit: 'contain', height: '90px' }}><img  className='sized-content h-flex main-view-item-image flex-center' style={{ height: '100px', width: '100px', objectFit: 'contain' }} src={com.getObjectIcon(object)}/></div>
                      <div className='sized-content main-view-item-label h-flex flex-center' style={{ textAlign: 'center' }}>{ labelFunc(object) }</div>
                      {/* <ObtainedLabelObject object={object}/> */}
                      <TrackItemButton itemId={com.getObjectId(object, category)}/>
                      <ObtainedItemCheck itemId={com.getObjectId(object, category)} positionAbsolute={true}/>
                    </Link>
                  )) 
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

const ObjectSectionBuilder = ({ category }) => {
  const relicTypePriorities = com.getRelicTypePriorities();
  const itemTypePriorities = com.getItemTypePriorities();
  
  let res = (<div>Unknown</div>);

  com._match(category, {
    "Items": () => {
      const allItems = com.getAllItems();

      res = (
        <ObjectSection 
          category="Items"
          titleLabel="Items" 
          objects={
            Object.values(allItems).toSorted((a, b) => 
              (a.vaulted-b.vaulted) 
              ||
              (itemTypePriorities[a.type]-itemTypePriorities[b.type])
              || 
              (a.name.localeCompare(b.name)) 
            )
          } 
          imageFunc={ (object) => `${object.name}` } 
          labelFunc={ (object) => `${object.name}` } 
        />
      )
    },
    "Components": () => {
      const allComponents = Object.values(com.getAllComponents()); 

      res = (
        <ObjectSection 
          category="Components"
          titleLabel="Components" 
          objects={
            allComponents.toSorted((a, b) => 
              (a.vaulted-b.vaulted)
              ||
              (itemTypePriorities[a.type]-itemTypePriorities[b.type])
              ||
              (a.fullName.localeCompare(b.fullName))
            )
          } 
          imageFunc={ (object) => `${object.fullName}` } 
          labelFunc={ (object) => `${object.fullName}` } 
        />
      )
    },
    "Relics": () => {
      const allRelics = com.getAllRelics(); 

      res = (
        <ObjectSection 
          category="Relics"
          titleLabel="Relics" 
          objects={ 
                    Object.entries(allRelics)
                      .map(([ relicName, relic ]) => relic)
                      .toSorted((a, b) => 
                        (
                          (a.vaulted-b.vaulted)
                          ||
                          (relicTypePriorities[com.getRelicType(a.name)]-relicTypePriorities[com.getRelicType(b.name)])
                          ||
                          (a.name.localeCompare(b.name))
                        )
                          
                    ) 
                  } 
          imageFunc={ (object) => `${object.name.split(" ")[0].trim()}` } 
          labelFunc={ (object) => `${object.name}` } 
        />
      )
    },
    "Missions": () => {
      const allMissions = com.getAllMissions();

      res = (
        <ObjectSection 
          category="Missions"
          titleLabel="Missions" 
          objects={Object.values(allMissions).toSorted((a, b) => `${a.name}, ${a.planet}`.localeCompare(`${b.name}, ${b.planet}`))} 
          imageFunc={ (object) => `${object.planet}` } 
          labelFunc={ (object) => `${object.name}, ${object.planet}` } 
        />
      )
    },
  });

  return res;
}

export default function ExplorerPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = com.generatePageTitle("Explorer");
  }, []);

  return (
    <div className='sized-remaining v-flex flex-center' style={{ gap: '20px' }}>
      <Head>
          <title>{com.generatePageTitle("Explorer")}</title>
      </Head>
      <TabComponent
        style={{ width: '95vw' }}
        defaultTab={"Items"}
        tabs={{
          "Items": <ObjectSectionBuilder category={"Items"} />,
          "Components": <ObjectSectionBuilder category={"Components"} />,
          "Relics": <ObjectSectionBuilder category={"Relics"} />,
          "Missions": <ObjectSectionBuilder category={"Missions"} />
        }}
      />
    </div>
  );
}
