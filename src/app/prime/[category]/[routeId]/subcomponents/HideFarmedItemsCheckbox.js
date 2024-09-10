'use client';

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';

import * as com from "@/app/common.js"
import LabelCheckbox from '@/components/LabelCheckbox.js';

export default function HideFarmedItemsCheckbox({ setHideFarmed }){
    return (
      <LabelCheckbox
        type="checkbox" 
        value="farmed" 
        textLabel="Hide Farmed Items"
        onChange={(ev) => { com.setUserDataPreference("hideFarmed", ev.target.checked); /*setHideFarmed(ev.target.checked)*/ }}
        checked={com.getUserDataPreference("hideFarmed")}
      />
    )
  }