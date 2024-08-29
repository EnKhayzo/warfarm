'use client';

import { Inter } from "next/font/google";

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <html lang="en">
      <Head>
        <title>Warfarm</title>
        <meta property="og:title" content="Warfarm" key="title"/>
        <meta name="description" content="Farm your land" />
        <link rel="shortcut icon" href="/warfarm/favicon.ico" />
      </Head>
      <body className={`${inter.className} v-flex`}>
        {children}
      </body>
    </html>
  );
}
