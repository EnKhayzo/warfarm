'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';

import * as com from "@/app/common.js"

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className='sized-remaining v-flex flex-center' style={{ whiteSpace: 'pre', gap: '5px' }}>
      <div>Warfarm is created using NextJS as a Single Page Application (SPA), generated statically.</div>
      <div>Warfarm is distributed through GitHub Pages, see the public repo <a href="https://github.com/EnKhayzo/warfarm">here</a>.</div>
      <div>Created by <span style={{ fontWeight: 'bold' }}>EnKhayzo</span>.</div>
    </div>
  );
}
