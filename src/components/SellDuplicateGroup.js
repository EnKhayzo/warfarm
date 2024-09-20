'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useTrackedItems from '@/hooks/useTrackedItems.js'

import * as com from "@/app/common.js"
import useGlobalMode from '@/hooks/useGlobalMode';
import TrackItemButton from './TrackItemButton';
import SellItemButton from './SellItemButton';
import DuplicateItemButton from './DuplicateItemButton';

export default function SellDuplicateGroup({ positionAbsolute=true, itemId, horizontal=false }){
    const [ trackedItems, setTrackedItems ] = useTrackedItems();

    return (
        <div 
            className={`sized-content ${ horizontal ? `h-flex` : `v-flex` } flex-center sell-button${ positionAbsolute ? ' absolute' : '' }`}
            style={{
                gap: '5px'
            }}
        >
            <SellItemButton itemId={itemId} positionAbsolute={false}/>
            <DuplicateItemButton itemId={itemId} positionAbsolute={false}/>
        </div>
    );
}