'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as com from "../app/common.js"

const ContextMenuButton = ({ top, children, buttons, headerContent, className }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef(null);

  const toggleContextMenu = () => {
    setShowContextMenu(!showContextMenu);
  };

  const handleClickOutside = (event) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
      setShowContextMenu(false);
    }
  };

  useEffect(() => {
    if (showContextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ showContextMenu ]);

    return (
      <div style={{ padding: '0px', margin: '0px' }}>
      <button 
        onClick={toggleContextMenu} 
        className={`global-settings-button${ className ? ` ${className}` : `` }`}
        style={{
          borderRadius: '5px',
          padding: '5px'
        }}
      >
        {headerContent}
      </button>
        <div 
          ref={contextMenuRef} 
          className={className} 
          style={{
            display: showContextMenu ? '' : 'none',
            top: top,
            position: 'absolute',
            right: '0',
            listStyleType: 'none',
            padding: '10px',
            margin: 0,
            backgroundColor: 'var(--color-sextenary)',
            borderRadius: '5px',
            zIndex: 1000,
            margin: '5px'
          }}
        >
          {
            children ? 
              children({ closeMenu: () => setShowContextMenu(false) }) 
            :
              <ul>
                {
                  buttons.map((button, index) => (
                    <li key={`${index}-${button.label}`}  style={{ padding: '5px 0' }}>{button.label}</li>
                  ))
                }
              </ul>
          }
        </div>
      </div>
    );
};

export default ContextMenuButton;
