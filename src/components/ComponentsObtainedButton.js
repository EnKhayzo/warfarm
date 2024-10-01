'use client';

import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';

import * as com from "@/app/common.js"
import useSellItems from '@/hooks/useSellItems';
import ContextMenu from './ContextMenu';
import ComponentAddButton from '@/app/prime/[category]/[routeId]/subcomponents/ComponentAddButton';
import ItemActionButton from './ItemActionButton';
import ObtainedResurgenceGroup from './ObtainedResurgenceGroup';
import DucatLabel from './DucatLabel';
import ObjectStateLabel from './ObjectStateLabel';
import ResurgenceItemIcon from './ResurgenceItemIcon';
import SellValueLabelObject from './SellValueLabelObject';
import useObtainedExtras from '@/hooks/useObtainedExtras';
import ObtainedLabelButtonExtras from './ObtainedLabelButtonExtras';
import useRelicsOwned from '@/hooks/useRelicsOwned';
import RelicsOwnedLabelAddButton from './RelicsOwnedLabelAddButton';
import useObtainedComponents from '@/hooks/useObtainedComponents';

export default function ComponentsObtainedButton({ positionAbsolute=true, itemId }){
    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    
    const rawObj = com.getObjectFromId(itemId);
    if(rawObj == null || (rawObj.category !== "components" && rawObj.category !== "items" && rawObj.category !== "relics")) return null;

    const components = com.getObjectComponents(rawObj);
    const obtainedNum = components.reduce((acc, component) => {
        acc += com.getUserDataComponentObtainedValue(component.id);
        return acc;
    }, 0)

    return (
        <>
            <button 
                title={`Set obtained/farmed components`}
                className={`sized-content sell-button${ positionAbsolute ? ' absolute' : '' } h-flex`}
                style={{ gap: '5px' }}
                onClick={(ev) => { 
                    ev.stopPropagation(); 
                    ev.preventDefault();

                    const id = itemId;

                    const targetBB = ev.target.getBoundingClientRect();

                    com.toggleContextMenuUis({
                        position: { top: `${targetBB.top + 10}px`, left: `${targetBB.left + 10}px` },
                        children: (props) => (
                            <div
                                className='sized-content h-flex flex-center'
                                style={{ 
                                    cursor: 'default', 
                                    borderRadius: '10px', 
                                    padding: '10px', 
                                    alignSelf: 'stretch', 
                                    gap: '20px' 
                                }}
                                onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); }}
                            >
                                {
                                    components.map((component, index) => (
                                        <ComponentAddButton key={`${index}-${component.id}`} fullName={true} component={component} isRawObj={true} forceMode={"farmMode"}/>
                                    ))
                                }
                            </div>
                        )
                    });
                }}
            > 
                <img 
                    src={`${com.getBaseEnvPath().basePath}/icons/eye.svg`} 
                    className={`sized-content ${ obtainedNum > 0 ? `eye-icon` : `sell-button-icon` } icon-default-filter flex-center`}
                    style={{

                    }}
                />
                { !(obtainedNum > 0) ? null: <span className='sized-content h-flex flex-center' style={{ marginBottom: '2px', fontSize: 'small', fontStyle: 'italic' }}>{obtainedNum}</span>}
            </button>
        </>
    );
}