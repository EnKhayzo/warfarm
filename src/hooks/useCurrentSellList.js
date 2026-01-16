'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useCurrentSellList(){
    const [ currentSellList, setCurrentSellList ] = useState(com.getUserDataCurrentSellListId());

    const listenerFunc = (_currentSellList) => {
        setCurrentSellList(_currentSellList);
    }

    useEffect(() => {
        com.currentSellListIdObservable.addListener(listenerFunc, true);

        return () => {
            com.currentSellListIdObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ currentSellList, setCurrentSellList ];
}