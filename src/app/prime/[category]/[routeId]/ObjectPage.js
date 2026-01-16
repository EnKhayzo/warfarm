'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import LazyLoaded from '@/components/LazyLoaded.js';

import FallbackObject from './FallbackObject.js';
import ItemPage from './ItemPage.js';
import ComponentPage from './ComponentPage.js';
import RelicPage from './RelicPage.js';
import MissionPage from './MissionPage.js';

import * as com from "../../../common.js";


const pageMap = {
  "items": ItemPage,
  "components": ComponentPage,
  "relics": RelicPage,
  "missions": MissionPage
}

export default function ObjectPage({ category, routeId }) {
  const router = useParams();

  const SpecificPage = pageMap[category];
  const pathObj = com.getObjectPathObjFromRouteId(routeId);
  return (<SpecificPage routeId={routeId} pathObj={pathObj}/>);
}
