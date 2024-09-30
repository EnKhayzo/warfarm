'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useTrackedItems from '@/hooks/useTrackedItems.js'

import * as com from "@/app/common.js"
import useGlobalMode from '@/hooks/useGlobalMode';
import TrackItemButton from './TrackItemButton';
import SellItemButton from './SellItemButton';
import DuplicateItemButton from './DuplicateItemButton';
import ComponentsObtainedButton from './ComponentsObtainedButton';

export default function TrackItemGroup({ positionAbsolute=true, itemId, horizontal=false }){
    return (
        <div 
            className={`sized-content ${ horizontal ? `h-flex` : `v-flex` } flex-center sell-button${ positionAbsolute ? ' absolute' : '' }`}
            style={{
                gap: '5px'
            }}
        >
            <TrackItemButton itemId={itemId} positionAbsolute={false}/>
            <DuplicateItemButton itemId={itemId} positionAbsolute={false}/>
        </div>
    );
}