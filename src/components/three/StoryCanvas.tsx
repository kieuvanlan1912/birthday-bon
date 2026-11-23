import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { Group } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsLowEnd } from '@/hooks/useIsLowEnd'
gsap.registerPlugin(ScrollTrigger)

function FramePump({active,reduced}:{active:boolean;reduced:boolean}){const invalidate=useThree(state=>state.invalidate);useEffect(()=>{if(!active||reduced)return;const timer=window.setInterval(invalidate,1000/30);return()=>clearInterval(timer)},[active,invalidate,reduced]);return null}
function Balloon({position,color,phase,reduced}:{position:[number,number,number];color:string;phase:number;reduced:boolean}){const ref=useRef<Group>(null);useFrame(state=>{if(!ref.current||reduced)return;ref.current.position.y=position[1]+Math.sin(state.clock.elapsedTime*.8+phase)*.22;ref.current.rotation.z=Math.sin(state.clock.elapsedTime*.55+phase)*.08});return <group ref={ref} position={position}><mesh scale={[.82,1.04,.82]}><sphereGeometry args={[.52,20,20]}/><meshStandardMaterial color={color} roughness={.38}/></mesh><mesh position={[0,-.58,0]} rotation={[0,0,Math.PI/4]}><coneGeometry args={[.11,.22,4]}/><meshStandardMaterial color={color}/></mesh><mesh position={[0,-1.18,0]}><cylinderGeometry args={[.008,.008,1.1,6]}/><meshBasicMaterial color="#fff7df" transparent opacity={.7}/></mesh></group>}
function Lantern({position,color,phase,reduced}:{position:[number,number,number];color:string;phase:number;reduced:boolean}){const ref=useRef<Group>(null);useFrame(state=>{if(!ref.current||reduced)return;ref.current.rotation.y=state.clock.elapsedTime*.25+phase;ref.current.position.y=position[1]+Math.sin(state.clock.elapsedTime+phase)*.14});return <group ref={ref} position={position}><mesh><cylinderGeometry args={[.34,.34,.7,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.45} roughness={.5}/></mesh><mesh position={[0,.42,0]}><cylinderGeometry args={[.2,.2,.08,12]}/><meshStandardMaterial color="#47394f"/></mesh><pointLight color={color} intensity={2.5} distance={3}/></group>}
function Scene({reduced}:{reduced:boolean}){const low=useIsLowEnd();return <><ambientLight intensity={2.1}/><directionalLight position={[3,4,4]} color="#fff1b8" intensity={2.8}/><pointLight position={[-3,1,2]} color="#ff9fbc" intensity={10}/><Sparkles count={low?24:55} scale={[9,7,4]} size={low?1.5:2.2} speed={reduced?0:.2} color="#fff0a8"/><Balloon position={[-3.2,.9,-.4]} color="#ff86ad" phase={0} reduced={reduced}/><Balloon position={[3.1,-.4,-1]} color="#75d7c0" phase={2} reduced={reduced}/>{!low&&<Balloon position={[1.7,2,-2]} color="#ffc94f" phase={4} reduced={reduced}/>}<Lantern position={[-1.8,-1.7,-1.5]} color="#ff8f6b" phase={1} reduced={reduced}/><Lantern position={[2.2,1.3,-2]} color="#ffd36e" phase={3} reduced={reduced}/></>}

export default function StoryCanvas(){
  const root=useRef<HTMLDivElement>(null)
  const[visible,setVisible]=useState(!document.hidden)
  const reduced=useMemo(()=>matchMedia('(prefers-reduced-motion: reduce)').matches,[])
  const noWebGL=useMemo(()=>{const canvas=document.createElement('canvas');return !(canvas.getContext('webgl2')||canvas.getContext('webgl'))},[])
  useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change)},[])
  useLayoutEffect(()=>{if(noWebGL||reduced)return;const animations=[gsap.to(root.current,{background:'linear-gradient(180deg,#42365e,#e77d91,#ffc94f)',scrollTrigger:{trigger:'#arrival',start:'top 80%',end:'top 15%',scrub:true}}),gsap.to(root.current,{background:'linear-gradient(180deg,#78c8e8,#ff9fbc,#fff9ed)',scrollTrigger:{trigger:'#months',start:'top bottom',end:'top 30%',scrub:true}})];return()=>animations.forEach(item=>item.kill())},[noWebGL,reduced])
  return <div ref={root} className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,#25213e,#42365e,#805e78)]" aria-hidden="true">{noWebGL?<div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,134,173,.4),transparent_24%),radial-gradient(circle_at_85%_30%,rgba(255,201,79,.35),transparent_22%)]"/>:<Canvas dpr={[1,1.5]} frameloop="demand" camera={{position:[0,0,6],fov:50}} gl={{antialias:!reduced,powerPreference:'high-performance'}}><FramePump active={visible} reduced={reduced}/><Scene reduced={reduced}/></Canvas>}</div>
}
