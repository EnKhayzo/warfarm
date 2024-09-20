'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useGlobalMode(){
    const [ globalMode, setGlobalMode ] = useState(com.getUserDataGlobalMode());

    const listenerFunc = (_globalMode) => {
        setGlobalMode(_globalMode);
    }

    useEffect(() => {
        com.globalModeObservable.addListener(listenerFunc, true);

        return () => {
            com.globalModeObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ globalMode, setGlobalMode ];
}