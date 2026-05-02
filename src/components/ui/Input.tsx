import { useState } from 'react'
import { C, F } from '../../lib/tokens'

interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  type?: string
  focused?: boolean
  suffix?: React.ReactNode
  style?: React.CSSProperties
}

export function Input({ placeholder, value, onChange, type = 'text', focused = false, suffix, style = {} }: InputProps) {
  const [hot, setHot] = useState(focused)
  return (
    <div style={{
      height: 52, background: C.grey100,
      border: `2px solid ${hot ? C.purple : C.grey200}`,
      borderRadius: 12, padding: '0 16px',
      display: 'flex', alignItems: 'center', gap: 8,
      transition: 'border-color 150ms',
      ...style,
    }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onFocus={() => setHot(true)}
        onBlur={() => setHot(false)}
        placeholder={placeholder}
        style={{
          fontFamily: F.body,
          fontWeight: 400, fontSize: 15,
          background: 'transparent', border: 'none', outline: 'none',
          color: C.ink, flex: 1, height: '100%',
        }}
      />
      {suffix}
    </div>
  )
}

export function SearchInput({ placeholder = 'search...', value, onChange }: { placeholder?: string, value?: string, onChange?: (v: string) => void }) {
  const [hot, setHot] = useState(false)
  return (
    <div style={{
      height: 48, background: C.grey100,
      border: `2px solid ${hot ? C.purple : C.grey200}`,
      borderRadius: 100, padding: '0 16px',
      display: 'flex', alignItems: 'center', gap: 10,
      transition: 'border-color 150ms',
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.grey400} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
      </svg>
      <input
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onFocus={() => setHot(true)}
        onBlur={() => setHot(false)}
        placeholder={placeholder}
        style={{
          fontFamily: F.body,
          fontSize: 14, color: C.ink,
          background: 'transparent', border: 'none', outline: 'none', flex: 1,
        }}
      />
    </div>
  )
}
