'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useSellItems(){
    const [ sellItems, setSellItems ] = useState(com.getUserDataSellItems());

    const listenerFunc = (_sellItems) => {
        setSellItems(_sellItems);
    }

    useEffect(() => {
        com.sellItemsOvervable.addListener(listenerFunc, true);

        return () => {
            com.sellItemsOvervable.removeListener(listenerFunc);
        };
    }, [])

    return [ sellItems, setSellItems ];
}