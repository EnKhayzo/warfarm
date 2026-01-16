// Collapsible.js
import React, { useState, useRef, useEffect } from 'react';

import * as com from "@/app/common.js"

const Collapsible = ({ title, children, className, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
  }, [isOpen]);

  return (
    <div className={`sized-content v-flex collapsible-container flex-center${className ? ` ${className}` : ``}`} style={com.shallowMerge({}, style)}>
      <button className={`collapsible ${isOpen ? 'active' : ''}`} onClick={toggleCollapsible}>
        {title}
        <span className={`collapsible-arrow ${isOpen ? 'open' : ''}`}></span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: `${height}` }}
        className="collapsible-content"
      >
        <div className="sized-content v-flex collapsible-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
