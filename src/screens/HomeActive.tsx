import { Avatar, AvatarStack } from '../components/ui/Avatar'
import { Card, HeaderCard } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { SearchInput } from '../components/ui/Input'
import { C } from '../lib/tokens'

const PEOPLE = [
  { name: 'Aarav', color: C.pink },
  { name: 'Diya',  color: C.yellow },
  { name: 'Kabir', color: C.green },
  { name: 'Mira',  color: C.blue },
  { name: 'Rhea',  color: C.purple },
  { name: 'Vir',   color: C.orange },
]

interface Props { onOutingTap: () => void; onCreate: () => void }

export function HomeActive({ onOutingTap, onCreate }: Props) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base, position: 'relative' }}>
      {/* Header */}
      <div style={{ padding: '48px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink }}>your week</div>
        <Avatar name="A" color={C.yellow} size={36} />
      </div>

      <div style={{ padding: '0 20px' }}>
        <SearchInput placeholder="search outings, friends..." />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 80px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Live pinned card */}
        <HeaderCard color={C.orange} onClick={onOutingTap}>
          <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: '0.06em', color: C.ink, opacity: 0.8 }}>HAPPENING NOW</div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, marginTop: 4 }}>it's happening right now 🔥</div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginTop: 8 }}>chai @ irani</div>
          <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.ink, marginTop: 6 }}>STARTED 18 MIN AGO · BANDRA</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
            <AvatarStack people={PEOPLE.slice(0, 4)} size={28} />
            <Chip color={C.white}>i'm coming</Chip>
          </div>
        </HeaderCard>

        {/* Coming up */}
        <div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginBottom: 12 }}>coming up</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Card padding={16} onClick={onOutingTap}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink }}>shuka dinner</div>
                  <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.grey600, marginTop: 4 }}>FRI 24 APR · 8:00 PM</div>
                </div>
                <Chip color={C.yellow}>food 🍕</Chip>
              </div>
              <div style={{ marginTop: 12 }}>
                <AvatarStack people={PEOPLE.slice(0, 5)} size={28} max={4} />
              </div>
            </Card>

            <Card padding={16} onClick={onOutingTap}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink }}>matinee madness</div>
                  <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.grey600, marginTop: 4 }}>SAT 25 APR · 3:30 PM</div>
                </div>
                <Chip color={C.pink}>movies 🎬</Chip>
              </div>
              <div style={{ marginTop: 12 }}>
                <AvatarStack people={[PEOPLE[1], PEOPLE[3], PEOPLE[5]]} size={28} />
              </div>
            </Card>
          </div>
        </div>

        {/* Further out */}
        <div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: C.grey600, marginBottom: 12 }}>further out</div>
          <Card padding={14} style={{ opacity: 0.85 }} onClick={onOutingTap}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: C.ink }}>goa boys (real this time)</div>
                <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, color: C.grey600, marginTop: 4 }}>3 MAY · WEEKEND</div>
              </div>
              <Chip color={C.blue}>just vibes ✨</Chip>
            </div>
          </Card>
        </div>
      </div>

      {/* FAB */}
      <button onClick={onCreate} style={{
        position: 'absolute', bottom: 24, right: 20,
        width: 56, height: 56, borderRadius: '50%',
        background: C.ink, border: '2px solid #0A0A0A',
        color: C.base, cursor: 'pointer',
        boxShadow: '4px 4px 0 0 #0A0A0A',
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontSize: 28, fontWeight: 400,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>+</button>
    </div>
  )
}
