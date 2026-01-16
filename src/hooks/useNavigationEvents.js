'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
 
export function useNavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [ url, setUrl ] = useState(null);
 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // console.log(`pathname`, pathname);
    setUrl(url)
  }, [pathname, searchParams])
 
  return [ url, setUrl ];
}