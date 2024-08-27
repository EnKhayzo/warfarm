'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function FallbackObject({}){
  return (
    <div className='sized-content v-flex flex-center' style={{ padding: '20px' }}>
      <div className='sized-content spinner-loader h-flex medium'></div>
      <div className='sized-content h-flex'>Fetching object data...</div>
    </div>
  );
}
