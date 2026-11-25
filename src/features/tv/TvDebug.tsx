import { useEffect, useState } from 'react'

export function TvDebug(){
  const[fps,setFps]=useState(0)
  const[size,setSize]=useState(`${innerWidth} × ${innerHeight}`)
  useEffect(()=>{
    let frame=0,last=performance.now(),request=0
    const tick=(now:number)=>{frame++;if(now-last>=1000){setFps(Math.round(frame*1000/(now-last)));frame=0;last=now}request=requestAnimationFrame(tick)}
    const resize=()=>setSize(`${innerWidth} × ${innerHeight}`)
    request=requestAnimationFrame(tick);addEventListener('resize',resize)
    return()=>{cancelAnimationFrame(request);removeEventListener('resize',resize)}
  },[])
  return <aside className="tv-debug"><b>TV DEBUG</b><span>FPS: {fps}</span><span>Viewport: {size}</span><span>DPR: {devicePixelRatio}</span><span>Canvas: 1920 × 1080 · 30fps</span><span>UA: {navigator.userAgent}</span></aside>
}
