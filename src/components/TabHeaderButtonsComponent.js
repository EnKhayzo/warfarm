'use client';

import { React, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';


import * as com from "@/app/common.js"

/** changeTab: callback function to change the current tab */
export default function TabHeaderButtonsComponent({ tabs, activeTab, changeTab }){
    const router = useRouter();

    return (
        <div 
            className='sized-content tab-header-tab-button-container h-flex flex-center'
            style={{ overflow: 'auto' }}
        >
            {
                tabs.map((tab, index) => (
                    <button 
                        key={`${index}-${tab.title}`}
                        title={tab.title} 
                        onClick={() => { 
                            changeTab(tab.id); 
                        }} 
                        className={`tab-header-tab-button${activeTab.localeCompare(tab.id) == 0 ? ` selected` : ``}`}
                    >
                        {tab.label}
                    </button>
                ))
            }
        </div>
    );
}