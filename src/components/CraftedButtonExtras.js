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

export default function CraftedButtonExtras({ object, isRawObj=false }){
    const router = useRouter();

    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    
    const rawObject = (isRawObj ? object : object.rawObj);
    const isCrafted = com.objectIsCrafted(rawObject);

    return (
        <IconButton
            label=''
            title={`Object is crafted? (${ isCrafted ? `yes` : `no` })`}
            iconClassName={`icon-default-filter`}
            iconStyle={{ width: '30px', height: '30px', objectFit: 'contain' }}
            iconUrl={ isCrafted ? `${com.getBaseEnvPath().basePath}/icons/crafted.svg` : `${com.getBaseEnvPath().basePath}/icons/crafted_hollow.svg` } 
            onClick={ev => {
                ev.preventDefault();
                ev.stopPropagation();

                // com.setUserDataExtrasCrafted(rawComponent.id, !isCrafted);
                com.setObjectToCrafted(rawObject, !isCrafted);
            }}
        />
    );
}