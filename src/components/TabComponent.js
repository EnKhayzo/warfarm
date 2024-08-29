'use client';

import { React, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';


import * as com from "@/app/common.js"
import TabHeaderButtonsComponent from './TabHeaderButtonsComponent';

/** changeTab: callback function to change the current tab */
export default function TabComponent({ tabs, defaultTab, onTabChange, className, style }){
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabContentRef = useRef(null); // Ref to the tab content container

    // Initialize activeTab with the query parameter or fallback to the defaultTab
    const initialTab = searchParams.get('tab') || defaultTab;
    const [activeTab, setActiveTab] = useState(initialTab);

    // Restore the scroll position if it exists
    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            tabContentRef.current.scrollTop = parseInt(savedScrollPosition, 10);
        }

        // Clean up the saved scroll position after it's used
        sessionStorage.removeItem('scrollPosition');
    }, []);

    useEffect(() => {
        // Save the current scroll position before changing the tab
        sessionStorage.setItem('scrollPosition', tabContentRef.current.scrollTop);


        // Update the activeTab state if the query parameter changes
        if (searchParams.get('tab') !== activeTab) {
            setActiveTab(searchParams.get('tab') || defaultTab);
        }
    }, [searchParams]);

    const changeTab = (tab) => {
        setActiveTab(tab);
        // Update the URL with the new tab value
        router.push(`?tab=${tab}`, undefined, { shallow: true });
        if (onTabChange) onTabChange(tab);
    }

    return (
        <div className={`sized-content v-flex flex-center${className ? ` ${className}` : ``}`} style={style}>
            <TabHeaderButtonsComponent 
                tabs={Object.keys(tabs).map(tab => ({ title: tab, id: tab, label: tab }))}
                changeTab={changeTab}
                activeTab={activeTab}
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
