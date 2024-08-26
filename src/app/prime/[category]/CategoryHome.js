'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function CategoryHome({ category }) {
  const router = useParams();

  return (
    <div>{category}!</div>
  );
}
