'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useDialogUis(){
    const [ dialogUis, setDialogUis ] = useState(com.getDialogUis());

    const listenerFunc = (_dialogUis) => {
        setDialogUis(_dialogUis);
    }

    useEffect(() => {
        com.dialogsUiObservable.addListener(listenerFunc, true);

        return () => {
            com.dialogsUiObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ dialogUis, setDialogUis ];
}