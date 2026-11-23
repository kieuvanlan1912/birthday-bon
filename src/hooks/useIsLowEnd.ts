import { useMemo } from 'react'
export const useIsLowEnd = () => useMemo(()=> window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.hardwareConcurrency <= 4,[])
