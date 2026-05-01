import { useState } from 'react'
import { C, F } from '../../lib/tokens'

interface Props {
  placeholder: string
  value: string
  onChange: (v: string) => void
}

export function NoteField({ placeholder, value, onChange }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [saved, setSaved]       = useState(false)

  const handleChange = (v: string) => {
    onChange(v)
    setSaved(false)
    setTimeout(() => { setSaved(true) }, 400)
    setTimeout(() => { setSaved(false) }, 2000)
  }

  const preview = value.split('\n')[0] || ''

  if (!expanded) {
    return (
      <div
        onClick={() => setExpanded(true)}
        style={{
          background: C.grey100, border: '2px solid #0A0A0A', borderRadius: 10,
          padding: '12px 14px', cursor: 'text',
          display: 'flex', alignItems: 'center', gap: 10,
        }}
      >
        <div style={{ fontFamily: F.body, fontSize: 14, color: preview ? C.ink : C.grey400, flex: 1, lineHeight: 1.4 }}>
          {preview || placeholder}
        </div>
        <span style={{ fontFamily: F.body, fontSize: 12, color: C.grey400, flexShrink: 0 }}>edit</span>
      </div>
    )
  }

  return (
    <div style={{ background: C.grey100, border: `2px solid ${C.purple}`, borderRadius: 10, padding: '12px 14px', position: 'relative' }}>
      <textarea
        autoFocus
        value={value}
        onChange={e => handleChange(e.target.value)}
        onBlur={() => setExpanded(false)}
        placeholder={placeholder}
        rows={4}
        style={{
          fontFamily: F.body, fontSize: 14, color: C.ink, lineHeight: 1.5,
          background: 'transparent', border: 'none', outline: 'none',
          width: '100%', resize: 'none', display: 'block',
        }}
      />
      {saved && (
        <div style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: F.mono, fontSize: 10, color: C.grey400 }}>
          saved
        </div>
      )}
    </div>
  )
}
