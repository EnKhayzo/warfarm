'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import ObtainedLabelObject from '@/components/ObtainedLabelObject';

export default function MainItemTitleComponent({ itemId, iconUrl, labelHeader, label, labelFooter }){
    return (
        <div className='sized-content main-title-page-view-element tracker-item-parent v-flex flex-center' style={{ gap: '5px', position: 'relative' }}>
            <div className='sized-content h-flex flex-center'><img style={{ height: '150px' }} src={iconUrl}/></div>
            { labelHeader ? <div className='sized-content h-flex flex-center'>{labelHeader}</div> : null }
            { label ? <div className='sized-content h-flex flex-center' style={{ fontWeight: 'bold' }}>{label}</div> : null }
            { labelFooter ? <div className='sized-content h-flex flex-center' style={{ fontStyle: 'italic' }}>{labelFooter}</div> : null }
            <ObtainedLabelObject object={com.getObjectFromId(itemId)} collapseWhenNull={false}/>
            <TrackItemButton itemId={itemId}/>
        </div>
    );
}
