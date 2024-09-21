'use client';

import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import * as com from "../app/common.js"
import ObtainedResurgenceGroup from './ObtainedResurgenceGroup.js';
import DucatLabel from './DucatLabel.js';
import useGlobalMode from '@/hooks/useGlobalMode.js';
import useObtainedExtras from '@/hooks/useObtainedExtras.js';
import ExtrasLabelObject from './ExtrasLabelObject.js';

const ControlButton = ({ rawObj, infoObj=null, icon, vaulted, rarity, _labelHeading, _label, _labelFooter, onClick, onContextMenu, type }) => {  
  const router = useRouter();
  const [labelHeading, setLabelHeading] = useState(_labelHeading); // Create a state variable
  const [label, setLabel] = useState(_label); // Create a state variable
  const [labelFooter, setObtainedFooter] = useState(_labelFooter); // Create a state 
  
  const [ blinking, setBlinking ] = useState(false); // Create a state variable
  const blinkingTimeout = useRef(null);

  // A function to handle the click and update the state
  const handleClick = (ev) => {
    if (onClick) {
      ev.stopPropagation();
      ev.preventDefault();

      onClick(ev); // Call the passed onClick function

      // if(rawObj.category === "components"){
      //   if(rawObj.parentItem == null) return; 
      //   const stringToSet = `${com.getUserDataComponentSetting(rawObj.id, "obtained")}/${rawObj.required}`;
      //   if(infoObj.category === "Relics") setObtainedFooter(stringToSet);
      //   else setLabel(stringToSet);
      // }
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

  const [ globalMode, setGlobalMode ] = useGlobalMode();
  const isFarmMode = globalMode == null || globalMode === "farmMode";

  const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();

  const elem = (
    <div
      onClick={handleClick}
      onContextMenu={onContextMenu}
      className={`control-button tracker-item-parent${rarity ? ` ${rarity}` : ``}${vaulted ? ` vaulted` : ``}${blinking ? ` blinking` : ``}`}
      style={{
        alignSelf: 'stretch',
        position: 'relative',
        height: rawObj.category === "components" ?  '100px' : '100%',
        minWidth: rawObj.category === "components" ? '80px' : 'unset'
      }}
    >
      <img className='sized-content' src={icon} alt={label} style={{ height: '30px', marginBottom: '5px' }} />
      { labelHeading ?                              <div className='sized-content' style={{ fontSize: 'small', fontWeight: 'bold', color: '#b2aca2' }}>{labelHeading}</div> : null }
      {/* { rawObj.category !== "components" && label ? <div className='sized-content' style={{ fontSize: 'small', color: '#b2aca2' }}>{label}</div> : null } */}
      {/* { rawObj.category === "components" ?          <div className='sized-content' style={{ fontSize: 'small', color: '#b2aca2' }}>{`${obtained && obtained[rawObj.id] ? obtained[rawObj.id].obtained : '0'}/${rawObj.required}`}</div> : null } */}
      {/* { label ?                                     <div className='sized-content' style={{ fontSize: 'small', color: '#b2aca2' }}>{label}</div> : null } */}
      {/* { labelFooter ?                               <div className='sized-content' style={{ fontSize: 'x-small', fontStyle: 'italic', color: '#b2aca2' }}>{labelFooter}</div> : null } */}
      
      {
        rawObj.category === "components" ? (
          rawObj.parentItem == null ? null:
          infoObj.category === "Relics"  ? (
            <>
              <div className='sized-content' style={{ fontSize: 'small', color: '#b2aca2' }}>{rawObj.name}</div>
              {
                isFarmMode ?
                  <div className='sized-content' style={{ fontSize: 'x-small', fontStyle: 'italic', color: '#b2aca2' }}>{`${obtained && obtained[rawObj.id] ? obtained[rawObj.id].obtained : '0'}/${rawObj.required}`}</div>
                :
                  <ExtrasLabelObject object={rawObj}/>
              }
            </>
          )
          :
          (
            <>
              {
                isFarmMode ?
                  <div className='sized-content' style={{ fontSize: 'small', fontStyle: 'italic', color: '#b2aca2' }}>{`${obtained && obtained[rawObj.id] ? obtained[rawObj.id].obtained : '0'}/${rawObj.required}`}</div>
                :
                  <ExtrasLabelObject object={rawObj}/>
              }            </>
          )
        )
        : 
        (
          <>
            { label ?                                     <div className='sized-content' style={{ fontSize: 'small', color: '#b2aca2' }}>{label}</div> : null }
            { labelFooter ?                               <div className='sized-content' style={{ fontSize: 'x-small', fontStyle: 'italic', color: '#b2aca2' }}>{labelFooter}</div> : null }
          </>
        )

      }

      <ObtainedResurgenceGroup itemId={rawObj.id}/>
      <DucatLabel rawObj={com.getObjectFromId(rawObj.id)}/>
    </div>
  );

  return elem;
};

export default ControlButton;
