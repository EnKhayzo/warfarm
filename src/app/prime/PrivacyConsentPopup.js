'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import * as com from "@/app/common.js"
import ToggleSwitch from '@/components/ToggleSwitch';
import useUserDataPreferences from "@/hooks/useUserDataPreferences.js";

export default function PrivacyConsentPopup({ onChange }){
    const router = useRouter();

    const [ userPreferences, setUserPreferences ] = useUserDataPreferences();
    
    const [ userChoice, setUserChoice ] = useState(null);

    return (
        <>
            {
                com.getUserDataPrivacyConsentStatus() == null ?
                    <div
                        className="sized-content v-flex flex-center"
                        style={{
                            position: 'absolute',
                            left: '10px',
                            bottom: '10px',
                            minHeight: '250px',
                            maxHeight: '80vh',
                            backgroundColor: 'var(--color-secondary)',
                            maxWidth: '300px',
                            padding: '10px',
                            borderRadius: '10px',
                            gap: '20px'
                        }}
                    >
                        <div className="sized-content v-flex" style={{ gap: '10px', minHeight: '100px', overflow: 'auto' }}>
                            <div>Warfarm uses <span style={{ fontWeight: 'bold' }}></span> to gauge at the number of users that are using the site; this is only for curiosity on my end and to get a perspective on how many users visit it.</div>
                            <div>I&apos;ve tried disabling as many tracking options as possible and enabled the redacting of all information except for page views, but I don&apos;t know what  can do with the data.</div>
                            <div>If you want, you can opt out of the page view tracking by selecting the option below (you can change this later in the settings page).</div>
                        </div>
                        <div className="sized-content h-flex flex-center" style={{ gap: '10px' }}>
                            <span style={{ marginBottom: '4px' }}>Page View Tracking:</span> <ToggleSwitch onChange={(ev) => { setUserChoice(ev.target.checked); }}/>
                        </div>
                        <div className="sized-content v-flex flex-center">
                            <button style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'var(--color-tertiary)' }} onClick={ev => { com.setUserDataPrivacyConsentStatus(userChoice ?? true); }}>Confirm</button>
                        </div>
                    </div> 
                :null
            }
        </>
    );
}
