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
import HomeSelectorComponent from './HomeSelectorComponent';
import useSellItems from '@/hooks/useSellItems';
import useSellLists from '@/hooks/useSellLists';
import useCurrentSellList from '@/hooks/useCurrentSellList';

export default function SellListSelector({}){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [ sellLists, setSellLists ] = useSellLists();
    const [ currentSellList, setCurrentSellList ] = useCurrentSellList();
    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();

    const [ menuOpen, setMenuOpen ] = useState(false);
    const menuRef = useRef(null);

    const sharedSellList = searchParams.get("sharedSellList") ? com.decodeFromBase64(searchParams.get("sharedSellList")) : null;

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
        // console.log(`set active list!`, text, entry)
        com.setUserDataActiveSellList(text);
    };
    
    return (
        <HomeSelectorComponent 
            elemList={sellLists} 
            sharedList={sharedSellList} 
            currentList={currentSellList}
            obtainedComponents={obtainedComponents}
            sharedListLabel={`Shared sell list`}
            emptyListLabel={`Sell List is empty`}
            itemFilterFunc={(item) => item.sellValue != null && item.sellValue > 0 }
            innerListGetFunc={list => { return list.sellItems }}
            onClicks={{
                handleConfirm: handleConfirm,
                saveShared: () => {
                    com.showDialogUi({
                        title: "Choose the name that this Sell List will have:",
                        value: sharedSellList.id,
                        type: "textString",
                        ok: (ev, text) => {
                            const id = text;
                            let newSellList = sharedSellList;

                            newSellList.id = text;

                            const addSellList = () => {
                                com.addUserDataSellList(newSellList);
                                com.setUserDataActiveSellList(id);
                                router.push(window.location.href.split('?')[0]);
                            }

                            if(sellLists[id] != null) { 
                                console.warn(`sell list already exists!`);
                                
                                com.showDialogUi({
                                    title: `A Sell List with the name '${id}' already exists! Overwrite?`,
                                    type: 'okcancel',
                                    ok: () => {
                                        addSellList();
                                    }
                                })

                                return; 
                            }

                            addSellList();
                        }
                    })
                },
                cancelSaveShared: () => { router.push(window.location.href.split('?')[0]) },
                editList: () => {
                    com.showDialogUi({
                        title: `Set new name for ${currentSellList}:`,
                        type: "textString",
                        value: currentSellList,
                        ok: (ev, text) => {
                            const newName = text;

                            const renameList = () => {
                                com.renameUserDataSellList(currentSellList, text);
                                com.setUserDataActiveSellList(text);
                            };

                            if(sellLists[newName] != null) { 
                                console.warn(`sell list already exists!`);
                                
                                com.showDialogUi({
                                    title: `A Sell List with the name '${newName}' already exists! Overwrite?`,
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
                    const newName = com.generateSellListName();
                    com.addUserDataSellList({ id: newName, sellItems: {} });
                    com.setUserDataActiveSellList(newName);
                },
                deleteList: () => {
                    com.removeUserDataSellList(com.getUserDataCurrentSellListId());
                },
                shareList: () => {
                    let sellListToShare = com.cloneDict(sellLists[currentSellList]);
                    sellListToShare.sellItems = com.filterDict(
                        sellListToShare.sellItems,
                        ([ name, item ]) => item.sellValue > 0 
                    )

                    const urlString = `${window.location.href.split('?')[0]}?sharedSellList=${com.encodeToBase64(sellListToShare)}`;

                    navigator.clipboard.writeText(urlString);
                    com.showNotificationUi({ label: "url copied to clipboard!", type: "success" });
                }
            }}
        />
    );
}