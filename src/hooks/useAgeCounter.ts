import { useMemo } from 'react'
import { profile } from '@/data/profile'
export const getLoveDays=()=>Math.max(0,Math.floor((Date.now()-new Date(`${profile.birthDate}T00:00:00+07:00`).getTime())/86400000))
export const useAgeCounter = () => useMemo(()=>{const birthday = new Date('2027-01-02T00:00:00+07:00');return new Date()>=birthday?'Bon tròn 1 tuổi 🎂':`Bon đã được ${getLoveDays()} ngày yêu thương`},[])
