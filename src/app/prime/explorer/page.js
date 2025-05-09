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
import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import TabComponent from '@/components/TabComponent';
import ObtainedItemCheck from '@/components/ObtainedItemCheck';

import useObtainedComponents from '@/hooks/useObtainedComponents.js';
import ObjectStateLabel from '@/components/ObjectStateLabel';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';
import useMissionPriorities from '@/hooks/useMissionPriorities.js';
import DucatLabel from '@/components/DucatLabel';
import LazyLoadVisibleWrapper from '@/components/LazyLoadVisibleWrapper';
import useGlobalMode from '@/hooks/useGlobalMode';
import RelicsOwnedLabelAddButton from '@/components/RelicsOwnedLabelAddButton';
import MobileMoreOptionsButton from '@/components/MobileMoreOptionsButton';
import LabelCheckbox from '@/components/LabelCheckbox';


const ObjectSection = ({ objects, imageFunc, labelFunc, titleLabel, category }) => {
  const router = useRouter();

  const [ missionPriorities, setMissionPriorities ] = useMissionPriorities();

  const groups = Object.entries(
    category === "Prime Resurgence" ?
      objects.reduce((acc, item) => {
        if(!acc[item.category]) acc[item.category] = { title: item.category, objects: [] };

        acc[item.category].objects.push(item);

        return acc;
      }, {})
      : 
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
      objects
      .toSorted((a, b) => 
        (
          (missionPriorities[a.type]+1 || Infinity)
          -
          (missionPriorities[b.type]+1 || Infinity)
        )
      )
      .reduce((acc, mission) => {
        if(!acc[mission.type]) acc[mission.type] = { title: mission.type, objects: [] };

        acc[mission.type].objects.push(mission);

        return acc;
      }, {})
      : {});

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

  const farmedObjectClass = (object) => {
    // return com.objectIsFarmed(object, obtainedComponents) ? ` object-farmed` : ``
    const farmedPerc = com.objectIsFarmedPerc(object, obtainedComponents);

    if(farmedPerc >= 1) return " object-farmed";
    else if(farmedPerc > 0) return " object-partial-farmed";

    return "";
  };

  const [ globalMode, setGlobalMode ] = useGlobalMode();
  const isFarmMode = globalMode == null || globalMode === "farmMode";

  return (
    <div className='sized-remaining v-flex flex-center' style={{ gap: '5px' }}>
      <div 
        className='sized-content main-view-item-container h-flex flex-center' 
        style={{ 
          flexWrap: 'wrap', 
          overflow: 'auto', 
          maxHeight: '80vh',
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
                  justifyContent: 'center',
                  fontSize: 'small',
                  fontStyle: 'italic',
                  color: 'var(--color-text-section)' 
                }}
                >
                  {com.capitalizeFirstLetter(groupName === "undefined" ? "?" : groupName)}
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
                    <LazyLoadVisibleWrapper 
                      key={`${index}-${object.name}`} 
                      className={'sized-content v-flex flex-center'}
                      style={{ 
                        width: '140px', 
                        minHeight: isFarmMode ? '140px' : '190px' ,
                        justifyContent: 'flex-start',
                        alignSelf: 'stretch'
                      }}
                    >
                      <Link href={com.getObjectRouteFromId(object.id)}
                        className={`sized-remaining main-view-item-single-container item-check-parent tracker-item-parent${farmedObjectClass(object)} v-flex flex-center`}
                        style={{ 
                          width: '140px',
                          opacity: object.vaulted ? '50%' : '100%', 
                          position: 'relative',
                          cursor: 'pointer',
                          alignSelf: 'stretch',
                          justifyContent: 'flex-start'
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
                        {/* { object.category !== "relics" ? null: <RelicsOwnedLabelAddButton relic={object}/> } */}
                        <ItemActionButton itemId={com.getObjectId(object, category)} mobileAlwaysHide={true}/>
                        <ObtainedResurgenceGroup itemId={com.getObjectId(object, category)} positionAbsolute={true}/>
                        <ObjectStateLabel object={object} exclusiveMode={"ducatMode"}/>
                        <DucatLabel rawObj={object}/>
                        <MobileMoreOptionsButton itemId={object.id}/>
                      </Link>
                    </LazyLoadVisibleWrapper>
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

const ObjectSectionBuilder = ({ category, hideVaulted }) => {
  const relicTypePriorities = com.getRelicTypePriorities();
  const itemTypePriorities = com.getItemTypePriorities();
  
  let res = (<div>Unknown</div>);

  com._match(category, {
    "Prime Resurgence": () => {
      const allObjects = com.filterDict(
        com.getAllObjects(),
        ([ id, object ]) => { return object.category !== "missions" && com.isObjectResurgence(object.id)}
      );

      const categoryPriorities = {
        "items":     0,
        "components":1,
        "relics":    2
      };

      res = (
        <ObjectSection 
          category="Prime Resurgence"
          titleLabel="Prime Resurgence" 
          objects={
            Object.values(allObjects).toSorted((a, b) => 
              (categoryPriorities[a.category]-categoryPriorities[b.category])
              ||
              (a.vaulted-b.vaulted) 
              ||
              (itemTypePriorities[a.type]-itemTypePriorities[b.type])
              || 
              (a.name.localeCompare(b.name)) 
            )
          } 
          imageFunc={ (object) => `${object.name}` } 
          labelFunc={ (object) => `${object.fullName ?? object.name}` } 
        />
      )
    },
    "Items": () => {
      const allItems = com.getAllItems();

      res = (
        <ObjectSection 
          category="Items"
          titleLabel="Items" 
          objects={
            Object.values(allItems)
              .filter(item => !hideVaulted || !item.vaulted)
              .toSorted((a, b) => 
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
            allComponents
              .filter(item => !hideVaulted || !item.vaulted)
              .toSorted((a, b) => 
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

      const totalMap = com.getTotalRelicsOwnedMap();

      res = (
        <ObjectSection 
          category="Relics"
          titleLabel="Relics" 
          objects={ 
                    Object.entries(allRelics)
                      .map(([ relicName, relic ]) => relic)
                      .filter(item => !hideVaulted || !item.vaulted)
                      .toSorted((a, b) => 
                        (
                          (a.vaulted-b.vaulted)
                          ||
                          (relicTypePriorities[com.getRelicType(a.name)]-relicTypePriorities[com.getRelicType(b.name)])
                          ||
                          ((com.isRelicResurgence(b.id) ? 1 : -1) - (com.isRelicResurgence(a.id) ? 1 : -1))
                          ||
                          ((totalMap[b.id]??0)-(totalMap[a.id]??0))
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
          objects={
                    Object.values(allMissions)
                      .toSorted(
                        (a, b) => (
                          a.fullName.localeCompare(b.fullName)
                        )
                      )
          } 
          imageFunc={ (object) => `${object.planet}` } 
          labelFunc={ (object) => `${object.name}, ${object.planet}` } 
        />
      )
    },
  });

  return res;
}

export function HideVaultedCheckbox({ setHideVaulted, checked }){
  return (
    <LabelCheckbox
      type="checkbox" 
      value="vaulted" 
      textLabel="Hide Vaulted"
      onChange={(ev) => { setHideVaulted(ev.target.checked) }}
      checked={checked ?? false}
    />
  )
}

export default function ExplorerPage() {
  const router = useRouter();
  const [ hideVaulted, setHideVaulted ] = useState(false);

  // useEffect(() => {
  //   document.title = com.generatePageTitle("Explorer");
  // }, []);



  return (
    <div className='sized-remaining v-flex flex-center' style={{ gap: '20px' }}>
      <TabComponent
        style={{ width: '95vw' }}
        defaultTab={"Items"}
        tabs={{
          "Prime Resurgence": <ObjectSectionBuilder category={"Prime Resurgence"} hideVaulted={hideVaulted} />,
          "Items": <ObjectSectionBuilder category={"Items"} hideVaulted={hideVaulted} />,
          "Components": <ObjectSectionBuilder category={"Components"} hideVaulted={hideVaulted} />,
          "Relics": <ObjectSectionBuilder category={"Relics"} hideVaulted={hideVaulted} />,
          "Missions": <ObjectSectionBuilder category={"Missions"} hideVaulted={hideVaulted} />
        }}
        headerControls={{
          "Items": 
            (<div className='sized-content h-flex flex-center' style={{ gap: '10px' }}>
              <HideVaultedCheckbox setHideVaulted={setHideVaulted} checked={hideVaulted}/>
            </div>),
          "Components": 
            (<div className='sized-content h-flex flex-center' style={{ gap: '10px' }}>
              <HideVaultedCheckbox setHideVaulted={setHideVaulted} checked={hideVaulted}/>
            </div>),
          "Relics": 
            (<div className='sized-content h-flex flex-center' style={{ gap: '10px' }}>
              <HideVaultedCheckbox setHideVaulted={setHideVaulted} checked={hideVaulted}/>
            </div>)
        }}
      />
    </div>
  );
}
