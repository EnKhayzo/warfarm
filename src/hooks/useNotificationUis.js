'use client';

import React, { useState, useEffect } from 'react';

import * as com from "@/app/common.js"

export default function useNotificationUis(){
    const [ notificationUis, setNotificationUis ] = useState(com.getNotificationUis());

    const listenerFunc = (_notificationUis) => {
        setNotificationUis(_notificationUis);
    }

    useEffect(() => {
        com.notificationsUiObservable.addListener(listenerFunc, true);

        return () => {
            com.notificationsUiObservable.removeListener(listenerFunc);
        };
    }, [])

    return [ notificationUis, setNotificationUis ];
}