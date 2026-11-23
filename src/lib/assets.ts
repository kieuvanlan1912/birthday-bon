import { assetsManifest } from '@/data/assets.manifest'

const photoModules = import.meta.glob<string>('../assets/photos/*', { eager: true, query: '?url', import: 'default' })
const palettes = [
  ['#ff9fb8','#ffd36e','#fff4c9'],['#75d7c0','#83cdf1','#e8fbff'],['#ff967e','#ffcf91','#fff0e1'],
  ['#a99bf4','#ffb5df','#fff0fa'],['#6ed2a5','#d8ee78','#f7ffd9'],
] as const
const escapeXml = (value: string) => value.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[character] ?? character))
const hash = (value:string) => [...value].reduce((sum,character)=>sum+character.codePointAt(0)!,0)
const isAssetDebug = () => {
  if(typeof window==='undefined') return false
  const hashQuery=window.location.hash.includes('?')?window.location.hash.split('?')[1]:''
  return new URLSearchParams(window.location.search || hashQuery).get('debug')==='1'
}
const icons = [
  '<g opacity=".22" fill="#47394f"><circle cx="600" cy="430" r="105"/><circle cx="520" cy="345" r="48"/><circle cx="680" cy="345" r="48"/><circle cx="565" cy="420" r="12" fill="#fff"/><circle cx="635" cy="420" r="12" fill="#fff"/><ellipse cx="600" cy="475" rx="34" ry="24" fill="#fff"/></g>',
  '<g opacity=".24" fill="#47394f"><circle cx="600" cy="410" r="120"/><path d="M600 530 Q570 650 620 735" fill="none" stroke="#47394f" stroke-width="12"/><path d="M565 520 L600 570 L635 520Z"/></g>',
  '<path opacity=".24" fill="#47394f" d="M600 270 636 374 746 376 658 442 690 548 600 486 510 548 542 442 454 376 564 374Z"/>',
] as const

export const placeholder = (label:string, debug=isAssetDebug(), seed=label) => {
  const value=hash(seed), palette=palettes[value%palettes.length], icon=icons[value%icons.length]
  const debugLabel=debug?`<rect x="330" y="690" width="540" height="82" rx="41" fill="#fff" opacity=".82"/><text x="600" y="744" text-anchor="middle" fill="#47394f" font-family="sans-serif" font-size="34">${escapeXml(label)}</text>`:''
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${palette[0]}"/><stop offset=".52" stop-color="${palette[1]}"/><stop offset="1" stop-color="${palette[2]}"/></linearGradient><pattern id="p" width="72" height="72" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="4" fill="#fff" opacity=".3"/><path d="M36 8v18M27 17h18" stroke="#fff" stroke-width="3" opacity=".2"/></pattern></defs><rect width="100%" height="100%" rx="48" fill="url(#g)"/><rect width="100%" height="100%" rx="48" fill="url(#p)"/>${icon}${debugLabel}</svg>`)}`
}

export const resolveAsset = (id:string) => {
  const asset=assetsManifest.find(item=>item.id===id)
  const bundled=asset?.src?Object.entries(photoModules).find(([path])=>path.endsWith(`/${asset.src}`))?.[1]:undefined
  return bundled || placeholder(asset?.label ?? id, isAssetDebug(), id)
}
