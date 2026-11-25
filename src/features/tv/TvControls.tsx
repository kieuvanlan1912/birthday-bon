import { Bell, BellOff, ChevronLeft, ChevronRight, Expand, List, PartyPopper, Pause, Play, Volume2, VolumeX } from 'lucide-react'

type Props={visible:boolean;paused:boolean;muted:boolean;sfx:boolean;onPrevious:()=>void;onNext:()=>void;onToggle:()=>void;onMenu:()=>void;onMusic:()=>void;onSfx:()=>void;onBalloons:()=>void}
export function TvControls({visible,paused,muted,sfx,onPrevious,onNext,onToggle,onMenu,onMusic,onSfx,onBalloons}:Props){
  const fullscreen=()=>document.documentElement.requestFullscreen?.().catch(()=>undefined)
  return <div className={`tv-controls ${visible?'is-visible':''}`} onClick={event=>event.stopPropagation()}>
    <button className="tv-control tv-control--edge tv-control--left" onClick={onPrevious} aria-label="Cảnh trước"><ChevronLeft/></button>
    <div className="tv-controls__top"><button className="tv-control" onClick={onMenu} aria-label="Mở menu chương"><List/></button><button className="tv-control" onClick={onBalloons} aria-label="Thả bóng"><PartyPopper/></button><button className="tv-control" onClick={onSfx} aria-label={sfx?'Tắt SFX':'Bật SFX'}>{sfx?<Bell/>:<BellOff/>}</button><button className="tv-control" onClick={onMusic} aria-label={muted?'Bật nhạc':'Tắt nhạc'}>{muted?<VolumeX/>:<Volume2/>}</button><button className="tv-control" onClick={fullscreen} aria-label="Toàn màn hình"><Expand/></button></div>
    <button className="tv-control tv-control--play" onClick={onToggle} aria-label={paused?'Tiếp tục':'Tạm dừng'}>{paused?<Play/>:<Pause/>}</button>
    <button className="tv-control tv-control--edge tv-control--right" onClick={onNext} aria-label="Cảnh sau"><ChevronRight/></button>
  </div>
}
