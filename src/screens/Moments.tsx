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

export interface Moment {
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
  // 2026 — April
  { id: '1',  name: 'chai @ irani',          date: 'FRI 24 APR 2026', month: 'April',    year: '2026', vibe: 'chaotic',   vibeEmoji: '💀', type: 'food',    color: C.yellow,  people: PEOPLE.slice(0,4), bills: '₹840 split 4 ways' },
  { id: '2',  name: 'bandra bouldering',     date: 'WED 22 APR 2026', month: 'April',    year: '2026', vibe: 'legendary', vibeEmoji: '🏆', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2], PEOPLE[4]] },
  { id: '3',  name: 'midnight maggi run',    date: 'MON 14 APR 2026', month: 'April',    year: '2026', vibe: 'unhinged',  vibeEmoji: '🤯', type: 'food',    color: C.orange,  people: PEOPLE.slice(0,3) },
  { id: '4',  name: 'rooftop nothing',       date: 'SUN 6 APR 2026',  month: 'April',    year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.purple,  people: [PEOPLE[1], PEOPLE[3]] },
  // 2026 — March
  { id: '5',  name: 'matinee madness',       date: 'SAT 15 MAR 2026', month: 'March',    year: '2026', vibe: 'legendary', vibeEmoji: '🏆', type: 'movies',  color: C.pink,    people: PEOPLE.slice(0,3) },
  { id: '6',  name: 'holi at kabir\'s',      date: 'MON 10 MAR 2026', month: 'March',    year: '2026', vibe: 'chaotic',   vibeEmoji: '💀', type: 'hangout', color: C.orange,  people: PEOPLE },
  { id: '7',  name: 'thrift market walk',    date: 'SAT 1 MAR 2026',  month: 'March',    year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.blue,    people: [PEOPLE[0], PEOPLE[1], PEOPLE[3]] },
  { id: '8',  name: 'biryani challenge',     date: 'FRI 7 MAR 2026',  month: 'March',    year: '2026', vibe: 'unhinged',  vibeEmoji: '🤯', type: 'food',    color: C.yellow,  people: PEOPLE.slice(2,6), bills: '₹1,400 split 4 ways' },
  { id: '9',  name: 'cricket nets session',  date: 'SUN 22 MAR 2026', month: 'March',    year: '2026', vibe: 'mid',       vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2], PEOPLE[5]] },
  // 2026 — February
  { id: '10', name: 'shuka dinner',          date: 'FRI 28 FEB 2026', month: 'February', year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'food',    color: C.orange,  people: PEOPLE, bills: '₹1,200 split 6 ways' },
  { id: '11', name: 'movie marathon',        date: 'SAT 22 FEB 2026', month: 'February', year: '2026', vibe: 'legendary', vibeEmoji: '🏆', type: 'movies',  color: C.pink,    people: PEOPLE.slice(0,4) },
  { id: '12', name: 'carter road sunset',    date: 'SUN 9 FEB 2026',  month: 'February', year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.blue,    people: [PEOPLE[1], PEOPLE[3], PEOPLE[4]] },
  { id: '13', name: 'street food crawl',     date: 'SAT 1 FEB 2026',  month: 'February', year: '2026', vibe: 'chaotic',   vibeEmoji: '💀', type: 'food',    color: C.yellow,  people: PEOPLE.slice(1,5), bills: '₹680 split 4 ways' },
  // 2026 — January
  { id: '14', name: 'goa boys (real this time)', date: 'SUN 12 JAN 2026', month: 'January', year: '2026', vibe: 'unhinged', vibeEmoji: '🤯', type: 'hangout', color: C.blue, people: PEOPLE.slice(0,5), bills: '₹8,400 split 5 ways' },
  { id: '15', name: 'new year eve rooftop', date: 'WED 1 JAN 2026',  month: 'January',  year: '2026', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.purple,  people: PEOPLE },
  { id: '16', name: 'detox hike',           date: 'SAT 18 JAN 2026', month: 'January',  year: '2026', vibe: 'mid',       vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2]] },
  { id: '17', name: 'dal rice & drama',     date: 'FRI 24 JAN 2026', month: 'January',  year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'food',    color: C.orange,  people: PEOPLE.slice(0,4) },
  // ─── 2025 ───────────────────────────────────────────────────
  // 2025 — December
  { id: '18', name: 'cricket in the rain',  date: 'SAT 21 DEC 2025', month: 'December', year: '2025', vibe: 'mid',       vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2], PEOPLE[4]] },
  { id: '19', name: 'christmas eve mess',   date: 'WED 24 DEC 2025', month: 'December', year: '2025', vibe: 'chaotic',   vibeEmoji: '💀', type: 'hangout', color: C.orange,  people: PEOPLE, bills: '₹2,200 split 6 ways' },
  { id: '20', name: 'band practice turned party', date: 'SAT 6 DEC 2025', month: 'December', year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.purple, people: PEOPLE.slice(1,5) },
  { id: '21', name: 'airport drop drama',   date: 'FRI 12 DEC 2025', month: 'December', year: '2025', vibe: 'unhinged',  vibeEmoji: '🤯', type: 'hangout', color: C.blue,    people: [PEOPLE[0], PEOPLE[3]] },
  // 2025 — November
  { id: '22', name: 'bandra walk',          date: 'SUN 10 NOV 2025', month: 'November', year: '2025', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.purple,  people: PEOPLE.slice(0,2) },
  { id: '23', name: 'open mic night',       date: 'FRI 21 NOV 2025', month: 'November', year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.pink,    people: PEOPLE.slice(0,5) },
  { id: '24', name: 'terrible karaoke',     date: 'SAT 8 NOV 2025',  month: 'November', year: '2025', vibe: 'chaotic',   vibeEmoji: '💀', type: 'hangout', color: C.yellow,  people: PEOPLE, bills: '₹1,800 split 6 ways' },
  { id: '25', name: 'dawn run fail',        date: 'SUN 2 NOV 2025',  month: 'November', year: '2025', vibe: 'mid',       vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2]] },
  { id: '26', name: 'diwali at mira\'s',    date: 'THU 13 NOV 2025', month: 'November', year: '2025', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.orange,  people: PEOPLE },
  // 2025 — October
  { id: '27', name: 'ipl watch party',      date: 'FRI 25 OCT 2025', month: 'October',  year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'sport',   color: C.orange,  people: PEOPLE },
  { id: '28', name: 'wada pav taste test',  date: 'SAT 18 OCT 2025', month: 'October',  year: '2025', vibe: 'unhinged',  vibeEmoji: '🤯', type: 'food',    color: C.yellow,  people: PEOPLE.slice(0,4), bills: '₹320 split 4 ways' },
  { id: '29', name: 'bowling badly',        date: 'SUN 5 OCT 2025',  month: 'October',  year: '2025', vibe: 'chaotic',   vibeEmoji: '💀', type: 'sport',   color: C.pink,    people: PEOPLE.slice(1,6) },
  { id: '30', name: 'navratri chaos',       date: 'SAT 11 OCT 2025', month: 'October',  year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.purple,  people: PEOPLE },
]

const WRAPPED: Record<string, { outings: number; topFriend: string; spent: string; topVibe: string }> = {
  '2025': { outings: 38, topFriend: 'Diya', spent: '₹24,800', topVibe: 'legendary' },
  '2026': { outings: 17, topFriend: 'Kabir', spent: '₹12,400', topVibe: 'chaotic' },
}

// Group by year → month
type Grouped = { year: string; months: { month: string; items: Moment[] }[] }[]
const MONTH_ORDER = ['January','February','March','April','May','June','July','August','September','October','November','December']

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
      months: Object.entries(months)
        .sort(([a], [b]) => MONTH_ORDER.indexOf(b) - MONTH_ORDER.indexOf(a))
        .map(([month, items]) => ({ month, items })),
    }))
}

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

  const grouped  = group(filtered)
  const years    = grouped.map(g => g.year).sort((a, b) => Number(b) - Number(a))
  const maxYear  = years[0]
  const anniversaries = MOMENTS.filter(m => m.year !== maxYear).slice(0, 5)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base, overflow: 'hidden' }}>

      {/* Fixed header */}
      <div style={{ padding: '48px 16px 12px', background: C.base, flexShrink: 0 }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, marginBottom: 12 }}>
          moments
        </div>
        <SearchInput placeholder="search by outing, vibe, or person..." value={query} onChange={setQuery} />
      </div>

      {/* Anniversary story row — hidden while searching */}
      {!query && anniversaries.length > 0 && (
        <div style={{ padding: '4px 16px 8px', flexShrink: 0 }}>
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
                  fontSize: 10, fontWeight: 500, color: C.ink, textAlign: 'center', maxWidth: 56,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {m.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 1, background: C.grey100, flexShrink: 0 }} />

      {/* Scrollable grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 40px' }}>
        {filtered.length === 0 ? (
          <div style={{ paddingTop: 60, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 20, color: C.ink }}>nothing found 😐</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.grey600, marginTop: 8 }}>try a different name, vibe, or person</div>
          </div>
        ) : (
          grouped.map(({ year, months }, yearIdx) => (
            <div key={year}>

              {/* Wrapped banner — appears BEFORE every year except the most recent */}
              {yearIdx > 0 && WRAPPED[grouped[yearIdx - 1].year] && (
                <WrappedBanner year={grouped[yearIdx - 1].year} data={WRAPPED[grouped[yearIdx - 1].year]} />
              )}

              {/* Year header */}
              <div style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontWeight: 700, fontSize: 30, color: C.ink,
                paddingTop: 4, paddingBottom: 8,
              }}>
                {year}
              </div>

              {months.map(({ month, items }) => (
                <div key={month} style={{ marginBottom: 20 }}>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontWeight: 600, fontSize: 11, color: C.grey600,
                    letterSpacing: '0.06em', marginBottom: 8,
                  }}>
                    {month.toUpperCase()}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                    {items.map(m => (
                      <MomentTile key={m.id} moment={m} onClick={() => onMomentTap(m)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

        {/* Wrapped banner at the very bottom for the oldest year shown */}
        {grouped.length > 0 && WRAPPED[grouped[grouped.length - 1].year] && (
          <WrappedBanner year={grouped[grouped.length - 1].year} data={WRAPPED[grouped[grouped.length - 1].year]} />
        )}
      </div>
    </div>
  )
}

// ── Wrapped banner ──────────────────────────────────────────
function WrappedBanner({ year, data }: { year: string; data: typeof WRAPPED[string] }) {
  return (
    <div style={{
      background: C.ink,
      border: '2px solid #0A0A0A',
      borderRadius: 12,
      boxShadow: '4px 4px 0 0 #0A0A0A',
      padding: '16px 20px',
      marginBottom: 20,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Space Mono', ui-monospace, monospace",
          fontSize: 10, fontWeight: 700, color: C.yellow,
          letterSpacing: '0.08em', marginBottom: 4,
        }}>
          {year} WRAPPED 🎁
        </div>
        <div style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 700, fontSize: 20, color: C.base, lineHeight: 1.2,
        }}>
          {data.outings} outings. {data.topFriend} was always there.
        </div>
        <div style={{
          display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap',
        }}>
          {[
            { label: 'spent', value: data.spent },
            { label: 'top vibe', value: data.topVibe },
            { label: 'with', value: data.topFriend },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 10, color: C.grey400, letterSpacing: '0.04em' }}>{s.label.toUpperCase()}</div>
              <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 700, fontSize: 13, color: C.base, marginTop: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 700, fontSize: 13, color: C.yellow,
        whiteSpace: 'nowrap',
      }}>
        see all →
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
        <img src={m.photoUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: m.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30,
        }}>
          {m.vibeEmoji}
        </div>
      )}

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0) 55%)',
        pointerEvents: 'none',
      }} />

      {/* Name */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 5px 5px',
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 600, fontSize: 10.5,
        color: '#FAFAF0', lineHeight: 1.2,
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

// ── Full moment detail ──────────────────────────────────────
export function MomentDetail({ moment: m, onBack }: { moment: Moment; onBack: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base, overflow: 'hidden' }}>

      {/* Hero */}
      <div style={{ position: 'relative', flexShrink: 0, height: 280, background: m.color }}>
        {m.photoUrl ? (
          <img src={m.photoUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Illo color={m.color} height={180} label={`[ ${m.name} ]`} style={{ width: '80%', border: 'none', background: 'transparent' }} />
            <div style={{ position: 'absolute', fontSize: 72, opacity: 0.2 }}>{m.vibeEmoji}</div>
          </div>
        )}

        <button onClick={onBack} style={{
          position: 'absolute', top: 48, left: 16,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(250,250,240,0.9)', border: '2px solid #0A0A0A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 700, fontSize: 18, color: C.ink,
          boxShadow: '2px 2px 0 0 #0A0A0A',
        }}>←</button>

        <div style={{ position: 'absolute', top: 52, right: 16 }}>
          <Chip color={m.color} style={{ background: 'rgba(250,250,240,0.9)' }}>{m.vibe} {m.vibeEmoji}</Chip>
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Detail body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 28, color: C.ink, lineHeight: 1.2 }}>{m.name}</div>
          <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 12, color: C.grey600, marginTop: 6 }}>{m.date}</div>
        </div>

        <div style={{ background: C.grey100, borderRadius: 12, padding: 16 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.05em', marginBottom: 12 }}>WHO SHOWED UP</div>
          <AvatarStack people={m.people} size={36} max={6} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {m.people.map(p => (
              <Chip key={p.name} color={p.color} style={{ fontSize: 12 }}>{p.name}</Chip>
            ))}
          </div>
        </div>

        {m.bills && (
          <div style={{ background: C.grey100, borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.05em', marginBottom: 8 }}>BILLS</div>
            <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 700, fontSize: 18, color: C.ink }}>{m.bills}</div>
          </div>
        )}

        <div>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginBottom: 12 }}>share the memory</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button full variant="secondary">moment card 📸</Button>
            <Button full variant="secondary">fomo card 😭</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
