import { Card } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { AvatarStack } from '../components/ui/Avatar'
import { C } from '../lib/tokens'

const PEOPLE = [
  { name: 'Aarav', color: C.pink },
  { name: 'Diya',  color: C.yellow },
  { name: 'Kabir', color: C.green },
  { name: 'Mira',  color: C.blue },
]

const MEMORIES = [
  { id: 1, name: 'chai @ irani', date: 'FRI 24 APR', vibe: 'chaotic 💀', people: PEOPLE.slice(0,4) },
  { id: 2, name: 'matinee madness', date: 'SAT 15 MAR', vibe: 'legendary 🏆', people: PEOPLE.slice(0,3) },
  { id: 3, name: 'shuka dinner', date: 'FRI 28 FEB', vibe: 'wholesome 🫶', people: PEOPLE },
]

export function Moments() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base }}>
      <div style={{ padding: '48px 20px 16px' }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink }}>moments</div>
      </div>

      {/* Anniversary row */}
      <div style={{ padding: '0 20px 16px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 12, width: 'max-content' }}>
          {['Chai night', 'Goa trip'].map(name => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: C.yellow, border: '3px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎂</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 11, fontWeight: 500, color: C.ink, textAlign: 'center', maxWidth: 56 }}>{name}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 20, color: C.ink, marginBottom: 8 }}>2026</div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 13, color: C.grey600, marginBottom: 4, letterSpacing: '0.04em' }}>APRIL</div>

        {MEMORIES.map(m => (
          <Card key={m.id} padding={16} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink }}>{m.name}</div>
                <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, color: C.grey600, marginTop: 4 }}>{m.date}</div>
              </div>
              <Chip color={C.grey100}>{m.vibe}</Chip>
            </div>
            <div style={{ marginTop: 12 }}>
              <AvatarStack people={m.people} size={28} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
