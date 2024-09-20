'use client';

import { Inter } from "next/font/google";

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import "./globals.css";

import * as com from "@/app/common.js"
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  // console.log(`pathname`, pathname);

  return (
    <html lang="en">
      <Head>
        <title>{com.generatePageTitleFromSiteMap(pathname)}</title>
        <meta property="og:title" content={`${com.generatePageTitleFromSiteMap(pathname)}`} key="title"/>
        <meta name="description" content="Farm your land" />
        <link rel="shortcut icon" href={`${com.getBaseEnvPath().basePath}/favicon.ico`} />
      </Head>
      <body className={`${inter.className} v-flex`} style={{ backgroundColor: '#151718' }}> {/* style is to mitigate FOUC */}
        {children}
      </body>
    </html>
  );
}
