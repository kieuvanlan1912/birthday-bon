import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { Intro } from '@/features/intro'
import { Hero } from '@/features/hero'
import { Chapters, FinalLetter } from '@/features/chapters'
import { MonthsTimeline } from '@/features/months'
import { Album } from '@/features/album'
import { Header } from '@/components/layout/Header'
const StoryCanvas=lazy(()=>import('@/components/three/StoryCanvas'))
export default function HomePage(){return <><Helmet><title>Gửi Bon · Một năm đầu đời</title><meta name="description" content="Bức thư ba mẹ gửi Bon, kể lại hành trình từ lúc chờ con đến sinh nhật một tuổi."/><meta property="og:title" content="Gửi Bon · Một năm đầu đời"/><meta property="og:description" content="Một bức thư, mười hai tháng và thật nhiều yêu thương."/><meta property="og:image" content={`${location.origin}${import.meta.env.BASE_URL}og-image.jpg`}/><meta property="og:type" content="website"/><meta name="theme-color" content="#25213e"/></Helmet><Intro/><Header/><Suspense fallback={<div className="fixed inset-0 -z-10 bg-night"/>}><StoryCanvas/></Suspense><main><Hero/><Chapters/><MonthsTimeline/><FinalLetter/><Album/></main><footer className="bg-night px-5 py-16 text-center text-white"><p className="font-letter text-4xl">Lớn lên thật vui nhé, Bon.</p><p className="mt-3 text-sm text-white/60">Ba & Mẹ · 02/01/2027</p></footer></>}
