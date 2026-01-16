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
import useRelicsOwned from '@/hooks/useRelicsOwned';

export default function RelicsOwnedLabelAddButton({ relic, refinement="intact", width=null, showLabel=true, style }){
    const router = useRouter();

    const [ relicsOwned, setRelicsOwned ] = useRelicsOwned();

    if(relic.category !== "relics") return null;

    const relicNum = com.getUserDataRelicsOwnedValue(relic.id, refinement);

    return (
        <div className='sized-content v-flex' style={{ alignSelf: 'stretch', gap: '5px', width: width ?? 'auto' }}>
            <div className='sized-content h-flex flex-center' style={com.shallowMerge({ gap: '5px' }, style)}>
                <button 
                    title='Increase relics owned amount'
                    className='sized-content h-flex object-page-component-owned-button flex-center'
                    onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();

                        com.incrementUserDataRelicsOwned(relic.id, refinement);
                    }}
                >
                    +
                </button>
                { !showLabel ? null: <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${relicNum} owned`}</div> }
                <button 
                    title='Decrease relics owned amount'
                    className='sized-content h-flex object-page-component-owned-button flex-center'
                    onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();

                        com.decrementUserDataRelicsOwned(relic.id, refinement);
                    }}
                >
                    -
                </button>
            </div>
        </div>
    );
}