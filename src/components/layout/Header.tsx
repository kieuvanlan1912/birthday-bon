import { MonitorPlay, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAudioStore } from '@/store/audio'
import { useUiStore } from '@/store/ui'

export function Header(){
  const entered=useAudioStore(state=>state.entered), muted=useAudioStore(state=>state.muted), toggleMuted=useAudioStore(state=>state.toggleMuted)
  const tvMode=useUiStore(state=>state.tvMode), toggleTvMode=useUiStore(state=>state.toggleTvMode)
  const audio=useRef<HTMLAudioElement>(null), lastScroll=useRef(0)
  const[progress,setProgress]=useState(0),[hidden,setHidden]=useState(false),[playing,setPlaying]=useState(false)
  useEffect(()=>{const onScroll=()=>{const next=scrollY,total=Math.max(1,document.documentElement.scrollHeight-innerHeight);setProgress(next/total*100);setHidden(next>120&&next>lastScroll.current);lastScroll.current=next};addEventListener('scroll',onScroll,{passive:true});return()=>removeEventListener('scroll',onScroll)},[])
  useEffect(()=>{const play=()=>{if(!audio.current)return;audio.current.volume=.05;audio.current.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))};addEventListener('bon:play',play);return()=>removeEventListener('bon:play',play)},[])
  useEffect(()=>{if(!audio.current||!entered)return;let volume=audio.current.volume;audio.current.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false));const timer=window.setInterval(()=>{volume=Math.min(.5,volume+.05);if(audio.current)audio.current.volume=volume;if(volume>=.5)clearInterval(timer)},100);return()=>clearInterval(timer)},[entered])
  useEffect(()=>{if(audio.current)audio.current.muted=muted},[muted])
  const handleAudio=()=>{toggleMuted();if(muted&&audio.current?.paused)audio.current.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))}
  const handleTv=()=>{toggleTvMode();if(!tvMode&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(()=>undefined)}
  const audioOff=muted||!playing
  return <><header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${hidden?'-translate-y-full':'translate-y-0'}`}><div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/75 via-night/40 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"/><div className="flex items-center justify-between px-4 pb-7 pt-4 text-white"><a href="#hero" className="rounded-full bg-night/45 px-4 py-2 font-display text-lg font-semibold shadow-soft backdrop-blur-xl">Bon · 01</a><div className="flex gap-2"><button onClick={handleTv} aria-pressed={tvMode} className={`rounded-full border p-3 shadow-soft backdrop-blur-xl ${tvMode?'border-sun bg-sun text-ink':'border-white/35 bg-night/45 text-white'}`} aria-label={tvMode?'Tắt chế độ TV':'Bật chế độ TV'}><MonitorPlay size={20}/></button><button onClick={handleAudio} aria-pressed={!audioOff} className="rounded-full border border-white/35 bg-night/45 p-3 text-white shadow-soft backdrop-blur-xl" aria-label={audioOff?'Bật nhạc':'Tắt nhạc'}>{audioOff?<VolumeX size={20}/>:<Volume2 size={20}/>}</button></div></div><audio ref={audio} loop playsInline preload="auto" src={`${import.meta.env.BASE_URL}audio/bg-music.mp3`}/></header><div className="fixed left-0 top-0 z-[60] h-1 rounded-r-full bg-gradient-to-r from-coral via-sun to-mint" style={{width:`${progress}%`}}/></>
}
