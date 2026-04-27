import { C } from '../../lib/tokens'

interface IlloProps {
  color?: string
  height?: number
  label?: string
  style?: React.CSSProperties
}

export function Illo({ color = C.pink, height = 180, label = '[ illustration ]', style = {} }: IlloProps) {
  return (
    <div style={{
      minHeight: height,
      background: color + '18',
      border: `2px dashed ${color}`,
      borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      fontWeight: 500, fontSize: 12, color: C.grey400,
      textAlign: 'center',
      ...style,
    }}>
      {label}
    </div>
  )
}
