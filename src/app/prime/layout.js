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

import React, { useState, useEffect, useLayoutEffect, useRef, useContext, Suspense } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import SearchBar from '../../components/SearchBar.js';
import ContextMenuButton from '../../components/ContextMenuButton.js';
import SortableList from '@/components/SortableList';

import * as com from "../common.js"
import IconButton from "@/components/IconButton";
import useDialogUis from "@/hooks/useDialogUis";
import FallbackObject from "./[category]/[routeId]/FallbackObject";
import LazyLoaded from "@/components/LazyLoaded";
import HoverElement from "@/components/HoverElement";
import LegendComponent from "./LegendComponent";
import { ScrollPaneContext } from "@/contexts/ScrollPaneContext";
import { NavigationEvents } from "@/components/NavigationEvents";
import useNotificationUis from "@/hooks/useNotificationUis";
import BannerComponent from "./BannerComponent";
import useUserDataPreferences from "@/hooks/useUserDataPreferences.js";
import ToggleSwitch from "@/components/ToggleSwitch.js";
import PrivacyConsentPopup from "./PrivacyConsentPopup.js";
import LabelCheckbox from "@/components/LabelCheckbox.js";
import Script from "next/script.js";
import useGlobalMode from "@/hooks/useGlobalMode.js";
import useContextMenuUis from "@/hooks/useContextMenuUis.js";

const inter = Inter({ subsets: ["latin"] });

async function initialize(){
  await com.initialize(true);
}

function NavBarMainButtons({ forceHomeBlink }){
  const pathName = usePathname(); 

  return (
    <>
      <Link href="/prime"><IconButton label={'Home'}      iconUrl={`${com.getBaseEnvPath().basePath}/icons/home.svg`}     highlight={pathName === "/prime"}          forceBlinking={forceHomeBlink}  className={'layout-header-button'} iconClassName={'layout-header-icon'} /></Link>
      <Link href="/prime/explorer"><IconButton label={'Explorer'}  iconUrl={`${com.getBaseEnvPath().basePath}/icons/explorer.svg`} highlight={pathName === "/prime/explorer"} forceBlinking={null}         className={'layout-header-button'} iconClassName={'layout-header-icon'} /></Link>
      <Link href="/prime/about"><IconButton label={'About'}     iconUrl={`${com.getBaseEnvPath().basePath}/icons/question.svg`} highlight={pathName === "/prime/about"}    forceBlinking={null}            className={'layout-header-button'} iconClassName={'layout-header-icon'} /></Link>
    </>
  );
}

function NavBarSideButtons({}){
  const pathName = usePathname(); 

  return (
    <>
      <Link href="/prime/upcoming">
        <IconButton 
          label={'Upcoming'} 
          iconUrl={`${com.getBaseEnvPath().basePath}/icons/news.svg`} 
          highlight={pathName === "/prime/upcoming"} 
          className={'layout-header-button'} 
          iconClassName={'layout-header-icon'}
        />
      </Link>
    </>
  );
}

function MediaQueryCollapseContextMenuButton({children}){
  return (
    <ContextMenuButton
      className='nav-header-buttons-small-mediaquery-container'
      style={{
      }}
      iconUrl={`${com.getBaseEnvPath().basePath}/icons/info.svg`}
      headerContent={<img src={`${com.getBaseEnvPath().basePath}/icons/more.svg`} style={{ minWidth: '10px', filter: 'invert()', height: '20px', opacity: '70%' }}/>}
    >
      {
        (props) => (
          <div className="sized-content v-flex flex-center" style={{ gap: '5px' }}>
            {children}
          </div>
        )
      }
    </ContextMenuButton>
  )
}

function DucatModeButton(){
  const [ globalMode, setGlobalMode ] = useGlobalMode();

  const isFarmMode = globalMode == null || globalMode === "farmMode";

  return (
    <IconButton 
      label={ isFarmMode ? 'Farm Mode' : "Ducat Mode" }
      iconUrl={isFarmMode ? `${com.getBaseEnvPath().basePath}/icons/farm.svg` : `${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`}
      className={'layout-header-button'}
      iconClassName={isFarmMode ? 'layout-header-icon' : ''}
      iconStyle={isFarmMode ? {} : { marginTop: '2px', width: '20px', height: '20px', objectFit: 'contain' }}
      onClick={(ev) => {
        // console.log(`switch mode!`);
        if(isFarmMode){
          com.setUserDataGlobalMode("ducatMode");
        }
        else{
          com.setUserDataGlobalMode("farmMode");
        }
      }}
    />
  );
}

export function MainLayoutComponent({children}){
  const router = useRouter();
  const pathName = usePathname();  
  const searchParams = useSearchParams();
  const [ dialogUis, setDialogUis ] = useDialogUis();
  const [ notificationUis, setNotificationUis ] = useNotificationUis();
  const [ contextMenuUis, setContextMenuUis ] = useContextMenuUis();
  const mainScrollableRef = useRef(null);

  const [ userPreferences, setUserPreferences ] = useUserDataPreferences();
  // console.log(`user prefrnece!`, userPreferences);
  
  const [ hasFirstAccessed, setHasFirstAccessed ] = useState(false);
  
  useEffect(() => {
    const _hasFirstAccessed = com.getUserDataHasFirstAccessed();
    if(_hasFirstAccessed){
      setHasFirstAccessed(_hasFirstAccessed);
    }

    return () => {

    };
  }, [])

  const exportUserData = () => {
    com.downloadJSON({ userData: com.loadUserData(), epoch: Date.now(), version: "1.0.0" }, `${com.getBaseEnvPath().userData_export_file_name}.json`);
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
  const areThereNotificationUis = notificationUis != null && notificationUis.length > 0;
  const areThereContextMenuUis = contextMenuUis != null && contextMenuUis.length > 0;

  const [ forceHomeBlink, setForceHomeBlink ] = useState(false);
  const [ searchExpanded, setSearchExpanded ] = useState(false);

  const handleSearchExpand = () => {
    setSearchExpanded(true);
  };

  const handleSearchCollapse = () => {
    setSearchExpanded(false);
  };

  // hack; create a map of urls, on every route change increment the value of each map of 1 value
  // (to get how 'old' the value in the map is)
  // if you get to a url, and said url is in the map, and the map's corresponding value is '2' (i think, or 1)
  // reset the value each time you hit the corresponding url (AFTER the check below)
  // then it means you have pushed the back button
  // this only works if your site doesn't have a way to go back to a url by going through less than 2 urls of course
  useLayoutEffect(() => {
    // console.warn(`history length`, history);
    const handleLinkClick = (event) => {
      com.scrollRestoreSave(mainScrollableRef, pathName);
    };
  
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });
  
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, [pathName]);
  
  useLayoutEffect(() => {
    com.scrollRestoreLoad(mainScrollableRef, pathName);
  }, [pathName,searchParams]); // Trigger scroll restoration on route change

  const isThereBanner = false;

  return (
    <>
      {
        
        <Script 
          strategy="lazyOnload"
          data-domain="enkhayzo.github.io" 
          src="https://enkhayzomachines.net/js/script.js"
        />

      }
      <div className='sized-remaining v-flex'>
        <div className='sized-remaining main-body v-flex'>
          <div className="sized-content search-bar-global-container h-flex">
            {
              searchExpanded ?
                <div className="sized-content h-flex flex-center search-expanded">
                  <button onClick={handleSearchCollapse} className="sized-content h-flex back-button">
                    <img className="sized-content icon-default-filter h-flex" src={`${com.getBaseEnvPath().basePath}/icons/arrow.svg`} style={{ marginLeft: '20px', height: '20px', transform: 'rotate(180deg)' }} alt="Back" />
                  </button>
                  <SearchBar isExpanded={true} />
                </div>
              :
              <>
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
                        <Link href="/prime"><img style={{ minWidth: '70px' }} className='sized-content logo h-flex flex-center' src={`${com.getBaseEnvPath().basePath}/icons/logo_prime.svg`}/></Link>
                    </button>
                  </div>
                  <MediaQueryCollapseContextMenuButton>
                    <NavBarMainButtons forceHomeBlink={forceHomeBlink}/>
                  </MediaQueryCollapseContextMenuButton>
                  <div className='sized-content h-flex header-main-buttons-container' style={{ gap: '10px'}}>
                      <NavBarMainButtons forceHomeBlink={forceHomeBlink}/>
                  </div>
                </div>
                <div className="sized-remaining h-flex flex-center">
                  <button className="sized-content h-flex search-button" onClick={handleSearchExpand}>
                    <img style={{ height: '30px' }} className="sized-content h-flex icon-default-filter" src={`${com.getBaseEnvPath().basePath}/icons/search.svg`} alt="Search" />
                  </button>
                  <div 
                    className="sized-remaining h-flex flex-center global-search-bar-area"
                    style={{
                      justifyContent: 'flex-start'
                    }}
                  >
                    <SearchBar />
                    <DucatModeButton/>
                  </div>
                </div>
                <div className="sized-content h-flex flex-center" style={{ gap:'20px', justifyContent: 'flex-end' }}>
                  <Link href="/prime/supportme"><IconButton label={'Support Me'} iconUrl={`${com.getBaseEnvPath().basePath}/icons/heart.svg`} className={'layout-header-button support-me-button'} iconClassName={'support-me-icon'} iconHeight='20px' /></Link>
                  <div className="sized-content h-flex flex-center">
                    <MediaQueryCollapseContextMenuButton>
                      <NavBarSideButtons/>
                    </MediaQueryCollapseContextMenuButton>
                    <div className='sized-content h-flex header-main-buttons-container' style={{ gap: '10px'}}>
                      <NavBarSideButtons/>
                    </div>
                  </div>
                  <div className='sized-content h-flex' style={{ gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <ContextMenuButton 
                      iconUrl={`${com.getBaseEnvPath().basePath}/icons/info.svg`}
                      headerContent={<img src={`${com.getBaseEnvPath().basePath}/icons/info.svg`} style={{ minWidth: '10px', filter: 'invert()', height: '20px', opacity: '70%' }}/>}
                    >
                      {
                        (props) => (
                          <>
                            
                          </>
                        )
                      }
                    </ContextMenuButton> */}
                    <button 
                      className='sized-content h-flex'
                      style={{ position: 'relative' }}
                      onClick={(ev) => {
                        com.setUserDataHasFirstAccessed(false); setHasFirstAccessed(false);
                        com.showDialogUi({
                          title: 'Warfarm - Legend',
                          type: 'custom',
                          uiFunc: (props) => (
                            <LegendComponent props={props}/>
                          )
                        });
                      }}
                    >
                      <div className='sized-content h-flex'><img className='sized-content h-flex icon-default-filter nav-bar-standard-icon' src={`${com.getBaseEnvPath().basePath}/icons/info.svg`}/></div>
                      {
                        !hasFirstAccessed ? null:
                        <div 
                          style={{ position: 'absolute', top: '43px', left: '-40px', pointerEvents: 'none', cursor: 'default' }}
                          onClick={ev => { ev.stopPropagation(); ev.preventDefault(); }}
                        >
                          <div className="speech-bubble blinking-slow">See Here</div>
                        </div>
                      }
                    </button>
                    <ContextMenuButton
                      top='50px' 
                      style={{ right: '0px' }}
                      className='global-settings-button'
                      headerContent={<img src={`${com.getBaseEnvPath().basePath}/icons/settings.svg`} style={{ minWidth: '10px', filter: 'invert()', height: '20px', opacity: '70%' }}/>}
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
                                                <div className='sized-content h-flex flex-center'><img style={{ filter: 'invert()', width: '5px', height: '5px' }} src={`${com.getBaseEnvPath().basePath}/icons/move.svg`}/></div>
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
              </>
            }
            
          </div>
          { isThereBanner ? <BannerComponent/> : null }
          <div ref={mainScrollableRef} className='sized-remaining main-content v-flex' style={{ marginBottom: '10px' }}>
            <div className="sized-remaining main-scrollable v-flex">
              <ScrollPaneContext.Provider value={{mainScrollableRef}}>
                {children}
              </ScrollPaneContext.Provider>
            </div>
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
                    position: 'relative',
                    minWidth: '25vw',
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: '10px',
                    padding: '30px',
                    paddingLeft: '60px',
                    paddingRight: '60px',
                    gap: '10px' 
                  }}
                >
                  <div className='sized-content v-flex flex-center' style={{ textAlign: 'center', fontWeight: 'bold' }}>{dialogUi.title}</div>
                  {
                    dialogUi.type === "okcancel" ? 
                      <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
                        <button onClick={ev => { dialogUi.ok(ev); com.removeDialogUi(dialogUi); }} className="sized-content dialog-footer-button h-flex flex-center">Ok</button>
                        <button onClick={(ev) => com.removeDialogUi(dialogUi)} className="sized-content dialog-footer-button h-flex flex-center">Cancel</button>
                      </div>
                    :
                    dialogUi.type === "textString" ?
                    <div className='sized-content dialog-text-string-area v-flex flex-center' style={{ gap: '10px' }}>
                      <div className='sized-content h-flex flex-center'>
                        <input className="text-field-string" style={{ backgroundColor: 'var(--color-quaternary)', borderRadius: '10px', padding: '10px' }} type="text" defaultValue={dialogUi.value ?? ""}/>
                      </div>
                      <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
                        <button onClick={ev => { dialogUi.ok(ev, ev.target.closest(".dialog-text-string-area").querySelector(".text-field-string").value); com.removeDialogUi(dialogUi); }} className="sized-content dialog-footer-button h-flex flex-center">Ok</button>
                        <button onClick={(ev) => com.removeDialogUi(dialogUi)} className="sized-content dialog-footer-button h-flex flex-center">Cancel</button>
                      </div>
                    </div>
                    :
                    dialogUi.type === "custom" ?
                      dialogUi.uiFunc({ closeMenu: () => com.removeDialogUi(dialogUi) })
                    :null
                  }
                  <button
                    className="sized-content h-flex flex-center"
                    style={{
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      margin: '10px',
                      padding: '5px',
                      width: '30px',
                      height: '30px',
                      backgroundColor: 'var(--color-tertiary)',
                      borderRadius: '10px'
                    }}
                    onClick={() => com.removeDialogUi(dialogUi)}
                  >
                    X 
                  </button>
                </div>
              ))
            }
          </div>
        }
        {
          !areThereContextMenuUis ? null:
          <div 
            className='sized-remaining v-flex flex-center'
            style={{ 
              pointerEvents: 'none',
              position: 'absolute', 
              top: '0px', 
              left: '0px', 
              width: '100vw', 
              height: '100vh',
              backgroundColor: 'transparent', 
              justifyContent: 'flex-end',
              gap: '10px',
              padding: '20px',
              zIndex: '1000', // to go over the search bar result pane
            }}
          >

            {     
              contextMenuUis.map((contextMenuUi, index) => (
                <div
                key={`${index}-${contextMenuUi.children}`}
                  className="sized-content h-flex flex-center global-context-menu-ui"
                  style={{
                    position: 'absolute',
                    pointerEvents: 'all',
                    top: contextMenuUi.position && contextMenuUi.position.top ? contextMenuUi.position.top : 'unset',
                    left: contextMenuUi.position && contextMenuUi.position.left ? contextMenuUi.position.left : 'unset',
                    right: contextMenuUi.position && contextMenuUi.position.right ? contextMenuUi.position.right : 'unset',
                    bottom: contextMenuUi.position && contextMenuUi.position.bottom ? contextMenuUi.position.bottom : 'unset',
                    borderRadius: '10px',
                    padding: '10px'
                  }}
                >
                  { 
                    contextMenuUi.children == null ? null:
                      contextMenuUi.children({})
                  }
                </div>
              ))
            }
          </div>
        }
        {
          !areThereNotificationUis ? null:
          <div 
            className='sized-remaining v-flex flex-center'
            style={{ 
              pointerEvents: 'none',
              position: 'absolute', 
              top: '0px', 
              left: '0px', 
              width: '100vw', 
              height: '100vh',
              backgroundColor: 'transparent', 
              justifyContent: 'flex-end',
              gap: '10px',
              padding: '20px'
            }}
          >
            {
              notificationUis.map((notificationUi, index) => (
                <div 
                  key={`${index}-${notificationUi.title}`}
                  className='sized-content h-flex flex-center' 
                  style={{ 
                    pointerEvents: 'all',
                    position: 'relative',
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: '10px',
                    padding: '10px',
                    gap: '20px' 
                  }}
                >
                  <div className='sized-content h-flex flex-center' >
                    {
                      notificationUi.type === "success" ? 
                        <img className="icon-success-filter" style={{ width: '20px', height: '20px' }} src={`${com.getBaseEnvPath().basePath}/icons/success.svg`}/>
                        :
                      notificationUi.type === "failure" ? 
                        <img className="icon-failure-filter" style={{ width: '20px', height: '20px' }} src={`${com.getBaseEnvPath().basePath}/icons/failure.svg`}/>
                      :null
                    }
                  </div>
                  <div className='sized-content h-flex flex-center' >{notificationUi.label}</div>
                  <div className='sized-content h-flex flex-center' >
                    <IconButton
                      iconUrl={`${com.getBaseEnvPath().basePath}/icons/failure.svg`}
                      iconClassName={'icon-default-filter'}
                      iconStyle={{ width: '10px', height: '10px' }}
                      onClick={() => com.removeNotificationUi(notificationUi)}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        }
        <Suspense fallback={null}>
          <NavigationEvents mainScrollableRef={mainScrollableRef}/>
        </Suspense>
      </div>
    </>
  );
}

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    document.title = com.generatePageTitleFromSiteMap(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === com.getBaseEnvPath().userData) { // userData_warfarm_test
        com.refreshUserData(JSON.parse(event.newValue));
      }
    };

    // window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>        
      <Head>
        <title>{com.generatePageTitleFromSiteMap(pathname)}</title>
        <meta property="og:title" content={`${com.generatePageTitleFromSiteMap(pathname)}`} key="title"/>
      </Head>
      <LazyLoaded
        fallback={
          <div className="sized-remaining v-flex flex-center" style={{ gap: '10vh' }}>
            {/* <FallbackObject/> */}
            <img style={{ height: '30vh' }} src={`${com.getBaseEnvPath().basePath}/icons/logo_prime.svg`}/>
            <div 
              className='sized-content v-flex flex-center' 
              style={{ 
                fontWeight: 'bold', 
                fontSize: 'large', 
                gap: '5px', 
                padding: '20px' 
              }}
            >
              <div className='sized-content spinner-loader h-flex large'></div>
              <div className='sized-content h-flex'>Fetching Datasets...</div>
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
    </>
  );
}
