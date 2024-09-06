'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';

export default function ObtainedLabelObject({ object, className, style, collapseWhenNull=true, labelPrefix=null }){
    const router = useRouter();

    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    
    let obtained = null;
    if(object.category === "items"){
        const components = object.components;
        if(components == null) obtained = `Farmed`;
        else{
            // check if all components of this item are obtained
            if(obtainedComponents && 
                Object.keys(components).map(id => com.getObjectFromId(id)).every(component => 
                    obtainedComponents[component.id] && 
                    obtainedComponents[component.id].obtained >= component.required
                )
            ){
                obtained = `Farmed`;
            }
        }
    }
    else if(object.category === "components"){
        if(object.required <= 0) obtained = null;
        else obtained = `${obtainedComponents && obtainedComponents[object.id] ? obtainedComponents[object.id].obtained : '0' }/${object.required}`
    }
    else obtained = null;

    return (
        <div className={`sized-content obtained-label-component${obtained == null || !obtained ? ` hidden` : ``} v-flex${className ?? ``}`} style={style}>
            {`${labelPrefix ?? ''}${obtained ?? (collapseWhenNull ? '' : 'x')}`}
        </div>
    );
}