'use client';

import { React, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';


import * as com from "@/app/common.js"
import TabHeaderButtonsComponent from './TabHeaderButtonsComponent';

/** changeTab: callback function to change the current tab */
export default function TabComponent({ tabs, defaultTab, onTabChange, className, style }){
    const router = useRouter();

    const [ activeTab, setActiveTab ] = useState(defaultTab);

    const changeTab = tab => {
      setActiveTab(tab);
      if(onTabChange) onTabChange(tab);
    }

    return (
        <div className={`sized-content v-flex flex-center${className ? ` ${className}` : ``}`} style={style}>
            <TabHeaderButtonsComponent 
                tabs={Object.keys(tabs).map(tab => ({ title: tab, id: tab, label: tab }))}
                changeTab={changeTab}
                activeTab={activeTab}
            />
            <div className='sized-content tab-component-body-container v-flex flex-center'>
                {tabs[activeTab]}
            </div>
        </div>
    );
}