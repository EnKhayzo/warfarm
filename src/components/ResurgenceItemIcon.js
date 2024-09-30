'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useObtainedComponents from '@/hooks/useObtainedComponents.js';

import * as com from "@/app/common.js"

export default function ResurgenceItemIcon({ positionAbsolute=true, itemId, obtainedComponents=null, iconStyle }){
    const isRelicResurgence = itemId === "Forma Blueprint" ? false : com.isObjectResurgence(itemId);

    return (
            !isRelicResurgence ? null:
            <div 
                className={`sized-content resurgence-check${ positionAbsolute ? ' absolute' : '' } v-flex flex-center`}
            >
                <img 
                    style={com.shallowMerge({ opacity: '100%' }, iconStyle)}
                    src={`${com.getBaseEnvPath().basePath}/icons/resurgence.svg`} 
                    className={`sized-content resurgence-check-icon flex-center`}
                />
            </div>
    );
}