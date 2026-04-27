import { useState } from 'react'
import { C, S, fgFor } from '../../lib/tokens'

interface CardProps {
  color?: string
  padding?: number
  onClick?: () => void
  children: React.ReactNode
  style?: React.CSSProperties
  noShadow?: boolean
}

export function Card({ color = C.base, padding = 16, onClick, children, style = {}, noShadow = false }: CardProps) {
  const [pressed, setPressed] = useState(false)
  const isBright = color === C.white || color === C.base || color === C.grey100
  return (
    <div
      onPointerDown={onClick ? () => setPressed(true) : undefined}
      onPointerUp={onClick ? () => setPressed(false) : undefined}
      onPointerLeave={onClick ? () => setPressed(false) : undefined}
      onClick={onClick}
      style={{
        background: color,
        color: isBright ? C.ink : fgFor(color),
        border: isBright ? S.borderSoft : S.border,
        borderRadius: 12,
        boxShadow: noShadow ? 'none' : (pressed ? 'none' : S.shadow),
        transform: pressed && onClick ? 'translate(4px,4px)' : 'none',
        padding,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 80ms, box-shadow 80ms',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Full-bleed accent card (for "happening now" pinned cards)
export function HeaderCard({ color, padding = 20, children, style = {}, onClick }: { color: string, padding?: number, children: React.ReactNode, style?: React.CSSProperties, onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{
      background: color,
      color: fgFor(color),
      border: S.border,
      borderRadius: 12,
      boxShadow: S.shadow,
      padding,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>
      {children}
    </div>
  )
}
