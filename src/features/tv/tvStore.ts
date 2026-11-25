import { create } from 'zustand'
import { tvScenes } from './scenes'

type TvState={
  current:number
  started:boolean
  paused:boolean
  menuOpen:boolean
  interaction:number
  feedback:'play'|'pause'|null
  start:()=>void
  next:()=>void
  previous:()=>void
  goTo:(index:number)=>void
  togglePause:()=>void
  setPaused:(paused:boolean)=>void
  setMenuOpen:(open:boolean)=>void
  interact:()=>void
  setFeedback:(feedback:'play'|'pause'|null)=>void
  replay:()=>void
}
const clamp=(value:number)=>Math.max(0,Math.min(tvScenes.length-1,value))
export const useTvStore=create<TvState>(set=>({
  current:0,started:false,paused:false,menuOpen:false,interaction:0,feedback:null,
  start:()=>set(state=>({started:true,paused:false,interaction:state.interaction+1})),
  next:()=>set(state=>({current:clamp(state.current+1),interaction:state.interaction+1})),
  previous:()=>set(state=>({current:clamp(state.current-1),interaction:state.interaction+1})),
  goTo:current=>set(state=>({current:clamp(current),menuOpen:false,interaction:state.interaction+1})),
  togglePause:()=>set(state=>({paused:!state.paused,feedback:state.paused?'play':'pause',interaction:state.interaction+1})),
  setPaused:paused=>set(state=>({paused,feedback:paused?'pause':'play',interaction:state.interaction+1})),
  setMenuOpen:menuOpen=>set(state=>({menuOpen,interaction:state.interaction+1})),
  interact:()=>set(state=>({interaction:state.interaction+1})),
  setFeedback:feedback=>set({feedback}),
  replay:()=>set(state=>({current:0,started:true,paused:false,menuOpen:false,interaction:state.interaction+1})),
}))
