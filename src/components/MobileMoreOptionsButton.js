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
import ComponentsObtainedButton from './ComponentsObtainedButton';
import RelicsOwnedButton from './RelicsOwnedButton';
import TrackItemButton from './TrackItemButton';
import SellItemButton from './SellItemButton';
import DuplicateItemButton from './DuplicateItemButton';

export default function MobileMoreOptionsButton({ positionAbsolute=true, itemId }){
    return (
        <>
            <button 
                title={`More options`}
                className={`sized-content mobile-more-options-button${ positionAbsolute ? ' absolute' : '' } h-flex`}
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
                                className='sized-content v-flex'
                                style={{ 
                                    cursor: 'default', 
                                    borderRadius: '10px', 
                                    padding: '10px', 
                                    alignSelf: 'stretch', 
                                    gap: '20px',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap'
                                }}
                                onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); }}
                            >
                                <TrackItemButton itemId={itemId} positionAbsolute={false} showLabel={true}/>
                                <ComponentsObtainedButton positionAbsolute={false} itemId={itemId} showLabel={true}/>
                                <DuplicateItemButton itemId={itemId} positionAbsolute={false} showLabel={true}/>
                                <SellItemButton itemId={itemId} positionAbsolute={false} showLabel={true}/>
                                <RelicsOwnedButton positionAbsolute={false} itemId={itemId} showIfHas={false} showLabel={true}/>
                            </div>
                        )
                    });
                }}
            > 
                <img 
                    src={`${com.getBaseEnvPath().basePath}/icons/more.svg`} 
                    className={`sized-content mobile-more-options-icon icon-default-filter flex-center`}
                    style={{

                    }}
                />
            </button>
        </>
    );
}