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

export default function ObtainedLabelButton({ component, isRawObj=false, width=null, showLabel=true }){
    const router = useRouter();

    const [ globalMode, setGlobalMode ] = useGlobalMode();
    const isFarmMode = globalMode == null || globalMode === "farmMode";

    return (
        isFarmMode ? 
            <ObtainedLabelButtonObtained component={component} isRawObj={isRawObj} width={width} showLabel={showLabel}/>
        :
            <ObtainedLabelButtonExtras component={component} isRawObj={isRawObj} width={width} showLabel={showLabel}/>
    );
}