import { useEffect, useRef } from 'react'
import { useAudioStore } from '@/store/audio'

export function AudioPlayer(){
  const audio=useRef<HTMLAudioElement>(null)
  const entered=useAudioStore(state=>state.entered)
  const muted=useAudioStore(state=>state.muted)
  const setPlaying=useAudioStore(state=>state.setPlaying)

  useEffect(()=>{
    const play=()=>{
      if(!audio.current)return
      audio.current.volume=.05
      audio.current.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))
    }
    addEventListener('bon:play',play)
    return()=>removeEventListener('bon:play',play)
  },[setPlaying])
  useEffect(()=>{const volume=(event:Event)=>{const value=(event as CustomEvent<number>).detail;if(audio.current&&typeof value==='number')audio.current.volume=Math.max(0,Math.min(.5,value))};addEventListener('bon:volume',volume);return()=>removeEventListener('bon:volume',volume)},[])

  useEffect(()=>{
    if(!audio.current||!entered)return
    let volume=audio.current.volume
    audio.current.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))
    const timer=window.setInterval(()=>{
      volume=Math.min(.5,volume+.05)
      if(audio.current)audio.current.volume=volume
      if(volume>=.5)clearInterval(timer)
    },100)
    return()=>clearInterval(timer)
  },[entered,setPlaying])

  useEffect(()=>{if(audio.current)audio.current.muted=muted},[muted])

  return <audio ref={audio} loop playsInline preload="auto" src={`${import.meta.env.BASE_URL}audio/bg-music.mp3`}/>
}
