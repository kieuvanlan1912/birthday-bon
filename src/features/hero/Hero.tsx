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
  useEffect(()=>{if(age.includes('tròn 1 tuổi')) confetti({particleCount:80,spread:70,colors:['#f7c9d4','#ffe49b','#cde9dc']})},[age])
  return <section id="hero" className="relative flex min-h-[115svh] items-center justify-center overflow-hidden px-5 py-28 text-center text-white"><img src={resolveAsset('bg-hero')} alt="" className="absolute inset-0 -z-[1] h-full w-full object-cover opacity-15"/><div className="max-w-4xl"><motion.p initial={{opacity:0}} animate={{opacity:1}} className="mb-5 text-sm font-semibold uppercase tracking-[.25em]">Một năm đầu đời của</motion.p><motion.h1 initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} className="font-display text-7xl font-semibold sm:text-9xl">Gửi Bon</motion.h1><p className="mt-5 text-lg">{profile.fullName} · 02/01/2026</p><div className="mx-auto mt-8 inline-flex rounded-full border border-white/25 bg-white/15 px-5 py-3 backdrop-blur-xl">{age}</div><Reveal><div className="mx-auto mt-28 max-w-2xl rounded-[2.5rem] bg-paper/95 p-7 text-left text-ink shadow-soft sm:p-12"><p className="font-letter text-4xl">{opening[0]}</p><p className="mt-5 text-lg leading-8">{opening[1]}</p></div></Reveal></div></section>
}
