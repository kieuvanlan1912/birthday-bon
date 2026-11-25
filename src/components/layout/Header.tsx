import { Bell, BellOff, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAudioStore } from '@/store/audio'

export function Header(){
  const muted=useAudioStore(state=>state.muted), playing=useAudioStore(state=>state.playing), toggleMuted=useAudioStore(state=>state.toggleMuted)
  const sfxEnabled=useAudioStore(state=>state.sfxEnabled),toggleSfx=useAudioStore(state=>state.toggleSfx)
  const lastScroll=useRef(0),autoFrame=useRef(0),lastFrame=useRef(0)
  const[progress,setProgress]=useState(0),[hidden,setHidden]=useState(false),[autoScroll,setAutoScroll]=useState(false)
  useEffect(()=>{const onScroll=()=>{const next=scrollY,total=Math.max(1,document.documentElement.scrollHeight-innerHeight);setProgress(next/total*100);setHidden(next>120&&next>lastScroll.current);lastScroll.current=next};addEventListener('scroll',onScroll,{passive:true});return()=>removeEventListener('scroll',onScroll)},[])
  useEffect(()=>{
    if(!autoScroll){cancelAnimationFrame(autoFrame.current);lastFrame.current=0;return}
    const tick=(time:number)=>{
      const delta=lastFrame.current?Math.min(40,time-lastFrame.current):0
      lastFrame.current=time
      window.scrollBy(0,delta*.055)
      const atEnd=scrollY+innerHeight>=document.documentElement.scrollHeight-3
      if(atEnd){setAutoScroll(false);return}
      autoFrame.current=requestAnimationFrame(tick)
    }
    autoFrame.current=requestAnimationFrame(tick)
    return()=>cancelAnimationFrame(autoFrame.current)
  },[autoScroll])
  useEffect(()=>{const stop=()=>setAutoScroll(false);addEventListener('wheel',stop,{passive:true});addEventListener('touchstart',stop,{passive:true});return()=>{removeEventListener('wheel',stop);removeEventListener('touchstart',stop)}},[])
  const handleAudio=()=>{toggleMuted();if(muted)window.dispatchEvent(new Event('bon:play'))}
  const audioOff=muted||!playing
  return <><header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${hidden&&!autoScroll?'-translate-y-full':'translate-y-0'}`}><div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/75 via-night/40 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"/><div className="flex items-center justify-between px-4 pb-7 pt-4 text-white"><a href="#hero" className="rounded-full bg-night/45 px-4 py-2 font-display text-lg font-semibold shadow-soft backdrop-blur-xl">Bon · 01</a><div className="flex gap-2"><button onClick={()=>setAutoScroll(value=>!value)} aria-pressed={autoScroll} className={`rounded-full border p-3 shadow-soft backdrop-blur-xl ${autoScroll?'border-sun bg-sun text-ink':'border-white/35 bg-night/45 text-white'}`} aria-label={autoScroll?'Tạm dừng tự cuộn':'Bắt đầu tự cuộn'}>{autoScroll?<Pause size={20}/>:<Play size={20}/>}</button><button onClick={toggleSfx} aria-pressed={sfxEnabled} className="rounded-full border border-white/35 bg-night/45 p-3 text-white shadow-soft backdrop-blur-xl" aria-label={sfxEnabled?'Tắt hiệu ứng âm thanh':'Bật hiệu ứng âm thanh'}>{sfxEnabled?<Bell size={20}/>:<BellOff size={20}/>}</button><button onClick={handleAudio} aria-pressed={!audioOff} className="rounded-full border border-white/35 bg-night/45 p-3 text-white shadow-soft backdrop-blur-xl" aria-label={audioOff?'Bật nhạc':'Tắt nhạc'}>{audioOff?<VolumeX size={20}/>:<Volume2 size={20}/>}</button></div></div></header><div className="fixed left-0 top-0 z-[60] h-1 rounded-r-full bg-gradient-to-r from-coral via-sun to-mint" style={{width:`${progress}%`}}/></>
}
