import { Button } from '../components/ui/Button'
import { Blob } from '../components/ui/Blob'
import { C } from '../lib/tokens'

interface Props { onCreate: () => void }

export function HomeEmpty({ onCreate }: Props) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.surface }}>
      <div style={{ padding: '48px 20px 0' }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 24, color: C.ink }}>hey aarav 👋</div>
      </div>
      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center' }}>
        {/* Three blobs hanging out, bored */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 0 }}>
          <Blob color={C.pink}   shape="bean"  expression="sad"  size={90}  flip style={{ marginRight: -12, marginBottom: 12 }} />
          <Blob color={C.yellow} shape="round" expression="meh"  size={120} />
          <Blob color={C.green}  shape="oval"  expression="sad"  size={90}  style={{ marginLeft: -12, marginBottom: 8 }} />
        </div>
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
