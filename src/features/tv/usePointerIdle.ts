import { useCallback, useEffect, useRef, useState } from 'react'

export function usePointerIdle(delay=3000){
  const[visible,setVisible]=useState(true)
  const timer=useRef(0)
  const wake=useCallback(()=>{
    setVisible(true)
    clearTimeout(timer.current)
    timer.current=window.setTimeout(()=>setVisible(false),delay)
  },[delay])
  useEffect(()=>{wake();addEventListener('mousemove',wake,{passive:true});return()=>{clearTimeout(timer.current);removeEventListener('mousemove',wake)}},[wake])
  return {visible,wake}
}
