'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';

export default function ObtainedLabelButton({ component, isRawObj=false }){
    const router = useRouter();

    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    
    const _component = (isRawObj ? component : component.rawObj);
    const componentIsAnomalous = _component.required <= 0;

    return (
        <div className='sized-content v-flex' style={{ alignSelf: 'stretch', gap: '5px' }}>
            {
                componentIsAnomalous ? null:
                <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
                    <button 
                        className='sized-content h-flex object-page-component-owned-button flex-center'
                        onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); return com.incrementUserDataComponentObtained(_component.id); }}
                    >
                        +
                    </button>
                    <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${obtainedComponents && obtainedComponents[_component.id] ? obtainedComponents[_component.id].obtained : '0'}/${_component.required}`}</div>
                    <button 
                        className='sized-content h-flex object-page-component-owned-button flex-center'
                        onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); return com.decrementUserDataComponentObtained(_component.id); }}
                    >
                        -
                    </button>
                </div>
            }
        </div>
    );
}