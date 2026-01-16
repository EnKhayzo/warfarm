'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import ObjectStateLabel from '@/components/ObjectStateLabel';
import ResurgenceItemIcon from '@/components/ResurgenceItemIcon';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';
import DucatLabel from '@/components/DucatLabel';

export default function MainItemTitleComponent({ itemId, iconUrl, labelHeader, label, labelFooter }){
    // console.log(`main title!`, itemId, com.getObjectFromId(itemId))
    return (
        <div 
            className='sized-content main-title-page-view-element item-check-parent tracker-item-parent v-flex flex-center' 
            style={{ 
                backgroundColor: 'var(--color-quaternary)',
                borderRadius: '10px',
                padding: '10px',
                gap: '5px', 
                position: 'relative' 
            }}
        >
            <div className='sized-content h-flex flex-center'><img style={{ height: '150px' }} src={iconUrl}/></div>
            { labelHeader ? <div className='sized-content h-flex flex-center'>{labelHeader}</div> : null }
            { label ? <div className='sized-content h-flex flex-center' style={{ fontWeight: 'bold' }}>{label}</div> : null }
            { labelFooter ? <div className='sized-content h-flex flex-center' style={{ fontStyle: 'italic' }}>{labelFooter}</div> : null }
            <ObjectStateLabel object={com.getObjectFromId(itemId)} collapseWhenNull={false}/>
            <ItemActionButton itemId={itemId}/>
            <ObtainedResurgenceGroup itemId={itemId}/>
            <DucatLabel rawObj={com.getObjectFromId(itemId)}/>
        </div>
    );
}
