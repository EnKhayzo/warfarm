'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useObtainedComponents from '@/hooks/useObtainedComponents.js';

import * as com from "@/app/common.js"
import ObtainedItemCheck from './ObtainedItemCheck';
import ResurgenceItemIcon from './ResurgenceItemIcon';

export default function ObtainedResurgenceGroup({ itemId, obtainedComponents=null }){
    return (
        <div 
            className='sized-content v-flex flex-center' 
            style={{ 
                position: 'absolute',
                top: '5px',
                left: '5px',
                gap: '5px' 
            }}
        >
            <ObtainedItemCheck positionAbsolute={false} itemId={itemId}/>
            <ResurgenceItemIcon positionAbsolute={false} itemId={itemId}/>
        </div>
    );
}