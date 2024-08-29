import React from 'react';
import ObjectPage from './ObjectPage.js';

import * as com from "../../../common.js";

export async function generateStaticParams() {
  await com.initialize(false);
  return Object.entries(await com.getStaticObjectPaths()).map(([ pathName, path ]) => path);
}

export default function ObjectDetailPage({ params }) {
  const { category, routeId } = params;

  return (
    <ObjectPage category={category} routeId={routeId} />
  );
}
