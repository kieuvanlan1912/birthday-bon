import { useEffect } from 'react'

type Options={current:number;started:boolean;menuOpen:boolean;start:()=>void;next:()=>void;previous:()=>void;togglePause:()=>void;setPaused:(value:boolean)=>void;setMenuOpen:(value:boolean)=>void;toggleMusic:()=>void}
export type RemoteAction='start'|'previous'|'next'|'toggle'|'menu-open'|'menu-close'|'play'|'pause'|'music'|'exit'|'none'
export function getRemoteAction(code:number,key:string,current:number,menuOpen:boolean,started:boolean):RemoteAction{
  if(!started&&(code===13||key==='Enter'))return 'start'
  if(code===461||key==='Escape'||key==='Backspace')return menuOpen?'menu-close':current>0?'previous':'exit'
  if(code===37||key==='ArrowLeft')return 'previous'
  if(code===39||key==='ArrowRight')return 'next'
  if(code===13||key==='Enter')return 'toggle'
  if(code===38||key==='ArrowUp'||code===403)return 'menu-open'
  if(code===40||key==='ArrowDown')return 'menu-close'
  if(code===415)return 'play'
  if(code===19)return 'pause'
  if(code===404)return 'music'
  return 'none'
}
export function useRemoteKeys(options:Options){
  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      const code=event.keyCode||event.which
      const action=getRemoteAction(code,event.key,options.current,options.menuOpen,options.started)
      if(action==='none'||action==='exit')return
      event.preventDefault()
      if(action==='start')options.start()
      else if(action==='previous')options.previous()
      else if(action==='next')options.next()
      else if(action==='toggle')options.togglePause()
      else if(action==='menu-open')options.setMenuOpen(true)
      else if(action==='menu-close')options.setMenuOpen(false)
      else if(action==='play')options.setPaused(false)
      else if(action==='pause')options.setPaused(true)
      else if(action==='music')options.toggleMusic()
    }
    addEventListener('keydown',onKey)
    return()=>removeEventListener('keydown',onKey)
  },[options])
}
