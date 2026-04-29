import { Button } from '../components/ui/Button'
import { C } from '../lib/tokens'

interface Props { onCreate: () => void }

export function HomeEmpty({ onCreate }: Props) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.surface }}>
      <div style={{ padding: '48px 20px 0' }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 24, color: C.ink }}>hey aarav 👋</div>
      </div>
      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center' }}>
        <img
          src="/empty state.png"
          alt=""
          style={{ width: '100%', maxWidth: 280, objectFit: 'contain' }}
        />
        <div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 26, color: C.ink, lineHeight: 1.2 }}>no plans? really?</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600, marginTop: 8, maxWidth: 260 }}>your friends are waiting. or maybe they're not.</div>
        </div>
      </div>
      <div style={{ padding: '0 20px 24px' }}>
        <Button full onClick={onCreate}>start something →</Button>
      </div>
    </div>
  )
}
