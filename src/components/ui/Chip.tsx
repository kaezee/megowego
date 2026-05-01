import { C, S } from '../../lib/tokens'

interface ChipProps {
  color?: string
  active?: boolean
  tint?: boolean
  onClick?: () => void
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Chip({ color = C.white, active = false, tint = false, onClick, children, style = {} }: ChipProps) {
  const bg = active ? C.ink : tint ? `${color}33` : color
  const fg = active ? C.base : C.ink
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        fontWeight: 500, fontSize: 13,
        height: 32, padding: '0 12px',
        background: bg, color: fg,
        border: S.border,
        borderRadius: 100,
        cursor: onClick ? 'pointer' : 'default',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        boxShadow: 'none',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
