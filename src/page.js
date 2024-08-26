import { useEffect } from 'react';
import { useRouter } from 'next/router';

// this is for the time being; 
// once i start implementing the normal section of Warfarm this will have its own content
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /prime route
    router.replace('/prime');
  }, [router]);

  return null; // Render nothing since we are redirecting
}
