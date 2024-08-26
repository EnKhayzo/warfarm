'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import * as com from "@/app/common.js"

export default function ComponentAddButtons({ component, width=null }){
    const router = useRouter();

    if(component.required <= 0) return (<></>)

    return (
        <div className='sized-content h-flex flex-center' style={{ width: width ?? 'auto', gap: '5px' }}>
            <button 
                className='sized-content h-flex object-page-component-owned-button flex-center'
                onClick={() => com.incrementUserDataComponentObtained(component.id)}
            >
                +
            </button>
            <button 
                className='sized-content h-flex object-page-component-owned-button flex-center'
                onClick={() => com.decrementUserDataComponentObtained(component.id)}
            >
                -
            </button>
        </div>
    );
}