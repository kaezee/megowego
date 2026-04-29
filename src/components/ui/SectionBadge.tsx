import { C } from '../../lib/tokens'

interface Props {
  icon: string
  color?: string
  size?: number
}

export function SectionBadge({ icon, color = C.yellow, size = 30 }: Props) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, border: '2px solid #0A0A0A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.5, flexShrink: 0, lineHeight: 1,
      boxShadow: '1px 1px 0 0 #0A0A0A',
    }}>
      {icon}
    </div>
  )
}
