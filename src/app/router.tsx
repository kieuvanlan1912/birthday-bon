import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
const HomePage=lazy(()=>import('@/pages/HomePage'))
const NotFoundPage=lazy(()=>import('@/pages/NotFoundPage'))
export function AppRouter(){return <HashRouter><Suspense fallback={<div className="grid min-h-screen place-items-center bg-cream font-display text-2xl text-ink">Đang mở lá thư…</div>}><Routes><Route path="/" element={<HomePage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></Suspense></HashRouter>}
