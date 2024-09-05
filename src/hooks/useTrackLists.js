'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useTrackLists(){
    const [ trackLists, setTrackLists ] = useState(com.getUserDataTrackLists());

    const listenerFunc = (_trackLists) => {
        setTrackLists(_trackLists);
    }

    useEffect(() => {
        com.trackListsObservable.addListener(listenerFunc, true);

        return () => {
            com.trackListsObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ trackLists, setTrackLists ];
}