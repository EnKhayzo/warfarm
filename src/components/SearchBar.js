'use client';

import { useState, useEffect, useRef } from 'react';

import { SearchBarContext } from '../contexts/SearchBarContext';
import SearchResult from './SearchResult';
import ContextMenuButton from './ContextMenuButton';
import LabelCheckbox from './LabelCheckbox';

import * as com from "../app/common.js"
import useMissionPriorities from '@/hooks/useMissionPriorities';

const SearchBar = ({ isExpanded=false }) => {
    const [ query, setQuery ] = useState('');
    const [ results, setResults ] = useState([]);
    const [ filters, setFilters ] = useState({});

    const [ missionPriorities, setMissionPriorities ] = useMissionPriorities();

    const handleSearch = async (textToSearch) => {
        const value = textToSearch;

        if (value) {
            let allResults = [];

            let items = await com.waitFor(() => com.getAllItems(), null);
            let components = await com.waitFor(() => com.getAllComponents(), null);
            let relics = await com.waitFor(() => com.getAllRelics(), null);
            let missions = await com.waitFor(() => com.getAllMissions(), null);

            const maxResults = 10;

            if(!("Items" in filters) || filters.Items == true){
                // Items
                allResults = [ ...allResults, ...Object.values(items)
                    .filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
                    .slice(0, Math.max(0, maxResults-allResults.length))
                    .map(item => ({
                        ...item,
                        id: item.name,
                        category: "Items",
                        imageUrl: `${com.getBaseEnvPath().basePath}/images/${item.name}.png`,
                    }))
                ];
            }

            if(!("Components" in filters) || filters.Components == true){
                // Components
                allResults = [ ...allResults, ...Object.values(components)
                    .filter(component => component.fullName.toLowerCase().includes(value.toLowerCase()))
                    .slice(0, Math.max(0, maxResults-allResults.length))
                    .map(component => ({
                        ...component,
                        id: component.id,
                        category: "Components",
                        imageUrl: `${com.getBaseEnvPath().basePath}/images/${component.fullName}.png`,
                    }))
                ];
            }

            if(!("Relics" in filters) || filters.Relics == true){
                // Relics
                allResults = [ ...allResults, ...Object.entries(relics)
                    .filter(([relicName, relic]) => relicName.toLowerCase().includes(value.toLowerCase()))
                    .slice(0, Math.max(0, maxResults-allResults.length))
                    .map(([relicName, relic]) => ({
                        ...relic,
                        id: relicName,
                        category: "Relics",
                        imageUrl: `${com.getBaseEnvPath().basePath}/images/${relicName.split(" ")[0].trim()}.png`,
                    }))
                ];
            }

            if(!("Missions" in filters) || filters.Missions == true){
                // Missions
                allResults = [ ...allResults, ...Object.values(missions)
                    .filter(mission => `${mission.name}, ${mission.planet}`.toLowerCase().includes(value.toLowerCase()))
                    .slice(0, Math.max(0, maxResults-allResults.length))
                    .map(mission => ({
                        ...mission,
                        id: `${mission.name}, ${mission.planet}`,
                        missionName: mission.name,
                        category: "Missions",
                        imageUrl: `${com.getBaseEnvPath().basePath}/images/${mission.planet}.png`,
                    }))
                ];
            }

            setResults(allResults);
        } 
        else {
            setResults([]);
        }
    };

    useEffect(() => {
        if(results && results.length > 0) setShowResultArea(true);
        else setShowResultArea(false);
    }, [results]);

    let inputTimeout = null;
    const onInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if(inputTimeout) clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => {
            handleSearch(e.target.value);
        }, 250);
    }

    const [ showResultArea, setShowResultArea ] = useState(false);
    const resultAreaRef = useRef(null);
    const handleClickOutside = (ev) => {
        if (resultAreaRef.current && 
            !resultAreaRef.current.contains(ev.target) && 
            ev.target.closest(".global-search-bar-container") == null &&
            ev.target.closest(".global-context-menu-ui") == null) {
                setShowResultArea(false);
            }
      };
    
      useEffect(() => {
        if (showResultArea) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [showResultArea]);

      useEffect(() => {
        handleSearch(query);
      }, [ filters ]);


      const setSearchFilter = (searchType, value) => {
        let _filters = com.cloneDict(filters);
        _filters[searchType] = value;

        setFilters(_filters);
      }

    return (
        <div 
            className='sized-remaining h-flex global-search-bar-container '
            style={{ 
                maxWidth: isExpanded ? 'auto' : '50vw',
                gap: '5px',
                alignItems: 'center',
                position: 'relative',
                padding: '5px'
            }}
        >
            <input
                className='sized-remaining global-search-bar-input'
                type="text"
                placeholder="Search Prime Items/Components/Relics/Missions..."
                value={query}
                onClick={() => { if(!showResultArea) setShowResultArea(true); }}
                onChange={onInputChange}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    backgroundColor: 'var(--color-secondary)',
                }}
            />
            <ContextMenuButton 
                title='Filters'
                top='40px'
                className="sized-content global-search-bar-filter-button v-flex"
                headerContent={<img className="sized-content global-search-bar-filter-icon" src={`${com.getBaseEnvPath().basePath}/icons/filter.svg`} />}
            >
                {
                    (props) => (
                        <ul className='sized-content v-flex' style={{
                            gap: '10px',
                            backgroundColor: 'var(--color-sextenary)'
                        }}>
                            <li className='sized-content v-flex'>
                                <div>
                                    <div style={{ fontSize: 'x-small', fontStyle: 'italic' }}>Search</div>
                                    <div>
                                        <div>Result Type Filter</div>
                                        <div>
                                            <LabelCheckbox 
                                                type="checkbox" 
                                                value="Items" 
                                                textLabel="Items"
                                                onChange={(ev) => { setSearchFilter("Items", ev.target.checked) }} 
                                                checked={true}
                                            />
                                            <LabelCheckbox 
                                                type="checkbox" 
                                                value="Components" 
                                                textLabel="Components"
                                                onChange={(ev) => { setSearchFilter("Components", ev.target.checked) }}
                                                checked={true}
                                            />
                                            <LabelCheckbox 
                                                type="checkbox" 
                                                value="Relics" 
                                                textLabel="Relics"
                                                onChange={(ev) => { setSearchFilter("Relics", ev.target.checked) }}
                                                checked={true}
                                            />
                                            <LabelCheckbox 
                                                type="checkbox" 
                                                value="Missions" 
                                                textLabel="Missions"
                                                onChange={(ev) => { setSearchFilter("Missions", ev.target.checked) }}
                                                checked={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )
                }
            </ContextMenuButton>
            <div 
                className='sized-remaining v-flex'
                style={{
                    top: '55px',
                    position: 'absolute', 
                    width: '100%', 
                    display: 'flex', 
                    gap: '5px', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    maxHeight: '75vh',
                    overflow: 'auto',
                    backgroundColor: 'var(--color-quaternary)',
                    borderRadius: '10px',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    display: !showResultArea || results.length <= 0 ? 'none' : '',
                    zIndex: '999'
                }}
                ref={resultAreaRef}
            >
                {results.length > 0 && (
                    results.map((result, index) => (
                    <SearchBarContext.Provider key={`${result.id}-${index}-prov`} value={{ missionPriorities: missionPriorities }}>
                        <SearchResult
                            key={`${result.id}-${index}`}
                            id={result.id}
                            category={result.category}
                            type={result.type}
                            vaulted={result.vaulted}
                            imageUrl={result.imageUrl}
                            closeSearchBarCallback={(ev) => setShowResultArea(false)}
                            rawObj={result}
                        />
                    </SearchBarContext.Provider>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchBar;
