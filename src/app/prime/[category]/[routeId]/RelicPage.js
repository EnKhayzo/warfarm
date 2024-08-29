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

import { React, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

import * as com from "../../../common.js";
import MainItemTitleComponent from './subcomponents/MainItemTitleComponent.js';
import ComponentAddButton from './subcomponents/ComponentAddButton.js';
import useMissionPriorities from '@/hooks/useMissionPriorities.js';

const ComponentTab = ({components}) => {
    const router = useRouter();
  
    return (
        <div
          className='sized-content component-page-relative-info-container h-flex flex-center'
          style={{ 
            maxWidth: '75vw', 
            flexWrap: 'wrap' 
          }}
    >
          { 
            components.map((component, index) => (
              <Link key={`${index}-${component.name}`} href={com.getObjectRouteFromId(component.id)}><ComponentAddButton component={component} fullName={true} /></Link>
            )) 
          }
        </div>
    );
}

const MissionTab = ({relic, missions, rarityPriorities}) => {
    const router = useRouter();
  
    return (
      <div 
        className='sized-content component-page-relative-info-container v-flex flex-center'
        style={{ maxWidth: '75vw' }}
      >
        {
          <div
            className='sized-content component-page-relative-info-container h-flex flex-center'
            style={{ 
              maxWidth: '75vw', 
              flexWrap: 'wrap' 
            }}
          >
            { 
              missions.map((mission, index) => (
                    <Link href={mission.route}
                      key={`${index}-${mission.id}`} 
                      // onClick={() => router.push(mission.route)}
                      className={`sized-content item-page-component-container tracker-item-parent v-flex flex-center`}
                      style={{
                        cursor: 'pointer',
                        gap: '5px',
                        alignSelf: 'stretch',
                        justifyContent: 'flex-start',
                        width: '150px'
                      }}
                    >
                      <div className='sized-content h-flex flex-center' ><img style={{ height: '75px' }} src={mission.icon}/></div>
                      <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                        <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', fontWeight: 'bold', textAlign: 'center' }}>{mission.labelHeading}</div>
                        <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', textAlign: 'center' }}>{mission.label}</div>
                        <div className='sized-content v-flex' style={{ gap: '5px', marginTop: '5px' }}>
                          {
                            mission.rotations[`${relic.name} Relic`].map((rotation, index) => (
                                <div 
                                    key={`${rotation.rotation}-${index}`} 
                                    className='sized-content' 
                                    style={{ fontSize: 'small', whiteSpace: 'pre', borderRadius: '10px', padding: '10px', backgroundColor: 'var(--color-sextenary)' }}
                                >
                                    <span style={{ fontWeight: 'bold' }}>{rotation.rotation}</span> - <span style={{ fontStyle: 'italic' }}>{rotation.perc}</span>
                                </div>
                            ))
                          }
                        </div>
                      </div>
                  </Link>
              )) 
            }
          </div>
        }
      </div>
    );
  }

export default function RelicPage({ routeId, pathObj }) {
  const router = useRouter();
  const [ missionPriorities, setMissionPriorities ] = useMissionPriorities();

  useEffect(() => {
    document.title = com.generatePageTitle(pathObj.id);
  }, []);

  const relic = com.getObjectFromId(pathObj.id); // (await com.waitFor(async () => await com.getAllRelics(), null))[pathObj.id]

  const components = com.getSearchResultRelatedObjects(null, "Relics", null, "components", relic, { router: router });
  const missions = com.getSearchResultRelatedObjects(null, "Relics", null, "missions", relic, { missionPriorities: missionPriorities, router: router });

  // console.log(`componentrs missions`, components, missions);

  return (
      <div className='sized-content v-flex'>
          <Head>
              <title>{com.generatePageTitle(pathObj.id)}</title>
          </Head>
          <div className='sized-remaining h-flex flex-center'>
              <div className='sized-remaining v-flex flex-center' style={{ gap: '50px' }}>
                  <div className='sized-content h-flex' style={{ marginTop: '20px' }}></div>
                  { relic.vaulted ? (<div className='sized-content h-flex flex-center'>{`${relic.name} is`}<span style={{ fontWeight: 'bold', whiteSpace: 'pre' }}> vaulted</span>.</div>) : null}
                  <MainItemTitleComponent itemId={relic.id} iconUrl={`/warfarm/images/${pathObj.id.split(" ")[0].trim()}.png`} label={pathObj.id}/>
                  
                  <ComponentTab components={components}/>
                  { relic.vaulted ? null :
                    <>
                      <div className='sized-content h-flex' style={{ marginTop: '50px', fontSize: 'large', fontStyle: 'italic', fontWeight: 'bold' }}>Missions</div>
                      <MissionTab relic={relic} missions={missions}/>
                    </>
                  }
              </div>
          </div>
      </div>
  )
}