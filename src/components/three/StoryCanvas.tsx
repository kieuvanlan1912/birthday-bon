import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { Mesh } from 'three'
import { useIsLowEnd } from '@/hooks/useIsLowEnd'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Balloon({position,color}:{position:[number,number,number];color:string}){ const ref=useRef<Mesh>(null); useFrame((state)=>{ if(ref.current) ref.current.rotation.y=state.clock.elapsedTime*.25 }); return <Float speed={1.2} floatIntensity={.8}><mesh ref={ref} position={position} scale={[.7,.9,.7]}><sphereGeometry args={[.45,24,24]}/><meshStandardMaterial color={color} roughness={.55}/></mesh></Float> }
function Scene(){ const low=useIsLowEnd(); return <><ambientLight intensity={1.8}/><pointLight position={[2,3,3]} color="#ffe49b" intensity={20}/><Sparkles count={low?35:90} scale={10} size={2} speed={.25} color="#ffe49b"/><Balloon position={[-3,1,-1]} color="#f7c9d4"/><Balloon position={[3,-.5,-2]} color="#cde9dc"/><Balloon position={[1,2,-3]} color="#ffe49b"/></> }
export default function StoryCanvas(){const root=useRef<HTMLDivElement>(null);const[visible,setVisible]=useState(!document.hidden);const fallback=useMemo(()=>{const canvas=document.createElement('canvas');return matchMedia('(prefers-reduced-motion: reduce)').matches||!(canvas.getContext('webgl2')||canvas.getContext('webgl'))},[]);useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change)},[]);useLayoutEffect(()=>{if(fallback)return;const animations=[gsap.to(root.current,{background:'linear-gradient(180deg,#42365e,#e69a9e,#ffe49b)',scrollTrigger:{trigger:'#arrival',start:'top 80%',end:'top 15%',scrub:true}}),gsap.to(root.current,{background:'linear-gradient(180deg,#b9ddea,#f7c9d4,#fff9ed)',scrollTrigger:{trigger:'#months',start:'top bottom',end:'top 30%',scrub:true}})];return()=>animations.forEach(item=>item.kill())},[fallback]);return <div ref={root} className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#25213e,#42365e,#805e78)]" aria-hidden="true">{!fallback&&<Canvas dpr={[1,2]} frameloop={visible?'always':'never'} camera={{position:[0,0,6],fov:50}}><Scene/></Canvas>}</div> }
