'use client';

import { React, useState, useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import useTrackLists from '@/hooks/useTrackLists';
import useCurrentTrackList from '@/hooks/useCurrentTrackList';
import useTrackedItems from '@/hooks/useTrackedItems';
import IconButton from '@/components/IconButton';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup';
import ObjectStateLabel from '@/components/ObjectStateLabel';
import ConfirmButton from '@/components/ConfirmButton';
import HomeSelectorComponent from './HomeSelectorComponent';

export default function TrackListSelector({}){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [ trackLists, setTrackLists ] = useTrackLists();
    const [ currentTrackList, setCurrentTrackList ] = useCurrentTrackList();
    const [ trackedItems, setTrackedItems ] = useTrackedItems();
    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

    const [ menuOpen, setMenuOpen ] = useState(false);
    const menuRef = useRef(null);

    const sharedTrackList = searchParams.get("sharedTrackList") ? com.decodeFromBase64(searchParams.get("sharedTrackList")) : null;

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
        com.setUserDataActiveTrackList(text);
    };
    
    return (
        <HomeSelectorComponent 
            elemList={trackLists} 
            sharedList={sharedTrackList} 
            currentList={currentTrackList}
            obtainedComponents={obtainedComponents}
            sharedListLabel={`Shared track list`}
            emptyListLabel={`Track List is empty`}
            itemFilterFunc={(item) => item.tracked == true}
            innerListGetFunc={list => list.trackedItems}
            onClicks={{
                handleConfirm: handleConfirm,
                saveShared: () => {
                    com.showDialogUi({
                        title: "Choose the name that this Track List will have:",
                        value: sharedTrackList.id,
                        type: "textString",
                        ok: (ev, text) => {
                            const id = text;
                            let newTrackList = sharedTrackList;

                            newTrackList.id = text;

                            const addTrackList = () => {
                                com.addUserDataTrackList(newTrackList);
                                com.setUserDataActiveTrackList(id);
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
                },
                cancelSaveShared: () => { router.push(window.location.href.split('?')[0]) },
                editList: () => {
                    com.showDialogUi({
                        title: `Set new name for ${currentTrackList}:`,
                        type: "textString",
                        value: currentTrackList,
                        ok: (ev, text) => {
                            const newName = text;

                            const renameList = () => {
                                com.renameUserDataTrackList(currentTrackList, text);
                                com.setUserDataActiveTrackList(text);
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
                },
                addList: () => {
                    const newName = com.generateTrackListName();
                    com.addUserDataTrackList({ id: newName, trackedItems: {} });
                    com.setUserDataActiveTrackList(newName);
                },
                deleteList: () => {
                    com.removeUserDataTrackList(com.getUserDataCurrentTrackListId());
                },
                shareList: () => {
                    let trackListToShare = com.cloneDict(trackLists[currentTrackList]);
                    trackListToShare.trackedItems = com.filterDict(
                        trackListToShare.trackedItems,
                        ([ name, item ]) => item.tracked == true 
                    )

                    const urlString = `${window.location.href.split('?')[0]}?sharedTrackList=${com.encodeToBase64(trackListToShare)}`;

                    navigator.clipboard.writeText(urlString);
                    com.showNotificationUi({ label: "url copied to clipboard!", type: "success" });
                }
            }}
        />
    );
}