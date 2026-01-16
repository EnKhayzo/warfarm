'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ObjectStateLabel from './ObjectStateLabel';
import useObtainedExtras from '@/hooks/useObtainedExtras';
import LabelCheckbox from './LabelCheckbox';
import IconButton from './IconButton';
import CraftedButtonExtras from './CraftedButtonExtras';

export default function ObtainedLabelButtonExtras({ component, isRawObj=false, width=null, showLabel=true, style }){
    const router = useRouter();

    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    
    const rawComponent = (isRawObj ? component : component.rawObj);
    const componentIsAnomalous = rawComponent.required <= 0;

    const isFarmed = com.objectIsFarmed(rawComponent);
    const isCrafted = com.getUserDataExtrasCrafted(rawComponent.id);

    const duplicatesNum = com.getUserDataExtrasObtained(rawComponent.id);
    const hasDuplicates = duplicatesNum > 0;

    return (
        <div className='sized-content v-flex' style={{ alignSelf: 'stretch', gap: '5px', width: width ?? 'auto' }}>
            {
                componentIsAnomalous ? null:
                <div className='sized-content h-flex flex-center' style={com.shallowMerge({ gap: '5px' }, style)}>
                    <button 
                        title='Increase duplicates amount'
                        className='sized-content h-flex object-page-component-owned-button flex-center'
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();

                            com.incrementUserDataExtrasObtained(rawComponent.id);
                        }}
                    >
                        +
                    </button>
                    { !showLabel ? null: <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${duplicatesNum} duplicates`}</div> }
                    <button 
                        title='Decrease duplicates amount'
                        className='sized-content h-flex object-page-component-owned-button flex-center'
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();

                            const extrasObtained = com.getUserDataExtrasObtained(rawComponent.id);
                            if(extrasObtained <= 0) com.setUserDataExtrasCrafted(rawComponent.id, false);
                            else com.decrementUserDataExtrasObtained(rawComponent.id);
                        }}
                    >
                        -
                    </button>
                </div>
            }
        </div>
    );
}