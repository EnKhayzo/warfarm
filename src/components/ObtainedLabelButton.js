'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ObjectStateLabel from './ObjectStateLabel';
import ObtainedLabelButtonObtained from './ObtainedLabelButtonObtained';
import ObtainedLabelButtonExtras from './ObtainedLabelButtonExtras';
import useGlobalMode from '@/hooks/useGlobalMode';

export default function ObtainedLabelButton({ component, isRawObj=false, forceMode=null, width=null, showLabel=true, style }){
    const router = useRouter();

    const [ globalMode, setGlobalMode ] = useGlobalMode();

    if(forceMode != null){
        if(forceMode === "farmMode") return <ObtainedLabelButtonObtained component={component} isRawObj={isRawObj} width={width} showLabel={showLabel} style={style}/>
        else if(forceMode === "ducatMode") return <ObtainedLabelButtonExtras component={component} isRawObj={isRawObj} width={width} showLabel={showLabel} style={style}/>
    }

    const isFarmMode = globalMode == null || globalMode === "farmMode";

    return (
        isFarmMode ? 
            <ObtainedLabelButtonObtained component={component} isRawObj={isRawObj} width={width} showLabel={showLabel} style={style}/>
        :
            <ObtainedLabelButtonExtras component={component} isRawObj={isRawObj} width={width} showLabel={showLabel} style={style}/>
    );
}