'use client';

import { React, useState, useEffect, useRef, useContext } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';


import * as com from "@/app/common.js"
import TabHeaderButtonsComponent from './TabHeaderButtonsComponent';
import { ScrollPaneContext } from '@/contexts/ScrollPaneContext';

/** changeTab: callback function to change the current tab */
export default function TabComponent({ tabs, defaultTab, onTabChange, className, style, headerControls=null }){
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabContentRef = useRef(null); // Ref to the tab content container

    // Initialize activeTab with the query parameter or fallback to the defaultTab
    const initialTab = searchParams.get('tab') || defaultTab;
    const [activeTab, setActiveTab] = useState(initialTab);

    // Restore the scroll position if it exists
    // useEffect(() => {
    //     const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    //     if (savedScrollPosition) {
    //         tabContentRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    //     }

    //     // Clean up the saved scroll position after it's used
    //     sessionStorage.removeItem('scrollPosition');
    // }, []);

    // useEffect(() => {
    //     // Save the current scroll position before changing the tab
    //     sessionStorage.setItem('scrollPosition', tabContentRef.current.scrollTop);


    //     // Update the activeTab state if the query parameter changes
    //     if (searchParams.get('tab') !== activeTab) {
    //         setActiveTab(searchParams.get('tab') || defaultTab);
    //     }
    // }, [searchParams]);

    const changeTab = (tab) => {
        // setActiveTab(tab);
        // // Update the URL with the new tab value

        // // router.query.tab = tab;
        // // router.push({ query: { ...router.query, tab: tab } }, undefined, { shallow: true });

        // console.log(`router query`, router.query);
        
        // router.push(`?tab=${tab}`, undefined, { shallow: true });

        // if (onTabChange) onTabChange(tab);


        setActiveTab(tab);

        // // Get the current search params
        // const currentParams = new URLSearchParams(searchParams.toString());

        // // Set or update the 'tab' query parameter
        // currentParams.set('tab', tab);

        // console.log(`currne tparams`, currentParams.toString(), currentParams);

        // // Update the URL with the new query parameters without refreshing the page
        // router.push(`?${currentParams.toString()}`, undefined, { shallow: true });

        if (onTabChange) onTabChange(tab);
    }

    return (
        <div className={`sized-content v-flex tab-component-container flex-center${className ? ` ${className}` : ``}`} style={com.shallowMerge({ minWidth: '980px' }, style)}>
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
