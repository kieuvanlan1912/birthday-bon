import { describe, expect, it } from 'vitest'
import { tvScenes } from './scenes'
import { getRemoteAction } from './useRemoteKeys'

describe('Cinema Mode',()=>{
  it('creates all twelve month scenes from story data',()=>{
    expect(tvScenes.filter(scene=>scene.kind==='month').map(scene=>scene.month)).toEqual([1,2,3,4,5,6,7,8,9,10,11,12])
    expect(tvScenes.at(-1)?.title).toBe('Chúc mừng sinh nhật con, Bon')
  })
  it('maps LG Magic Remote key codes without browser history navigation',()=>{
    expect(getRemoteAction(461,'',4,false,true)).toBe('previous')
    expect(getRemoteAction(461,'',0,false,true)).toBe('exit')
    expect(getRemoteAction(403,'',2,false,true)).toBe('menu-open')
    expect(getRemoteAction(404,'',2,false,true)).toBe('music')
    expect(getRemoteAction(415,'',2,false,true)).toBe('play')
    expect(getRemoteAction(19,'',2,false,true)).toBe('pause')
  })
})
