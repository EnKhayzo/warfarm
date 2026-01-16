'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if running in the browser before using the router
    if (typeof window !== 'undefined') {
      router.replace('/prime');
    }
  }, [router]);

  return null; // Render nothing since we are redirecting
}
