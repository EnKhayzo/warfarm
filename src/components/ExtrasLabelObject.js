'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import useObtainedExtras from '@/hooks/useObtainedExtras';

export default function ExtrasLabelObject({ object, className, style, collapseWhenNull=true, labelPrefix=null }){
    const router = useRouter();

    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    
    let extras = null;
    if(object.category === "items"){
        const extrasObtained = com.getItemComponentIds(object.id).reduce((acc, componentId) =>{
            acc += com.getUserDataExtrasObtained(componentId);
            return acc;
        }, 0);
        extras = `${extrasObtained} duplicates`;
    }
    else if(object.category === "components"){
        const extrasObtained = com.getUserDataExtrasObtained(object.id);
        extras = `${extrasObtained} duplicate${ extrasObtained == 1 ? `` : `s` }`;
    }
    else extras = null;

    return (
        <div className={`sized-content obtained-label-component${extras == null || !extras ? ` hidden` : ``} v-flex${className ?? ``}`} style={style}>
            {`${labelPrefix ?? ''}${extras ?? (collapseWhenNull ? '' : 'x')}`}
        </div>
    );
}