'use client';

import { React, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import * as com from "@/app/common.js"

/** changeTab: callback function to change the current tab */
export default function IconButton({ label, iconUrl, onClick, className, style, iconClassName, iconHeight='15px' }){
    return (
        <div 
            className={`sized-content icon-button h-flex flex-center${className ? ` ${className}` : ``}`} 
            style={style}
            onClick={onClick}
        >
            <div 
                className='sized-content h-flex flex-center'
                style={{
                  gap: '5px'
                }} 
                onClick={onClick}
              >
                <img className={`sized-content v-flex flex-center${iconClassName ? ` ${iconClassName}` : ``}`} style={{ height: iconHeight }} src={iconUrl}/>
                <div className='sized-content v-flex flex-center' style={{ marginBottom: '2px' }}>{label}</div>
              </div>
        </div>
    );
}