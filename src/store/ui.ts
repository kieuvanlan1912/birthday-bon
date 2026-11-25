import { create } from 'zustand'
type UiState={tvMode:boolean;toggleTvMode:()=>void;setTvMode:(value:boolean)=>void}
const startsInTvMode=()=>{
  if(typeof window==='undefined')return false
  const forced=new URLSearchParams(window.location.search).get('tv')
  if(forced==='0')return false
  if(forced==='1')return true
  return /Web0S|webOS|SmartTV/i.test(navigator.userAgent)
}
export const useUiStore=create<UiState>(set=>({tvMode:startsInTvMode(),toggleTvMode:()=>set(state=>({tvMode:!state.tvMode})),setTvMode:tvMode=>set({tvMode})}))
