import { useCallback, useRef } from 'react'
import { sfxManifest } from '@/data/assets.manifest'
import type { SfxId } from '@/data/assets.manifest'
import { useAudioStore } from '@/store/audio'

export function useSfx(){
  const enabled=useAudioStore(state=>state.sfxEnabled),unlockSfx=useAudioStore(state=>state.unlockSfx)
  const active=useRef<HTMLAudioElement[]>([])
  const unlock=useCallback(()=>unlockSfx(),[unlockSfx])
  const play=useCallback((id:SfxId)=>{
    if(!useAudioStore.getState().sfxEnabled||!useAudioStore.getState().sfxUnlocked||active.current.length>=4)return
    const audio=new Audio(`${import.meta.env.BASE_URL}${sfxManifest[id]}`)
    audio.volume=.5;active.current.push(audio)
    const release=()=>{active.current=active.current.filter(item=>item!==audio)}
    audio.addEventListener('ended',release,{once:true});audio.addEventListener('error',release,{once:true})
    audio.play().catch(release)
  },[])
  return {play,unlock,enabled}
}
