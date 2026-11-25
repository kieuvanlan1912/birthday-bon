import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { WheelEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import StoryCanvas from '@/components/three/StoryCanvas'
import { BalloonLayer } from '@/components/animations/BalloonLayer'
import { months } from '@/data/story'
import { useSfx } from '@/hooks/useSfx'
import { useAudioStore } from '@/store/audio'
import { TvChapterMenu } from './TvChapterMenu'
import { TvControls } from './TvControls'
import { TvDebug } from './TvDebug'
import { TvProgress } from './TvProgress'
import { tvScenes } from './scenes'
import { useAutoplay } from './useAutoplay'
import { usePointerIdle } from './usePointerIdle'
import { useRemoteKeys } from './useRemoteKeys'
import { useTvStore } from './tvStore'

type NavigatorWithWakeLock=Navigator&{wakeLock?:{request:(type:'screen')=>Promise<{release:()=>Promise<void>}>}}

export function TvPlayer(){
  const {current,started,paused,menuOpen,interaction,feedback,start:startPlayback,next,previous,goTo,togglePause,setPaused,setMenuOpen,interact,setFeedback,replay}=useTvStore()
  const muted=useAudioStore(value=>value.muted)
  const toggleMuted=useAudioStore(value=>value.toggleMuted)
  const setEntered=useAudioStore(value=>value.setEntered)
  const sfxEnabled=useAudioStore(value=>value.sfxEnabled),toggleSfx=useAudioStore(value=>value.toggleSfx)
  const {unlock}=useSfx()
  const {visible,wake}=usePointerIdle(3000)
  const wheelAt=useRef(0)
  const pointerAt=useRef(0)
  const scene=tvScenes[current]
  const debug=new URLSearchParams(location.search).get('debug')==='1'

  const start=useCallback(()=>{
    unlock()
    window.dispatchEvent(new Event('bon:play'))
    setEntered(true)
    startPlayback()
    ;(navigator as NavigatorWithWakeLock).wakeLock?.request('screen').catch(()=>undefined)
  },[setEntered,startPlayback,unlock])
  const toggleMusic=useCallback(()=>{toggleMuted();if(muted)window.dispatchEvent(new Event('bon:play'))},[muted,toggleMuted])
  const remote=useMemo(()=>({current,started,menuOpen,start,next,previous,togglePause,setPaused,setMenuOpen,toggleMusic}),[current,menuOpen,next,previous,setMenuOpen,setPaused,start,started,toggleMusic,togglePause])
  useRemoteKeys(remote)
  useAutoplay({current,started,paused,menuOpen,interaction,next})

  useEffect(()=>{
    document.body.classList.add('tv-cinema')
    return()=>document.body.classList.remove('tv-cinema')
  },[])
  useEffect(()=>{
    if(!scene.image)return
    const images=[current-1,current,current+1].map(index=>tvScenes[index]?.image).filter((url):url is string=>Boolean(url)).map(url=>{const image=new Image();image.decoding='async';image.src=url;return image})
    return()=>images.forEach(image=>{image.src=''})
  },[current,scene.image])
  useEffect(()=>{
    if(!feedback)return
    const timer=window.setTimeout(()=>setFeedback(null),800)
    return()=>clearTimeout(timer)
  },[feedback,setFeedback])

  const onWheel=(event:WheelEvent)=>{
    const now=performance.now()
    if(now-wheelAt.current<600||Math.abs(event.deltaY)<8)return
    wheelAt.current=now;wake();interact();if(event.deltaY>0)next();else previous()
  }
  const onPointerMove=()=>{wake();const now=performance.now();if(now-pointerAt.current>1000){pointerAt.current=now;interact()}}
  const toggle=()=>{if(started)togglePause()}

  return <div className={`tv-player ${visible?'has-pointer':'pointer-idle'}`} onMouseMove={onPointerMove} onWheel={onWheel} onClick={toggle}>
    <StoryCanvas tvMode sceneIndex={current}/>
    {started&&<BalloonLayer tv/>}
    <AnimatePresence mode="wait">
      <motion.section key={scene.id} className={`tv-scene tv-scene--${scene.kind} ${scene.chapter==='Chương 2'?'tv-scene--dawn':''}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.75}}>
        {scene.chapter==='Chương 2'&&<div className="tv-dawn-sun"/>}
        {scene.image&&<motion.img key={scene.image} className="tv-scene__image" src={scene.image} alt="" initial={{scale:1.02}} animate={{scale:1.12,x:current%2===0?'2%':'-2%'}} transition={{duration:12,ease:'linear'}}/>}
        <div className="tv-scene__shade"/>
        <div className="tv-scene__content">
          <p className="tv-scene__eyebrow">{scene.eyebrow}</p>
          <h1>{scene.title}</h1>
          <p className="tv-scene__body">{scene.body}</p>
          {scene.month&&<div className="tv-bon-pose"><span>•ᴗ•</span><b>{months[scene.month-1].pose}</b></div>}
          {scene.kind==='end'&&<button autoFocus onClick={event=>{event.stopPropagation();replay()}} className="tv-replay">Xem lại từ đầu</button>}
        </div>
      </motion.section>
    </AnimatePresence>
    {!started&&<div className="tv-start" onClick={event=>event.stopPropagation()}><div className="tv-start__envelope" aria-hidden="true"><span>Gửi Bon</span></div><h1>Một năm đầu đời của Bon</h1><button autoFocus onClick={start}>Nhấn OK để bắt đầu</button><p>Có thể dùng phím OK hoặc bấm bằng Magic Remote</p></div>}
    {started&&<><TvControls visible={visible} paused={paused} muted={muted} sfx={sfxEnabled} onPrevious={previous} onNext={next} onToggle={togglePause} onMenu={()=>setMenuOpen(true)} onMusic={toggleMusic} onSfx={toggleSfx} onBalloons={()=>window.dispatchEvent(new Event('bon:pop-balloons'))}/><TvProgress current={current}/></>}
    <TvChapterMenu open={menuOpen} current={current} onSelect={goTo} onClose={()=>setMenuOpen(false)}/>
    {feedback&&<div className="tv-feedback" aria-live="polite">{feedback==='pause'?<Pause/>:<Play/>}</div>}
    {debug&&<TvDebug/>}
  </div>
}
