import { useState } from 'react'
import { SearchInput } from '../components/ui/Input'
import { AvatarStack } from '../components/ui/Avatar'
import { Chip } from '../components/ui/Chip'
import { Illo } from '../components/ui/Illo'
import { Button } from '../components/ui/Button'
import { C } from '../lib/tokens'

const PEOPLE = [
  { name: 'Aarav', color: C.pink },
  { name: 'Diya',  color: C.yellow },
  { name: 'Kabir', color: C.green },
  { name: 'Mira',  color: C.blue },
  { name: 'Rhea',  color: C.purple },
  { name: 'Vir',   color: C.orange },
]

interface Moment {
  id: string
  name: string
  date: string
  month: string
  year: string
  vibe: string
  vibeEmoji: string
  type: string
  color: string
  people: typeof PEOPLE
  photoUrl?: string
  bills?: string
}

const MOMENTS: Moment[] = [
  { id: '1', name: 'chai @ irani',         date: 'FRI 24 APR 2026', month: 'April',    year: '2026', vibe: 'chaotic',    vibeEmoji: '💀', type: 'food',    color: C.yellow,  people: PEOPLE.slice(0,4) },
  { id: '2', name: 'matinee madness',      date: 'SAT 15 MAR 2026', month: 'March',    year: '2026', vibe: 'legendary',  vibeEmoji: '🏆', type: 'movies',  color: C.pink,    people: PEOPLE.slice(0,3) },
  { id: '3', name: 'shuka dinner',         date: 'FRI 28 FEB 2026', month: 'February', year: '2026', vibe: 'wholesome',  vibeEmoji: '🫶', type: 'food',    color: C.orange,  people: PEOPLE, bills: '₹1,200 split 6 ways' },
  { id: '4', name: 'goa boys (real this time)', date: 'SUN 12 JAN 2026', month: 'January', year: '2026', vibe: 'unhinged', vibeEmoji: '🤯', type: 'hangout', color: C.blue,  people: PEOPLE.slice(0,5) },
  { id: '5', name: 'cricket in the rain',  date: 'SAT 21 DEC 2025', month: 'December', year: '2025', vibe: 'mid',        vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2], PEOPLE[4]] },
  { id: '6', name: 'bandra walk',          date: 'SUN 10 NOV 2025', month: 'November', year: '2025', vibe: 'wholesome',  vibeEmoji: '🫶', type: 'hangout', color: C.purple,  people: PEOPLE.slice(0,2) },
  { id: '7', name: 'ipl watch party',      date: 'FRI 25 OCT 2025', month: 'October',  year: '2025', vibe: 'legendary',  vibeEmoji: '🏆', type: 'sport',   color: C.orange,  people: PEOPLE },
]

// Group by year → month
type Grouped = { year: string; months: { month: string; items: Moment[] }[] }[]
function group(items: Moment[]): Grouped {
  const byYear: Record<string, Record<string, Moment[]>> = {}
  items.forEach(m => {
    if (!byYear[m.year]) byYear[m.year] = {}
    if (!byYear[m.year][m.month]) byYear[m.year][m.month] = []
    byYear[m.year][m.month].push(m)
  })
  return Object.entries(byYear)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, months]) => ({
      year,
      months: Object.entries(months).map(([month, items]) => ({ month, items })),
    }))
}

const MONTH_ORDER = ['January','February','March','April','May','June','July','August','September','October','November','December']

interface Props {
  onMomentTap: (m: Moment) => void
}

export function Moments({ onMomentTap }: Props) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? MOMENTS.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.vibe.toLowerCase().includes(query.toLowerCase()) ||
        m.people.some(p => p.name.toLowerCase().includes(query.toLowerCase()))
      )
    : MOMENTS

  const grouped = group(filtered)

  const anniversaries = MOMENTS.filter(m => m.year === '2025')

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base, overflow: 'hidden' }}>

      {/* Fixed header */}
      <div style={{ padding: '48px 16px 12px', background: C.base, flexShrink: 0 }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, marginBottom: 12 }}>
          moments
        </div>
        <SearchInput placeholder="search by outing, vibe, or person..." value={query} onChange={setQuery} />
      </div>

      {/* Anniversary story row */}
      {!query && anniversaries.length > 0 && (
        <div style={{ padding: '0 16px 4px', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 10 }}>
            ONE YEAR AGO
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
            {anniversaries.map(m => (
              <button key={m.id} onClick={() => onMomentTap(m)} style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: m.color, border: '3px solid #0A0A0A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {m.vibeEmoji}
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 10, fontWeight: 500, color: C.ink,
                  textAlign: 'center', maxWidth: 56,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {m.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: C.grey100, margin: '8px 0', flexShrink: 0 }} />

      {/* Grid scroll area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 32px' }}>
        {filtered.length === 0 ? (
          <div style={{ paddingTop: 60, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 20, color: C.ink }}>nothing found 😐</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600, marginTop: 8 }}>try a different name, vibe, or person</div>
          </div>
        ) : (
          grouped.map(({ year, months }) => (
            <div key={year}>
              {/* Year header */}
              <div style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontWeight: 700, fontSize: 28, color: C.ink,
                paddingTop: 8, paddingBottom: 4,
              }}>
                {year}
              </div>

              {months
                .sort((a, b) => MONTH_ORDER.indexOf(b.month) - MONTH_ORDER.indexOf(a.month))
                .map(({ month, items }) => (
                  <div key={month} style={{ marginBottom: 20 }}>
                    {/* Month label */}
                    <div style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontWeight: 600, fontSize: 12, color: C.grey600,
                      letterSpacing: '0.05em', marginBottom: 8,
                    }}>
                      {month.toUpperCase()}
                    </div>

                    {/* 3-column grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 4,
                    }}>
                      {items.map(m => (
                        <MomentTile key={m.id} moment={m} onClick={() => onMomentTap(m)} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ── Tile ────────────────────────────────────────────────────
function MomentTile({ moment: m, onClick }: { moment: Moment; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        borderRadius: 10,
        border: '2px solid #0A0A0A',
        overflow: 'hidden',
        background: m.color,
        cursor: 'pointer',
        padding: 0,
        display: 'block',
        width: '100%',
      }}
    >
      {m.photoUrl ? (
        // Real photo
        <img src={m.photoUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        // Illustration placeholder — centred emoji over tinted bg
        <div style={{
          width: '100%', height: '100%',
          background: m.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
        }}>
          {m.vibeEmoji}
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0) 55%)',
        pointerEvents: 'none',
      }} />

      {/* Name label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 6px 6px',
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 600, fontSize: 11,
        color: '#FAFAF0',
        lineHeight: 1.2,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        textAlign: 'left',
      }}>
        {m.name}
      </div>
    </button>
  )
}

// ── Full moment detail (exported for use in App.tsx) ────────
export function MomentDetail({ moment: m, onBack }: { moment: Moment; onBack: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base, overflow: 'hidden' }}>

      {/* Hero — photo or illustration */}
      <div style={{ position: 'relative', flexShrink: 0, height: 280, background: m.color }}>
        {m.photoUrl ? (
          <img src={m.photoUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Illo color={m.color} height={180} label={`[ ${m.name} ]`} style={{ width: '80%', border: 'none', background: 'transparent' }} />
            <div style={{ position: 'absolute', fontSize: 72, opacity: 0.25 }}>{m.vibeEmoji}</div>
          </div>
        )}

        {/* Back button */}
        <button onClick={onBack} style={{
          position: 'absolute', top: 48, left: 16,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(250,250,240,0.9)',
          border: '2px solid #0A0A0A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 700, fontSize: 18, color: C.ink,
          boxShadow: '2px 2px 0 0 #0A0A0A',
        }}>←</button>

        {/* Vibe chip */}
        <div style={{ position: 'absolute', top: 52, right: 16 }}>
          <Chip color={m.color} style={{ background: 'rgba(250,250,240,0.9)' }}>
            {m.vibe} {m.vibeEmoji}
          </Chip>
        </div>

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Details */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Title + date */}
        <div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 28, color: C.ink, lineHeight: 1.2 }}>
            {m.name}
          </div>
          <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.grey600, marginTop: 6 }}>
            {m.date}
          </div>
        </div>

        {/* Who was there */}
        <div style={{ background: C.grey100, borderRadius: 12, padding: 16 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 12, color: C.grey600, letterSpacing: '0.04em', marginBottom: 12 }}>
            WHO SHOWED UP
          </div>
          <AvatarStack people={m.people} size={36} max={6} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {m.people.map(p => (
              <Chip key={p.name} color={p.color} style={{ fontSize: 12 }}>{p.name}</Chip>
            ))}
          </div>
        </div>

        {/* Bills if any */}
        {m.bills && (
          <div style={{ background: C.grey100, borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 12, color: C.grey600, letterSpacing: '0.04em', marginBottom: 8 }}>
              BILLS
            </div>
            <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 700, fontSize: 18, color: C.ink }}>
              {m.bills}
            </div>
          </div>
        )}

        {/* Share cards */}
        <div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginBottom: 12 }}>
            share the memory
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button full variant="secondary">moment card 📸</Button>
            <Button full variant="secondary">fomo card 😭</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// export type for App.tsx
export type { Moment }
