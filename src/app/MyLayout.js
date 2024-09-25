'use client';

import { Inter } from "next/font/google";

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import "./globals.css";

import * as com from "@/app/common.js"
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// export function generateMetadata() {
//   return {
//     viewport: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320, height=device-height, target-densitydpi=medium-dpi',
//   }
// }

export default function MyLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  // console.log(`pathname`, pathname);

  return (
    <> 
      <Head>
        <title>{com.generatePageTitleFromSiteMap(pathname)}</title>
        <meta property="og:title" content={`${com.generatePageTitleFromSiteMap(pathname)}`} key="title"/>
      </Head>
      {children}
    </>
  );
}
