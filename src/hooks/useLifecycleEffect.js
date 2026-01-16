'use client';

import React, { useState, useEffect, useRef } from 'react';

import * as com from "@/app/common.js"

/**
 * calls a useEffect for each possible lifeCycle status/update: \
 * mount \
 * data update \
 * any update \
 * clear or unmount \
 * unmount
 * @param {{ dataArray?: any[], mount?: Function, dataUpdate?: Function, anyUpdate?: Function, clearOrUnmount?: Function, unmount?: Function }} options 
 */
export default function useLifecycleEffect(options){
    const mounted = useRef(false);
    const unmounted = useRef(false);

    // mount
    useEffect(() => {
        if(!mounted.current && options && options.mount) { options.mount(); mounted.current = true; };
    }, []);                               
    
    // data update
    useEffect(() => {
        if(options && options.dataUpdate) options.dataUpdate();
    }, options && options.dataArray ? options.dataArray : []);                  
    
    // any update
    useEffect(() => {
        if(options && options.anyUpdate) options.anyUpdate()
    });                              
    
    // clear or unmount
    useEffect(() => {
        if (options && options.clearOrUnmount) return options.clearOrUnmount();
    }, options && options.dataArray ? options.dataArray : [] ); 
    
    // unmount
    useEffect(() => {
        if (!unmounted.current && options && options.unmount){ unmounted.current = true; return options.unmount(); };
    }, [] );                       
}