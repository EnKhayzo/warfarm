'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useCurrentTrackList(){
    const [ currentTrackList, setCurrentTrackList ] = useState(com.getUserDataCurrentTrackListId());

    const listenerFunc = (_currentTrackList) => {
        setCurrentTrackList(_currentTrackList);
    }

    useEffect(() => {
        com.currentTrackListIdObservable.addListener(listenerFunc, true);

        return () => {
            com.currentTrackListIdObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ currentTrackList, setCurrentTrackList ];
}