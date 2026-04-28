import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Chip } from '../components/ui/Chip'
import { Avatar } from '../components/ui/Avatar'
import type { Outing } from '../App'
import { C } from '../lib/tokens'

interface Props {
  onBack: () => void
  onDone: (outing: Outing) => void
}

const OUTING_TYPES = [
  { label: 'movies 🎬', color: C.pink },
  { label: 'food 🍕',   color: C.yellow },
  { label: 'sport ⚽',  color: C.green },
  { label: 'hangout ✌️', color: C.blue },
  { label: 'other',    color: C.grey200 },
]

const MY_FRIENDS = [
  { id: '1', name: 'Diya',   initials: 'D', color: C.yellow },
  { id: '2', name: 'Kabir',  initials: 'K', color: C.green  },
  { id: '3', name: 'Mira',   initials: 'M', color: C.blue   },
  { id: '4', name: 'Rhea',   initials: 'R', color: C.purple },
  { id: '5', name: 'Vir',    initials: 'V', color: C.orange },
  { id: '6', name: 'Ananya', initials: 'A', color: C.pink   },
]

function formatDisplayDate(datetime: string): string {
  if (!datetime) return 'DATE TBD'
  const d = new Date(datetime)
  const days   = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const day  = days[d.getDay()]
  const date = d.getDate()
  const mon  = months[d.getMonth()]
  const h    = d.getHours() % 12 || 12
  const m    = d.getMinutes().toString().padStart(2, '0')
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM'
  return `${day} ${date} ${mon} · ${h}:${m} ${ampm}`
}

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
  const [step, setStep]             = useState(1)
  const [name, setName]             = useState('')
  const [type, setType]             = useState('food 🍕')
  const [date, setDate]             = useState('')
  const [selected, setSelected]     = useState<string[]>([])
  const [linkCopied, setLinkCopied] = useState(false)

  const next = () => {
    if (step < 3) { setStep(s => s + 1); return }
    // Build and return the new outing
    const typeColor = OUTING_TYPES.find(t => t.label === type)?.color ?? C.grey200
    const people    = MY_FRIENDS.filter(f => selected.includes(f.id)).map(f => ({ name: f.name, color: f.color }))
    const newOuting: Outing = {
      id:       Date.now().toString(),
      name:     name.trim() || 'untitled outing',
      date:     formatDisplayDate(date),
      sortDate: date ? date.split('T')[0] : new Date().toISOString().split('T')[0],
      type,
      color:    typeColor,
      people,
    }
    onDone(newOuting)
  }

  const back = () => step > 1 ? setStep(s => s - 1) : onBack()

  const toggleFriend = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handleShareLink = async () => {
    const link = `https://megowego.app/join/abc123`
    if (navigator.share) {
      await navigator.share({ title: `Join ${name || 'our outing'} on Mego Wego`, url: link })
    } else {
      await navigator.clipboard.writeText(link)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }

  const selectedFriends = MY_FRIENDS.filter(f => selected.includes(f.id))

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 32px', background: C.surface, gap: 24 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={back} style={{ background: 'transparent', border: 'none', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 24, color: C.ink, cursor: 'pointer', padding: 0 }}>
          {step === 1 ? '×' : '←'}
        </button>
        <StepProgress step={step} />
      </div>

      {/* Step 1 — name + type + date */}
      {step === 1 && (
        <>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 26, color: C.ink, lineHeight: 1.2 }}>okay so what's the plan?</div>

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
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 26, color: C.ink, lineHeight: 1.2 }}>who's invited?</div>

          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 12 }}>YOUR FRIENDS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {MY_FRIENDS.map((f, i) => {
                const on = selected.includes(f.id)
                return (
                  <button key={f.id} onClick={() => toggleFriend(f.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: on ? C.yellow : C.base,
                    border: '2px solid #0A0A0A',
                    borderRadius: i === 0 ? '12px 12px 4px 4px' : i === MY_FRIENDS.length - 1 ? '4px 4px 12px 12px' : 4,
                    padding: '12px 16px',
                    cursor: 'pointer', textAlign: 'left',
                    boxShadow: i === MY_FRIENDS.length - 1 ? '3px 3px 0 0 #0A0A0A' : 'none',
                    transition: 'background 0.1s',
                  }}>
                    <Avatar name={f.initials} color={f.color} size={36} />
                    <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, flex: 1 }}>{f.name}</div>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      border: '2px solid #0A0A0A',
                      background: on ? C.ink : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {on && <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.yellow }} />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{
            background: C.base, border: '2px solid #0A0A0A',
            borderRadius: 12, boxShadow: '3px 3px 0 0 #0A0A0A', padding: '16px 20px',
          }}>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 4 }}>
              Not on Mego Wego yet?
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 13, color: C.grey600, marginBottom: 14 }}>
              Share a link — they can RSVP without downloading the app.
            </div>
            <button onClick={handleShareLink} style={{
              width: '100%', height: 44,
              background: linkCopied ? C.green : C.surface,
              border: '2px solid #0A0A0A', borderRadius: 10,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 500, fontSize: 14, color: C.ink,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {linkCopied ? '✓ link copied!' : '🔗 share invite link'}
            </button>
          </div>
        </>
      )}

      {/* Step 3 — confirm */}
      {step === 3 && (
        <>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 26, color: C.ink, lineHeight: 1.2 }}>looking good 👀</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600 }}>double-check before we send the invites</div>

          <div style={{ background: C.base, border: '2px solid #0A0A0A', borderRadius: 12, boxShadow: '3px 3px 0 0 #0A0A0A', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 4 }}>OUTING</div>
              <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 20, color: C.ink }}>{name || 'untitled outing'}</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 4 }}>WHEN</div>
              <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 13, color: C.ink }}>{formatDisplayDate(date)}</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 4 }}>TYPE</div>
              <Chip color={OUTING_TYPES.find(t => t.label === type)?.color ?? C.grey200}>{type}</Chip>
            </div>
            {selectedFriends.length > 0 && (
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 8 }}>INVITED</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selectedFriends.map(f => (
                    <div key={f.id} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: C.grey100, border: '1.5px solid #0A0A0A',
                      borderRadius: 100, padding: '4px 10px 4px 4px',
                    }}>
                      <Avatar name={f.initials} color={f.color} size={22} />
                      <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: C.ink }}>{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div style={{ flex: 1 }} />
      <Button full onClick={next} disabled={step === 1 && !name.trim()}>
        {step < 3 ? 'next →' : 'done →'}
      </Button>
    </div>
  )
}
