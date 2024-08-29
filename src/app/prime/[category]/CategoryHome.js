'use client';

import { React, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function CategoryHome({ category }) {
  const router = useParams();

  useEffect(() => {
    document.title = com.generatePageTitle("Categories");
  }, []);

  return (
    <div>{category}!</div>
  );
}
