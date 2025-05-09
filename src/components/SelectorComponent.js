'use client';

import { React, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';

export default function SelectorComponent({ options, onConfirm }){
    const router = useRouter();

    const defaultOption = (Object.entries(options).find(([ optionText, option ]) => option.defaultOption)[0]) ?? null
    const [ activeOption, setActiveOption ] = useState(defaultOption);

    const [ menuOpen, setMenuOpen ] = useState(false);
    const menuRef = useRef(null);

    const [ contextMenu, setContextMenu ] = useState(null);
    const targetRef = useRef(null);


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
        if(onConfirm) onConfirm([ text, entry ]);
        setActiveOption(text);
        
        // if(contextMenu != null) com.removeContextMenuUis(contextMenu);
    };

    const onClick = (ev) => {
        // console.log(`targetref`, targetRef)
        if(!targetRef) return;

        const targetBB = targetRef.current.getBoundingClientRect();
        com.toggleContextMenuUis({
            position: { top: `${targetBB.top + 10}px`, left: `${targetBB.left + 10}px` },
            children: (props) => (
                <div 
                    className='sized-content selector-option-container v-flex flex-center'
                    style={{ 
                        gap: '5px'
                    }}
                >
                    {
                        Object.entries(options).map(([ optionText, option ], index) => (
                            <div
                                key={`${index}-${optionText}`}
                                className='sized-content h-flex selector-option flex-center'
                                style={{
                                    minWidth: 'fit-content',
                                    textAlign: 'center',
                                    width: 'auto',
                                    padding: '10px'
                                }}
                                onClick={() => handleConfirm([ optionText, option ])}
                            >
                                {optionText}
                            </div>
                        ))
                    }
                </div>
            )
        });
    }
    
    return (
        <div 
            ref={targetRef}
            className='sized-content selector-component h-flex flex-center' 
            style={{ position: 'relative', gap: '5px', cursor: 'pointer' }}
            // onClick={(ev) => { setMenuOpen(!menuOpen); }}
            onClick={onClick}
        >
            <div
                className='sized-content h-flex flex-center' 
                style={{ gap: '5px' }}
            >
                <div className='sized-content h-flex flex-center' style={{ marginBottom: '2px' }}>{activeOption ?? '?'}</div>
                <div className='sized-content h-flex flex-center'><img className='sized-content h-flex icon-default-filter flex-center' src={`${com.getBaseEnvPath().basePath}/icons/arrow.svg`} style={{ width: '10px', transform: 'rotate(90deg)' }}/></div>
            </div>
            {/* {
                !menuOpen ? null:
                <div 
                    ref={menuRef} 
                    className='sized-content selector-option-wrapper v-flex flex-center'
                    style={{ 
                        width: '400px',
                        overflow: 'hidden',
                        position: 'absolute', 
                        top: '50px',
                        zIndex: '1000'
                    }}
                >
                    <div 
                        className='sized-content selector-option-container v-flex flex-center'
                        style={{ 
                            gap: '5px'
                        }}
                    >
                        {
                            Object.entries(options).map(([ optionText, option ], index) => (
                                <div
                                    key={`${index}-${optionText}`}
                                    className='sized-content h-flex selector-option flex-center'
                                    style={{
                                        minWidth: 'fit-content',
                                        textAlign: 'center',
                                        width: 'auto',
                                        padding: '10px'
                                    }}
                                    onClick={() => handleConfirm([ optionText, option ])}
                                >
                                    {optionText}
                                </div>
                            ))
                        }
                    </div>
                </div>
            } */}
        </div>
    );
}