import { Inter } from "next/font/google";

import React from 'react';
import Head from 'next/head';
import "./globals.css";

import * as com from "@/app/common.js"
import Script from "next/script";
import MyLayout from "./MyLayout";

const inter = Inter({ subsets: ["latin"] });

// export function generateMetadata() {
//   return {
//     viewport: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320, height=device-height, target-densitydpi=medium-dpi',
//   }
// }

export const viewport = {
  initialScale: '1',
  width: 'device-width',
  height: 'device-height',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content="Farm your land" />
        <link rel="shortcut icon" href={`${com.getBaseEnvPath().basePath}/favicon.ico`} />
        <meta
          key="viewport"
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320, height=device-height, target-densitydpi=medium-dpi"
        />
      </Head>
      <body className={`${inter.className} v-flex`} style={{ backgroundColor: '#151718' }}> {/* style is to mitigate FOUC */}
        <MyLayout>
          {children}
        </MyLayout>
      </body>
    </html>
  );
}
