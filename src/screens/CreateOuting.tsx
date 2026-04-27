import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Chip } from '../components/ui/Chip'
import { C } from '../lib/tokens'

interface Props { onBack: () => void; onDone: () => void }

const OUTING_TYPES = [
  { label: 'movies 🎬', color: C.pink },
  { label: 'food 🍕',   color: C.yellow },
  { label: 'sport ⚽',  color: C.green },
  { label: 'hangout ✌️', color: C.blue },
  { label: 'other',    color: C.white },
]

function StepProgress({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          flex: 1, height: 8,
          background: i === step ? C.yellow : i < step ? C.ink : C.grey200,
          border: '2px solid #0A0A0A', borderRadius: 100,
        }} />
      ))}
      <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.ink, marginLeft: 4 }}>{step}/3</div>
    </div>
  )
}

export function CreateOuting({ onBack, onDone }: Props) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [type, setType] = useState('food 🍕')
  const [date, setDate] = useState('')
  const [phones, setPhones] = useState([''])

  const next = () => step < 3 ? setStep(s => s + 1) : onDone()
  const back = () => step > 1 ? setStep(s => s - 1) : onBack()

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 32px', background: C.base, gap: 24 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={back} style={{ background: 'transparent', border: 'none', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, cursor: 'pointer', padding: 0 }}>
          {step === 1 ? '×' : '←'}
        </button>
        <StepProgress step={step} />
      </div>

      {/* Step 1 — name + type + date */}
      {step === 1 && (
        <>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 26, color: C.ink, lineHeight: 1.2 }}>okay so what's the plan?</div>

          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 8 }}>outing name</div>
            <Input placeholder="give it a name..." value={name} onChange={setName} />
          </div>

          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 10 }}>what kind of chaos?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {OUTING_TYPES.map(t => (
                <Chip key={t.label} color={t.color} active={type === t.label} onClick={() => setType(t.label)}>{t.label}</Chip>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 8 }}>when's this happening?</div>
            <Input placeholder="pick a date & time" value={date} onChange={setDate} type="datetime-local" />
          </div>
        </>
      )}

      {/* Step 2 — invite */}
      {step === 2 && (
        <>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 26, color: C.ink, lineHeight: 1.2 }}>who's invited?</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600 }}>add phone numbers — they don't need the app</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {phones.map((p, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 8 }}>
                  {i === 0 ? 'first friend' : `friend ${i + 1}`}
                </div>
                <Input placeholder="+91 98765 43210" value={p} onChange={v => { const next = [...phones]; next[i] = v; setPhones(next) }} type="tel" />
              </div>
            ))}
            <button onClick={() => setPhones(p => [...p, ''])} style={{
              background: 'transparent', border: 'none',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 500, fontSize: 14, color: C.ink,
              textDecoration: 'underline', cursor: 'pointer',
              alignSelf: 'flex-start', padding: 0,
            }}>+ add another friend</button>
          </div>
        </>
      )}

      {/* Step 3 — confirm */}
      {step === 3 && (
        <>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 26, color: C.ink, lineHeight: 1.2 }}>looking good 👀</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600 }}>double-check before we send the invites</div>

          <div style={{ background: C.grey100, border: '2px solid #E0DDD6', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 12, color: C.grey600, marginBottom: 4 }}>OUTING</div>
              <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 20, color: C.ink }}>{name || 'untitled outing'}</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 12, color: C.grey600, marginBottom: 4 }}>TYPE</div>
              <Chip color={OUTING_TYPES.find(t => t.label === type)?.color || C.white}>{type}</Chip>
            </div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 12, color: C.grey600, marginBottom: 4 }}>INVITED</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.ink }}>{phones.filter(Boolean).length || 0} friend{phones.filter(Boolean).length !== 1 ? 's' : ''}</div>
            </div>
          </div>
        </>
      )}

      <div style={{ flex: 1 }} />
      <Button full onClick={next} disabled={step === 1 && !name.trim()}>
        {step < 3 ? 'next →' : 'send invites →'}
      </Button>
    </div>
  )
}
