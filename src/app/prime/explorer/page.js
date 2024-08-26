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

import LazyLoaded from '@/components/LazyLoaded.js';
import FillSpinner from '@/components/FillSpinner.js';
import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import TabComponent from '@/components/TabComponent';


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
        if(!acc[mission.detailName]) acc[mission.detailName] = { title: mission.detailName, objects: [] };

        acc[mission.detailName].objects.push(mission);

        return acc;
      }, {})
      : {});

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
                  flexWrap: 'wrap'
                }}
              >
                { 
                  group.map((object, index) => (
                    <div 
                      key={`${index}-${object.name}`} 
                      className='sized-content main-view-item-single-container tracker-item-parent v-flex flex-center'
                      style={{ 
                        opacity: object.vaulted ? '50%' : '100%', 
                        position: 'relative',
                        cursor: 'pointer' 
                      }}
                      onClick={() => router.push(
                        category.localeCompare("Items") == 0 ? `/prime/items/${object.name.replaceAll(" ", "").replaceAll(" ", "").replaceAll("&", "")}` :
                        category.localeCompare("Components") == 0 ? `/prime/components/${object.componentFullName.replaceAll(" ", "").replaceAll(" ", "").replaceAll("&", "")}` :
                        category.localeCompare("Relics") == 0 ? `/prime/relics/${object.name.replaceAll(" ", "").replaceAll(" ", "").replaceAll("&", "")}` :
                        category.localeCompare("Missions") == 0 ? `/prime/missions/${`${object.name}${object.planet}`}` : ''
                      )}
                    >
                      <img src={`/images/${imageFunc(object)}.png`} className='sized-remaining main-view-item-image'/>
                      <div className='sized-content main-view-item-label h-flex flex-center' style={{ textAlign: 'center' }}>{ labelFunc(object) }</div>
                      <TrackItemButton itemId={com.getObjectId(object, category)}/>
                    </div>
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
            allItems.toSorted((a, b) => 
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
      const allComponents = com.getAllComponents(); 

      res = (
        <ObjectSection 
          category="Components"
          titleLabel="Components" 
          objects={allComponents.toSorted((a, b) => a.vaulted-b.vaulted)} 
          imageFunc={ (object) => `${object.componentFullName}` } 
          labelFunc={ (object) => `${object.componentFullName}` } 
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
          objects={allMissions.toSorted((a, b) => `${a.name}, ${a.planet}`.localeCompare(`${b.name}, ${b.planet}`))} 
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

  return (
    <div className='sized-remaining v-flex flex-center' style={{ gap: '20px' }}>
      <TabComponent
        style={{ width: '75vw' }}
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
