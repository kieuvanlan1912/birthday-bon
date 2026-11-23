import confetti from 'canvas-confetti'
import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { finalLetter } from '@/data/story'
import { Typewriter } from '@/components/animations/Typewriter'
import { resolveAsset } from '@/lib/assets'
const Cake=lazy(()=>import('@/components/three/Cake').then(module=>({default:module.Cake})))
const partyColors=['#f25f63','#ffc94f','#78c8e8','#63c89b','#ff86ad','#9f83ec']

export function FinalLetter(){
  const[lit,setLit]=useState(true)
  const[celebrating,setCelebrating]=useState(false)
  const blow=()=>{if(!lit)return;setLit(false);setCelebrating(true);[0,260,560].forEach((delay,index)=>window.setTimeout(()=>{const shared={particleCount:90+index*25,spread:80+index*15,startVelocity:48,colors:partyColors,zIndex:80};confetti({...shared,angle:60,origin:{x:0,y:.72}});confetti({...shared,angle:120,origin:{x:1,y:.72}})},delay));window.setTimeout(()=>setCelebrating(false),5200)}
  return <section id="letter" className="relative overflow-hidden bg-mint/70 px-5 py-28"><img src={resolveAsset('bg-letter')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10"/>{celebrating&&<div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">{Array.from({length:14},(_,index)=><motion.div key={index} initial={{y:'115vh',x:0,rotate:-8}} animate={{y:'-25vh',x:index%2?35:-35,rotate:12}} transition={{duration:3.5+(index%5)*.35,delay:(index%7)*.12,ease:'easeOut'}} className="absolute h-16 w-12 rounded-[50%_50%_45%_45%] shadow-toy" style={{left:`${4+(index*7)%92}%`,backgroundColor:partyColors[index%partyColors.length]}}><span className="absolute -bottom-10 left-1/2 h-12 w-px bg-ink/35"/></motion.div>)}</div>}<div className="relative mx-auto max-w-4xl"><header className="mb-12 text-center"><p className="text-sm font-semibold uppercase tracking-[.25em] text-coral">Chương 4</p><h2 className="mt-3 font-display text-5xl font-semibold text-ink sm:text-7xl">Thư gửi Bon</h2></header><div className="rounded-[2.5rem] border-4 border-white/65 bg-paper/95 p-7 shadow-toy sm:p-14"><div className="space-y-5 font-letter text-[1.65rem] leading-[1.8] text-ink sm:text-3xl">{finalLetter.map(text=><Typewriter key={text} text={text}/>)}</div><Suspense fallback={<div className="h-80"/>}><Cake lit={lit}/></Suspense><div className="text-center"><button onClick={blow} disabled={!lit} className="rounded-full border-4 border-white/50 bg-coral px-7 py-4 font-semibold text-white shadow-toy transition hover:-translate-y-1 active:translate-y-1 disabled:bg-plum">{lit?'Thổi nến 🎂':'Điều ước đang bay ✨'}</button></div></div></div></section>
}
