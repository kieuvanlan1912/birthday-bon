import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { chapterOne, chapterTwo, finalLetter, months, opening } from '@/data/story'
import { profile } from '@/data/profile'

describe('published content',()=>{
  it('uses ba mẹ consistently',()=>{const allText=[...opening,...chapterOne,...chapterTwo,...months.flatMap(month=>month),...finalLetter,profile.signature].join(' ');expect(allText).not.toMatch(/\bBố\b|\bbố\b/);expect(allText).toContain('Ba & Mẹ')})
  it('ships a real MP3 instead of the silent placeholder',()=>{const audio=readFileSync(new URL('../../public/audio/bg-music.mp3',import.meta.url));expect(audio.byteLength).toBeGreaterThan(1_000_000);expect(audio.subarray(0,3).toString()).toBe('ID3')})
})
