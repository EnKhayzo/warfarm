'use client';

import React from 'react';
import * as com from "../common.js"
import HoverElement from '@/components/HoverElement.js';

function SortSection({ title, children }){
  return (
    <div className="sized-content v-flex flex-center" style={{ alignSelf: 'stretch', height: '100%' }}>
      <span style={{ fontSize: 'large', fontWeight: 'bold' }}>{title}</span>
      <div className="sized-content v-flex flex-center" style={{ gap: '5px' }}>
        <div className="sized-content v-flex flex-center" style={{ gap: '5px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SortCategoryHeaderContent({ title }){
  return (
    <div className="sized-content v-flex flex-center">
          <span>{title}</span>
      <span style={{ fontSize: 'small', fontStyle: 'italic' }}>Hover the mouse here to see the subset</span>
    </div>
  );
}

function CategoryHoverElement(){
  return (
    <HoverElement
      headerContent={<SortCategoryHeaderContent title={'Category'}/>}
      absoluteContainerStyle={{ bottom: '80px' }}
      headerStyle={{ alignSelf: 'stretch', backgroundColor: 'var(--color-tertiary)' }}
    >
      <span>Warframe</span>
      <span>Primary Weapon</span>
      <span>Secondary Weapon</span>
      <span>Melee Weapon</span>
      <span>Arch Gun</span>
      <span>Companion</span>
      <span>?</span>
    </HoverElement>
  );
}

const sortSpanStyle = {
  textAlign: 'center', 
  alignSelf: 'stretch', 
  borderRadius: '10px', 
  padding: '10px', 
  backgroundColor: 'var(--color-tertiary)' 
};

export default function LegendComponent({ closeMenu }){

  return (
    <div 
      className="sized-remaining v-flex flex-center"
      style={{
        maxHeight: '75vh',
        width: '70vw',
        overflow: 'auto',
        justifyContent: 'flex-start'
      }}
    >
      <div className="sized-content v-flex flex-center" style={{ gap: '50px' }}>
        <div className="sized-content v-flex flex-center">
          <span>When i refer to an &apos;object&apos;, i mean either an item, a component, a relic or a mission.</span>
          <span>By &apos;item&apos; i mean anything that needs components to be crafted (Warframes, Weapons, Companions, etc).</span>
        </div>
        <div className="sized-content v-flex flex-center">
          <div className="sized-content h-flex" style={{ fontSize: 'x-large', fontWeight: 'bold' }}>Icons</div>
          <div className="sized-content v-flex">
            <span className="sized-content h-flex" style={{ whiteSpace: 'pre' }}><img className="icon-gold-filter" style={{ width: '20px', height: '20px' }}    src={`${com.getBaseEnvPath().basePath}/icons/star_hollow_filled.svg`}/> = Object that has been tracked, you can click on it to untrack/track.</span>
            <span className="sized-content h-flex" style={{ whiteSpace: 'pre' }}><img className="icon-default-filter" style={{ width: '20px', height: '20px' }} src={`${com.getBaseEnvPath().basePath}/icons/success_hollow.svg`}/> = You can click this icon to toggle the item as farmed automatically, it will set all related components to their respective required count.</span>
            <span className="sized-content h-flex" style={{ whiteSpace: 'pre' }}><img className="icon-partial-filter" style={{ width: '20px', height: '20px' }} src={`${com.getBaseEnvPath().basePath}/icons/square.svg`}/> = The object has been partially farmed, some parts/components are still missing. The blue fill square indicates how much of the object you have.</span>
            <span className="sized-content h-flex" style={{ whiteSpace: 'pre' }}><img className="icon-success-filter" style={{ width: '20px', height: '20px' }} src={`${com.getBaseEnvPath().basePath}/icons/success.svg`}/> = The object has been farmed: in the case of an item it means every component has been obtained. You can click this to toggle remove the farmed status of the object.</span>
            <span className="sized-content h-flex" style={{ whiteSpace: 'pre' }}><img className="icon-gold-filter" style={{ width: '20px', height: '20px' }}    src={`${com.getBaseEnvPath().basePath}/icons/resurgence.svg`}/> = Prime Resurgence Object, can be an item, a component or a relic.</span>
          </div>
        </div>
        <div className="sized-content v-flex flex-center">
          <div className="sized-content h-flex" style={{ fontSize: 'x-large', fontWeight: 'bold' }}>Vaulted Items</div>
          <div className="sized-content v-flex flex-center" style={{ gap: '10px' }}>
            <div className="sized-content h-flex flex-center" style={{ gap: '50px', fontWeight: 'bold', fontSize: 'large' }}>
              <img style={{ width: '100px', height: '100px', objectFit: 'contain', opacity: '100%' }} src={com.getObjectIcon(com.getObjectFromId("Sevagoth Prime"))}/>
              {' => '}
              <img style={{ width: '100px', height: '100px', objectFit: 'contain', opacity: '50%' }} src={com.getObjectIcon(com.getObjectFromId("Sevagoth Prime"))}/>
            </div>
            <span className="sized-content h-flex flex-center" style={{ textAlign: 'center' }}>Vaulted objects are slightly trasparent (applies to items, components and relics).</span>
          </div>
        </div>
        <div className="sized-content v-flex flex-center">
          <div className="sized-content h-flex" style={{ fontSize: 'x-large', fontWeight: 'bold' }}>Default Sort</div>
          <div className="sized-content v-flex flex-center" style={{ gap: '20px' }}>
            <span className="sized-content h-flex" style={{ whiteSpace: 'pre' }}>For almost all object groups, i sort them in this order:</span>
            <div className="sized-content h-flex flex-center" style={{ gap: '20px' }}>
              <SortSection title="Items">
                <span style={sortSpanStyle}>Vaulted</span>
                <CategoryHoverElement/>
                <span style={sortSpanStyle}>Alphabetical</span>
              </SortSection>
              <SortSection title="Components">
                <span style={sortSpanStyle}>Vaulted</span>
                <CategoryHoverElement/>
                <span style={sortSpanStyle}>Alphabetical</span>
              </SortSection>
              <SortSection title="Relics">
                <span style={sortSpanStyle}>Vaulted</span>
                <HoverElement
                  headerContent={<SortCategoryHeaderContent title={'Tier'}/>}
                  absoluteContainerStyle={{ bottom: '80px' }}
                  headerStyle={{ alignSelf: 'stretch', backgroundColor: 'var(--color-tertiary)' }}
                >
                  <span>Lith</span>
                  <span>Meso</span>
                  <span>Neo</span>
                  <span>Axi</span>
                  <span>Requiem</span>
                </HoverElement>
                <span style={sortSpanStyle}>Alphabetical</span>
              </SortSection>
            </div>
          </div>
        </div>
        <div className="sized-content v-flex flex-center">
          <div className="sized-content h-flex" style={{ fontSize: 'x-large', fontWeight: 'bold' }}>User Data</div>
          <div className="sized-content v-flex flex-center" style={{ textAlign: 'center', gap: '5px' }}>
            <span className="sized-content h-flex flex-center" style={{ whiteSpace: 'pre' }}>Please Export User Data often (<img className="icon-default-filter" style={{ marginTop: '3px', width: '20px', height: '20px' }} src={`${com.getBaseEnvPath().basePath}/icons/settings.svg`}/> -&gt; <button className='sized-content settings-button'>Export User Data</button>) to have backups of what you have obtained:</span>
            <span>Warfarm doesn&apos;t use a database; everything happens locally on your machine and it isn&apos;t any different for the stored data about obtained/tracked items.</span>
            <span className="sized-content h-flex flex-center" style={{ whiteSpace: 'pre' }}>I use the browser&apos;s localStorage system, which (AFAIK) could be cleared even by <span className='sized-content h-flex' style={{ fontWeight: 'bold' }}>deleting cookies/navigation data</span>.</span>
            <span className="sized-content h-flex flex-center">This also has the bad side effect that the user data is not synced between devices or even different browsers. I don&apos;t know if i&apos;ll implement a more resilient system in the future (a db costs unfortunately) but i&apos;ll try mitigating the issue as much as possible.</span>
          </div>
        </div>
      </div>
    </div>
  );
}