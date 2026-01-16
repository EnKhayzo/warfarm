'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import useObtainedExtras from '@/hooks/useObtainedExtras';
import useGlobalMode from '@/hooks/useGlobalMode';

export default function DucatLabel({ rawObj, className, forceShow=false, style }){
    const router = useRouter();

    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    const [ globalMode, setGlobalMode ] = useGlobalMode();

    if((rawObj == null || globalMode !== "ducatMode") && !forceShow) return null;


    let extrasForObject = com.getUserDataExtrasObtained(rawObj.id);

    let ducatValue = com.getDucatValue(rawObj);
    let extrasObtainedValue = extrasForObject*ducatValue;

    if(rawObj.category === "items") {
        const _extrasObtainedValue = com.getItemComponentIds(rawObj.id)
            .reduce((acc, componentId) =>{

                acc += com.getDucatValue(com.getObjectFromId(componentId))*com.getUserDataExtrasObtained(componentId);
                
                // console.log(`component id`, componentId, acc)

                return acc;
            }, 0);

        // extrasForObject = _extrasForObject;
        // ducatValue = _ducatValue;
        extrasObtainedValue =  _extrasObtainedValue;

        // console.log(`values`, rawObj.id, extrasForObject, ducatValue, extrasObtainedValue)
    }

    // console.log(`got value!`,ducatValue);

    return (
        <>
            {
                ducatValue <= 0 ? null:
                <div className={`sized-content obtained-extra-component h-flex flex-center${className ?? ``}`} style={com.shallowMerge({}, style)}>
                    <img style={{ marginTop: '2px', width: '20px', height: '20px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`}/>
                    <span className='sized-content h-flex' style={{ whiteSpace: 'pre' }}>
                        { `${ducatValue}` }
                        { extrasObtainedValue <= 0 ? null: (<div className='sized-content h-flex'>{` (`}<span className='sized-content h-flex' style={{ gap: '2px' }}><img style={{ marginTop: '2px', width: '20px', height: '20px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`}/>{ `${extrasObtainedValue}` }</span>{`)`}</div>) }
                    </span>
                </div>
            }
        </>
    );
}