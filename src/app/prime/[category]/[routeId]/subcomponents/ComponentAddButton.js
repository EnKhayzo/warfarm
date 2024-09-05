'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';

export default function ComponentAddButton({ component, fullName=false, iconHeight='75px', width=null }){
    const router = useRouter();

    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

    const componentIsAnomalous = component.rawObj.required <= 0;

    return (
        <div className='sized-content v-flex' style={{ alignSelf: 'stretch', gap: '5px' }}>
            <div 
                onClick={() => router.push(component.route)}
                className={`sized-content item-page-component-container item-check-parent tracker-item-parent v-flex flex-center${` ${component.rarity}` ?? ''}`}
                style={{
                    gap: '5px',
                    position: 'relative',
                    cursor: 'pointer',
                    width: width ?? 'auto', 
                    alignSelf: 'stretch'
                }}
            >
                <div className='sized-content h-flex flex-center'><img style={{ height: iconHeight }} src={`${com.getBaseEnvPath().basePath}/images/${component.rawObj.fullName}.png`}/></div>
                <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                    <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', textAlign: 'center' }}>{fullName ? component.rawObj.fullName : component.rawObj.name}</div>
                    {/* <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${com.getUserDataComponentSetting(component.rawObj.id, "obtained") ?? '0'}/${component.rawObj.required}`}</div> */}
                    { componentIsAnomalous ? null : <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${obtainedComponents && obtainedComponents[component.rawObj.id] ? obtainedComponents[component.rawObj.id].obtained : '0'}/${component.rawObj.required}`}</div>}
                </div>
                <TrackItemButton itemId={component.rawObj.id}/>
                <ObtainedResurgenceGroup itemId={component.rawObj.id} positionAbsolute={true}/>
            </div>
            {
                componentIsAnomalous ? null:
                <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
                    <button 
                        className='sized-content h-flex object-page-component-owned-button flex-center'
                        onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); ev.preventDefault(); com.incrementUserDataComponentObtained(component.rawObj.id) }}
                    >
                        +
                    </button>
                    <button 
                        className='sized-content h-flex object-page-component-owned-button flex-center'
                        onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); ev.preventDefault();  com.decrementUserDataComponentObtained(component.rawObj.id) }}
                    >
                        -
                    </button>
                </div>
            }
        </div>
    );
}