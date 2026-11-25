import { create } from 'zustand'
type AudioState = {
  entered: boolean
  muted: boolean
  playing: boolean
  sfxEnabled:boolean
  sfxUnlocked:boolean
  setEntered: (value:boolean)=>void
  setPlaying: (value:boolean)=>void
  toggleMuted:()=>void
  toggleSfx:()=>void
  unlockSfx:()=>void
}
export const useAudioStore = create<AudioState>(set=>({
  entered:false,
  muted:false,
  playing:false,
  sfxEnabled:true,
  sfxUnlocked:false,
  setEntered:entered=>set({entered}),
  setPlaying:playing=>set({playing}),
  toggleMuted:()=>set(state=>({muted:!state.muted})),
  toggleSfx:()=>set(state=>({sfxEnabled:!state.sfxEnabled})),
  unlockSfx:()=>set({sfxUnlocked:true}),
}))
