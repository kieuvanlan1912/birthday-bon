import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { opening } from '@/data/story'
import { profile } from '@/data/profile'
import { useAgeCounter } from '@/hooks/useAgeCounter'
import { Reveal } from '@/components/animations/Reveal'
import { resolveAsset } from '@/lib/assets'

export function Hero(){
  const age=useAgeCounter()
  useEffect(()=>{if(age.includes('tròn 1 tuổi'))confetti({particleCount:80,spread:70,colors:['#f7c9d4','#ffe49b','#cde9dc']})},[age])
  return <section id="hero" className="relative isolate flex min-h-[115svh] items-center justify-center overflow-hidden px-5 py-28 text-center text-white"><img src={resolveAsset('bg-hero')} alt="" className="absolute inset-0 z-0 h-full w-full object-cover opacity-10"/><div className="absolute -right-16 top-24 z-[1] h-40 w-40 rounded-full bg-butter/45 blur-[1px] shadow-[0_0_70px_rgba(255,228,155,.45)] sm:right-[8%]" aria-hidden="true"/><div className="relative z-10 max-w-4xl"><motion.p initial={{opacity:0}} animate={{opacity:1}} className="mb-5 text-sm font-semibold uppercase tracking-[.25em]">Một năm đầu đời của</motion.p><motion.h1 initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} className="font-display text-7xl font-semibold drop-shadow-[0_8px_25px_rgba(37,33,62,.35)] sm:text-9xl">Gửi Bon</motion.h1><p className="mt-5 text-lg font-medium drop-shadow-lg">{profile.fullName} · 02/01/2026</p><div className="mx-auto mt-8 inline-flex rounded-full border border-white/35 bg-night/25 px-5 py-3 shadow-soft backdrop-blur-xl">{age}</div><Reveal><div className="mx-auto mt-28 max-w-2xl rounded-[2.5rem] border-4 border-white/50 bg-paper/95 p-7 text-left text-ink shadow-toy sm:p-12"><p className="font-letter text-3xl sm:text-4xl">{opening[0]}</p><p className="mt-5 text-lg leading-8">{opening[1]}</p></div></Reveal></div></section>
}
