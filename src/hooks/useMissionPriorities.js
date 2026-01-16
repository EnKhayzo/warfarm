'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useMissionPriorities(){
    const [ missionPriorities, setMissionPriorities ] = useState(com.getDefaultMissionTypePriorities());

    const listenerFunc = (_missionPriorities) => {
        setMissionPriorities(_missionPriorities);
    }

    useEffect(() => {
        com.missionPrioritiesObservable.addListener(listenerFunc, true);

        return () => {
            com.missionPrioritiesObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ missionPriorities, setMissionPriorities ];
}