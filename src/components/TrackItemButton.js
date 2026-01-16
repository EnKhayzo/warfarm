'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useTrackedItems from '@/hooks/useTrackedItems.js'

import * as com from "@/app/common.js"
import useGlobalMode from '@/hooks/useGlobalMode';

export default function TrackItemButton({ positionAbsolute=true, itemId, showLabel=false, alwaysShow=false, alwaysHide=false, mobileAlwaysShow=true, mobileAlwaysHide=false }){
    const [ trackedItems, setTrackedItems ] = useTrackedItems();
    
    if(alwaysHide) return null;

    const isTracked = trackedItems && trackedItems[itemId] && trackedItems[itemId].tracked;

    return (
            <button 
                title='Track/Untrack Item'
                className={`sized-content star-button${ positionAbsolute ? ' absolute' : '' }${ alwaysShow ?  ` always-show` : `` }${ alwaysHide ?  ` always-hide` : `` }${ mobileAlwaysShow ?  ` mobile-always-show` : `` }${ mobileAlwaysHide ?  ` mobile-always-hide` : `` } h-flex flex-center`}
                style={{ gap: '5px' }}
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
                    className={`sized-content star-button-icon flex-center${ isTracked ? ` tracked` : `` }${ alwaysShow ?  ` always-show` : `` }${ alwaysHide ?  ` always-hide` : `` }${ mobileAlwaysShow ?  ` mobile-always-show` : `` }${ mobileAlwaysHide ?  ` mobile-always-hide` : `` }`}
                    style={{

                    }}
                />
                { !showLabel ? null: <span className='sized-content h-flex flex-center' style={{ fontSize: 'small' }}>Track Item</span> }
            </button>
    );
}