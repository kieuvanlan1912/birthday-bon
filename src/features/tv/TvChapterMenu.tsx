import { chapterStarts } from './scenes'

type Props={open:boolean;current:number;onSelect:(index:number)=>void;onClose:()=>void}
export function TvChapterMenu({open,current,onSelect,onClose}:Props){
  if(!open)return null
  const active=[...chapterStarts].reverse().find(item=>item.index<=current)?.name
  return <div className="tv-menu" role="dialog" aria-modal="true" aria-label="Chọn chương" onClick={event=>event.stopPropagation()}>
    <div className="tv-menu__panel"><div className="tv-menu__heading"><div><p>Đi đến</p><h2>Chọn chương</h2></div><button onClick={onClose} aria-label="Đóng menu">×</button></div>
      <div className="tv-menu__grid">{chapterStarts.map(item=><button key={item.name} className={active===item.name?'is-active':''} onClick={()=>onSelect(item.index)}>{item.name}</button>)}</div>
    </div>
  </div>
}
