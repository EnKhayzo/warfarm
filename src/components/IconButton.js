'use client';

import { React, useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import * as com from "@/app/common.js"

/** changeTab: callback function to change the current tab */
export default function IconButton({ label, iconUrl, onClick, className, style, iconClassName, highlight=false, forceBlinking=null, iconHeight='15px' }){
  const [ blinking, setBlinking ] = useState(false);
  const timeoutRef = useRef(null);
  const rootElRef = useRef(null);

  const blinkingSystem = () => {
    const blink = () => {
      setBlinking(true);
      timeoutRef.current = setTimeout(() => {
        setBlinking(false);
      }, 250);
    }

    if(blinking){
      if(timeoutRef.current){
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      rootElRef.offsetHeight;

      blink();
      rootElRef.offsetHeight;
    }

    if(highlight || forceBlinking){
      blink();
    }
  }
 
  useEffect(() => {
    if(forceBlinking) {
      blinkingSystem();
    }
    else setBlinking(false);

    // if (forceBlinking) {
    //   // Add a class to the component when trigger is true
    //   document.getElementById('child').classList.add('active');
    // } else {
    //   // Remove the class when trigger is false
    //   document.getElementById('child').classList.remove('active');
    // }

    return () => {};
  }, [ forceBlinking ])

  return (
      <div 
          ref={rootElRef}
          className={`sized-content icon-button${highlight ? ` highlight` : ``} h-flex flex-center${className ? ` ${className}` : ``}${blinking ? ` blinking` : ``}`} 
          style={style}
          onClick={onClick}
      >
          <div 
              className='sized-content h-flex flex-center'
              style={{
                gap: '5px'
              }} 
              onClick={(ev) => {
                blinkingSystem();
                
                onClick(ev);
              }}
            >
              <img className={`sized-content v-flex flex-center${iconClassName ? ` ${iconClassName}` : ``}`} style={{ height: iconHeight }} src={iconUrl}/>
              <div className='sized-content v-flex flex-center' style={{ marginBottom: '2px' }}>{label}</div>
            </div>
      </div>
  );
}