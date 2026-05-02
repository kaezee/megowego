import { useState, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { C, F } from '../lib/tokens'

interface Props { onBack: () => void; onDone: () => void }

export function Signup({ onBack, onDone }: Props) {
  const [step, setStep]           = useState<'phone' | 'otp' | 'name'>('phone')
  const [phone, setPhone]         = useState('')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [name, setName]           = useState('')

  // Auto-fill OTP and advance once all digits appear
  useEffect(() => {
    if (step !== 'otp') return
    const code = ['4', '7', '2', '9', '0', '1']
    code.forEach((d, i) => {
      setTimeout(() => {
        setOtpDigits(prev => { const n = [...prev]; n[i] = d; return n })
      }, 600 + i * 160)
    })
    setTimeout(() => setStep('name'), 600 + 6 * 160 + 500)
  }, [step])

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden', position: 'relative' }}>

      <div style={{ padding: '48px 20px 0', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '28px 20px 8px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        <div>
          <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 28, color: C.ink, lineHeight: 1.2 }}>join the crew</div>
          <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, marginTop: 8 }}>we promise not to tell your group chat</div>
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
        {step !== 'phone' && (
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
          </div>
        )}

        {/* Name */}
        {step === 'name' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 13, color: C.ink }}>what should we call you?</div>
            <Input placeholder="aarav s." value={name} onChange={setName} focused />
          </div>
        )}

      </div>

      {step === 'name' && (
        <div style={{ padding: '12px 20px 32px', flexShrink: 0 }}>
          <Button full disabled={name.trim().length < 2} onClick={onDone}>done →</Button>
        </div>
      )}
    </div>
  )
}
