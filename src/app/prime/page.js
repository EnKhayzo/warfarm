/*
 * This file is part of Warfarm.
 *
 * Warfarm is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Warfarm is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Warfarm. If not, see <https://www.gnu.org/licenses/>.
 */

'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'

import * as com from "../common.js"
import HomeFarmMode from './HomeFarmMode.js';
import useGlobalMode from '@/hooks/useGlobalMode.js';
import HomeDucatMode from './HomeDucatMode.js';

export default function Home() {
  const router = useRouter();
  const [ globalMode, setGlobalMode ] = useGlobalMode();
  const isFarmMode = globalMode == null || globalMode === "farmMode";

  return (
    <>
      {
        isFarmMode ?
          <HomeFarmMode/>
        :
          <HomeDucatMode/>
      }
    </>
  );
}
