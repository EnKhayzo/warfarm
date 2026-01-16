'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ObjectStateLabel from './ObjectStateLabel';

export default function ObtainedLabelButtonObtained({ component, isRawObj=false, width=null, showLabel=true, style }){
    const router = useRouter();

    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    
    const _component = (isRawObj ? component : component.rawObj);
    const componentIsAnomalous = _component.required <= 0;

    // console.log(`_component`, _component, component);

    return (
        <div className='sized-content v-flex' style={{ alignSelf: 'stretch', gap: '5px', width: width ?? 'auto' }}>
            {
                componentIsAnomalous ? null:
                <div className='sized-content h-flex flex-center' style={com.shallowMerge({ gap: '5px' }, style)}>
                    <button 
                        title='Increase farmed amount'
                        className='sized-content h-flex object-page-component-owned-button flex-center'
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            com.incrementUserDataComponentObtained(_component.id);
                        }}
                    >
                        +
                    </button>
                    { !showLabel ? null: <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${obtainedComponents && obtainedComponents[_component.id] ? obtainedComponents[_component.id].obtained : '0'}/${_component.required}`}</div> }
                    <button 
                        title='Decrease farmed amount'
                        className='sized-content h-flex object-page-component-owned-button flex-center'
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            com.decrementUserDataComponentObtained(_component.id);
                        }}
                    >
                        -
                    </button>
                </div>
            }
        </div>
    );
}