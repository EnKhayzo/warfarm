'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as com from "../app/common.js"

const LabelCheckbox = ({ textLabel, name, value, onChange, checked }) => {
    return (
      <div className='sized-content h-flex' style={{ gap: '5px', padding: '0px', margin: '0px' }}>
        <input className='sized-content' type="checkbox" name={name} value={value} onChange={onChange} defaultChecked={checked ?? false}/>
        <div className='sized-content'>{textLabel}</div>
      </div>
    );
};

export default LabelCheckbox;
