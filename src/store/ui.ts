import { create } from 'zustand'
type UiState={tvMode:boolean;toggleTvMode:()=>void;setTvMode:(value:boolean)=>void}
const startsInTvMode=typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('tv')==='1'
export const useUiStore=create<UiState>(set=>({tvMode:startsInTvMode,toggleTvMode:()=>set(state=>({tvMode:!state.tvMode})),setTvMode:tvMode=>set({tvMode})}))
