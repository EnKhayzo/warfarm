'use client';

import { React, useState, useEffect, useRef, useContext } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';


import * as com from "@/app/common.js"
import TabHeaderButtonsComponent from './TabHeaderButtonsComponent';
import { ScrollPaneContext } from '@/contexts/ScrollPaneContext';

/** changeTab: callback function to change the current tab */
export default function TabComponent({ tabs, defaultTab, onTabChange, className, style, hasMinWidth=false, headerControls=null }){
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabContentRef = useRef(null); // Ref to the tab content container

    // Initialize activeTab with the query parameter or fallback to the defaultTab
    const initialTab = searchParams.get('tab') || defaultTab;
    const [activeTab, setActiveTab] = useState(initialTab);

    const changeTab = (tab) => {
        setActiveTab(tab);
        if (onTabChange) onTabChange(tab);
    }

    return (
        <div className={`sized-content v-flex tab-component-container flex-center${className ? ` ${className}` : ``}`} style={com.shallowMerge({}, style)}>
            <TabHeaderButtonsComponent 
                tabs={Object.keys(tabs).map(tab => ({ title: tab, id: tab, label: tab }))}
                changeTab={changeTab}
                activeTab={activeTab}
                headerControls={headerControls}
            />
            <div 
                className='sized-content tab-component-body-container v-flex flex-center'
                ref={tabContentRef} // Attach the ref to the content container
            >
                {tabs[activeTab]}
            </div>
        </div>
    );
}
