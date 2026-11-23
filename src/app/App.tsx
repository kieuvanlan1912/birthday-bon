import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Providers } from '@/app/providers'
import { AppRouter } from '@/app/router'
class ErrorBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(error:Error,info:ErrorInfo){console.error(error,info)}render(){return this.state.failed?<main className="grid min-h-screen place-items-center bg-cream p-6 text-center text-ink"><div><p className="text-5xl">🌷</p><h1 className="mt-4 font-display text-3xl">Lá thư đang nghỉ một chút</h1><button className="mt-6 rounded-full bg-ink px-5 py-3 text-white" onClick={()=>location.reload()}>Mở lại trang</button></div></main>:this.props.children}}
export function App(){return <ErrorBoundary><Providers><AppRouter/></Providers></ErrorBoundary>}
