'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

import * as com from "@/app/common.js"

export default function AboutPage() {
  const router = useRouter();

  // useEffect(() => {
  //   document.title = com.generatePageTitle("Upcoming");
  // }, []);

  return (
    <div className='sized-remaining v-flex flex-center' style={{ whiteSpace: 'pre', gap: '50px', textWrap: 'wrap', textAlign: 'center' }}>
      <div className='sized-content v-flex flex-center'>
        <div className='sized-content h-flex flex-center'><img style={{ objectFit: 'contain', width: '200px', height: '200px' }} className='sized-content h-flex flex-center' src={`${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`} /></div>
        <div className='sized-content h-flex flex-center' style={{ fontWeight: 'bold', fontSize: 'x-large' }}>Ducat Mode</div>
        <div className='sized-content h-flex flex-center' style={{ fontStyle: 'italic', fontSize: 'small' }}>Keep track of all extras you have and how much they are worth</div>
        <div className='sized-content h-flex flex-center' style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 'medium', marginTop: '30px', backgroundColor: 'var(--color-component-rare)', borderRadius: '10px', padding: '10px' }}>Ducat Mode is now available! Click on the &apos;Farm Mode&apos; button next to the Search Bar to switch.</div>
      </div>
      <div className='sized-content v-flex flex-center' style={{ whiteSpace: 'pre', gap: '5px' }}>
        <div>-Relics owned system?</div>
        <div>-Possibly more sorting options for relic/mission tabs</div>
      </div>
      <div className='sized-content v-flex flex-center' style={{ whiteSpace: 'pre', gap: '5px', fontStyle: 'italic' }}>
        <div>And many more little QoL fixes and stuff over time :)</div>
      </div>
    </div>
  );
}
