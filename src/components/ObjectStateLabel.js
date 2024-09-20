'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ObtainedLabelObject from './ObtainedLabelObject';
import ExtrasLabelObject from './ExtrasLabelObject';
import useGlobalMode from '@/hooks/useGlobalMode';

export default function ObjectStateLabel({ object, className, style, exclusiveMode=null, collapseWhenNull=true, labelPrefix=null }){
    const router = useRouter();

    const [ globalMode, setGlobalMode ] = useGlobalMode();
    const isFarmMode = globalMode == null || globalMode === "farmMode";

    const isCorrectExclusiveMode = exclusiveMode == null || globalMode === exclusiveMode;
    // const isCorrectExclusiveMode = true;

    return (
        isFarmMode ?
            (!isCorrectExclusiveMode ? null: <ObtainedLabelObject object={object} className={className} style={style} collapseWhenNull={collapseWhenNull} labelPrefix={labelPrefix}/>)
        :
            (!isCorrectExclusiveMode ? null: <ExtrasLabelObject object={object} className={className} style={style} collapseWhenNull={collapseWhenNull} labelPrefix={labelPrefix}/>)
       );
}