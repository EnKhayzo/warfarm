'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import * as com from "@/app/common.js"

export default function ToggleSwitch({ onChange }){
    const router = useRouter();

    return (
        <label className='toggle-switch'>
            <input type="checkbox" onChange={onChange} defaultChecked={true}/>
            <span className='slider round'/>
        </label>
    );
}