import { useState } from 'react'
import { AvatarStack } from '../components/ui/Avatar'
import { Card, HeaderCard } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { SearchInput } from '../components/ui/Input'
import { SwipeableOutingCard } from '../components/SwipeableOutingCard'
import { DeleteOutingModal } from '../components/DeleteOutingModal'
import { C } from '../lib/tokens'

const PEOPLE = [
  { name: 'Aarav', color: C.pink },
  { name: 'Diya',  color: C.yellow },
  { name: 'Kabir', color: C.green },
  { name: 'Mira',  color: C.blue },
  { name: 'Rhea',  color: C.purple },
  { name: 'Vir',   color: C.orange },
]

interface Outing {
  id: string
  name: string
  date: string
  type: string
  color: string
  people: typeof PEOPLE
}

const INITIAL_OUTINGS: Outing[] = [
  { id: '1', name: 'chai @ irani',       date: 'HAPPENING NOW',      type: 'food 🍕',      color: C.yellow, people: PEOPLE.slice(0,4) },
  { id: '2', name: 'shuka dinner',       date: 'FRI 24 APR · 8:00 PM', type: 'food 🍕',    color: C.yellow, people: PEOPLE.slice(0,5) },
  { id: '3', name: 'matinee madness',    date: 'SAT 25 APR · 3:30 PM', type: 'movies 🎬',  color: C.pink,   people: [PEOPLE[1], PEOPLE[3], PEOPLE[5]] },
  { id: '4', name: 'goa boys (real this time)', date: '3 MAY · WEEKEND', type: 'hangout ✌️', color: C.blue, people: PEOPLE },
]

interface Props { onOutingTap: () => void; onCreate: () => void }

export function HomeActive({ onOutingTap, onCreate }: Props) {
  const [outings, setOutings]           = useState(INITIAL_OUTINGS)
  const [deletingId, setDeletingId]     = useState<string | null>(null)

  const deletingOuting = outings.find(o => o.id === deletingId)

  const handleDelete = () => {
    setOutings(prev => prev.filter(o => o.id !== deletingId))
    setDeletingId(null)
  }

  const live   = outings.find(o => o.date === 'HAPPENING NOW')
  const coming = outings.filter(o => o.date.startsWith('FRI') || o.date.startsWith('SAT'))
  const later  = outings.filter(o => o.date.startsWith('3 MAY'))

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base, position: 'relative' }}>

      {/* Header */}
      <div style={{ padding: '48px 20px 0', marginBottom: 16 }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink }}>Your week</div>
      </div>
      <div style={{ padding: '0 20px' }}>
        <SearchInput placeholder="search outings, friends..." />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 80px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Live pinned card */}
        {live && (
          <SwipeableOutingCard onClick={onOutingTap} onDelete={() => setDeletingId(live.id)}>
            <HeaderCard color={C.orange}>
              <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: '0.06em', color: C.ink, opacity: 0.8 }}>HAPPENING NOW</div>
              <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, marginTop: 4 }}>it's happening right now 🔥</div>
              <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginTop: 8 }}>{live.name}</div>
              <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.ink, marginTop: 6 }}>STARTED 18 MIN AGO · BANDRA</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                <AvatarStack people={live.people} size={28} />
                <Chip color={C.white}>i'm coming</Chip>
              </div>
            </HeaderCard>
          </SwipeableOutingCard>
        )}

        {/* Coming up */}
        {coming.length > 0 && (
          <div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginBottom: 12 }}>Coming up</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {coming.map(o => (
                <SwipeableOutingCard key={o.id} onClick={onOutingTap} onDelete={() => setDeletingId(o.id)}>
                  <Card padding={16}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink }}>{o.name}</div>
                        <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.grey600, marginTop: 4 }}>{o.date}</div>
                      </div>
                      <Chip color={o.color}>{o.type}</Chip>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <AvatarStack people={o.people} size={28} max={4} />
                    </div>
                  </Card>
                </SwipeableOutingCard>
              ))}
            </div>
          </div>
        )}

        {/* Further out */}
        {later.length > 0 && (
          <div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: C.grey600, marginBottom: 12 }}>Further out</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {later.map(o => (
                <SwipeableOutingCard key={o.id} onClick={onOutingTap} onDelete={() => setDeletingId(o.id)}>
                  <Card padding={14} style={{ opacity: 0.85 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: C.ink }}>{o.name}</div>
                        <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, color: C.grey600, marginTop: 4 }}>{o.date}</div>
                      </div>
                      <Chip color={o.color}>{o.type}</Chip>
                    </div>
                  </Card>
                </SwipeableOutingCard>
              ))}
            </div>
          </div>
        )}

        {/* Empty state after all deleted */}
        {outings.length === 0 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 60, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 22, color: C.ink }}>clean slate 💀</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600 }}>you deleted everything. bold move.</div>
          </div>
        )}
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

      {/* Delete modal */}
      {deletingId && deletingOuting && (
        <DeleteOutingModal
          outingName={deletingOuting.name}
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  )
}
