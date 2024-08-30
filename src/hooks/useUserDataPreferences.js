'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useUserDataPreferences(){
    const [ userPreferences, setUserPreferences ] = useState(com.getUserDataPreferences());

    const listenerFunc = (_userPreferences) => {
        setUserPreferences(_userPreferences);
    }

    useEffect(() => {
        com.preferencesObservable.addListener(listenerFunc, true);

        return () => {
            com.preferencesObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ userPreferences, setUserPreferences ];
}