'use client';

import { React, useState, useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import IconButton from '@/components/IconButton';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';
import ObjectStateLabel from '@/components/ObjectStateLabel';
import ConfirmButton from '@/components/ConfirmButton';

export default function HomeSelectorComponent({ elemList, sharedList, currentList, obtainedComponents, sharedListLabel, emptyListLabel, onClicks, itemFilterFunc, innerListGetFunc }){
    const router = useRouter();
    const searchParams = useSearchParams();

    const [ menuOpen, setMenuOpen ] = useState(false);
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };
    
    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuOpen ]);
    
    return (
        <div className='sized-content v-flex flex-center' style={{ gap: '10px' }}>
            { sharedList ? <span style={{ fontStyle: 'italic' }}>{sharedListLabel}</span> :null }
            <div 
                className='sized-content h-flex flex-center' 
                style={{ position: 'relative', gap: '10px' }}
            >
                <div
                    className='sized-content h-flex flex-center' 
                    style={{ 
                        position: 'relative',
                        gap: '5px',
                        backgroundColor: 'var(--color-tertiary)',
                        borderRadius: '10px',
                        padding: '10px',
                        cursor: sharedList ? 'default' : 'pointer',
                        opacity: sharedList ? '50%' : '100%'
                    }}
                    onClick={(ev) => { if(sharedList) return; setMenuOpen(!menuOpen); }}
                >
                    <div className='sized-content h-flex flex-center' style={{ marginBottom: '2px' }}>{ sharedList ? sharedList.id : currentList ?? '?'}</div>
                    <div className='sized-content h-flex flex-center'><img className='sized-content h-flex icon-default-filter flex-center' src={`${com.getBaseEnvPath().basePath}/icons/arrow.svg`} style={{ width: '10px', transform: 'rotate(90deg)' }}/></div>
                    {
                        !menuOpen ? null:
                        <div 
                            ref={menuRef} 
                            className='sized-content selector-option-wrapper v-flex flex-center'
                            style={{ 
                                // width: '400px',
                                overflow: 'hidden',
                                position: 'absolute', 
                                top: '50px',
                                zIndex: '1000',
                                width: '75vw',
                                cursor: 'default'
                            }}
                        >
                            <div 
                                className='sized-content selector-option-container v-flex flex-center'
                                style={{ 
                                    gap: '10px'
                                }}
                            >
                                {
                                    Object.entries(elemList)
                                        .map(([ listId, list ], index) => { return (
                                            <div
                                                key={`${index}-${listId}`}
                                                className='sized-content h-flex selector-option track-list-selector-option flex-center'
                                                style={{
                                                    minWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    width: 'auto',
                                                    padding: '10px',
                                                    backgroundColor: 'var(--color-secondary)',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => { if(onClicks && onClicks.handleConfirm) onClicks.handleConfirm([ listId, list ]); }}
                                            >
                                                <div className='sized-content v-flex flex-center' style={{ gap: '10px' }}>
                                                    <div className='sized-content h-flex flex-center' style={{ fontWeight: 'bold', fontSize: 'x-large' }}>{listId}</div>
                                                    <div className='sized-content h-flex flex-center' style={{ gap: '10px', flexWrap: 'wrap', pointerEvents: 'none' }}>
                                                        {
                                                            innerListGetFunc(list) == null || com.isDictEmpty(com.filterDict(innerListGetFunc(list), entry => itemFilterFunc(entry[1]))) ? <div>({emptyListLabel})</div> :
                                                            Object.entries(innerListGetFunc(list))
                                                                .filter(([ itemId, item ]) => itemFilterFunc(item))
                                                                .map(([ itemId, item ]) => { return (
                                                                    <Link href={com.getObjectRouteFromId(itemId)} 
                                                                        key={`${itemId}-${index}`} 
                                                                        className={`sized-content item-check-parent tracked-items-button v-flex flex-center${com.objectIsFarmed(com.getObjectFromId(itemId), obtainedComponents) ? ` object-farmed-main-page` : ``}`}
                                                                        style={{ 
                                                                            position: 'relative', 
                                                                            cursor: 'pointer',
                                                                            alignSelf: 'stretch',
                                                                            minWidth: '150px' 
                                                                        }}
                                                                    >
                                                                        <img className='sized-content tracked-items-icon h-flex' style={{ minWidth: 'fit-content', height: '90px' }} src={com.getObjectIcon(com.getObjectFromId(itemId))}/>
                                                                        <div className='sized-content h-flex flex-center' style={{ minWidth: 'fit-content', textAlign: 'center' }}>{itemId}</div>
                                                                            { 
                                                                                (() => { 
                                                                                    const listObject = com.getObjectFromId(itemId);
                                                                                    if(listObject == null) return null;
                                                                                    
                                                                                    if(listObject.category !== "missions") return (
                                                                                        <ObjectStateLabel object={listObject} />
                                                                                    ); 

                                                                                    return null; 
                                                                                })() 
                                                                            }
                                                                            {/* <ItemActionButton itemId={itemId} positionAbsolute={true}/> */}
                                                                        <ObtainedResurgenceGroup itemId={itemId} positionAbsolute={true}/>
                                                                    </Link>
                                                                )})
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )})
                                }
                            </div>
                        </div>
                    }
                </div>
                <div 
                    className='sized-content h-flex' 
                    style={{ 
                        position: 'absolute',
                        top: '0px',
                        right: '-140px',
                        height: '100%',
                        width: '120px',
                        gap: '10px'
                    }}
                >
                    {
                        sharedList ? 
                        <>
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/save.svg`} 
                                iconClassName={`icon-default-filter track-list-icon`}
                                onClick={onClicks && onClicks.saveShared ? onClicks.saveShared : () => {}}
                            />
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/failure.svg`} 
                                iconClassName={'icon-default-filter track-list-icon'}
                                onClick={onClicks && onClicks.cancelSaveShared ? onClicks.cancelSaveShared : () => {}}
                            />
                        </>
                        :
                        <>
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/edit.svg`} 
                                iconClassName={'icon-default-filter track-list-icon'}
                                onClick={onClicks && onClicks.editList ? onClicks.editList : () => {}}
                            />
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/add.svg`} 
                                iconClassName={'icon-default-filter track-list-icon'}
                                onClick={onClicks && onClicks.addList ? onClicks.addList : () => {}}
                            />
                            <ConfirmButton 
                                headerContent={
                                    <IconButton 
                                        blinkEnabled={false}
                                        label={''} 
                                        iconUrl={`${com.getBaseEnvPath().basePath}/icons/trash-bin.svg`} 
                                        iconClassName={'icon-default-filter track-list-icon'}
                                    />
                                }
                                onConfirm={onClicks && onClicks.deleteList ? onClicks.deleteList : () => {}}
                            />
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/share.svg`} 
                                iconClassName={'icon-default-filter track-list-icon'}
                                onClick={onClicks && onClicks.shareList ? onClicks.shareList : () => {}}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    );
}