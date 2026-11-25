import { useEffect } from 'react'
import { sceneDuration, tvScenes } from './scenes'

type Options={current:number;started:boolean;paused:boolean;menuOpen:boolean;interaction:number;next:()=>void}
export function useAutoplay({current,started,paused,menuOpen,interaction,next}:Options){
  useEffect(()=>{
    if(!started||paused||menuOpen||current>=tvScenes.length-1)return
    const timer=window.setTimeout(next,sceneDuration(tvScenes[current]))
    return()=>clearTimeout(timer)
  },[current,interaction,menuOpen,next,paused,started])
}
