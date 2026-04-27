import { Button } from '../components/ui/Button'
import { Illo } from '../components/ui/Illo'
import { C } from '../lib/tokens'

interface Props { onSignup: () => void; onSignin: () => void }

export function Splash({ onSignup, onSignin }: Props) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 32px', background: C.base }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        <div style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 700, fontSize: 64, lineHeight: 0.95,
          color: C.ink, letterSpacing: '-0.02em', textAlign: 'center',
        }}>
          mego<br />
          <span style={{ color: C.pink, WebkitTextStroke: '2px #0A0A0A' }}>wego</span>
        </div>
        <Illo color={C.purple} height={240} label="[ illustration — friend chaos ]" style={{ width: '100%' }} />
        <div style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: 15, color: C.grey600, textAlign: 'center', maxWidth: 280, lineHeight: 1.5,
        }}>
          plan outings. show up. roast the ones who don't.
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button full onClick={onSignup}>let's go →</Button>
        <Button variant="ghost" full onClick={onSignin}>already one of us? sign in</Button>
      </div>
    </div>
  )
}
