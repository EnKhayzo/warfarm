'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useTrackedItems(){
    const [ trackedItems, setTrackedItems ] = useState(com.getUserDataTrackedItems());

    const listenerFunc = (_trackedItems) => {
        setTrackedItems(_trackedItems);
    }

    useEffect(() => {
        com.trackedItemsOvervable.addListener(listenerFunc, true);

        return () => {
            com.trackedItemsOvervable.removeListener(listenerFunc);
        };
    }, [])

    return [ trackedItems, setTrackedItems ];
}