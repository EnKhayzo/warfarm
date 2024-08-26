'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import * as com from "../app/common.js"

const ControlButton = ({ rawObj, icon, vaulted, rarity, _labelHeading, _label, _labelFooter, onClick, onContextMenu, type }) => {  
  const router = useRouter();
  const [labelHeading, setLabelHeading] = useState(_labelHeading); // Create a state variable
  const [label, setLabel] = useState(_label); // Create a state variable
  const [labelFooter, setObtainedFooter] = useState(_labelFooter); // Create a state variable

  // A function to handle the click and update the state
  const handleClick = (ev) => {
    if (onClick) {
      ev.stopPropagation();
      onClick(rawObj); // Call the passed onClick function

      if("required" in rawObj){ // TODO better way to discern a component from the other types?
        setLabel(`${com.getUserDataComponentSetting(rawObj.componentFullName, "obtained")}/${rawObj.required}`);
      }
    }
  };

  const [ obtained, setObtained ] = useState(null); // Create a state variable

  const listenerFunc = (obtainedComponents) => {
    setObtained(obtainedComponents);
  }

  useEffect(() => {
    if(rawObj.category === "components"){
      com.obtainedObservable.addListener(listenerFunc, true);
      return () => com.obtainedObservable.removeListener(listenerFunc);
    }

    return () => {};
  }, []);

  const elem = (
    <div
      onClick={handleClick}
      onContextMenu={onContextMenu}
      className={`control-button${rarity ? ` ${rarity}` : ``}`}
      style={{
        opacity: vaulted ? '50%' : '100%'
      }}
    >
      <img className='sized-content' src={icon} alt={label} style={{ height: '20px', marginBottom: '5px' }} />
      { labelHeading ? <small className='sized-content' style={{ fontWeight: 'bold', fontSize: '10px', color: '#b2aca2' }}>{labelHeading}</small> : null }
      { rawObj.category !== "components" && label ? <small className='sized-content' style={{ fontSize: '10px', color: '#b2aca2' }}>{label}</small> : null }
      { rawObj.category === "components" ? <small className='sized-content' style={{ fontSize: '10px', color: '#b2aca2' }}>{`${obtained && obtained[rawObj.componentFullName] ? obtained[rawObj.componentFullName].obtained : '0'}/${rawObj.required}`}</small> : null }
      { labelFooter ? <small className='sized-content' style={{ fontSize: 'xx-small', fontStyle: 'italic', color: '#b2aca2' }}>{labelFooter}</small> : null }
    </div>
  );

  return elem;
};

export default ControlButton;
