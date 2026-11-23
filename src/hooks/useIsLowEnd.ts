import { useMemo } from 'react'
type NavigatorWithMemory = Navigator & { deviceMemory?: number }
export const useIsLowEnd = () => useMemo(()=>{const memory=(navigator as NavigatorWithMemory).deviceMemory ?? 8;return navigator.hardwareConcurrency<=4||memory<=4},[])
