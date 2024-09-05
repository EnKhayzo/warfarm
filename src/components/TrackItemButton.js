'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useTrackedItems from '@/hooks/useTrackedItems.js'

import * as com from "@/app/common.js"

export default function TrackItemButton({ positionAbsolute=true, itemId }){
    const [ trackedItems, setTrackedItems ] = useTrackedItems();
    
    const isTracked = trackedItems && trackedItems[itemId] && trackedItems[itemId].tracked;

    return (
            <button 
                className={`sized-content star-button${ positionAbsolute ? ' absolute' : '' } v-flex flex-center`}
                onClick={(ev) => { 
                    ev.stopPropagation(); 
                    ev.preventDefault();

                    const id = itemId;
                                        
                    const trackedItem = com.getUserDataTrackedItem(id) ?? {};
                    trackedItem.tracked = !(trackedItem.tracked ?? false);

                    com.setUserDataTrackedItem(id, trackedItem);
                }}
            >
                <img 
                    src={ isTracked ? `${com.getBaseEnvPath().basePath}/icons/star_hollow_filled.svg` : `${com.getBaseEnvPath().basePath}/icons/star_hollow.svg`} 
                    className={`sized-content star-button-icon flex-center${ isTracked ? ` tracked` : `` }`}
                    style={{

                    }}
                />
            </button>
    );
}