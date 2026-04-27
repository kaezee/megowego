import { Button } from '../components/ui/Button'
import { Illo } from '../components/ui/Illo'
import { Avatar } from '../components/ui/Avatar'
import { C } from '../lib/tokens'

interface Props { onCreate: () => void }

export function HomeEmpty({ onCreate }: Props) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base }}>
      <div style={{ padding: '48px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink }}>hey aarav 👋</div>
        <Avatar name="A" color={C.yellow} size={36} />
      </div>
      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, textAlign: 'center' }}>
        <Illo color={C.pink} height={220} label="[ illustration — empty calendar ]" style={{ width: '100%' }} />
        <div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 26, color: C.ink, lineHeight: 1.2 }}>no plans? really?</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600, marginTop: 8, maxWidth: 260 }}>your friends are waiting. or maybe they're not.</div>
        </div>
      </div>
      <div style={{ padding: '0 20px 24px' }}>
        <Button full onClick={onCreate}>start something →</Button>
      </div>
    </div>
  )
}
