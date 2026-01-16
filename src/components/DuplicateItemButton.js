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

export default function DuplicateItemButton({ positionAbsolute=true, itemId, showLabel=false, alwaysShow=false, alwaysHide=false, mobileAlwaysShow=true, mobileAlwaysHide=false }){
    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    
    const rawObj = com.getObjectFromId(itemId);
    if(rawObj == null || (rawObj.category !== "items" && rawObj.category !== "components")) return null;

    const hasDuplicates = com.getUserDataExtrasObtained(itemId) > 0;

    const isFarmed = com.objectIsFarmed(rawObj);

    return (
        <>
            <button 
                title={`Set duplicate components`}
                className={`sized-content sell-button${ positionAbsolute ? ' absolute' : '' }${ alwaysShow ?  ` always-show` : `` }${ alwaysHide ?  ` always-hide` : `` }${ mobileAlwaysShow ?  ` mobile-always-show` : `` }${ mobileAlwaysHide ?  ` mobile-always-hide` : `` } h-flex flex-center`}
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
                                className='sized-content v-flex flex-center'
                                style={{ cursor: 'default', borderRadius: '10px', padding: '10px', alignSelf: 'stretch', gap: '20px' }}
                                onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); }}
                            >
                                <div className='sized-content h-flex flex-center' style={{ whiteSpace: 'pre' }}>{rawObj.fullName ?? rawObj.name}{'\'s duplicates'}</div>
                                <div 
                                    className='sized-content h-flex flex-center'
                                    style={{ 
                                        borderRadius: '10px', 
                                        padding: '10px', 
                                        alignSelf: 'stretch', 
                                        gap: '20px',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    {
                                        (rawObj.category === "items" ? com.getItemComponents(rawObj.id) : [ rawObj ])
                                            .map((component, index) => { 
                                                const componentIsAnomalous = component.required <= 0; 
                                                return (
                                                    <div 
                                                        key={`${index}-${component.id}`} 
                                                        className='sized-content v-flex' 
                                                        style={{ alignSelf: 'stretch', gap: '5px' }}
                                                    >
                                                        <div 
                                                            // onClick={() => router.push(component.route)}
                                                            className={`sized-remaining item-page-component-container item-check-parent tracker-item-parent v-flex flex-center${` ${com.getComponentRarity(component)}` ?? ''}`}
                                                            style={{
                                                                gap: '5px',
                                                                position: 'relative',
                                                                cursor: 'pointer',
                                                                alignSelf: 'stretch',
                                                                minWidth: '80px'
                                                            }}
                                                        >
                                                            <div className='sized-content h-flex flex-center'><img style={{ width: '80px', height: '80px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/${component.fullName}.png`}/></div>
                                                            <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                                                <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', textAlign: 'center' }}>{component.name}</div>
                                                                {/* <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${com.getUserDataComponentSetting(component.rawObj.id, "obtained") ?? '0'}/${component.rawObj.required}`}</div> */}
                                                                {/* { componentIsAnomalous ? null : <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${obtainedComponents && obtainedComponents[component.rawObj.id] ? obtainedComponents[component.rawObj.id].obtained : '0'}/${component.rawObj.required}`}</div>} */}
                                                                { componentIsAnomalous ? null : <ObjectStateLabel forceMode={"ducatMode"} object={component}/> }
                                                            </div>
                                                            {/* <ItemActionButton itemId={component.id}/> */}
                                                            <ResurgenceItemIcon positionAbsolute={false} itemId={itemId}/>
                                                            <DucatLabel forceShow={true} rawObj={com.getObjectFromId(component.id)}/>
                                                        </div>
                                                        {
                                                            componentIsAnomalous ? null:
                                                            <ObtainedLabelButtonExtras component={component} isRawObj={true} showLabel={false}/>
                                                        }
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                        )
                    });
                }}
            >
                <img 
                    src={`${com.getBaseEnvPath().basePath}/icons/duplicates.svg`} 
                    className={`sized-content sell-button-icon flex-center${ alwaysShow ?  ` always-show` : `` }${ alwaysHide ?  ` always-hide` : `` }${ mobileAlwaysShow ?  ` mobile-always-show` : `` }${ mobileAlwaysHide ?  ` mobile-always-hide` : `` }`}
                    style={{

                    }}
                />
                { !showLabel ? null: <span className='sized-content h-flex flex-center' style={{ marginBottom: '2px', fontSize: 'small' }}>Duplicates</span> }
            </button>
        </>
    );
}