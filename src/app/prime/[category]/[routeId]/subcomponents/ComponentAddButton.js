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
import ObjectStateLabel from '@/components/ObjectStateLabel';
import ObtainedLabelObject from '@/components/ObtainedLabelObject';
import ObtainedLabelButton from '@/components/ObtainedLabelButton';

export default function ComponentAddButton({ component, isRawObj=false, fullName=false, iconHeight='75px', width=null }){
    const router = useRouter();

    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

    if(component == null) { console.warn("component is null!"); return null; }

    const route = isRawObj ? com.getObjectRouteFromId(component.id) : component.route;
    const rarity = isRawObj ? com.getComponentRarity(component) : component.rarity;

    // console.log(`rarity`, rarity)

    if(!isRawObj) component = component.rawObj;

    const componentIsAnomalous = component.required <= 0;

    return (
        <div className='sized-content v-flex' style={{ alignSelf: 'stretch', gap: '5px' }}>
            <Link 
                href={route}
                // onClick={() => router.push(route)}
                className={`sized-content item-page-component-container item-check-parent tracker-item-parent v-flex flex-center${` ${rarity}` ?? ''}`}
                style={{
                    gap: '5px',
                    position: 'relative',
                    cursor: 'pointer',
                    width: width ?? 'auto', 
                    alignSelf: 'stretch'
                }}
            >
                <div className='sized-content h-flex flex-center'><img style={{ height: iconHeight }} src={`${com.getBaseEnvPath().basePath}/images/${component.fullName}.png`}/></div>
                <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                    <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', textAlign: 'center' }}>{fullName ? component.fullName : component.name}</div>
                    {/* <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${com.getUserDataComponentSetting(component.rawObj.id, "obtained") ?? '0'}/${component.rawObj.required}`}</div> */}
                    {/* { componentIsAnomalous ? null : <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${obtainedComponents && obtainedComponents[component.rawObj.id] ? obtainedComponents[component.rawObj.id].obtained : '0'}/${component.rawObj.required}`}</div>} */}
                    { componentIsAnomalous ? null : <ObjectStateLabel object={com.getObjectFromId(component.id)}/> }
                </div>
                <ItemActionButton itemId={component.id}/>
                <ObtainedResurgenceGroup itemId={component.id} positionAbsolute={true}/>
                <DucatLabel rawObj={com.getObjectFromId(component.id)}/>
            </Link>
            <ObtainedLabelButton component={component} isRawObj={true} showLabel={false}/>
        </div>
    );
}