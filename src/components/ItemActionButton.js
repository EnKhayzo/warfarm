'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useTrackedItems from '@/hooks/useTrackedItems.js'

import * as com from "@/app/common.js"
import useGlobalMode from '@/hooks/useGlobalMode';
import TrackItemButton from './TrackItemButton';
import SellItemButton from './SellItemButton';
import SellDuplicateGroup from './SellDuplicateGroup';
import DuplicateItemButton from './DuplicateItemButton';
import TrackItemGroup from './TrackItemGroup';

export default function ItemActionButton({ positionAbsolute=true, itemId, horizontal=false }){
    const [ trackedItems, setTrackedItems ] = useTrackedItems();

    const [ globalMode, setGlobalMode ] = useGlobalMode();
    const isFarmMode = globalMode == null || globalMode === "farmMode";

    if(!isFarmMode) return (<SellDuplicateGroup horizontal={horizontal} positionAbsolute={positionAbsolute} itemId={itemId}/>);
    else return (<TrackItemGroup horizontal={horizontal} positionAbsolute={positionAbsolute} itemId={itemId}/>);
}
