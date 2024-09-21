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

export default function CraftedButtonExtras({positionAbsolute=false, object, isRawObj=false, onlyShowOnHover=false, iconStyle }){
    const router = useRouter();

    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();

    const rawObject = (isRawObj ? object : object.rawObj);
    if(rawObject == null) return null;
    if(rawObject.category !== "items" && rawObject.category !== "components") return null;

    const isFarmed = com.objectIsFarmed(object);
    if(!isFarmed) return null;
    
    const isCrafted = com.objectIsCrafted(rawObject);

    return (
        <IconButton
            label=''
            title={`Set object to${isCrafted ? ` not` : ``} crafted`}
            iconClassName={`icon-default-filter${onlyShowOnHover && !isCrafted ? ` icon-default-show-hover` : ``}${positionAbsolute ? 'absolute' : ''}`}
            iconStyle={com.shallowMerge({ width: '30px', height: '30px', objectFit: 'contain' }, iconStyle)}
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