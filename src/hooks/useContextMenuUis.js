'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useContextMenuUis(){
    const [ contextMenuUis, setContextMenuUis ] = useState(com.getContextMenuUis());

    const listenerFunc = (_contextMenuUis) => {
        setContextMenuUis(_contextMenuUis);
    }

    useEffect(() => {
        com.contextMenuUisObservable.addListener(listenerFunc, true);

        return () => {
            com.contextMenuUisObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ contextMenuUis, setContextMenuUis ];
}