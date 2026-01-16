'use client';

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as com from "../app/common.js";

/** 
 * keep in mind: this automatically sets the body of the context menu style to 'top: 50px' 
 * consider overriding it via the style to better set the position of the body  
 */
const ContextMenu = forwardRef(({
  position = { top: '50px' }, // Default position
  children,
  buttons = null,
  className = '',
  style = {},
  showInitial = false,
  pulseShowCallback = null
}, ref) => {
  const contextMenuRef = useRef(null);
  const [showContextMenu, setShowContextMenu] = useState(showInitial);

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
  }, [showContextMenu]);

  // Expose show and hide methods to parent
  useImperativeHandle(ref, () => ({
    show: (newPosition) => {
      if (newPosition) {
        setPosition(newPosition);
      }
      setShowContextMenu(true);
    },
    hide: () => setShowContextMenu(false),
    toggle: (newPosition) => {
      if (newPosition) {
        setPosition(newPosition);
      }
      setShowContextMenu((prev) => !prev);
    }
  }));

  const [currentPosition, setPosition] = useState(position);

  return (
    <div 
      ref={contextMenuRef} 
      className={` ${className}`} 
      style={com.shallowMerge({
        display: showContextMenu ? 'block' : 'none',
        position: 'absolute',
        top: currentPosition.top,
        left: currentPosition.left,
        listStyleType: 'none',
        padding: '10px',
        margin: '5px',
        backgroundColor: 'var(--color-sextenary)',
        borderRadius: '5px',
        zIndex: 1000,
        overflow: 'auto',
        maxHeight: '80vh',
        ...style
      })}
    >
      { showContextMenu && children ? 
        children({ closeMenu: () => setShowContextMenu(false) }) 
        :
        buttons ?
          <ul>
            {buttons.map((button, index) => (
              <li key={`${index}-${button.label}`} style={{ padding: '5px 0', cursor: 'pointer' }}>
                {button.label}
              </li>
            ))}
          </ul>
        : null
      }
    </div>
  );
});
ContextMenu.displayName = "ContextMenu";

export default ContextMenu;
