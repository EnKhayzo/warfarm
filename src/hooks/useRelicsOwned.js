'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useRelicsOwned(){
    const [ relicsOwned, setRelicsOwned ] = useState(com.getRelicsOwned());

    const listenerFunc = (_relicsOwned) => {
        setRelicsOwned(_relicsOwned);
    }

    useEffect(() => {
        com.relicsOwnedObservable.addListener(listenerFunc, true);

        return () => {
            com.relicsOwnedObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ relicsOwned, setRelicsOwned ];
}