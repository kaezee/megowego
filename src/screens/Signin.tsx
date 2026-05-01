import { useState, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { C, F } from '../lib/tokens'

interface Props { onBack: () => void; onDone: () => void }

export function Signin({ onBack, onDone }: Props) {
  const [step, setStep]           = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone]         = useState('')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])

  useEffect(() => {
    if (step !== 'otp') return
    const code = ['4', '7', '2', '9', '0', '1']
    code.forEach((d, i) => {
      setTimeout(() => {
        setOtpDigits(prev => { const n = [...prev]; n[i] = d; return n })
      }, 600 + i * 160)
    })
  }, [step])

  const allFilled = otpDigits.every(d => d !== '')

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden', position: 'relative' }}>

      <div style={{ padding: '48px 20px 0', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', fontFamily: F.display, fontWeight: 600, fontSize: 24, color: C.ink, cursor: 'pointer', padding: 0 }}>←</button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '28px 20px 8px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        <div>
          <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 28, color: C.ink, lineHeight: 1.2 }}>welcome back</div>
          <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, marginTop: 8 }}>let's see what chaos awaits</div>
        </div>

        {/* Phone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 13, color: C.ink }}>your number</div>
          <Input
            placeholder="+91 98765 43210"
            value={phone}
            onChange={setPhone}
            type="tel"
            focused={step === 'phone'}
          />
          {step === 'phone' && (
            <Button full disabled={phone.replace(/\D/g, '').length < 10} onClick={() => setStep('otp')} style={{ marginTop: 4 }}>
              send code →
            </Button>
          )}
        </div>

        {/* OTP */}
        {step === 'otp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 13, color: C.ink }}>enter the code we sent you</div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>code sent ✓</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {otpDigits.map((d, i) => (
                <div key={i} style={{
                  flex: 1, height: 52,
                  background: d ? C.base : C.grey100,
                  border: `2px solid ${d ? C.ink : C.grey200}`,
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: F.mono, fontWeight: 600, fontSize: 20, color: C.ink,
                  transition: 'all 120ms',
                }}>
                  {d || '—'}
                </div>
              ))}
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 12, color: C.grey600 }}>resend in 0:24</div>
          </div>
        )}

      </div>

      {step === 'otp' && (
        <div style={{ padding: '12px 20px 32px', flexShrink: 0 }}>
          <Button full disabled={!allFilled} onClick={onDone}>let's go →</Button>
        </div>
      )}
    </div>
  )
}
