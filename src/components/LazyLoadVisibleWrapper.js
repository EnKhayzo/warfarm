'use client'

import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function LazyLoadVisibleWrapper({ children, style }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Set to false to allow unmounting when not in view
  });

  return (
    <div ref={ref} style={style}>
      {
      inView ? 
        children 
      : 
        <div 
          className='default-element-style blinking-slow'
          style={{ backgroundColor: 'var(--color-sextenary)', ...style}}
        >

        </div>
      }
    </div>
  );
}
