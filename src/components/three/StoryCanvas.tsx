import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsLowEnd } from '@/hooks/useIsLowEnd'
gsap.registerPlugin(ScrollTrigger)

type CanvasProps={tvMode?:boolean;sceneIndex?:number}
type MovingProps={position:[number,number,number];color:string;phase:number;reduced:boolean}

function FramePump({active,reduced}:{active:boolean;reduced:boolean}){const invalidate=useThree(state=>state.invalidate);useEffect(()=>{if(!active||reduced)return;const timer=window.setInterval(invalidate,1000/30);return()=>clearInterval(timer)},[active,invalidate,reduced]);return null}
function Balloon({position,color,phase,reduced}:MovingProps){const ref=useRef<Group>(null);useFrame(state=>{if(!ref.current||reduced)return;ref.current.position.y=position[1]+Math.sin(state.clock.elapsedTime*.8+phase)*.22;ref.current.rotation.z=Math.sin(state.clock.elapsedTime*.55+phase)*.08});return <group ref={ref} position={position}><mesh scale={[.82,1.04,.82]}><sphereGeometry args={[.52,20,20]}/><meshStandardMaterial color={color} roughness={.32}/></mesh><mesh position={[0,-.58,0]} rotation={[0,0,Math.PI/4]}><coneGeometry args={[.11,.22,4]}/><meshStandardMaterial color={color}/></mesh><mesh position={[0,-1.18,0]}><cylinderGeometry args={[.008,.008,1.1,6]}/><meshBasicMaterial color="#fff7df" transparent opacity={.7}/></mesh></group>}
function Lantern({position,color,phase,reduced}:MovingProps){const ref=useRef<Group>(null);useFrame(state=>{if(!ref.current||reduced)return;ref.current.rotation.y=state.clock.elapsedTime*.25+phase;ref.current.position.y=position[1]+Math.sin(state.clock.elapsedTime+phase)*.14});return <group ref={ref} position={position}><mesh><cylinderGeometry args={[.34,.34,.7,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.45} roughness={.5}/></mesh><mesh position={[0,.42,0]}><cylinderGeometry args={[.2,.2,.08,12]}/><meshStandardMaterial color="#47394f"/></mesh><pointLight color={color} intensity={2.5} distance={3}/></group>}
function ToyMobile({reduced,sceneIndex}:{reduced:boolean;sceneIndex:number}){
  const group=useRef<Group>(null),ring=useRef<Mesh>(null)
  useFrame(state=>{if(!group.current||reduced)return;const time=state.clock.elapsedTime;group.current.rotation.y=time*.18+sceneIndex*.22;group.current.rotation.z=Math.sin(time*.4)*.08;if(ring.current)ring.current.rotation.x=time*.45})
  return <group ref={group} position={[0,.15,-1.2]}>
    <mesh ref={ring}><torusGeometry args={[1.2,.07,10,32]}/><meshStandardMaterial color="#ffc94f" emissive="#9c5a14" emissiveIntensity={.25}/></mesh>
    <mesh position={[1.18,0,0]} rotation={[.3,.2,.2]}><boxGeometry args={[.42,.42,.42]}/><meshStandardMaterial color="#ff6f69" roughness={.4}/></mesh>
    <mesh position={[-1.18,0,0]}><octahedronGeometry args={[.34]}/><meshStandardMaterial color="#75d7c0" roughness={.35}/></mesh>
    <mesh position={[0,0,1.18]}><torusKnotGeometry args={[.23,.08,48,8]}/><meshStandardMaterial color="#ff86ad" roughness={.38}/></mesh>
    <mesh position={[0,0,-1.18]} rotation={[0,0,.3]}><coneGeometry args={[.3,.58,5]}/><meshStandardMaterial color="#78c8e8" roughness={.35}/></mesh>
  </group>
}
function FloatingToys({reduced,sceneIndex}:{reduced:boolean;sceneIndex:number}){const group=useRef<Group>(null);useFrame(state=>{if(!group.current||reduced)return;const time=state.clock.elapsedTime;group.current.position.y=Math.sin(time*.45+sceneIndex)*.2;group.current.rotation.y=time*.12});return <group ref={group} position={[0,-1.4,-.8]}><mesh position={[-1.3,0,0]} rotation={[.4,.3,.2]}><dodecahedronGeometry args={[.34]}/><meshStandardMaterial color="#ffd36e"/></mesh><mesh position={[0,-.2,.3]}><torusGeometry args={[.45,.13,10,24]}/><meshStandardMaterial color="#a99bf4"/></mesh><mesh position={[1.35,.1,0]} rotation={[.4,0,.5]}><boxGeometry args={[.55,.55,.55]}/><meshStandardMaterial color="#ff967e"/></mesh></group>}
function Scene({reduced,sceneIndex,tvMode}:{reduced:boolean;sceneIndex:number;tvMode:boolean}){const low=useIsLowEnd();return <><ambientLight intensity={2.2}/><directionalLight position={[3,4,4]} color="#fff1b8" intensity={2.8}/><pointLight position={[-3,1,2]} color="#ff9fbc" intensity={9}/><Sparkles count={low?20:48} scale={[9,7,4]} size={low?1.5:2.2} speed={reduced?0:.24} color="#fff0a8"/><ToyMobile reduced={reduced} sceneIndex={sceneIndex}/><FloatingToys reduced={reduced} sceneIndex={sceneIndex}/><Balloon position={[-3.2,.9,-.4]} color="#ff86ad" phase={sceneIndex*.2} reduced={reduced}/><Balloon position={[3.1,-.4,-1]} color="#75d7c0" phase={2+sceneIndex*.1} reduced={reduced}/>{!low&&<Balloon position={[1.7,2,-2]} color="#ffc94f" phase={4} reduced={reduced}/>}<Lantern position={[-1.8,-1.7,-1.5]} color="#ff8f6b" phase={1} reduced={reduced}/><Lantern position={[2.2,1.3,-2]} color="#ffd36e" phase={3} reduced={reduced}/>{tvMode&&<pointLight position={[0,-1,2]} color="#78c8e8" intensity={7}/>}</>}

export default function StoryCanvas({tvMode=false,sceneIndex=0}:CanvasProps){
  const root=useRef<HTMLDivElement>(null)
  const[visible,setVisible]=useState(!document.hidden)
  const[tvScale,setTvScale]=useState(()=>Math.max(innerWidth/1920,innerHeight/1080))
  const reduced=useMemo(()=>matchMedia('(prefers-reduced-motion: reduce)').matches,[])
  const low=useIsLowEnd()
  const noWebGL=useMemo(()=>{const canvas=document.createElement('canvas');return !(canvas.getContext('webgl2')||canvas.getContext('webgl'))},[])
  const fallback=noWebGL||(tvMode&&low)
  useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change)},[])
  useEffect(()=>{if(!tvMode)return;const resize=()=>setTvScale(Math.max(innerWidth/1920,innerHeight/1080));addEventListener('resize',resize);return()=>removeEventListener('resize',resize)},[tvMode])
  useLayoutEffect(()=>{if(tvMode||fallback||reduced)return;const animations=[gsap.to(root.current,{background:'linear-gradient(180deg,#42365e,#e77d91,#ffc94f)',scrollTrigger:{trigger:'#arrival',start:'top 80%',end:'top 15%',scrub:true}}),gsap.to(root.current,{background:'linear-gradient(180deg,#78c8e8,#ff9fbc,#fff9ed)',scrollTrigger:{trigger:'#months',start:'top bottom',end:'top 30%',scrub:true}})];return()=>animations.forEach(item=>item.kill())},[fallback,reduced,tvMode])
  const content=fallback?<div className="three-fallback"><i/><i/><i/><i/><i/></div>:<Canvas dpr={tvMode?1:[1,1.5]} frameloop="demand" camera={{position:[0,0,6],fov:50}} gl={{antialias:!tvMode&&!reduced,powerPreference:'high-performance'}}><FramePump active={visible} reduced={reduced}/><Scene reduced={reduced} sceneIndex={sceneIndex} tvMode={tvMode}/></Canvas>
  return <div ref={root} className={`pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,#25213e,#42365e,#805e78)] ${tvMode?'tv-canvas-viewport':''}`} aria-hidden="true">{tvMode?<div className="tv-canvas-stage" style={{transform:`translate(-50%,-50%) scale(${tvScale})`}}>{content}</div>:content}</div>
}
