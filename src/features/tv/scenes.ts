import { assetsManifest } from '@/data/assets.manifest'
import { chapterOne, chapterTwo, finalLetter, months, opening } from '@/data/story'
import { resolveAsset } from '@/lib/assets'

export type TvScene={
  id:string
  chapter:string
  eyebrow:string
  title:string
  body:string
  image?:string
  imageAlt?:string
  month?:number
  kind:'story'|'photo'|'month'|'album'|'end'
}

const asset=(id:string)=>assetsManifest.find(item=>item.id===id)
const photo=(id:string)=>({image:resolveAsset(id),imageAlt:asset(id)?.alt})

function splitParagraph(text:string,maxWords=38){
  const words=text.trim().split(/\s+/)
  const chunks:string[]=[]
  for(let index=0;index<words.length;index+=maxWords)chunks.push(words.slice(index,index+maxWords).join(' '))
  return chunks
}

const storyScenes=(paragraphs:readonly string[],chapter:string,eyebrow:string,ids:string[]):TvScene[]=>paragraphs.flatMap((paragraph,paragraphIndex)=>splitParagraph(paragraph).map((body,chunkIndex)=>({
  id:`${chapter}-${paragraphIndex}-${chunkIndex}`,
  chapter,
  eyebrow,
  title:chunkIndex===0?(asset(ids[paragraphIndex%ids.length])?.caption||asset(ids[paragraphIndex%ids.length])?.label||eyebrow):'Chuyện vẫn còn tiếp…',
  body,
  ...photo(ids[paragraphIndex%ids.length]),
  kind:'story' as const,
})))

const monthScenes:TvScene[]=months.map((month,index)=>({
  id:`month-${index+1}`,
  chapter:'12 tháng đầu đời',
  eyebrow:`Tháng ${index+1} / 12`,
  title:month[1],
  body:month[2],
  ...photo(`m${String(index+1).padStart(2,'0')}`),
  month:index+1,
  kind:'month',
}))

const albumScenes:TvScene[]=Array.from({length:10},(_,index)=>{
  const id=`album-${String(index+1).padStart(2,'0')}`
  return {id,chapter:'Album của Bon',eyebrow:`Khoảnh khắc ${index+1} / 10`,title:'Một ngày thật đáng nhớ',body:asset(id)?.caption||'Thêm một khoảnh khắc nhỏ trong năm đầu đời của Bon.',...photo(id),kind:'album'}
})

export const tvScenes:TvScene[]=[
  {id:'opening',chapter:'Mở đầu',eyebrow:'Một năm đầu đời của',title:'Gửi Bon',body:opening.join(' '),...photo('bg-hero'),kind:'story'},
  ...storyScenes(chapterOne,'Chương 1','Ngày bố mẹ chờ Bon',['ch1-01','ch1-02','ch1-03']),
  ...storyScenes(chapterTwo,'Chương 2','Ngày Bon đến',['ch2-01','ch2-02','ch2-03']),
  ...monthScenes,
  ...storyScenes(finalLetter.slice(0,-1),'Lá thư cuối','Gửi Bon của bố mẹ',['ch4-01','ch4-02']),
  ...albumScenes,
  {id:'the-end',chapter:'Màn kết',eyebrow:'Bon tròn một tuổi',title:'Chúc mừng sinh nhật con, Bon',body:'Lớn lên thật vui nhé, Bon.',kind:'end'},
]

export const sceneDuration=(scene:TvScene)=>Math.max(6000,scene.body.trim().split(/\s+/).length*180)
export const chapterStarts=tvScenes.reduce<{name:string;index:number}[]>((items,scene,index)=>{
  if(!items.some(item=>item.name===scene.chapter))items.push({name:scene.chapter,index})
  return items
},[])
