'use client';

import React, { useState, useEffect } from 'react';
import * as com from "../common.js"
import IconButton from '@/components/IconButton.js';

export default function BannerComponent({}){
    const targetDate = new Date('2024-09-05T20:30:00Z');
    // const targetDate = new Date('2024-09-04T23:45:00Z');

    // com.setUserDataBannerStatus({}); // this is just to test force reset the banner status
    // com.setUserDataBannerStatus({ hasClickedBanner: true, lastClicked: Date.now()-60*60*9*1000, bannerTargetDate: targetDate.getTime() }); // this is just to test force reset the banner status

    const [ bannerClicked, setBannerClicked ] = useState(com.getUserDataBannerStatus().hasClickedBanner ?? false);
    const [ secsRemaining, setSecsRemaining ] = useState(targetDate-Date.now());
    const timeoutId = () => {
        setSecsRemaining(targetDate-Date.now());

        const bannerStatus = com.getUserDataBannerStatus();
        if(bannerStatus != null && !com.isDictEmpty(bannerStatus)){
            if(
                (bannerStatus.bannerTargetDate != null && Date.now() < bannerStatus.bannerTargetDate) && 
                (bannerStatus.lastClicked != null && Date.now()-bannerStatus.lastClicked > 60*60*8*1000)
            ){
                com.setUserDataBannerStatus({});
                setBannerClicked(false);
            }
        }

        setTimeout(timeoutId, 1000);
    };

    useEffect(() => {
        const bannerStatus = com.getUserDataBannerStatus();
        if(bannerStatus != null && !com.isDictEmpty(bannerStatus)){
            if(bannerStatus.bannerTargetDate < targetDate) {
                com.setUserDataBannerStatus({});
            }
        }

        setTimeout(timeoutId, 1000);

        return () => { if(timeoutId) clearTimeout(timeoutId); }
    }, []);

    const unremovableTimeThreshold = 60*5*1000; // 5 minutes

  return (
    <>
        { 
            (bannerClicked && secsRemaining > unremovableTimeThreshold) || secsRemaining < -60*20*1000 ? null:
            <div 
                className="sized-content h-flex flex-center" 
                style={{ 
                    backgroundColor: 'var(--color-component-rare)',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    padding: '10px',
                    gap: '5px'
                }}
            >
                <div className='sized-content h-flex flex-center' style={{ justifyContent: 'flex-start', whiteSpace: 'pre', overflow: 'auto' }}>MULTIPLE TRACK LISTS UPDATE, COMING IN <span style={{ fontWeight: 'bold', color: secsRemaining < 60*60*2*1000 ? 'red' : 'inherit' }}>{com.getTimestampAsDurationString(secsRemaining)}</span> (<span style={{ fontWeight: 'bold' }}>{targetDate.toLocaleString()} your time</span>){ secsRemaining < -10 ? <span style={{ fontStyle: 'italic' }}> (i might be late lol)</span> : '' }, please <span style={{ fontWeight: 'bold' }}>Export User Data</span> (<img className="icon-default-filter" style={{ marginTop: '3px', width: '20px', height: '20px' }} src={`${com.getBaseEnvPath().basePath}/icons/settings.svg`}/> -&gt; <button className='sized-content settings-button'>Export User Data</button>) to have a backup of your data before this date just in case!{ secsRemaining < -60*5*1000 ? ' Deploy should have happened, try refreshing the page' : null }</div>
                <div className='sized-remaining h-flex' style={{ justifyContent: 'flex-end' }}>
                    <button 
                        className='sized-content h-flex' 
                        style={{ 
                            pointerEvents: secsRemaining < unremovableTimeThreshold ? 'none' : 'all',
                            opacity: secsRemaining < unremovableTimeThreshold ? '50%' : '100%',
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            textAlign: 'center', 
                            backgroundColor: 'var(--color-quaternary)', 
                            borderRadius: '10px', 
                            padding: '5px' ,
                            width: '30px',
                            height: '30px',
                            paddingBottom: '10px'
                        }}
                        onClick={() => { setBannerClicked(true); com.setUserDataBannerStatus({ hasClickedBanner: true, lastClicked: Date.now(), bannerTargetDate: targetDate.getTime() }); }}
                    >
                        x
                    </button>
                </div>
            </div>
        }
    </>
  );
}

