'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';

import ControlButton from './ControlButton';
import * as com from "../app/common.js"

import { SearchBarContext } from './SearchBarContext';
import TrackItemButton from './TrackItemButton';
import ObtainedLabelButton from './ObtainedLabelButton';

const SearchResult = ({ id, category, type, vaulted, imageUrl, closeSearchBarCallback, rawObj }) => {
  const router = useRouter();

  const missionPriorities = useContext(SearchBarContext).missionPriorities;

  const [activeTab, setActiveTab] = useState(com.getDefaultActiveTabForSearchResult(rawObj));
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef(null);

  const toggleContextMenu = () => {
    setShowContextMenu(!showContextMenu);
  };

  const handleClickOutside = (event) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
      setShowContextMenu(false);
    }
  };

  useEffect(() => {
    if (showContextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showContextMenu]);

  // Control buttons based on the active tab
  const getControlButtons = () => {

    const controlButtons = com.getSearchResultRelatedObjects(id, category, type, activeTab, rawObj, { missionPriorities: missionPriorities, router: router });
    // console.log(`contro lbuttons!`, id, controlButtons);
    return controlButtons
  };

  return (
    <div 
      className="sized-remaining global-search-result tracker-item-parent h-flex" 
      style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'var(--color-tertiary)',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        width: '50vw',
        cursor: 'pointer',
        width: 'calc(100% - 40px)'
      }}
      onClick={(ev) => { closeSearchBarCallback(ev); router.push(com.getObjectRouteFromId(rawObj.id)); }}
    >
      {/* Image */}
      <img src={imageUrl} alt={id} style={{ width: '80px' }} />

      {/* Name [vaulted] - category */}
      <div className='sized-content v-flex' style={{ gap: '0px' }}>
        <h2 
          className='sized-content h-flex flex-center' 
          style={{ justifyContent: 'flex-start', gap: '10px', margin: '0px', fontSize: 'large', position: 'relative' }}
        >
          {com.getObjectDisplayName(rawObj)}{vaulted ? <div style={{ marginLeft: '5px', fontSize: 'x-small' }}>vaulted</div> : null }<TrackItemButton positionAbsolute={false} itemId={id}/>
        </h2>
        <div style={{ color: '#9d9488' }}>{category}{type ? ` - ${type}` : ``}</div>
      </div>

      { 
        category === "Components" && rawObj.required > 0 ? 
        <div className='sized-remaining h-flex flex-center'>
          <ObtainedLabelButton component={rawObj} isRawObj={true}/> 
        </div>
        : null 
      }

      {/* Control area with tabs */}
      <div className="sized-remaining" style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
        {/* Tab header */}
        <div style={{ display: 'flex', gap: '5px', overflow: 'auto' }}>
          <div className="sized-remaining" style={{ height: '100%' }}>{/** spacer */}</div>
          {com.getTabsForSearchResult(rawObj).length > 0 ? com.getTabsForSearchResult(rawObj).map(tab => (
            <button
              key={`${id}-${com.capitalizeFirstLetter(tab)}`}
              onClick={(ev) => { ev.stopPropagation(); setActiveTab(tab.toLowerCase()); }}
              style={{
                border: '0px',
                padding: '5px 5px',
                cursor: 'pointer',
                fontSize: 'small',
                borderRadius: '5px',
                backgroundColor: activeTab.localeCompare(tab.toLowerCase()) == 0 ? '#2a2d2f' : '#202325', // 'rgb(49, 47, 54)' : 'rgb(49, 47, 54)', //'#2a2d2f' : '#202325',
                opacity: activeTab.localeCompare(tab.toLowerCase()) == 0 ? '100%' : '50%'
              }}
            >
              {com.capitalizeFirstLetter(tab)}
            </button>
          )) : 
          <div style={{ height: '100%' }}>{/** spacer */}</div>
        }
        </div>
        {/* Control buttons for active tab */}
        <div className="sized-remaining h-flex" style={{ display: 'flex', gap: '5px', overflow: 'auto' }}>
            <div className="sized-remaining h-flex" style={{ gap: '5px', width: '1px' }}>
                <div className="sized-remaining">{/** spacer */}</div>
                {getControlButtons().length > 0 ? getControlButtons().map((infoObj, index) => (
                    <ControlButton 
                      key={(() => { const key = `${infoObj.id}-${activeTab}-${index}`; return key})()} 
                      icon={infoObj.icon} 
                      rawObj={infoObj.rawObj} 
                      vaulted={infoObj.vaulted} 
                      rarity={infoObj.rarity} 
                      _label={infoObj.label} 
                      _labelHeading={infoObj.labelHeading} 
                      _labelFooter={infoObj.labelFooter} 
                      onClick={(ev) => { if(infoObj.tab !== "components") closeSearchBarCallback(ev); infoObj.onClick(); }} 
                      onContextMenu={(ev) => { ev.preventDefault(); closeSearchBarCallback(ev); router.push(infoObj.route); }} 
                      type={infoObj.type} 
                    />
                )) : 
                <div className="sized-remaining v-box" style={{ height: '100%' }}><div className="sized-remaining"></div></div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
