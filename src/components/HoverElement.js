'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useObtainedComponents from '@/hooks/useObtainedComponents.js';

import * as com from "@/app/common.js"

export default function HoverElement({ children, headerContent, headerClassName=null, headerStyle=null, absoluteContainerStyle=null, className=null, style=null }){
    return (
        <div 
            className={`sized-content v-flex flex-center${headerClassName ? ` ${headerClassName}` : ``} hover-container`}
            style={com.shallowMerge({ borderRadius: '10px', padding: '10px', position: 'relative' }, headerStyle)}
        >
            <div className='sized-content h-flex flex-center hover-element'>{headerContent}</div>
            <div className='sized-content v-flex flex-center' style={com.shallowMerge({pointerEvents: 'none',  width: '500px', bottom: '30px', position: 'absolute' }, absoluteContainerStyle)}>
                <div
                    className={`sized-content v-flex flex-center${className ? ` ${className}` : ``} hover-element-child-container`}
                    style={com.shallowMerge({ backgroundColor: 'var(--color-quaternary)', borderRadius: '10px', padding: '10px' }, style)}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}