'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useObtainedExtras(){
    const [ obtainedExtras, setObtainedExtras ] = useState(com.getObtainedExtras());

    const listenerFunc = (_obtainedExtras) => {
        setObtainedExtras(_obtainedExtras);
    }

    useEffect(() => {
        com.extrasObservable.addListener(listenerFunc, true);

        return () => {
            com.extrasObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ obtainedExtras, setObtainedExtras ];
}