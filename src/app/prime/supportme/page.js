'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

import * as com from "@/app/common.js"
import TabComponent from '@/components/TabComponent';

function KoFiComponent(){
  return (
    <div  
        style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          padding: '10px'
        }}
        dangerouslySetInnerHTML={{__html: 
          `
            <iframe 
              id='kofiframe' 
              src='https://ko-fi.com/enkhayzo/?hidefeed=true&widget=true&embed=true&preview=true' 
              style='border:none;width:100%;padding:4px;background:#f9f9f9' 
              height='580' 
              title='enkhayzo'
            >
              
            </iframe>
          `
        }}
      />
  );
}

function PatreonComponent(){
  return (
    <div className='sized-content v-flex flex-center' style={{ gap: '5px' }}>
      <div
        className='become-patron-button'
        dangerouslySetInnerHTML={{ __html:
          `
            <a 
              href="https://www.patreon.com/bePatron?u=139879751" 
              data-patreon-widget-type="become-patron-button"
              class="sized-content become-patron-button h-flex flex-center"
              style='gap:5px;border-radius:10px;padding:10px;background-color: var(--color-text);'
            >
              <div style='width:20px;height:20px;'><svg data-tag="IconBrandPatreon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.25 8.416c0-.943-.366-2.297-1.498-3.415C17.62 3.883 15.722 3 12.656 3c-3.732 0-5.96 1.19-7.252 2.91C4.11 7.627 3.75 9.875 3.75 11.991c0 3.113.42 5.365 1.141 6.84C5.612 20.304 6.634 21 7.836 21c1.4 0 2.205-.903 2.824-2.024.619-1.12 1.051-2.46 1.704-3.332.467-.623 1-1.023 1.602-1.312.602-.29 1.273-.469 2.012-.651 1.27-.313 2.338-.969 3.089-1.876.75-.908 1.183-2.067 1.183-3.389"></path></svg></div>
              <div>enkhayzo - Become a member!</div>
            </a>
            <script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>
          `
        }}
      />
    </div>
  );
}

export default function SupportMePage() {
  const router = useRouter();

  useEffect(() => {
    document.title = com.generatePageTitle("Support Me");
  }, []);

  return (
    <div 
      className='sized-remaining v-flex flex-center' 
      style={{
        padding: '10px'
      }}
    >
      <Head>
        <title>{com.generatePageTitle("Support Me")}</title>
      </Head>
      <div 
        className='sized-remaining v-flex flex-center'
        style={{ 
          width: '35vw', 
          gap: '20px', 
          borderRadius: '10px', 
          backgroundColor: 'var(--color-secondary)',
          padding: '10px' 
        }}
      >
        <div 
          className='sized-content v-flex flex-center'
          style={{ 
            textAlign: 'center', 
            justifyContent: 'flex-start' 
          }}
        >
          <div>I am (un?)happily employed, but still grateful to have a stable income;</div>
          <div>I say this because i don&apos;t want you to feel any need to donate to me.</div>
          <div>Having said that, if you want show support i would appreciate the love❤️.</div>
        </div>
        <div 
          className='sized-remaining v-flex flex-center'
          style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
        >
          <TabComponent
            defaultTab={"Ko-fi"} 
            tabs={{
              "Ko-fi": <KoFiComponent/>,
              "Patreon": <PatreonComponent/>
            }}
          />
        </div>
      </div>
    </div>
  );
}
