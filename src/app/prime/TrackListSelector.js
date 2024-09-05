'use client';

import { React, useState, useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import useTrackLists from '@/hooks/useTrackLists';
import useCurrentTrackList from '@/hooks/useCurrentTrackList';
import useTrackedItems from '@/hooks/useTrackedItems';
import IconButton from '@/components/IconButton';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';
import ObtainedLabelObject from '@/components/ObtainedLabelObject';
import ConfirmButton from '@/components/ConfirmButton';

export default function TrackListSelector({}){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [ trackLists, setTrackLists ] = useTrackLists();
    const [ currentTrackList, setCurrentTrackList ] = useCurrentTrackList();
    const [ trackedItems, setTrackedItems ] = useTrackedItems();
    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

    const [ menuOpen, setMenuOpen ] = useState(false);
    const menuRef = useRef(null);

    // console.log(`compressed`, com.encodeToBase64({
    //     "id": "Track List 1",
    //     "trackedItems": {
    //         "Harrow Prime": {
    //             "tracked": true
    //         },
    //         "Nidus Prime": {
    //             "tracked": true
    //         },
    //         "Vauban Prime": {
    //             "tracked": true
    //         }
    //     }
    // }));

    const sharedTrackList = searchParams.get("sharedTrackList") ? com.decodeFromBase64(searchParams.get("sharedTrackList")) : null;
    // console.log(`search params!`, sharedTrackList, searchParams);

    

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

    const handleConfirm = ([ text, entry ]) => {
        // console.log(`on confirm!`, text); 
        // if(onConfirm) onConfirm([ text, entry ]);
        // setActiveOption(text);
        
        console.log(`confirming`, text);

        com.setUserDataActiveTrackList(text);
    };

    // console.log(`track lists`, trackLists);
    
    return (
        <div className='sized-content v-flex flex-center' style={{ gap: '10px' }}>
            { sharedTrackList ? <span style={{ fontStyle: 'italic' }}>Shared track list</span> :null }
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
                        cursor: sharedTrackList ? 'default' : 'pointer',
                        opacity: sharedTrackList ? '50%' : '100%'
                    }}
                    onClick={(ev) => { if(sharedTrackList) return; setMenuOpen(!menuOpen); }}
                >
                    <div className='sized-content h-flex flex-center' style={{ marginBottom: '2px' }}>{ sharedTrackList ? sharedTrackList.id : currentTrackList ?? '?'}</div>
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
                                    Object.entries(trackLists)
                                        // .filter(el => { console.log(`el`, el); return true; })
                                        .map(([ trackListId, trackList ], index) => (
                                            <div
                                                key={`${index}-${trackListId}`}
                                                className='sized-content h-flex selector-option track-list-selector-option flex-center'
                                                style={{
                                                    minWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    width: 'auto',
                                                    padding: '10px',
                                                    backgroundColor: 'var(--color-secondary)',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => handleConfirm([ trackListId, trackList ])}
                                            >
                                                <div className='sized-content v-flex flex-center' style={{ gap: '10px' }}>
                                                    <div className='sized-content h-flex flex-center' style={{ fontWeight: 'bold', fontSize: 'x-large' }}>{trackListId}</div>
                                                    <div className='sized-content h-flex flex-center' style={{ gap: '10px', flexWrap: 'wrap', pointerEvents: 'none' }}>
                                                        {
                                                            trackList.trackedItems == null || com.isDictEmpty(com.filterDict(trackList.trackedItems, entry => entry[1].tracked == true)) ? <div>(Track List is empty)</div> :
                                                            Object.entries(trackList.trackedItems)
                                                                // .filter(el => { console.log(`el2`, el); return true; })
                                                                .filter(([ itemId, trackedItem ]) => trackedItem.tracked == true)
                                                                .map(([ itemId, item ]) => { console.log(`item`, item); return (
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
                                                                                const trackedObject = com.getObjectFromId(itemId); 
                                                                                if(trackedObject.category === "items" || trackedObject.category === "components") return (
                                                                                    <ObtainedLabelObject object={trackedObject} />
                                                                                ); 

                                                                                return null; 
                                                                            })() 
                                                                        }
                                                                        {/* <TrackItemButton itemId={itemId} positionAbsolute={true}/> */}
                                                                        <ObtainedResurgenceGroup itemId={itemId} positionAbsolute={true}/>
                                                                    </Link>
                                                                )})
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
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
                        sharedTrackList ? 
                        <>
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/save.svg`} 
                                iconClassName={`icon-default-filter track-list-icon`}
                                onClick={() => {
                                    console.log(`save!`, currentTrackList);
                                    com.showDialogUi({
                                        title: "Choose the name that this Track List will have:",
                                        value: sharedTrackList.id,
                                        type: "textString",
                                        ok: (ev, text) => {
                                            const id = text;
                                            let newTrackList = sharedTrackList;

                                            newTrackList.id = text;
                                            console.log(`tracklists`, id);

                                            const addTrackList = () => {
                                                com.addUserDataTrackList(newTrackList);
                                                com.setUserDataCurrentTrackListId(id)
                                                router.push(window.location.href.split('?')[0]);
                                            }

                                            if(trackLists[id] != null) { 
                                                console.warn(`track list already exists!`);
                                                
                                                com.showDialogUi({
                                                    title: `A Track List with the name '${id}' already exists! Overwrite?`,
                                                    type: 'okcancel',
                                                    ok: () => {
                                                        addTrackList();
                                                    }
                                                })

                                                return; 
                                            }

                                            addTrackList();
                                        }
                                    })
                                }}
                            />
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/failure.svg`} 
                                iconClassName={'icon-default-filter track-list-icon'}
                                onClick={() => {
                                    router.push(window.location.href.split('?')[0]);
                                }}
                            />
                        </>
                        :
                        <>
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/edit.svg`} 
                                iconClassName={'icon-default-filter track-list-icon'}
                                onClick={() => {
                                    console.log(`edit!`, currentTrackList);

                                    com.showDialogUi({
                                        title: `Set new name for ${currentTrackList}:`,
                                        type: "textString",
                                        value: currentTrackList,
                                        ok: (ev, text) => {
                                            const newName = text;

                                            const renameList = () => {
                                                console.log(`renaming to!`, currentTrackList, text);
                                                com.renameUserDataTrackList(currentTrackList, text);
                                                com.setUserDataCurrentTrackListId(text);
                                            };

                                            if(trackLists[newName] != null) { 
                                                console.warn(`track list already exists!`);
                                                
                                                com.showDialogUi({
                                                    title: `A Track List with the name '${newName}' already exists! Overwrite?`,
                                                    type: 'okcancel',
                                                    ok: () => {
                                                        renameList();
                                                    }
                                                })

                                                return; 
                                            }
                                            
                                            renameList();
                                        }
                                    })
                                }}
                            />
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/add.svg`} 
                                iconClassName={'icon-default-filter track-list-icon'}
                                onClick={() => {
                                    console.log(`add!`);
                                    const newName = com.generateTrackListName();
                                    com.addUserDataTrackList({ id: newName, trackedItems: {} });
                                    com.setUserDataActiveTrackList(newName);
                                }}
                            />
                            <ConfirmButton 
                                headerContent={
                                    <IconButton 
                                        blinkEnabled={false}
                                        label={''} 
                                        iconUrl={`${com.getBaseEnvPath().basePath}/icons/trash-bin.svg`} 
                                        iconClassName={'icon-default-filter track-list-icon'}
                                        onClick={() => {
                                            console.log(`delete!`, currentTrackList);
                                        }}
                                    />
                                }
                                onConfirm={() => {
                                    console.log(`confirm!`);
                                    com.removeUserDataTrackList(com.getUserDataCurrentTrackListId());
                                }}
                            />
                            <IconButton 
                                blinkEnabled={false}
                                label={''} 
                                iconUrl={`${com.getBaseEnvPath().basePath}/icons/share.svg`} 
                                iconClassName={'icon-default-filter track-list-icon'}
                                onClick={() => {
                                    let trackListToShare = com.cloneDict(trackLists[currentTrackList]);
                                    trackListToShare.trackedItems = com.filterDict(
                                        trackListToShare.trackedItems,
                                        ([ name, item ]) => item.tracked == true 
                                    )

                                    const urlString = `${window.location.href.split('?')[0]}?sharedTrackList=${com.encodeToBase64(trackListToShare)}`;

                                    console.log(`share!`, urlString);
                                    navigator.clipboard.writeText(urlString);
                                    com.showNotificationUi({ label: "url copied to clipboard!", type: "success" });
                                }}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    );
}