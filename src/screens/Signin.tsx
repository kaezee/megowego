import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { C } from '../lib/tokens'

interface Props { onBack: () => void; onDone: () => void }

export function Signin({ onBack, onDone }: Props) {
  const [phone, setPhone] = useState('')
  const OTP = ['4', '7', '2', '9', '', '']

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 32px', background: C.surface, gap: 24 }}>
      <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'transparent', border: 'none', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, cursor: 'pointer', padding: 0 }}>←</button>

      <div>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 28, color: C.ink, lineHeight: 1.2 }}>welcome back</div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600, marginTop: 8 }}>let's see what chaos awaits</div>
      </div>

      <div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 8 }}>your number</div>
        <Input placeholder="+91 98765 43210" value={phone} onChange={setPhone} type="tel" />
      </div>

      <div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 8 }}>enter the code we sent you</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {OTP.map((d, i) => (
            <div key={i} style={{
              flex: 1, height: 56,
              background: d ? C.white : C.grey100,
              border: `2px solid ${i === 3 ? C.ink : C.grey200}`,
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontWeight: 700, fontSize: 22,
              color: d ? C.ink : C.grey400,
            }}>{d || '—'}</div>
          ))}
        </div>
        <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.grey600, marginTop: 8 }}>resend in 0:24</div>
      </div>

      <div style={{ flex: 1 }} />
      <Button full onClick={onDone}>send me the code →</Button>
    </div>
  )
}
