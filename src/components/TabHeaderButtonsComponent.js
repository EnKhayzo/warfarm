'use client';

import { React, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';


import * as com from "@/app/common.js"

/** changeTab: callback function to change the current tab */
export default function TabHeaderButtonsComponent({ tabs, activeTab, changeTab, headerControls=null }){
    const router = useRouter();

    return (
        <div 
            className='sized-content tab-header h-flex flex-center'
            style={{ position: 'relative', alignSelf: 'stretch' }}
        >
            <div 
                className='sized-remaining tab-header-tab-button-container h-flex flex-center'
                style={{ overflow: 'auto' }}
            >
                {
                    tabs.map((tab, index) => (
                        <a 
                            key={`${index}-${tab.title}`}
                            href={`?tab=${tab.id}`}
                            title={tab.title} 
                            onClick={(ev) => { 
                                ev.preventDefault();
                                changeTab(tab.id); 
                            }} 
                            className={`tab-header-tab-button${activeTab.localeCompare(tab.id) == 0 ? ` selected` : ``}`}
                        >
                            {tab.label}
                        </a>
                    ))
                }
            </div>
            {
                !(headerControls && headerControls[activeTab]) ? null:
                <div 
                    className='sized-content h-flex flex-center'
                    style={{ 
                        position: 'absolute',
                        right: '10px',
                        marginRight: 'auto', 
                        order: '2' 
                    }}
                >
                    {headerControls[activeTab]}
                </div>
            }
        </div>
    );
}