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

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'

import * as com from "../common.js"
import ItemActionButton from '@/components/ItemActionButton.js';
import useTrackedItems from '@/hooks/useTrackedItems.js'
import ObjectStateLabel from '@/components/ObjectStateLabel.js';
import useObtainedComponents from '@/hooks/useObtainedComponents.js';
import ObtainedResurgenceGroup from '@/components/ObtainedResurgenceGroup.js';
import DucatLabel from '@/components/DucatLabel.js';
import SellListSelector from './SellListSelector.js';
import useSellItems from '@/hooks/useSellItems.js';
import useSellLists from '@/hooks/useSellLists.js';
import SellValueLabelObject from '@/components/SellValueLabelObject.js';
import useObtainedExtras from '@/hooks/useObtainedExtras.js';
import ComponentAddButton from './[category]/[routeId]/subcomponents/ComponentAddButton.js';
import ObtainedLabelButtonExtras from '@/components/ObtainedLabelButtonExtras.js';
import SellItemButtons from '@/components/SellItemButtons.js';
import LazyLoadVisibleWrapper from '@/components/LazyLoadVisibleWrapper.js';
import useGlobalMode from '@/hooks/useGlobalMode.js';


export function SellItemsComponent(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ _sellItems, setSellItems ] = useSellItems();
  const [ sellLists, setSellLists ] = useSellLists();

  
  const sharedSellList = searchParams.get("sharedSellList") ? com.decodeFromBase64(searchParams.get("sharedSellList")) : null;

  const sellItems = sharedSellList ? sharedSellList.sellItems : _sellItems;

  const noSellItems = Object.entries(sellItems ?? {}).filter(([ itemId, sellItem ]) => com.getUserDataSellItemValue(itemId) > 0).length <= 0;

  const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
  const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();

  const confirmSell = () => {
    Object.entries(sellItems).forEach(([ itemId, sellObj ]) => {
      // const sellValue = sellObj.sellValue ?? 0;
      // const extrasObtained = obtainedExtras[itemId] && obtainedExtras[itemId].owned ? obtainedExtras[itemId].owned : 0;

      const sellValue = com.getUserDataSellItemValue(itemId);
      const extrasObtained = com.getUserDataExtrasObtained(itemId);

      if(sellValue == 0){ console.warn("sell value is 0! aborting sell"); return; }

      if(sellValue <= extrasObtained){
        com.setUserDataSellItemValue(itemId, 0);
        com.setUserDataExtrasObtained(itemId, extrasObtained-sellValue);
      }
      else console.warn("not enough extras to sell! aborting");
    });
  };

  const confirmSellAndClear = () => {

  };

  return (
      <div className='sized-content tracked-items v-flex flex-center' style={{ gap: '50px', minHeight: '620px' }}>
        <div 
          className='sized-content h-flex flex-center'
          style={{ fontSize: 'x-large', fontWeight: 'bold', whiteSpace: 'pre', textAlign: 'center', textWrap: 'wrap', flexWrap: 'wrap' }}
        >
          You have a Grand Total of <img style={{ marginTop: '2px', width: '40px', height: '40px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`}/>
          {
            Object.entries(obtainedExtras).reduce((acc, [ id, extraObj ]) => {
              acc += com.getDucatValue(com.getObjectFromId(id))*(extraObj.owned ?? 0);

              return acc;
            }, 0)
          } in Sellable Component Duplicates.
        </div>
        {
          (Object.keys(sellLists).length <= 1 && com.isDictEmpty(com.filterDict(sellItems, entry => entry[1].sellValue != null && entry[1].sellValue > 0))) ? null:
            <div className='sized-content v-flex flex-center' style={{ gap: '20px' }}>
              <div style={{ fontWeight: 'bold' }}>Sell Items</div>
              <SellListSelector/>
            </div>
        }
        {
          !noSellItems && sellItems ? 
            <>
              <div className='sized-content tracked-items h-flex flex-center' style={{ gap: '10px' }}>
                <div 
                  className='sized-content h-flex flex-center' 
                  style={{ 
                    overflow: 'auto', 
                    maxWidth: '75vw', 
                    gap: '10px',
                    flexWrap: 'wrap' 
                  }}
                >
                  {
                      Object.entries(sellItems)
                        .filter(([ itemId, sellItem ]) => com.getUserDataSellItemValue(itemId) > 0)
                        .filter(([ itemId, sellItem ]) => com.getObjectFromId(itemId) != null)
                        .sort(([ a, _ ], [ b, __ ]) => 
                          a.localeCompare(b)
                        )
                        .map(([ itemId, sellItem ], index) => { const farmedPerc = com.objectIsFarmedPerc(com.getObjectFromId(itemId), obtainedComponents); return (
                          <div key={`${itemId}-${index}`} className='sized-content v-flex flex-center'>
                            <Link href={com.getObjectRouteFromId(itemId)} 
                              className={`sized-content item-check-parent tracked-items-button v-flex flex-center${farmedPerc <= 0 ? `` : farmedPerc >= 1 ? ` object-farmed-main-page` : ` object-farmed-partial-main-page`}`}
                              style={{ 
                                position: 'relative', 
                                cursor: 'pointer',
                                alignSelf: 'stretch',
                                minWidth: '150px' 
                              }}
                            >
                              <img className='sized-content tracked-items-icon h-flex' style={{ minWidth: 'fit-content', height: '90px' }} src={com.getObjectIcon(com.getObjectFromId(itemId))}/>
                              <div className='sized-content h-flex flex-center' style={{ minWidth: 'fit-content', textAlign: 'center' }}>{itemId}</div>
                              { (() => { 
                                const trackedObject = com.getObjectFromId(itemId); 
                                if(trackedObject == null) return null;

                                if(trackedObject.category === "items" || trackedObject.category === "components") return (
                                  <ObjectStateLabel object={trackedObject} />
                                ); 

                                return null; 
                              })() }
                              { sharedSellList != null ? null: <ItemActionButton itemId={itemId} positionAbsolute={true}/> }
                              <ObtainedResurgenceGroup itemId={itemId} positionAbsolute={true}/>
                              <DucatLabel rawObj={com.getObjectFromId(itemId)}/>
                            </Link>
                            <SellValueLabelObject object={com.getObjectFromId(itemId)}/>
                          </div>
                        )})
                  }  
                </div>
              </div>
              <div 
                className='sized-content h-flex'
                style={{ fontSize: 'x-large', fontWeight: 'bold', whiteSpace: 'pre' }}
              >
                Total Profit: <img style={{ marginTop: '2px', width: '40px', height: '40px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`}/>
                {
                  Object.entries(sellItems).reduce((acc, [ id, sellObj ]) => {
                    acc += com.getDucatValue(com.getObjectFromId(id))*(sellObj.sellValue ?? 0);

                    return acc;
                  }, 0)
                }
              </div>
              <div 
                className='sized-content h-flex'
                style={{ gap: '20px' }}
              >
                <button 
                  className='sized-content h-flex confirm-sell-button'
                  title='Sell amounts will be deducted from the Duplicate number for each component, and the current Sell List cleared'
                  onClick={confirmSell} 
                >
                  Confirm Sell
                </button>
                {/* <button onClick={confirmSellAndClear} title='Owned values will be deducted by the sell amout specified for each component, the list will be cleared of all sell items'>Confirm Sell & Clear</button> */}
              </div>
            </>
          :null
        }
        { noSellItems ? 
            <div className='sized-content v-flex' style={{ gap: '10px', fontSize: 'small', fontStyle: 'italic', whiteSpace: 'pre' }}>
              <div className='sized-content h-flex flex-center'>
                  <div 
                    className='sized-content tracked-items-button v-flex flex-center'
                    style={{ fontStyle: 'normal', cursor: 'pointer' }}
                    onClick={() => router.push("/prime/explorer")}
                  >
                    +
                  </div>
                </div>
              <div className='sized-content v-flex' style={{ textAlign: 'center', padding: '10px', gap: '10px' }}>
                <div className='sized-content h-flex flex-center' style={{ textWrap: 'wrap', flexWrap: 'wrap' }}>You&apos;re not selling any items. Add some by using the Duplicates pane below (if you&apos;ve set any<img className='sized-content star-button-icon h-flex flex-center' style={{ height: '12px',  }} src={`${com.getBaseEnvPath().basePath}/icons/duplicates.svg`}/>duplicates), using the Search Bar or from the <Link href='/prime/explorer' style={{ cursor: 'pointer', color:'var(--color-link-text)' }}>Explorer</Link> page, or by selecting a Sell List (if you saved any).</div>
                <div className='sized-content h-flex flex-center' style={{ textWrap: 'wrap', flexWrap: 'wrap' }}>Sell items using the sell<img className='sized-content star-button-icon h-flex flex-center' style={{ height: '12px',  }} src={`${com.getBaseEnvPath().basePath}/icons/sell_hollow.svg`}/>button and specifying a quantity (you need to have set<img className='sized-content star-button-icon h-flex flex-center' style={{ height: '12px',  }} src={`${com.getBaseEnvPath().basePath}/icons/duplicates.svg`}/>duplicates first in order to sell). In the Duplicates pane you can directly sell items using the corresponding buttons.</div>
              </div>
            </div> 
          : 
            null 
        }
      </div>
  );
}

export function DuplicatesComponent(){
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();

  if(com.isDictEmpty(com.filterDict(obtainedExtras, ([id, extraObj]) => extraObj.owned != null && extraObj.owned > 0))) return null;

  return (
    <div
      className='sized-content v-flex'
      style={{
        backgroundColor: 'var(--color-tertiary)',
        borderRadius: '10px',
        padding: '10px',
        gap: '10px'
      }}
    >
      <div className='sized-content h-flex flex-center' style={{ fontSize: 'x-large', fontWeight: 'bold' }}>Duplicates you have</div>
      <div
        className='sized-content h-flex flex-center'
        style={{
          gap: '10px',
          flexWrap: 'wrap',
          maxWidth: '90vw'
        }}
      >
        {
          Object.entries(obtainedExtras)
            .filter(([ componentId, extraObj ]) => extraObj.owned != null && extraObj.owned > 0)
            .map(([ componentId, extraObj ]) => ([ componentId, [ extraObj, com.getObjectFromId(componentId) ] ]))
            .toSorted(([idA, [ a, rawA ] ], [ idB, [ b, rawB ] ]) => 
              ((rawA.vaulted ? 1 : -1) - (rawB.vaulted ? 1 : -1))
              ||
              b.owned - a.owned 
              || 
              idA.localeCompare(idB)
            )
            .map(([ componentId, extraObjEntry ], index) => { const component = com.getObjectFromId(componentId); return (
              <LazyLoadVisibleWrapper key={`${index}-${componentId}`} style={{ width: '205px', minHeight: '190px' }}>
                <div className='sized-content v-flex flex-center' style={{ gap: '5px' }}>
                  <ComponentAddButton 
                    component={com.getObjectFromId(componentId)}
                    isRawObj={true}
                    darkenIfVaulted={true}
                    fullName={true}
                    showButtons={false}
                    showCorrespondingItem={true}
                    style={{ minWidth: '205px' }}
                  />
                  <SellItemButtons component={component} showLabel={true} alwaysShowLabel={true}/>
                </div>
              </LazyLoadVisibleWrapper>
            )})
        }
      </div>
    </div>
  );
}

function BaroComponent(){
  const [ seed, setSeed ] = useState(1);

  const [ worldState, setWorldState ] = useState(null);
  useEffect(() => {
    const fetchData = async(setTimer=true) => {
      try {
        // Fetch the JSON response from the URL
        const response = await fetch('https://enkhayzomachines.net:8443/voidtraders');
        
        // Parse the response as JSON
        const data = await response.json();
        
        // console.log(`set world state!`, data);

        // Update state with the fetched data
        setWorldState(data);

        if(setTimer) setTimeout(timerFunc, 1000);

        if(data == null) setTimeout(() => fetchData(false), 5*60*1000); // 5 minutes
        
        let targetDate = Date.now()+1*24*60*60*1000; // 1 day
        const lowestDate = data.reduce((acc, trader) => {
          const traderExpiryDate = com.accessDateAPI(trader.Expiry);
          if(traderExpiryDate < acc) acc = traderExpiryDate;

          return acc;
        }, targetDate);

        if(lowestDate < targetDate) targetDate = lowestDate;

        let timeToWait = targetDate-Date.now();
        if(timeToWait <= 0) timeToWait = 20*1000; // 20 seconds

        // console.log(`time until refetch`, com.getTimestampAsDurationString(timeToWait, false, true));
        setTimeout(refetchData, timeToWait);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const refetchData = () => fetchData(false);

    const timerFunc = () => {
      setSeed(Math.random());
      setTimeout(timerFunc, 1000);
    }

    fetchData();

    return () => {
      clearTimeout(timerFunc);
      clearTimeout(refetchData);
    }
  }, []);

  let timeSinceStartBaro = null;
  let timeUntilBaro = null;
  let baroLocation = null;
  if(worldState != null) {
    const baroState = worldState.find(trader => trader.Character === "Baro'Ki Teel");
    if(baroState != null){
      const activationDate = com.accessDateAPI(baroState.Activation);
      if(activationDate != null) timeSinceStartBaro = Date.now() - activationDate;

      const expiryDate = com.accessDateAPI(baroState.Expiry);
      if(expiryDate != null) timeUntilBaro = expiryDate - Date.now();

      baroLocation = com.getAPINodeName(baroState.Node);
      // console.log(`baro locaion`, baroLocation,baroState.Node);
    }
  }

  return (
    worldState == null || timeUntilBaro == null ? null:
      <div className='sized-remaining v-flex flex-center' style={{ gap: '50px', marginBottom: '40px', textWrap: 'wrap', flexWrap: 'wrap', padding: '10px' }}>
        <div className='sized-content h-flex flex-center' style={{ whiteSpace: 'pre', fontSize: 'x-large', textWrap: 'wrap', flexWrap: 'wrap' }}>Baro Ki&apos;Teer { timeSinceStartBaro < 0 ? <>will arrive{ baroLocation != null ? <> at <span style={{ fontWeight: 'bold' }}>{baroLocation}</span></> : `` }</> : <>has arrived{ baroLocation != null ? <> at <span style={{ fontWeight: 'bold' }}>{baroLocation}</span></> : `` } and will go away</>} in <span className='sized-content h-flex flex-center' style={{ fontWeight: 'bold' }}>{com.getTimestampAsDurationString(timeSinceStartBaro < 0 ? -timeSinceStartBaro : timeUntilBaro)}</span></div>
      </div>
  );
}

export default function HomeDucatMode() {
  const router = useRouter();
  const [ sellItems, setSellItems ] = useSellItems();
  const noSellItems = Object.entries(sellItems ?? {}).filter(([ itemId, trackedItem ]) => com.getUserDataSellItemValue(itemId) > 0).length <= 0;

  return (
    <div className='sized-remaining v-flex' style={{ justifyContent: 'center', gap: '0px' }}>
      {/* {
        !noSellItems ? null :
        <div className='sized-content h-flex flex-center' style={{ padding: '10px' }}>
          <img className='sized-content h-flex flex-center' style={{ width: '400px' }} src={`${com.getBaseEnvPath().basePath}/icons/logo_prime.svg`}/>
        </div>
      } */}
      <BaroComponent/>
      <div className='sized-remaining v-flex flex-center' style={{ gap: '100px' }}>
        <SellItemsComponent/>
        <DuplicatesComponent/>
      </div>
    </div>
  );
}

