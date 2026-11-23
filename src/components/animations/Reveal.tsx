import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
export function Reveal({children}:PropsWithChildren){ return <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-10%'}} transition={{duration:.7,ease:[.2,.8,.2,1]}}>{children}</motion.div> }
