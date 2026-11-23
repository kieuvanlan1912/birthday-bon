import { useMemo } from 'react'
import { profile } from '@/data/profile'
export const useAgeCounter = () => useMemo(()=>{ const birth = new Date(`${profile.birthDate}T00:00:00+07:00`); const birthday = new Date('2027-01-02T00:00:00+07:00'); const now = new Date(); return now >= birthday ? 'Bon tròn 1 tuổi 🎂' : `Bon đã được ${Math.max(0,Math.floor((now.getTime()-birth.getTime())/86400000))} ngày yêu thương` },[])
