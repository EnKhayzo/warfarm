'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useObtainedComponents(){
    const [ obtainedComponents, setObtainedComponents ] = useState(com.getObtainedComponents());

    const listenerFunc = (_obtainedComponents) => {
        setObtainedComponents(_obtainedComponents);
    }

    useEffect(() => {
        com.obtainedObservable.addListener(listenerFunc, true);

        return () => {
            com.obtainedObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ obtainedComponents, setObtainedComponents ];
}