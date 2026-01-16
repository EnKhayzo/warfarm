'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';
import DucatLabel from '@/components/DucatLabel';
import RelicsOwnedButton from '@/components/RelicsOwnedButton';

export default function RelicTabCard({ relicInfo, components, hideFarmed=false }){
    const router = useRouter();

    const rarityPriorities = com.getRarityPriorities();

    const relic = relicInfo;

    return (
        <div 
            className='sized-content h-flex flex-center'
            style={{
              backgroundColor: !hideFarmed && components
                                .filter(component => 
                                  com.relicDropsComponent(relic.rawObj.relic, component.rawObj)
                                ).every(component => com.objectIsFarmed(component.rawObj))
                                ? 'var(--color-secondary-farmed)' : 'var(--color-secondary)',
              borderRadius: '10px',
              padding: '10px',
              gap: '10px',
              alignSelf: 'stretch'
            }}
          >
            <Link href={relic.route}
                // onClick={() => router.push(relic.route)}
                className={`sized-content item-page-component-container item-check-parent tracker-item-parent v-flex flex-center`}
                style={{
                    gap: '5px',
                    opacity: relic.vaulted ? '50%' : '100%'
                }}
            >
                <div className='sized-content h-flex flex-center' style={{ width: '75px', height: '75px' }}><img src={relic.icon}/></div>
                <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                    <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content' }}>{relic.rawObj.relic.name}</div>
                </div>
                <ResurgenceItemIcon itemId={relic.id}/>
                <DucatLabel rawObj={com.getObjectFromId(relic.id)}/>
                <RelicsOwnedButton positionAbsolute={true} itemId={relic.id}/>
            </Link>
            <div 
              className='sized-content v-flex flex-center'
              style={{
                gap: '5px'
              }}
            >
              {
                components
                  .toSorted((a, b) => 
                    rarityPriorities[com.getComponentRarityInRelationToRelic(a.rawObj, relic.rawObj.relic)]
                    -
                    rarityPriorities[com.getComponentRarityInRelationToRelic(b.rawObj, relic.rawObj.relic)]
                  )
                  .map((component, index) => (
                    <Link href={component.route}
                        key={`${index}-${component.rawObj.id}`} 
                        // onClick={() => router.push(component.route)}
                        className={`sized-content item-page-component-container tracker-item-parent h-flex flex-center${` ${com.getComponentRarityInRelationToRelic(component.rawObj, relic.rawObj.relic)}` ?? ''}`}
                        style={{
                          width: '210px',
                          gap: '5px',
                          opacity: component.vaulted ? '50%' : '100%',
                          color: !hideFarmed && com.objectIsFarmed(component.rawObj) ? 'var(--color-text-farmed)' : 'inherit'
                        }}
                    >
                        <div className='sized-content h-flex flex-center'><img style={{ height: '25px' }} src={component.icon}/></div>
                        <div className='sized-content h-flex flex-center' style={{ gap: '1px' }}>
                          <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', paddingRight: '5px' }}>{component.rawObj.fullName}</div>
                          <ResurgenceItemIcon positionAbsolute={false} itemId={component.id}/>
                        </div>
                    </Link>
                  ))
              }
            </div>
          </div>
    )
}
