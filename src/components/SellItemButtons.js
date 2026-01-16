'use client';

import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';

import * as com from "@/app/common.js"
import useSellItems from '@/hooks/useSellItems';
import ContextMenu from './ContextMenu';
import ComponentAddButton from '@/app/prime/[category]/[routeId]/subcomponents/ComponentAddButton';
import ItemActionButton from './ItemActionButton';
import ObtainedResurgenceGroup from './ObtainedResurgenceGroup';
import DucatLabel from './DucatLabel';
import ObjectStateLabel from './ObjectStateLabel';
import ResurgenceItemIcon from './ResurgenceItemIcon';
import SellValueLabelObject from './SellValueLabelObject';
import useObtainedExtras from '@/hooks/useObtainedExtras';

export default function SellItemButtons({ component, showLabel=false, alwaysShowLabel=false }){
    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    const [ sellItems, setSellItems ] = useSellItems();

    const componentIsAnomalous = component.required <= 0; 
    const hasDuplicates = com.getUserDataExtrasObtained(component.id); 

    return (
        componentIsAnomalous ? null:
        !hasDuplicates ? <div className='sized-content h-flex flex-center' style={{ maxWidth: '80px', textAlign: 'center', fontSize: 'x-small', fontStyle: 'italic' }}>You don&apos;t have duplicates for this component</div> :
        <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
            <div 
                title='Increase sell amount'
                className='sized-content h-flex object-page-component-owned-button flex-center'
                style={{ cursor: 'pointer' }}
                onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    // console.log(`increment!`);
                    com.incrementUserDataSellItemValue(component.id);
                }}
            >
                +
            </div>
            { !showLabel ? null: <SellValueLabelObject alwaysShowLabel={alwaysShowLabel} object={component}/> }
            <div 
                title='Decrease sell amount'
                className='sized-content h-flex object-page-component-owned-button flex-center'
                style={{ cursor: 'pointer' }}
                onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();

                    com.decrementUserDataSellItemValue(component.id);
                }}
            >
                -
            </div>
        </div>
    );
}