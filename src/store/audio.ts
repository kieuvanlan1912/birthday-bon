import { create } from 'zustand'
type AudioState = { entered: boolean; muted: boolean; setEntered: (value:boolean)=>void; toggleMuted:()=>void }
export const useAudioStore = create<AudioState>(set=>({ entered:false, muted:false, setEntered:entered=>set({entered}), toggleMuted:()=>set(s=>({muted:!s.muted})) }))
