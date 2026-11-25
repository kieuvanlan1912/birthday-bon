import { tvScenes } from './scenes'

export function TvProgress({current}:{current:number}){
  const scene=tvScenes[current]
  return <div className="tv-progress" aria-label={`Cảnh ${current+1} trên ${tvScenes.length}`}>
    <div className="tv-progress__bar"><span style={{width:`${((current+1)/tvScenes.length)*100}%`}}/></div>
    <div className="tv-progress__meta"><span>{scene.chapter}</span><span>{current+1} / {tvScenes.length}</span></div>
    <div className="tv-progress__months" aria-label="Tiến độ 12 tháng">{Array.from({length:12},(_,index)=><i key={index} className={scene.month&&index<scene.month?'is-active':''}/>)}</div>
  </div>
}
