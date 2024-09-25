'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

import * as com from "@/app/common.js"

export default function AboutPage() {
  const router = useRouter();

  // useEffect(() => {
  //   document.title = com.generatePageTitle("About");
  // }, []);

  return (
    <div className='sized-remaining v-flex flex-center' style={{ whiteSpace: 'pre', gap: '50px', textAlign: 'center', textWrap: 'wrap' }}>
      <div className='sized-remaining v-flex flex-center' style={{ whiteSpace: 'pre', gap: '5px', textAlign: 'center', textWrap: 'wrap' }}>
        <div>Warfarm is created using NextJS as a Single Page Application (SPA), generated statically.</div>
        <div>Warfarm is distributed through GitHub Pages, see the public repo <Link className='link-text' href="https://github.com/EnKhayzo/warfarm">here</Link>.</div>
        <div>Created by <span style={{ fontWeight: 'bold' }}>EnKhayzo</span>.</div>
      </div>
      <div className='sized-remaining v-flex flex-center' style={{ whiteSpace: 'pre', gap: '30px' }}>
        <span className='sized-content h-flex flex-center' style={{ fontSize: 'large', fontWeight: 'bold' }}>Contacts</span>
        <div className='sized-content h-flex flex-center' style={{ whiteSpace: 'pre', gap: '40px', flexWrap: 'wrap' }}>
          <div title='enkhayzo' className='sized-content h-flex flex-center' onClick={ev => { navigator.clipboard.writeText("enkhayzo"); com.showNotificationUi({ type: 'success', label: 'Username copied to clipboard!'}) }} style={{ cursor: 'pointer' }}><img src={`${com.getBaseEnvPath().basePath}/icons/discord.svg`} className='sized-content h-flex flex-center' style={{ width: '30px', height: '30px', opacity: '70%' }}/></div>
          <Link href="https://www.youtube.com/@EnKhayzo"><img title="Youtube" src={`${com.getBaseEnvPath().basePath}/icons/youtube.svg`} className='sized-content h-flex flex-center' style={{ width: '30px', height: '30px', opacity: '70%' }}/></Link>
          <Link href="https://x.com/EnKhayzo"><img title="X/Twitter" src={`${com.getBaseEnvPath().basePath}/icons/twitterx.svg`} className='sized-content h-flex flex-center icon-default-filter' style={{ width: '30px', height: '30px', opacity: '70%' }}/></Link>
          <Link href="https://www.reddit.com/user/EnKhayzolo/"><img title="Reddit" src={`${com.getBaseEnvPath().basePath}/icons/reddit.svg`} style={{ width: '30px', height: '30px', opacity: '70%' }}/></Link>
          <Link href="https://ko-fi.com/enkhayzo"><img title="Ko-fi" src={`${com.getBaseEnvPath().basePath}/icons/kofi.svg`} style={{ width: '30px', height: '30px', opacity: '70%' }}/></Link>
          <Link href="https://www.patreon.com/bePatron?u=139879751"><img title="Patreon" src={`${com.getBaseEnvPath().basePath}/icons/patreon.svg`} className='sized-content h-flex flex-center' style={{ filter: 'invert()', width: '30px', height: '30px', opacity: '70%' }}/></Link>
        </div>
      </div>
    </div>
  );
}
