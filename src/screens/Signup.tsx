import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { C } from '../lib/tokens'

interface Props { onBack: () => void; onDone: () => void }

export function Signup({ onBack, onDone }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 32px', background: C.grey100, gap: 24 }}>
      <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'transparent', border: 'none', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, cursor: 'pointer', padding: 0 }}>←</button>

      <div>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 28, color: C.ink, lineHeight: 1.2 }}>who are you then?</div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600, marginTop: 8, lineHeight: 1.5 }}>we promise not to share this with your group chat</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 8 }}>your name</div>
          <Input placeholder="aarav s." value={name} onChange={setName} />
        </div>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 8 }}>your number</div>
          <Input placeholder="+91 98765 43210" value={phone} onChange={setPhone} type="tel" />
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <Button full disabled={!name.trim() || !phone.trim()} onClick={onDone}>i'm in →</Button>
    </div>
  )
}
