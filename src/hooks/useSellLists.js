'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useSellLists(){
    const [ sellLists, setSellLists ] = useState(com.getUserDataSellLists());

    const listenerFunc = (_sellLists) => {
        setSellLists(_sellLists);
    }

    useEffect(() => {
        com.sellListsObservable.addListener(listenerFunc, true);

        return () => {
            com.sellListsObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ sellLists, setSellLists ];
}