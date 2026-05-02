import { useState } from 'react'
import { C, F, S } from '../../lib/tokens'

type Variant = 'primary' | 'secondary' | 'destructive' | 'ghost'

interface ButtonProps {
  variant?: Variant
  full?: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Button({ variant = 'primary', full = false, disabled = false, onClick, children, style = {} }: ButtonProps) {
  const [pressed, setPressed] = useState(false)

  const v = {
    primary:     { bg: C.ink,          fg: C.base,  border: 'none',     shadow: true },
    secondary:   { bg: C.white,        fg: C.ink,   border: S.border,   shadow: true },
    destructive: { bg: C.pink,         fg: C.ink,   border: 'none',     shadow: true },
    ghost:       { bg: 'transparent',  fg: C.ink,   border: 'none',     shadow: false },
  }[variant]

  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={!disabled ? onClick : undefined}
      style={{
        fontFamily: F.body,
        fontWeight: 600, fontSize: 16,
        height: 52, padding: '0 24px',
        background: v.bg, color: v.fg,
        border: v.border,
        borderRadius: variant === 'ghost' ? 0 : 16,
        boxShadow: v.shadow ? (pressed ? 'none' : S.shadow) : 'none',
        transform: v.shadow && pressed ? 'translate(4px,4px)' : 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        width: full ? '100%' : 'auto',
        transition: 'transform 80ms, box-shadow 80ms',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
