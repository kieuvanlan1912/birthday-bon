import confetti from 'canvas-confetti'
import { lazy, Suspense, useState } from 'react'
import { finalLetter } from '@/data/story'
import { Typewriter } from '@/components/animations/Typewriter'
import { resolveAsset } from '@/lib/assets'
const Cake=lazy(()=>import('@/components/three/Cake').then(module=>({default:module.Cake})))
export function FinalLetter(){
  const[lit,setLit]=useState(true)
  const blow=()=>{setLit(false);confetti({particleCount:140,spread:100,origin:{y:.7},colors:['#f7c9d4','#ffe49b','#cde9dc','#b9ddea']})}
  return <section id="letter" className="relative overflow-hidden bg-mint/50 px-5 py-28"><img src={resolveAsset('bg-letter')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10"/><div className="relative mx-auto max-w-4xl"><header className="mb-12 text-center"><p className="text-sm font-semibold uppercase tracking-[.25em] text-coral">Chương 4</p><h2 className="mt-3 font-display text-5xl font-semibold text-ink sm:text-7xl">Thư gửi Bon</h2></header><div className="rounded-[2.5rem] bg-paper/95 p-7 shadow-soft sm:p-14"><div className="space-y-5 font-letter text-3xl leading-relaxed text-ink">{finalLetter.map(text=><Typewriter key={text} text={text}/>)}</div><Suspense fallback={<div className="h-80"/>}><Cake lit={lit}/></Suspense><div className="text-center"><button onClick={blow} disabled={!lit} className="rounded-full bg-ink px-6 py-4 font-semibold text-white shadow-soft transition hover:-translate-y-1 disabled:opacity-60">{lit?'Thổi nến 🎂':'Nến đã tắt · Điều ước đang bay ✨'}</button></div></div></div></section>
}
