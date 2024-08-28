/*
 * This file is part of Warfarm.
 *
 * Warfarm is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Warfarm is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Warfarm. If not, see <https://www.gnu.org/licenses/>.
 */

'use client';

import { Inter } from "next/font/google";
import "./globals.css";

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useParams, usePathname, useRouter } from 'next/navigation';

import SearchBar from '../../components/SearchBar.js';
import ContextMenuButton from '../../components/ContextMenuButton.js';
import SortableList from '@/components/SortableList';

import * as com from "../common.js"
import IconButton from "@/components/IconButton";
import useDialogUis from "@/hooks/useDialogUis";
import FallbackObject from "./[category]/[name]/FallbackObject";
import LazyLoaded from "@/components/LazyLoaded";

const inter = Inter({ subsets: ["latin"] });

async function initialize(){
  await com.initialize(true);
}

export function MainLayoutComponent({children}){
  const router = useRouter();
  const pathName = usePathname();  
  console.log(`pathname`, pathName);
  const [ dialogUis, setDialogUis ] = useDialogUis();
  

  const exportUserData = () => {
    com.downloadJSON({ userData: com.loadSetting("userData"), epoch: Date.now(), version: "1.0.0" }, "warfarm_userData.json");
  }

  const importUserData = async () => {
    try{
      const userData = await com.triggerFileUpload();

      if(userData.version == null) console.warn(`no version found!`);
      else{
        const [ major, minor, patch, others ] = userData.version.split(".");

        if(Number(major) != 1) { console.error(`error importing version! unsupported version detected.`); return }
      }

      if(userData.userData == null) { console.error(`no userData in userData!`); return; }

      com.setAllUserData(userData.userData);
    } 
    catch(error) { console.error(`error during file upload`, error); }
  }

  const setMissionPriorities = (missionPriorities) => {
    com.setUserDataMissionPriorityPreferences(missionPriorities);
  }

  const clearObtainedItemsData = () => {
    com.showDialogUi({
      title: "Are you sure you want to clear all the data about the items you obtained?",
      type: "okcancel",
      ok: (ev) => {
        com.clearUserDataObtainedItems();
      }
    });
  }

  const clearTrackedItemsData = () => {
    com.showDialogUi({
      title: "Are you sure you want to clear all the data about the items you tracked?",
      type: "okcancel",
      ok: (ev) => {
        com.clearUserDataTrackedItems();
      }
    });
  }

  const clearMissionPrioritiesData = () => {
    com.showDialogUi({
      title: "Are you sure you want to clear the data about your mission priorities?",
      type: "okcancel",
      ok: (ev) => {
        com.clearUserDataMissionPriorityPreferences();
      }
    });
  }

  const clearAllUserData = () => {
    com.showDialogUi({
      title: "Are you sure you want to clear all user data?",
      type: "okcancel",
      ok: (ev) => {
        com.clearAllUserData();
      }
    });
  }

  const areThereDialogUis = dialogUis != null && dialogUis.length > 0;
  const [ forceHomeBlink, setForceHomeBlink ] = useState(false);

  return (
    <div className='sized-remaining v-flex'>
      <div className='sized-remaining main-body v-flex'>
        <div className="sized-content search-bar-global-container h-flex">
          <div className="sized-content h-flex flex-center" style={{ gap: '20px', justifyContent: 'flex-start' }}>
            <div className='sized-content h-flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <button 
                onClick={() => {
                  if(pathName !== "/prime"){
                    router.push("/prime");  
                  }
                  else{
                    setForceHomeBlink(true);
                    setTimeout(() => {
                      setForceHomeBlink(false);
                    }, 250);
                  }
                }} 
                className='sized-content logo-button h-flex flex-center'
              >
                  <img style={{ minWidth: '70px' }} className='sized-content logo h-flex flex-center' src={`/warfarm/icons/logo_prime.svg`}/>
              </button>
            </div>
            <div className='sized-content h-flex' style={{ gap: '10px'}}>
                <IconButton label={'Home'}      iconUrl={`/warfarm/icons/home.svg`}     highlight={pathName === "/prime"}          forceBlinking={forceHomeBlink}  onClick={() => router.push('/prime')} className={'layout-header-button'} iconClassName={'layout-header-icon'} />
                <IconButton label={'Explorer'}  iconUrl={`/warfarm/icons/explorer.svg`} highlight={pathName === "/prime/explorer"} forceBlinking={null}  onClick={() => router.push('/prime/explorer')} className={'layout-header-button'} iconClassName={'layout-header-icon'} />
                <IconButton label={'About'}     iconUrl={`/warfarm/icons/question.svg`} highlight={pathName === "/prime/about"}    forceBlinking={null}  onClick={() => router.push('/prime/about')} className={'layout-header-button'} iconClassName={'layout-header-icon'} />
              </div>
          </div>
          <SearchBar />
          <div className="sized-remaining h-flex flex-center" style={{ gap:'20px', justifyContent: 'flex-end' }}>
            <IconButton label={'Support Me'} iconUrl={`/warfarm/icons/heart.svg`} onClick={() => router.push("/prime/supportme")} className={'layout-header-button support-me-button'} iconClassName={'support-me-icon'} iconHeight='20px' />
            <div className='sized-content h-flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ContextMenuButton 
                iconUrl={`/warfarm/icons/info.svg`}
                headerContent={<img src="/warfarm/icons/info.svg" style={{ minWidth: '10px', filter: 'invert()', height: '20px', opacity: '70%' }}/>}
              >
                {
                  (props) => (
                    <>
                      
                    </>
                  )
                }
              </ContextMenuButton>
              <ContextMenuButton
                top='50px' 
                className='global-settings-button'
                headerContent={<img src="/warfarm/icons/settings.svg" style={{ minWidth: '10px', filter: 'invert()', height: '20px', opacity: '70%' }}/>}
              >
                {
                  (props) => (
                    <>
                      <li className='sized-content v-flex'>
                      <div className='sized-content v-flex'>
                          <div style={{ fontSize: 'x-small', fontStyle: 'italic' }}>Missions</div>
                          <div className='sized-content v-flex'>
                              <div>Mission Priority Preference</div>
                              <div style={{ fontSize: 'x-small', fontStyle: 'italic', fontWeight: 'bold' }}>higher in list is prioritized over lower</div>
                              <SortableList
                                  style={{
                                    marginTop: '5px',
                                    padding: '10px', 
                                    backgroundColor: 'var(--color-secondary)',
                                    borderRadius: '10px', 
                                    padding: '10px', 
                                    fontSize: 'small' 
                                  }}
                                  elems={Object.keys(com.getDefaultMissionTypePriorities()).map(priority => (
                                      <div key={`${priority}`} className='sized-content h-flex flex-center' style={{ gap: '5px', cursor: 'pointer' }}>
                                          <div className='sized-content h-flex flex-center'><img style={{ filter: 'invert()', width: '5px', height: '5px' }} src='/warfarm/icons/move.svg'/></div>
                                          <div className='sized-content h-flex flex-center'>{priority}</div>
                                      </div>
                                  ))}
                                  onOrderConfirm={
                                    (_elemsIdxs) => { 
                                      const missionPriorities = com.missionPrioritiesObservable.get();

                                      const newMissionPriorities = Object.fromEntries(_elemsIdxs
                                        .map((elemIdx, index) => { 
                                          const actualElem = Object.keys(missionPriorities)[elemIdx];
                                          return [ actualElem, index ]; 
                                        })
                                      ); 

                                      console.log(`order confirm`, _elemsIdxs, missionPriorities, newMissionPriorities);

                                      setMissionPriorities(
                                        newMissionPriorities
                                      ) 
                                  }}
                              />
                          </div>
                      </div>
                    </li>
                    <li className='sized-content v-flex'>
                      <div className='sized-content v-flex' style={{ padding: '5px 0', gap: '5px' }}>
                        <div style={{ fontSize: 'x-small', fontStyle: 'italic' }}>User Data</div>
                        <div className='sized-content v-flex' style={{ gap: '5px' }}>
                          <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
                            <button onClick={exportUserData} className='sized-content settings-button'>Export User Data</button>
                            <button onClick={importUserData} className='sized-content settings-button'>Import User Data</button>
                          </div>
                          <div className='sized-content v-flex' style={{ gap: '5px' }}>
                            <button onClick={ev => { clearObtainedItemsData(ev); props.closeMenu(); }} className='sized-content settings-button settings-button-delete'>Clear Obtained Items data</button>
                            <button onClick={ev => { clearTrackedItemsData(ev); props.closeMenu(); }} className='sized-content settings-button settings-button-delete'>Clear Tracked Items data</button>
                            <button onClick={ev => { clearMissionPrioritiesData(ev); props.closeMenu(); }} className='sized-content settings-button settings-button-delete'>Clear Mission Priority data</button>
                            <button onClick={ev => { clearAllUserData(ev); props.closeMenu(); }} className='sized-content settings-button settings-button-delete'>Clear All User Data</button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                )
              }
              </ContextMenuButton>
            </div>
          </div>
        </div>
        <div className='sized-remaining main-content v-flex' style={{ marginBottom: '10px' }}>
          <div className="sized-remaining v-flex">{children}</div>
          <div className='sized-content v-flex flex-center' style={{ textAlign: 'center', marginTop: '50px', fontSize: 'small' }}>
            <div>This site is not endorsed by or affiliated with Digital Extremes Ltd.</div>
            <div>All images come from Warframe or from websites created and owned by Digital Extremes, who hold the copyright of Warframe.</div>
            <div>All trademarks and registered trademarks present in images are proprietary to Digital Extremes Ltd.</div>
          </div>
        </div>
      </div>
      {
        !areThereDialogUis ? null:
        <div 
          className='sized-remaining v-flex flex-center'
          style={{ 
            position: 'absolute', 
            top: '0px', 
            left: '0px', 
            width: '100vw', 
            height: '100vh',
            backgroundColor: '#22222299' 
          }}
        >
          {
            dialogUis.map((dialogUi, index) => (
              <div 
                key={`${index}-${dialogUi.title}`}
                className='sized-content v-flex flex-center' 
                style={{ 
                  width: '25vw',
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: '10px',
                  padding: '10px',
                  gap: '10px' 
                }}
              >
                <div className='sized-content v-flex flex-center' style={{ textAlign: 'center' }}>{dialogUi.title}</div>
                {
                  dialogUi.type === "okcancel" ? 
                    <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
                      <button onClick={ev => { dialogUi.ok(ev); com.removeDialogUi(dialogUi); }} className="sized-content dialog-footer-button h-flex flex-center">Ok</button>
                      <button onClick={(ev) => com.removeDialogUi(dialogUi)} className="sized-content dialog-footer-button h-flex flex-center">Cancel</button>
                    </div>
                  :null
                }
              </div>
            ))
          }
        </div>
      }
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <LazyLoaded
      fallback={
        <div className="sized-remaining v-flex flex-center" style={{ gap: '10vh' }}>
          {/* <FallbackObject/> */}
          <img style={{ height: '30vh' }} src='/warfarm/icons/logo_prime.svg'/>
          <div className='sized-content v-flex flex-center' style={{ padding: '20px' }}>
            <div className='sized-content spinner-loader h-flex medium'></div>
            <div className='sized-content h-flex'>Fetching object data...</div>
          </div>
        </div>
      }
      loadFunc={async () => {
        await com.initialize(true);

        return (
          <MainLayoutComponent>
            {children}
          </MainLayoutComponent>
        );
      }}
    />
  );
}
