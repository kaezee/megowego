import { useState, useRef, useCallback, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { C, S } from '../lib/tokens'

const REVEAL_PCT      = 0.28   // how wide the delete zone is
const LEFT_THRESHOLD  = 0.10   // how far you have to drag before it snaps

interface Props {
  children: React.ReactNode
  onDelete: () => void
  onClick: () => void
}

export function SwipeableOutingCard({ children, onDelete, onClick }: Props) {
  const outerRef = useRef<HTMLDivElement>(null)
  const dragRef  = useRef<HTMLDivElement>(null)

  const [offsetX,  setOffsetX]  = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [snapping, setSnapping] = useState(false)
  const [dragging, setDragging] = useState(false)

  const offsetXRef  = useRef(0)
  const revealedRef = useRef(false)
  const didDrag     = useRef(false)

  const getW       = () => outerRef.current?.offsetWidth ?? 375
  const getRevealW = () => getW() * REVEAL_PCT
  const getThresh  = () => getW() * LEFT_THRESHOLD

  const snapTo = useCallback((x: number) => {
    offsetXRef.current = x
    setSnapping(true)
    setDragging(false)
    setOffsetX(x)
  }, [])

  const collapse = useCallback(() => {
    revealedRef.current = false
    setRevealed(false)
    snapTo(0)
  }, [snapTo])

  // ── Touch events ───────────────────────────────────────────
  useEffect(() => {
    const el = dragRef.current
    if (!el) return

    let startX = 0, startY = 0
    let dir: 'h' | 'v' | null = null
    let dragging = false
    let lastMX = 0, lastMAt = 0

    const onStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button')) return
      const t = e.touches[0]
      startX = t.clientX; startY = t.clientY
      dir = null; dragging = false
      lastMX = t.clientX; lastMAt = Date.now()
      didDrag.current = false
      setSnapping(false)
    }

    const onMove = (e: TouchEvent) => {
      if (!startX && !startY) return
      const t = e.touches[0]
      const dx = t.clientX - startX
      const dy = t.clientY - startY

      if (dir === null && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        dir = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
      }
      if (dir !== 'h') return
      e.preventDefault()

      dragging = true
      didDrag.current = true
      setDragging(true)
      lastMX = t.clientX; lastMAt = Date.now()

      const revealW = getRevealW()
      if (revealedRef.current) {
        const next = Math.max(-revealW, Math.min(0, -revealW + dx))
        offsetXRef.current = next; setOffsetX(next)
      } else if (dx < 0) {
        const val = Math.max(dx, -revealW)
        offsetXRef.current = val; setOffsetX(val)
      }
      // no right swipe
    }

    const onEnd = (e: TouchEvent) => {
      if (dir !== 'h') { didDrag.current = false; startX = 0; startY = 0; return }
      const t = e.changedTouches[0]
      const wasDrag = dragging
      startX = 0; startY = 0

      const cur     = offsetXRef.current
      const revealW = getRevealW()
      const thresh  = getThresh()
      const dt      = Date.now() - lastMAt
      const vel     = dt > 0 && dt < 200 ? (t.clientX - lastMX) / dt : 0
      const flickL  = vel < -0.25
      const flickR  = vel > 0.25

      if (revealedRef.current) {
        if (!wasDrag) { collapse(); return }
        if (flickR || cur > -revealW * 0.5) { collapse() }
        else { snapTo(-revealW) }
        return
      }

      if (!wasDrag) { snapTo(0); return }
      if (cur <= -thresh || flickL) {
        snapTo(-revealW); revealedRef.current = true; setRevealed(true)
      } else {
        snapTo(0)
      }
    }

    const onCancel = () => {
      startX = 0; startY = 0
      snapTo(revealedRef.current ? -getRevealW() : 0)
    }

    el.addEventListener('touchstart',  onStart,  { passive: true  })
    el.addEventListener('touchmove',   onMove,   { passive: false })
    el.addEventListener('touchend',    onEnd,    { passive: true  })
    el.addEventListener('touchcancel', onCancel, { passive: true  })
    return () => {
      el.removeEventListener('touchstart',  onStart)
      el.removeEventListener('touchmove',   onMove)
      el.removeEventListener('touchend',    onEnd)
      el.removeEventListener('touchcancel', onCancel)
    }
  }, []) // eslint-disable-line

  // ── Mouse (desktop) ────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    if ((e.target as HTMLElement).closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    didDrag.current = false
    setSnapping(false)
    ;(e.currentTarget as any)._sx  = e.clientX
    ;(e.currentTarget as any)._sy  = e.clientY
    ;(e.currentTarget as any)._lmx = e.clientX
    ;(e.currentTarget as any)._lmt = Date.now()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const sx = (e.currentTarget as any)._sx
    if (sx == null) return
    const dx = e.clientX - sx
    const dy = e.clientY - ((e.currentTarget as any)._sy ?? 0)
    if (!didDrag.current && Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 12) return
    if (Math.abs(dx) > 5) { didDrag.current = true; setDragging(true) }
    if (!didDrag.current) return
    ;(e.currentTarget as any)._lmx = e.clientX
    ;(e.currentTarget as any)._lmt = Date.now()

    const revealW = getRevealW()
    if (revealedRef.current) {
      const next = Math.max(-revealW, Math.min(0, -revealW + dx))
      offsetXRef.current = next; setOffsetX(next)
    } else if (dx < 0) {
      const val = Math.max(dx, -revealW)
      offsetXRef.current = val; setOffsetX(val)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const sx = (e.currentTarget as any)._sx
    if (sx == null) return
    ;(e.currentTarget as any)._sx = null
    const wasDrag = didDrag.current
    const cur     = offsetXRef.current
    const revealW = getRevealW()
    const thresh  = getThresh()
    const lmx     = (e.currentTarget as any)._lmx ?? e.clientX
    const lmt     = (e.currentTarget as any)._lmt ?? Date.now()
    const dt      = Date.now() - lmt
    const vel     = dt > 0 && dt < 200 ? (e.clientX - lmx) / dt : 0
    const flickL  = vel < -0.25
    const flickR  = vel > 0.25

    if (revealedRef.current) {
      if (!wasDrag) { collapse(); return }
      flickR || cur > -revealW * 0.5 ? collapse() : snapTo(-revealW)
      return
    }
    if (!wasDrag) { snapTo(0); onClick(); return }
    if (cur <= -thresh || flickL) {
      snapTo(-revealW); revealedRef.current = true; setRevealed(true)
    } else { snapTo(0) }
  }

  const handleClick = () => {
    if (didDrag.current) return
    if (revealedRef.current) { collapse(); return }
    onClick()
  }

  const revealW   = getRevealW()
  const swipingL  = offsetX < 0

  return (
    <div ref={outerRef} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', userSelect: 'none', touchAction: 'pan-y' }}>

      {/* Delete reveal zone */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: revealW,
        background: C.error,
        border: S.border,
        borderLeft: 'none',
        borderRadius: '0 12px 12px 0',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        opacity: swipingL || revealed ? 1 : 0,
        pointerEvents: swipingL || revealed ? 'auto' : 'none',
        transition: 'opacity 60ms',
      }}>
        <button
          onPointerDownCapture={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); collapse(); onDelete() }}
          style={{
            width: '100%', height: '100%',
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 6,
            color: C.base,
          }}
        >
          <Trash2 size={20} strokeWidth={2.5} />
          <span style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontWeight: 700, fontSize: 11, letterSpacing: '0.04em', color: C.base,
          }}>delete</span>
        </button>
      </div>

      {/* Card face */}
      <div
        ref={dragRef}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => snapTo(revealedRef.current ? -getRevealW() : 0)}
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: snapping ? 'transform 260ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          cursor: dragging ? 'grabbing' : 'pointer',
          position: 'relative', zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  )
}
