'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import useObtainedExtras from '@/hooks/useObtainedExtras';
import useSellItems from '@/hooks/useSellItems';

export default function SellValueLabelObject({ object, className, style, alwaysShowLabel=false, collapseWhenNull=true, labelPrefix=null }){
    const router = useRouter();

    const [ sellItems, setSellItems ] = useSellItems();
    
    let extras = null;
    if(object.category === "components"){
        const sellValue = com.getUserDataSellItemValue(object.id);
        if(sellValue > 0){
            const ducatsValue = com.getDucatValue(object);
            extras = (<span className='sized-content h-flex' style={{ whiteSpace: 'pre' }}>selling {sellValue} - <img style={{ marginTop: '2px', width: '20px', height: '20px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`} />{ducatsValue*sellValue}</span>);
        }
        else extras = !alwaysShowLabel ? null: (<span className='sized-content h-flex' style={{ whiteSpace: 'pre' }}>selling 0 - <img style={{ marginTop: '2px', width: '20px', height: '20px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`} />0</span>);
    }
    else extras = null;

    return (
        <div className={`sized-content obtained-label-component${extras == null || !extras ? ` hidden` : ``} v-flex${className ?? ``}`} style={style}>
            {`${labelPrefix ?? ''}`}{extras != null || alwaysShowLabel ? extras : (collapseWhenNull ? '' : 'x')}
        </div>
    );
}