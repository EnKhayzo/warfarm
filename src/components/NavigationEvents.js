'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
 
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  useEffect(() => {
    // const url = `${pathname}?${searchParams}`;
    // console.log(`pathname`, pathname);
  }, [pathname, searchParams])
 
  return null;
}