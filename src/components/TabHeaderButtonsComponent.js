'use client';

import { React, useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


import * as com from "@/app/common.js"
import IconButton from './IconButton';
import ContextMenuButton from './ContextMenuButton';
import { ScrollPaneContext } from '@/contexts/ScrollPaneContext';

/** changeTab: callback function to change the current tab */
export default function TabHeaderButtonsComponent({ tabs, activeTab, changeTab, headerControls=null }){
    const router = useRouter();
    const pathName = usePathname();  
    const searchParams = useSearchParams();

    const scrollPaneContext = useContext(ScrollPaneContext);

    return (
        <div 
            className='sized-content tab-header h-flex flex-center'
            style={{ position: 'relative', alignSelf: 'stretch' }}
        >
            <div 
                className='sized-remaining tab-header-tab-button-container h-flex flex-center'
                style={{ overflow: 'auto', flexWrap: 'wrap' }}
            >
                {
                    tabs.map((tab, index) => (
                        <Link 
                            key={`${index}-${tab.title}`}
                            href={`?${(
                                    () => {
                                        // tab=${tab.id}

                                        // Get the current search params
                                        const currentParams = new URLSearchParams(searchParams.toString());

                                        // Set or update the 'tab' query parameter
                                        currentParams.set('tab', tab.id);

                                        return currentParams.toString();
                                    }
                            )()}`}
                            title={tab.title} 
                            onClick={(ev) => {
                                if(`${pathName}?${searchParams.toString()}` === `${pathName}?tab=${tab.id}`) {  ev.preventDefault(); ev.stopPropagation();  return;}

                                changeTab(tab.id); 
                            }} 
                            className={`tab-header-link tab-header-tab-button${activeTab.localeCompare(tab.id) == 0 ? ` selected` : ``}`}
                        >
                            {tab.label}
                        </Link>
                    ))
                }
            </div>
            {
                !(headerControls && headerControls[activeTab]) ? null:
                <div className='sized-content h-flex flex-center'>
                    <ContextMenuButton 
                        className='sized-content h-flex tab-component-header-control-button'
                        headerContent={<img className='sized-content h-flex flex-center icon-default-filter' style={{ width: '20px', height: '20px' }} src={`${com.getBaseEnvPath().basePath}/icons/filter.svg`}/>}
                    >
                       {
                        (props) => (headerControls[activeTab])
                       } 
                    </ContextMenuButton>
                    {/* <div 
                        className='sized-content h-flex flex-center tab-component-header-control-container'
                        style={{ 
                            position: 'absolute',
                            right: '10px',
                            marginRight: 'auto', 
                            order: '2' 
                        }}
                    >
                        {headerControls[activeTab]}
                    </div> */}
                </div>
            }
        </div>
    );
}