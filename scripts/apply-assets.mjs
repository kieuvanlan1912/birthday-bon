import { copyFile, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { tmpdir } from 'node:os'
import { basename, extname, isAbsolute, join, resolve } from 'node:path'
import sharp from 'sharp'

const runFile=promisify(execFile)
const root=resolve(import.meta.dirname,'..')
const input=join(root,'assets.input.txt'),inbox=join(root,'inbox'),photos=join(root,'src/assets/photos'),manifest=join(root,'src/data/assets.manifest.ts')
const slotFor=raw=>{const key=raw.trim().toLowerCase();if(key==='ảnh background')return'bg-hero';if(key==='ảnh background 2')return'bg-letter';if(key==='ảnh og')return'og-image';if(key==='nhạc')return'music';const n=Number(key.match(/^ảnh\s+(\d+)$/)?.[1]);if(n>=1&&n<=3)return`ch1-0${n}`;if(n>=4&&n<=6)return`ch2-0${n-3}`;if(n>=7&&n<=18)return`m${String(n-6).padStart(2,'0')}`;if(n>=19&&n<=20)return`ch4-0${n-18}`;if(n>=21&&n<=30)return`album-${String(n-20).padStart(2,'0')}`;throw new Error(`Không hiểu tên slot: ${raw}`)}
const drive=url=>{const id=url.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1];return id?`https://drive.google.com/uc?export=download&id=${id}`:url}
const imagePipeline=(source,slot)=>{const image=sharp(source).rotate();return slot==='og-image'?image.resize(1200,630,{fit:'cover'}).jpeg({quality:82}):image.resize({width:slot.startsWith('bg-')?1920:1600,height:slot.startsWith('bg-')?1920:1600,fit:'inside',withoutEnlargement:true}).webp({quality:80})}
const processImage=async(source,output,slot)=>{try{await imagePipeline(source,slot).toFile(output)}catch(error){const message=error instanceof Error?error.message:String(error);if(!/heif|compression format|bad seek/i.test(message))throw error;const temporary=await mkdtemp(join(tmpdir(),'birthday-bon-heif-'));const jpeg=join(temporary,`${slot}.jpg`);try{await runFile('sips',['-s','format','jpeg',source,'--out',jpeg]);await imagePipeline(jpeg,slot).toFile(output)}catch(conversionError){throw new Error(`Không đọc được ảnh HEIF ${source}. Hãy export ảnh thành JPEG rồi thử lại. ${conversionError instanceof Error?conversionError.message:String(conversionError)}`)}finally{await rm(temporary,{recursive:true,force:true})}}}

await mkdir(inbox,{recursive:true})
await mkdir(photos,{recursive:true})
const lines=(await readFile(input,'utf8')).split(/\r?\n/).filter(line=>line.trim()&&!line.trim().startsWith('#'))
let source=await readFile(manifest,'utf8')
const done=[]
for(const line of lines){
  const split=line.indexOf(':')
  if(split<0)throw new Error(`Dòng thiếu dấu hai chấm: ${line}`)
  const slot=slotFor(line.slice(0,split)),value=line.slice(split+1).trim()
  if(!value)continue
  let local
  if(/^https?:\/\//.test(value)){const url=drive(value);const response=await fetch(url,{redirect:'follow'});if(!response.ok||response.headers.get('content-type')?.includes('text/html'))throw new Error(`Không tải trực tiếp được ${value}. Hãy tải ảnh về và thả vào inbox/${slot}${extname(new URL(value).pathname)||'.jpg'}`);local=join(inbox,`${slot}${extname(new URL(url).pathname)||'.jpg'}`);await writeFile(local,Buffer.from(await response.arrayBuffer()))}else local=isAbsolute(value)?value:join(inbox,basename(value))
  if(slot==='music'){await mkdir(join(root,'public/audio'),{recursive:true});await copyFile(local,join(root,'public/audio/bg-music.mp3'));done.push(slot);continue}
  const file=slot==='og-image'?'og-image.jpg':`${slot}.webp`,output=slot==='og-image'?join(root,'public',file):join(photos,file)
  await processImage(local,output,slot)
  source=source.replace(new RegExp(`('${slot.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}'\\s*:\\s*)'[^']*'`),`$1'${file}'`)
  done.push(slot)
}
await writeFile(manifest,source)
let bytes=0
for(const slot of done.filter(item=>item!=='music')){const file=slot==='og-image'?join(root,'public/og-image.jpg'):join(photos,`${slot}.webp`);bytes+=(await stat(file)).size}
console.log(`Đã gắn: ${done.join(', ')||'không có'} · ${(bytes/1024/1024).toFixed(2)} MB`)
if(bytes>15*1024*1024)console.warn('Cảnh báo: tổng ảnh vượt 15 MB')
