import { describe, expect, it } from 'vitest'
import { placeholder } from '@/lib/assets'
describe('asset fallback',()=>{it('creates a safe inline SVG',()=>{expect(placeholder('Ảnh 7 · Tháng 1')).toMatch(/^data:image\/svg\+xml/)});it('escapes markup before encoding',()=>{expect(decodeURIComponent(placeholder('<script>'))).not.toContain('<script>')})})
