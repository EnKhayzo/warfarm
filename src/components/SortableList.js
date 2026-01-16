'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as com from "../app/common.js"

const SortableList = ({ elems, className, style, onOrderChange, onOrderConfirm }) => {
    const [ dragging, setDragging ] = useState(-1);
    const dragShadow = useRef(null);
    const parentRef = useRef(null);

    const [ _elems, setElems ] = useState(elems);
    const [ orderElems, setOrderElems ] = useState(elems.map((el, i) => i));

    const mouseMoveListener = ev => {
        if(dragging.index < 0) { console.warn(`dragging index is < 0!`); return; }
        
        const parentBB = dragShadow.current.parentBB;
        dragShadow.current.el.style.top = `${com.clamp(ev.clientY - dragShadow.current.dragOffset.top, parentBB.top, parentBB.bottom - dragShadow.current.el.getBoundingClientRect().height)}px`;
    
        const bbDrag = dragShadow.current.el.getBoundingClientRect();

        let curIndex = 0;
        for(const [ i, child ] of [ ...parentRef.current.childNodes ].entries()){
            const bbChild = child.getBoundingClientRect();
            if(ev.clientY >= bbChild.top){
                curIndex = i;
            }
        }

        if(curIndex != dragShadow.current.originalIndex){
            dragShadow.current._orderElems = [ ...dragShadow.current._orderElems ];

            let t = dragShadow.current._orderElems[dragShadow.current.originalIndex]
            dragShadow.current._orderElems[dragShadow.current.originalIndex] = dragShadow.current._orderElems[curIndex];
            dragShadow.current._orderElems[curIndex] = t;

            dragShadow.current.originalIndex = curIndex;
            setOrderElems(dragShadow.current._orderElems);

            if(onOrderChange) onOrderChange([ ...dragShadow.current._orderElems ])
        }
    }

    const dragStopListener = ev => {
        setDragging(-1);
    }

    useEffect(() => {
        if(dragging.index > -1){
            dragShadow.current = { el: parentRef.current.childNodes[dragging.index].cloneNode(true) };

            dragShadow.current.parentBB = parentRef.current.getBoundingClientRect();
            const elemBB = parentRef.current.childNodes[dragging.index].getBoundingClientRect();

            dragShadow.current.dragOffset = { 
                top: dragging.ev.clientY-elemBB.top, 
                left: dragging.ev.clientX-elemBB.left 
            };

            dragShadow.current.originalIndex = dragging.index;

            dragShadow.current.el.style.position = 'absolute';
            dragShadow.current.el.style["z-index"] = '2000';
            dragShadow.current.el.style.opacity = '50%';

            dragShadow.current.el.style.left = `${elemBB.left}px`;
            dragShadow.current.el.style.top = `${dragging.ev.clientY - dragShadow.current.dragOffset.top}px`;

            dragShadow.current._orderElems = orderElems;

            document.body.appendChild(dragShadow.current.el);

            document.body.addEventListener('mousemove', mouseMoveListener);
            document.body.addEventListener('mouseup', dragStopListener);
        }


        return () => {
            if(dragging.index > -1){
                dragShadow.current.el.remove();
                document.body.removeEventListener('mousemove', mouseMoveListener);
                document.body.removeEventListener('mouseup', dragStopListener);

                if(onOrderConfirm) 
                    onOrderConfirm(
                        [ ...dragShadow.current._orderElems ]
                    )

                setElems(dragShadow.current._orderElems.map(elem => _elems[elem]));
                setOrderElems(dragShadow.current._orderElems.map((elem, index) => index));
                
                dragShadow.current = null
            }
        }
    }, [ dragging ]);

    return (
        <div ref={parentRef} className={`sized-content base-sortable-list v-flex ${className}`} style={style}>
            { orderElems.map((elemIndex, index) => _elems[elemIndex]).map((elem, index) => (
                <div
                    key={ `${index}` }
                    className='sized-content base-sortable-list h-flex'
                    onMouseDown={(ev) => {
                        setDragging({ index: index, ev: ev });
                    }}>
                    {elem}
                </div>
            )) }
        </div>
    );
};

export default SortableList;
