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

export default function RelicsOwnedButton({ positionAbsolute=true, itemId, showIfHas=true, iconStyle, showLabel=false, alwaysShow=false, alwaysHide=false, mobileAlwaysShow=true, mobileAlwaysHide=false }){
    const [ relicsOwned, setRelicsOwned ] = useRelicsOwned();
    
    const rawObj = com.getObjectFromId(itemId);
    if(rawObj == null || rawObj.category !== "relics") return null;

    const relicNum = com.getUserDataRelicsOwnedValueTotal(rawObj.id);

    return (
        !(showIfHas || (!showIfHas && relicNum > 0)) ? null:
            <>
                <button 
                    title={`Set owned relics (per refinement level)`}
                    className={`sized-content sell-button${ positionAbsolute ? ' absolute' : '' }${ alwaysShow ?  ` always-show` : `` }${ alwaysHide ?  ` always-hide` : `` }${ mobileAlwaysShow ?  ` mobile-always-show` : `` }${ mobileAlwaysHide ?  ` mobile-always-hide` : `` } h-flex`}
                    style={{ gap: '5px', alignItems: 'center' }}
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
                                        com.getRelicRefinements().map((refinement, index) => (
                                            <div 
                                                key={`${index}-${refinement}`}
                                                className='sized-content v-flex flex-center'
                                            >
                                                <img style={{ width: '100px', height: '100px', objectFit: 'cover' }} src={`${com.getBaseEnvPath().basePath}/images/${rawObj.tier} ${com.capitalizeFirstLetter(refinement)}.png`} />
                                                <span style={{ fontWeight: 'bold' }}>{rawObj.name}</span>
                                                <span>{com.capitalizeFirstLetter(refinement)}</span>
                                                <RelicsOwnedLabelAddButton  relic={rawObj} refinement={refinement}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        });
                    }}
                >
                    <img 
                        src={`${com.getBaseEnvPath().basePath}/icons/owned.svg`} 
                        className={`sized-content ${ relicNum > 0 ? `eye-icon` : `sell-button-icon` }${ alwaysShow ?  ` always-show` : `` }${ alwaysHide ?  ` always-hide` : `` }${ mobileAlwaysShow ?  ` mobile-always-show` : `` }${ mobileAlwaysHide ?  ` mobile-always-hide` : `` } icon-default-filter flex-center`}
                        style={com.shallowMerge({

                        }, iconStyle)}
                    />
                    { !(relicNum > 0) ? null: <span className='sized-content h-flex flex-center' style={{ marginBottom: '2px', fontSize: 'small', fontStyle: 'italic' }}>{relicNum}</span> }
                    { !showLabel ? null: <span className='sized-content h-flex flex-center' style={{ marginBottom: '2px', fontSize: 'small' }}>Owned</span> }
                </button>
            </>
    );
}