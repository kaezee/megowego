import { C } from '../../lib/tokens'

interface AvatarProps {
  name: string
  color?: string
  size?: number
}

export function Avatar({ name, color = C.pink, size = 32 }: AvatarProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: C.ink,
      border: '2px solid #0A0A0A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Fredoka', system-ui, sans-serif",
      fontWeight: 700, fontSize: Math.round(size * 0.42),
      flexShrink: 0, lineHeight: 1,
      userSelect: 'none',
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

interface StackProps {
  people: { name: string; color: string }[]
  max?: number
  size?: number
}

export function AvatarStack({ people, max = 5, size = 32 }: StackProps) {
  const shown = people.slice(0, max)
  const extra = people.length - shown.length
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((p, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: shown.length - i }}>
          <Avatar name={p.name} color={p.color} size={size} />
        </div>
      ))}
      {extra > 0 && (
        <div style={{ marginLeft: -8 }}>
          <div style={{
            width: size, height: size, borderRadius: '50%',
            background: C.white, color: C.ink, border: '2px solid #0A0A0A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Mono', ui-monospace, monospace",
            fontWeight: 700, fontSize: Math.round(size * 0.34),
          }}>+{extra}</div>
        </div>
      )}
    </div>
  )
}
