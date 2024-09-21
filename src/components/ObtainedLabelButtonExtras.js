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

export default function ObtainedLabelButtonExtras({ component, isRawObj=false, width=null, showLabel=true }){
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
            // !isCrafted && !hasDuplicates ?
            //     <LabelCheckbox 
            //         textLabel={`Crafted?`}
            //         containerClassName={"flex-center"}
            //         containerStyle={{
            //             backgroundColor: 'var(--color-secondary)',
            //             borderRadius: '5px',
            //             padding: '5px',
            //             paddingLeft: '10px',
            //             paddingRight: '10px'
            //         }}
            //         onClick={ev => { ev.preventDefault(); ev.stopPropagation(); }}
            //         onChange={ev => {
            //             ev.preventDefault();
            //             ev.stopPropagation();
            //             com.setUserDataExtrasCrafted(rawComponent.id, ev.target.checked);
            //         }}
            //     />
            // :
                <div className='sized-content v-flex' style={{ alignSelf: 'stretch', gap: '5px', width: width ?? 'auto' }}>
                    {
                        componentIsAnomalous ? null:
                        <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
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
                            {/* <IconButton
                                label=''
                                title={`Object is crafted? (${ isCrafted ? `yes` : `no` })`}
                                iconClassName={`icon-default-filter`}
                                iconStyle={{ width: '30px', height: '30px', objectFit: 'contain' }}
                                iconUrl={ isCrafted ? `${com.getBaseEnvPath().basePath}/icons/crafted.svg` : `${com.getBaseEnvPath().basePath}/icons/crafted_hollow.svg` } 
                                onClick={ev => {
                                    ev.preventDefault();
                                    ev.stopPropagation();

                                    com.setUserDataExtrasCrafted(rawComponent.id, !isCrafted);
                                }}
                            /> */}
                            {/* <CraftedButtonExtras object={rawComponent} isRawObj={true}/> */}
                        </div>
                    }
                </div>
    );
}