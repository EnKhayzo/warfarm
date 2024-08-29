'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

import * as com from "@/app/common.js"

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = com.generatePageTitle("About");
  }, []);

  return (
    <div className='sized-remaining v-flex flex-center' style={{ whiteSpace: 'pre', gap: '5px' }}>
      <Head>
          <title>{com.generatePageTitle("Explorer")}</title>
      </Head>
      <div>Warfarm is created using NextJS as a Single Page Application (SPA), generated statically.</div>
      <div>Warfarm is distributed through GitHub Pages, see the public repo <Link className='link-text' href="https://github.com/EnKhayzo/warfarm">here</Link>.</div>
      <div>Created by <span style={{ fontWeight: 'bold' }}>EnKhayzo</span>.</div>
    </div>
  );
}
