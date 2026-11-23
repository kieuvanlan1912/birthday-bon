export type AssetSlot = { id: string; label: string; chapter: string; caption: string; src: string; alt: string }
export const assetSources: Record<string,string> = {
  'bg-hero':'','bg-letter':'','og-image':'',
  'ch1-01':'ch1-01.webp','ch1-02':'ch1-02.webp','ch1-03':'ch1-03.webp','ch2-01':'ch2-01.webp','ch2-02':'ch2-02.webp','ch2-03':'ch2-03.webp',
  'm01':'','m02':'','m03':'','m04':'','m05':'','m06':'','m07':'','m08':'','m09':'','m10':'','m11':'','m12':'',
  'ch4-01':'','ch4-02':'','album-01':'','album-02':'','album-03':'','album-04':'','album-05':'','album-06':'','album-07':'','album-08':'','album-09':'','album-10':'',
}
const specs = [
  ['bg-hero','Ảnh background','hero'],['bg-letter','Ảnh background 2','chapter-4'],['og-image','Ảnh OG','seo'],
  ...Array.from({length:3},(_,i)=>[`ch1-0${i+1}`,`Ảnh ${i+1}`,'chapter-1']),
  ...Array.from({length:3},(_,i)=>[`ch2-0${i+1}`,`Ảnh ${i+4}`,'chapter-2']),
  ...Array.from({length:12},(_,i)=>[`m${String(i+1).padStart(2,'0')}`,`Ảnh ${i+7} · Tháng ${i+1}`,'months']),
  ...Array.from({length:2},(_,i)=>[`ch4-0${i+1}`,`Ảnh ${i+19}`,'chapter-4']),
  ...Array.from({length:10},(_,i)=>[`album-${String(i+1).padStart(2,'0')}`,`Ảnh ${i+21}`,'album']),
] as const
export const assetsManifest: AssetSlot[] = specs.map(([id,label,chapter])=>({ id, label, chapter, caption:'', src:assetSources[id] ?? '', alt:`${label} trong hành trình năm đầu đời của Bon` }))
