'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import * as com from "../app/common.js"
import useLifecycleEffect from '@/hooks/useLifecycleEffect.js';

function LazyComponent({ loadFunc, fallback }) {
  const [Component, setComponent] = useState(null);
  const loadFuncCalled = useRef(false);

  // useEffect listens for changes and re-renders when any dependency changes
  // (of course it runs always at least once when the component is first rendered)
  // useEffect always runs once at the first render
  // if you don't pass any depenency to the dependency array it will only do it once
  // useEffect(() => {
  //   if(!loadFuncCalled.current){
  //     loadFuncCalled.current = true;
  //     loadFunc().then((Comp) => {
  //       const CompWrapper = () => Comp;
  //       CompWrapper.displayName = `LazyLoadedComponent`;
  //       setComponent(() => CompWrapper);
  //     });
  //   }

  //   return () => {};
  // }, [loadFunc]); // loadFunc in this case is const (never changes),  but it's a good practice to put any outside variable you use inside useEffect inside the dependency array (in case in the future this becomes dynamic)

  // if (!Component) return fallback;

  // ONLY on mount (not update or clear)
  useLifecycleEffect({
    mount: () => {
      loadFunc().then((Comp) => {
        const CompWrapper = () => Comp;
        CompWrapper.displayName = `LazyLoadedComponent`;
        setComponent(() => CompWrapper);
      });
    }
  });

  return Component ? <Component /> : fallback;
}

/** loadFunc has to return a COMPONENT, not a jsx, i.e ALWAYS return "() => (\<div>Example!\</div>)" instead of directly "(\<div>Example!\</div>)" */
export default function LazyLoaded({ fallback, loadFunc }) {
  return (
    // <Suspense fallback={fallback}>
        <LazyComponent loadFunc={loadFunc} fallback={fallback}/>
    // </Suspense>
  );
}
