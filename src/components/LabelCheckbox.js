'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as com from "../app/common.js"

const LabelCheckbox = ({ textLabel, name, value, onChange, onClick, checked, containerClassName, containerStyle }) => {
  const checkBoxRef = useRef();  

  const handleClick = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    // Toggle the checkbox's checked state
    const newCheckedState = !checkBoxRef.current.checked;
    checkBoxRef.current.checked = newCheckedState;

    // Manually create and dispatch a React change event
    const changeEvent = new Event('input', { bubbles: false });
    
    // Assign new value to target and call onChange handler manually with synthetic event
    const syntheticEvent = {
      target: checkBoxRef.current,
      preventDefault: () => {},
      stopPropagation: () => {}
    };

    // console.log(`triggering synthetic event`);

    // Call the React onChange handler to notify the parent of the change
    if (onChange) {
      onChange(syntheticEvent);
    }

    // Dispatch native change event (optional, to trigger other native event listeners)
    checkBoxRef.current.dispatchEvent(changeEvent);
  };

  return (
    <div 
      className={`sized-content h-flex${containerClassName != null ? ` ${containerClassName}` : ``}`} 
      style={com.shallowMerge({ gap: '5px', padding: '0px', margin: '0px' }, containerStyle)}
      onClick={handleClick}
    >
      <input 
        ref={checkBoxRef} 
        className='sized-content' 
        type="checkbox" 
        name={name} 
        value={value} 
        onClick={ev => { ev.stopPropagation(); if(onClick) onClick(ev); }} 
        onChange={ev => { ev.stopPropagation(); if(onChange) onChange(ev); }} 
        defaultChecked={checked ?? false}
      />
      <div className='sized-content' style={{ marginBottom: '2px' }}>{textLabel}</div>
    </div>
  );
};



export default LabelCheckbox;
