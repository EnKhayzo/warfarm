'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';
import RelicTabCard from './RelicTabCard';
import { ScrollPaneContext } from '@/contexts/ScrollPaneContext';

export default function RelicTabBody({ hideFarmed, objects}){
    const router = useRouter();
    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
  
    const rarityPriorities = com.getRarityPriorities();
    const relicTypePriorities = com.getRelicTypePriorities();
  
    const componentsRelicsMerged = com.getComponentsRelicsMergedRelicTab(objects, router);
  
    const components = componentsRelicsMerged.components
      .filter(component => !hideFarmed || !com.componentIsFarmed(component.rawObj, obtainedComponents));
  
    const relics = com.duplicatesRemoved(
      componentsRelicsMerged.relics
        .filter(relic => !com.getRelicRewards(relic.rawObj.relic)
          .filter(reward => components
              .map(component => component.rawObj.id)
              .includes(reward.rewardFullName)
          )
          .every(reward => { 
            const obj = com.getObjectFromId(reward.rewardFullName); 
            if(obj == null) return true;
  
            return hideFarmed && com.componentIsFarmed(obj);
          })
        ),
        relic => relic.rawObj.relic.name
      )
      .toSorted((relicA, relicB) => 
        (relicA.vaulted-relicB.vaulted)
        ||
        (relicTypePriorities[relicA.rawObj.relic.tier]-relicTypePriorities[relicB.rawObj.relic.tier])
        ||
        (relicA.rawObj.relic.name.localeCompare(relicB.rawObj.relic.name))
      );
  
    const relicComponentScore = (relic) => {
      return components
        .filter(component => com.relicDropsComponent(relic.rawObj.relic, component.rawObj)).length
    };
  
    const relicComponentRarityScore = (relic) => {
      return Math.max(
        ...components
          .filter(component => com.relicDropsComponent(relic.rawObj.relic, component.rawObj))
          .map(component => rarityPriorities[com.getComponentRarityInRelationToRelic(component.rawObj, relic.rawObj.relic)])
      )
    };


    const mainScrollableRef = useContext(ScrollPaneContext).mainScrollableRef;
    const [ relicCardsToLoad, setRelicCardsToLoad ] = useState(10);
    const scrollListener = (ev) => {
      const scrollValue = ev.target.scrollTop+ev.target.getBoundingClientRect().height;
      const scrollLimit = ev.target.scrollHeight;
      const scrollPerc = scrollValue/scrollLimit;
  
      if(scrollPerc > .9){
          setRelicCardsToLoad(relicCardsToLoad+10);
      }
    }
  
    useEffect(() => {
      // console.log(`main scrollable!`, mainScrollableRef);
      mainScrollableRef.current.addEventListener('scroll', scrollListener);
  
      return () => {
          mainScrollableRef.current.removeEventListener('scroll', scrollListener);
      }
    }, [relicCardsToLoad])
  
    return (
      <div
        className='sized-content component-page-relative-info-container h-flex flex-center'
        style={{ 
          maxWidth: '75vw', 
          flexWrap: 'wrap',
          gap: '50px'
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
                      (a.vaulted-b.vaulted)
                      ||
                      (relicComponentScore(b)-relicComponentScore(a))
                      ||
                      (relicComponentRarityScore(a)-relicComponentRarityScore(b))
                      ||
                      (relicTypePriorities[a.rawObj.relic.tier]-relicTypePriorities[b.rawObj.relic.tier])
                      ||
                      (a.rawObj.relic.name.localeCompare(b.rawObj.relic.name))
                    )
                    .slice(0, relicCardsToLoad)
                    .map((relic,index) => (
                    <RelicTabCard 
                      key={`${index}-${relic.name}`} 
                      relicInfo={relic}
                      components={
                        components
                          .filter(component => com.relicDropsComponent(relic.rawObj.relic, component.rawObj)
                        )
                      }
                      hideFarmed={hideFarmed}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    );
  }