import type { PropsWithChildren } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
export function Providers({children}:PropsWithChildren){return <HelmetProvider><MotionConfig reducedMotion="user">{children}</MotionConfig></HelmetProvider>}
