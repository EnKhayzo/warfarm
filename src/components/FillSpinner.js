'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function FillSpinner({ labelText }){
    if(!labelText) labelText = "Fetching object...";
  return (
    <div className='sized-remaining v-flex flex-center' style={{ padding: '10px' }}>
      <div className='sized-content spinner-loader medium'></div>
      <div className='sized-content'>{labelText}</div>
    </div>
  );
}