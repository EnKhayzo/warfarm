'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as com from "../app/common.js"

/** 
 * keep in mind: this automatically sets the body of the context menu style to 'top: 50px' 
 * consider overriding it via the style to better set the position of the body  
 */
const ConfirmButton = ({ top, buttons, headerContent, className, style, onConfirm }) => {
  const [ showConfirmArea, setShowConfirmArea ] = useState(false);
  const contextMenuRef = useRef(null);

  const toggleConfirmArea = () => {
    setShowConfirmArea(!showConfirmArea);
  };

    return (
      <div className='sized-content h-flex flex-center' style={{ padding: '0px', margin: '0px' }}>
        {
            !showConfirmArea ? 
                <button 
                    onClick={toggleConfirmArea} 
                    className={`sized-content h-flex flex-center${ className ? ` ${className}` : `` }`}
                    style={{
                        borderRadius: '5px',
                        padding: '5px'
                    }}
                >
                    {headerContent}
                </button>
            :
                <div className='sized-content h-flex confirm-button-area'>
                    <button 
                        onClick={(ev) => { if(onConfirm != null) onConfirm(ev); toggleConfirmArea(); }} 
                        className={`confirm-button${ className ? ` ${className}` : `` }`}
                    >
                        <img className='icon-default-filter confirm-icon' src={`${com.getBaseEnvPath().basePath}/icons/success.svg`}/>
                    </button>
                    <button 
                        onClick={() => { toggleConfirmArea(); }} 
                        className={`confirm-button${ className ? ` ${className}` : `` }`}
                    >
                        <img className='icon-default-filter confirm-icon' src={`${com.getBaseEnvPath().basePath}/icons/failure.svg`}/>
                    </button>
                </div>
        }
      </div>
    );
};

export default ConfirmButton;
