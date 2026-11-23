import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { Intro } from '@/features/intro'
import { Hero } from '@/features/hero'
import { Chapters, FinalLetter } from '@/features/chapters'
import { MonthsTimeline } from '@/features/months'
import { Album } from '@/features/album'
import { Header } from '@/components/layout/Header'
import { Finale } from '@/components/layout/Finale'
import { TVModeController } from '@/components/layout/TVModeController'
import { ToyBox } from '@/features/festive'
const StoryCanvas=lazy(()=>import('@/components/three/StoryCanvas'))
export default function HomePage(){return <><Helmet><title>Gửi Bon · Một năm đầu đời</title><meta name="description" content="Bức thư bố mẹ gửi Bon, kể lại hành trình từ lúc chờ con đến sinh nhật một tuổi."/><meta property="og:title" content="Gửi Bon · Một năm đầu đời"/><meta property="og:description" content="Một bức thư, mười hai tháng và thật nhiều yêu thương."/><meta property="og:image" content={`${location.origin}${import.meta.env.BASE_URL}og-image.jpg`}/><meta property="og:type" content="website"/><meta name="theme-color" content="#25213e"/></Helmet><Intro/><Header/><TVModeController/><Suspense fallback={<div className="fixed inset-0 z-0 bg-night"/>}><StoryCanvas/></Suspense><main className="relative z-10"><Hero/><Chapters/><ToyBox/><MonthsTimeline/><FinalLetter/><Album/></main><Finale/></>}
