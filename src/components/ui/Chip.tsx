import { C, F, S } from '../../lib/tokens'

// Dark fills need C.base text; light fills use C.ink
function fgForFill(hex: string): string {
  return (hex === C.blue || hex === C.purple || hex === C.ink) ? C.base : C.ink
}

interface ChipProps {
  color?: string
  active?: boolean
  tint?: boolean        // deprecated — ignored, kept for call-site compatibility
  onClick?: () => void
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Chip({ color = C.base, active = false, tint: _tint, onClick, children, style = {} }: ChipProps) {
  const bg = active ? color : C.base
  const fg = active ? fgForFill(color) : C.ink
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: F.body,
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
