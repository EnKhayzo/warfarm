'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useObtainedComponents from '@/hooks/useObtainedComponents.js';

import * as com from "@/app/common.js"
import ObtainedItemCheck from './ObtainedItemCheck';
import ResurgenceItemIcon from './ResurgenceItemIcon';
import CraftedButtonExtras from './CraftedButtonExtras';
import RelicsOwnedButton from './RelicsOwnedButton';
import ComponentsObtainedButton from './ComponentsObtainedButton';

export default function ObtainedResurgenceGroup({ itemId, showEyeButton=true, positionAbsolute=false, obtainedComponents=null }){
    return (
        <div 
            className='sized-content v-flex item-check-parent' 
            style={{ 
                position: 'absolute',
                top: '5px',
                left: '5px',
                width: '20px',
                height: '20px',
                gap: '5px' 
            }}
        >
            <ResurgenceItemIcon positionAbsolute={false} itemId={itemId}/>
            <ObtainedItemCheck positionAbsolute={false} itemId={itemId}/>
            { !showEyeButton ? null: <ComponentsObtainedButton itemId={itemId} positionAbsolute={false}/> }
            <RelicsOwnedButton positionAbsolute={false} itemId={itemId}/>
            <CraftedButtonExtras 
                positionAbsolute={false} 
                object={com.getObjectFromId(itemId)} 
                isRawObj={true} 
                onlyShowOnHover={true}
                iconStyle={{ width: '20px', height: '20px' }}
            />
        </div>
    );
}