import confetti from 'canvas-confetti'
import { motion,useReducedMotion } from 'framer-motion'
import { useEffect,useState } from 'react'
import type { MouseEvent } from 'react'
import { balloonWishes } from '@/data/wishes-balloon'
import { useIsLowEnd } from '@/hooks/useIsLowEnd'
import { useSfx } from '@/hooks/useSfx'
const colors=['#f26f63','#ffc94f','#78c8e8','#63c89b','#ff86ad']
type Balloon={id:number;x:number;color:string;special:boolean}
export function BalloonLayer({tv=false}:{tv?:boolean}){
  const low=useIsLowEnd(),reduced=useReducedMotion(),limit=tv||low?2:5,{play}=useSfx(),[seed,setSeed]=useState(0),[wish,setWish]=useState('')
  const balloons=Array.from({length:limit},(_,index):Balloon=>({id:seed*10+index,x:index%2?88-index*3:3+index*3,color:colors[(index+seed)%colors.length],special:(index+seed)%6===0}))
  useEffect(()=>{if(!wish)return;const timer=setTimeout(()=>setWish(''),2200);return()=>clearTimeout(timer)},[wish])
  useEffect(()=>{const burst=()=>{play('sfx-pop');setSeed(value=>value+1);confetti({particleCount:35,spread:90,origin:{y:.65},colors,zIndex:1050})};addEventListener('bon:pop-balloons',burst);return()=>removeEventListener('bon:pop-balloons',burst)},[play])
  const pop=(balloon:Balloon,event:MouseEvent)=>{event.stopPropagation();play('sfx-pop');confetti({particleCount:18,spread:55,origin:{x:event.clientX/innerWidth,y:event.clientY/innerHeight},colors,zIndex:1050});if(balloon.special)setWish(balloonWishes[balloon.id%balloonWishes.length]);setTimeout(()=>setSeed(value=>value+1),3000+balloon.id%3000)}
  return <div className={`pointer-events-none fixed inset-0 ${tv?'z-[1004]':'z-20'} overflow-hidden`} aria-label="Bóng bay tương tác">{balloons.map((balloon,index)=><motion.button key={balloon.id} onClick={event=>pop(balloon,event)} initial={reduced?false:{y:'110vh',opacity:0}} animate={{y:reduced?'72vh':'-25vh',opacity:.86,rotate:index%2?8:-8}} transition={{duration:reduced?0:16+index*2,delay:index*1.3,repeat:reduced?0:Infinity,repeatDelay:4,ease:'linear'}} className="pointer-events-auto absolute top-0 h-20 w-16 rounded-[50%_50%_45%_45%] border-2 border-white/50 shadow-soft" style={{left:`${balloon.x}%`,backgroundColor:balloon.color}} aria-label="Làm nổ bóng bay"><span className="absolute -bottom-16 left-1/2 h-16 w-px bg-white/50"/></motion.button>)}{wish&&<motion.div initial={{scale:.6,opacity:0}} animate={{scale:1,opacity:1}} className="fixed left-1/2 top-1/4 -translate-x-1/2 rounded-full bg-paper px-6 py-4 font-display text-xl text-ink shadow-toy">{wish}</motion.div>}</div>
}
