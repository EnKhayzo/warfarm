'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useObtainedComponents from '@/hooks/useObtainedComponents.js';

import * as com from "@/app/common.js"

export default function ObtainedItemCheck({ positionAbsolute=true, itemId, obtainedComponents=null }){
    const [ _obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    
    const isObtained = com.objectIsFarmed(com.getObjectFromId(itemId), _obtainedComponents);

    console.log(`is obtained?`, itemId, isObtained);

    return (
            !isObtained ? null:
            <div 
                className={`sized-content obtained-check${ positionAbsolute ? ' absolute' : '' } v-flex flex-center`}
            >
                <img 
                    src={`/warfarm/icons/success.svg`} 
                    className={`sized-content obtained-check-icon flex-center`}
                    style={{
                        
                    }}
                />
            </div>
    );
}