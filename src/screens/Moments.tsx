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
  // ─── 2026 ───────────────────────────────────────────────────
  // April 2026
  { id: '1',  name: 'chai @ irani',          date: 'FRI 24 APR 2026', month: 'April',    year: '2026', vibe: 'chaotic',   vibeEmoji: '💀', type: 'food',    color: C.yellow,  people: PEOPLE.slice(0,4), bills: '₹840 split 4 ways' },
  { id: '2',  name: 'bandra bouldering',     date: 'WED 22 APR 2026', month: 'April',    year: '2026', vibe: 'legendary', vibeEmoji: '🏆', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2], PEOPLE[4]] },
  { id: '3',  name: 'midnight maggi run',    date: 'MON 14 APR 2026', month: 'April',    year: '2026', vibe: 'unhinged',  vibeEmoji: '🤯', type: 'food',    color: C.orange,  people: PEOPLE.slice(0,3) },
  { id: '4',  name: 'rooftop nothing',       date: 'SUN 6 APR 2026',  month: 'April',    year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.purple,  people: [PEOPLE[1], PEOPLE[3]] },
  // March 2026
  { id: '5',  name: 'matinee madness',       date: 'SAT 15 MAR 2026', month: 'March',    year: '2026', vibe: 'legendary', vibeEmoji: '🏆', type: 'movies',  color: C.pink,    people: PEOPLE.slice(0,3) },
  { id: '6',  name: 'holi at kabir\'s',      date: 'MON 10 MAR 2026', month: 'March',    year: '2026', vibe: 'chaotic',   vibeEmoji: '💀', type: 'hangout', color: C.orange,  people: PEOPLE },
  { id: '7',  name: 'thrift market walk',    date: 'SAT 1 MAR 2026',  month: 'March',    year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.blue,    people: [PEOPLE[0], PEOPLE[1], PEOPLE[3]] },
  { id: '8',  name: 'biryani challenge',     date: 'FRI 7 MAR 2026',  month: 'March',    year: '2026', vibe: 'unhinged',  vibeEmoji: '🤯', type: 'food',    color: C.yellow,  people: PEOPLE.slice(2,6), bills: '₹1,400 split 4 ways' },
  { id: '9',  name: 'cricket nets session',  date: 'SUN 22 MAR 2026', month: 'March',    year: '2026', vibe: 'mid',       vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2], PEOPLE[5]] },
  // February 2026
  { id: '10', name: 'shuka dinner',          date: 'FRI 28 FEB 2026', month: 'February', year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'food',    color: C.orange,  people: PEOPLE, bills: '₹1,200 split 6 ways' },
  { id: '11', name: 'movie marathon',        date: 'SAT 22 FEB 2026', month: 'February', year: '2026', vibe: 'legendary', vibeEmoji: '🏆', type: 'movies',  color: C.pink,    people: PEOPLE.slice(0,4) },
  { id: '12', name: 'carter road sunset',    date: 'SUN 9 FEB 2026',  month: 'February', year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.blue,    people: [PEOPLE[1], PEOPLE[3], PEOPLE[4]] },
  { id: '13', name: 'street food crawl',     date: 'SAT 1 FEB 2026',  month: 'February', year: '2026', vibe: 'chaotic',   vibeEmoji: '💀', type: 'food',    color: C.yellow,  people: PEOPLE.slice(1,5), bills: '₹680 split 4 ways' },
  // January 2026
  { id: '14', name: 'goa boys (real this time)', date: 'SUN 12 JAN 2026', month: 'January', year: '2026', vibe: 'unhinged', vibeEmoji: '🤯', type: 'hangout', color: C.blue, people: PEOPLE.slice(0,5), bills: '₹8,400 split 5 ways' },
  { id: '15', name: 'new year eve rooftop', date: 'WED 1 JAN 2026',   month: 'January',  year: '2026', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.purple,  people: PEOPLE },
  { id: '16', name: 'detox hike',           date: 'SAT 18 JAN 2026',  month: 'January',  year: '2026', vibe: 'mid',       vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2]] },
  { id: '17', name: 'dal rice & drama',     date: 'FRI 24 JAN 2026',  month: 'January',  year: '2026', vibe: 'wholesome', vibeEmoji: '🫶', type: 'food',    color: C.orange,  people: PEOPLE.slice(0,4) },

  // ─── 2025 ───────────────────────────────────────────────────
  // December 2025
  { id: '18', name: 'cricket in the rain',  date: 'SAT 21 DEC 2025', month: 'December', year: '2025', vibe: 'mid',       vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2], PEOPLE[4]] },
  { id: '19', name: 'christmas eve mess',   date: 'WED 24 DEC 2025', month: 'December', year: '2025', vibe: 'chaotic',   vibeEmoji: '💀', type: 'hangout', color: C.orange,  people: PEOPLE, bills: '₹2,200 split 6 ways' },
  { id: '20', name: 'band practice → party', date: 'SAT 6 DEC 2025', month: 'December', year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.purple, people: PEOPLE.slice(1,5) },
  { id: '21', name: 'airport drop drama',   date: 'FRI 12 DEC 2025', month: 'December', year: '2025', vibe: 'unhinged',  vibeEmoji: '🤯', type: 'hangout', color: C.blue,    people: [PEOPLE[0], PEOPLE[3]] },
  // November 2025
  { id: '22', name: 'bandra walk',          date: 'SUN 10 NOV 2025', month: 'November', year: '2025', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.purple,  people: PEOPLE.slice(0,2) },
  { id: '23', name: 'open mic night',       date: 'FRI 21 NOV 2025', month: 'November', year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.pink,    people: PEOPLE.slice(0,5) },
  { id: '24', name: 'terrible karaoke',     date: 'SAT 8 NOV 2025',  month: 'November', year: '2025', vibe: 'chaotic',   vibeEmoji: '💀', type: 'hangout', color: C.yellow,  people: PEOPLE, bills: '₹1,800 split 6 ways' },
  { id: '25', name: 'dawn run fail',        date: 'SUN 2 NOV 2025',  month: 'November', year: '2025', vibe: 'mid',       vibeEmoji: '😐', type: 'sport',   color: C.green,   people: [PEOPLE[0], PEOPLE[2]] },
  { id: '26', name: 'diwali at mira\'s',    date: 'THU 13 NOV 2025', month: 'November', year: '2025', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.orange,  people: PEOPLE },
  // October 2025
  { id: '27', name: 'ipl watch party',      date: 'FRI 25 OCT 2025', month: 'October',  year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'sport',   color: C.orange,  people: PEOPLE },
  { id: '28', name: 'wada pav taste test',  date: 'SAT 18 OCT 2025', month: 'October',  year: '2025', vibe: 'unhinged',  vibeEmoji: '🤯', type: 'food',    color: C.yellow,  people: PEOPLE.slice(0,4), bills: '₹320 split 4 ways' },
  { id: '29', name: 'bowling badly',        date: 'SUN 5 OCT 2025',  month: 'October',  year: '2025', vibe: 'chaotic',   vibeEmoji: '💀', type: 'sport',   color: C.pink,    people: PEOPLE.slice(1,6) },
  { id: '30', name: 'navratri chaos',       date: 'SAT 11 OCT 2025', month: 'October',  year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.purple,  people: PEOPLE },

  // ─── 2025 April — for "on this day" row ────────────────────
  { id: '31', name: 'kala ghoda wander',    date: 'SAT 27 APR 2025', month: 'April',    year: '2025', vibe: 'wholesome', vibeEmoji: '🫶', type: 'hangout', color: C.blue,    people: [PEOPLE[0], PEOPLE[1], PEOPLE[3]] },
  { id: '32', name: 'grill night at vir\'s', date: 'FRI 25 APR 2025', month: 'April',   year: '2025', vibe: 'legendary', vibeEmoji: '🏆', type: 'food',    color: C.orange,  people: PEOPLE.slice(0,5), bills: '₹2,600 split 5 ways' },

  // ─── 2024 April — for "on this day" row ────────────────────
  { id: '33', name: 'first trip together',  date: 'SUN 28 APR 2024', month: 'April',    year: '2024', vibe: 'legendary', vibeEmoji: '🏆', type: 'hangout', color: C.purple,  people: [PEOPLE[0], PEOPLE[1], PEOPLE[2]], bills: '₹4,400 split 3 ways' },
]

// Completed years only (Wrapped doesn't appear for the current year in progress)
const CURRENT_YEAR = '2026'
const WRAPPED: Record<string, { outings: number; topFriend: string; spent: string; topVibe: string }> = {
  '2025': { outings: 38, topFriend: 'Diya', spent: '₹24,800', topVibe: 'legendary' },
  '2024': { outings: 22, topFriend: 'Aarav', spent: '₹18,200', topVibe: 'chaotic' },
}

// Today = April 27, 2026 — find moments from same month in past years
const THIS_MONTH = 'April'
const anniversaryMoments = MOMENTS
  .filter(m => m.month === THIS_MONTH && m.year !== CURRENT_YEAR)
  .sort((a, b) => Number(b.year) - Number(a.year)) // newest first

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

  const grouped = group(filtered)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base, overflow: 'hidden' }}>

      {/* Fixed header */}
      <div style={{ padding: '48px 16px 12px', background: C.base, flexShrink: 0 }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, marginBottom: 12 }}>
          moments
        </div>
        <SearchInput placeholder="search by outing, vibe, or person..." value={query} onChange={setQuery} />
      </div>

      {/* On this day row — hidden while searching */}
      {!query && anniversaryMoments.length > 0 && (
        <OnThisDay moments={anniversaryMoments} onTap={onMomentTap} />
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
          grouped.map(({ year, months }) => (
            <div key={year}>
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

              {/* Wrapped — only for completed years, at the bottom of that year's section */}
              {year !== CURRENT_YEAR && WRAPPED[year] && (
                <WrappedBanner year={year} data={WRAPPED[year]} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ── On This Day row ─────────────────────────────────────────
function OnThisDay({ moments, onTap }: { moments: Moment[]; onTap: (m: Moment) => void }) {
  return (
    <div style={{ padding: '8px 16px 12px', flexShrink: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <span style={{ fontSize: 14 }}>📅</span>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: C.ink }}>
          on this day
        </div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600 }}>
          · Apr 27
        </div>
      </div>

      {/* Story ring row */}
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {moments.map(m => {
          const yearsAgo = Number(CURRENT_YEAR) - Number(m.year)
          const label = yearsAgo === 1 ? '1 yr ago' : `${yearsAgo} yrs ago`
          return (
            <button
              key={m.id}
              onClick={() => onTap(m)}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                flexShrink: 0,
              }}
            >
              {/* Ring + circle */}
              <div style={{
                width: 60, height: 60,
                borderRadius: '50%',
                background: `conic-gradient(${m.color} 0%, ${m.color} 100%)`,
                padding: 3,
                boxSizing: 'border-box',
                border: '2.5px solid #0A0A0A',
              }}>
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '50%',
                  background: m.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>
                  {m.vibeEmoji}
                </div>
              </div>

              {/* Name */}
              <div style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 10, fontWeight: 600, color: C.ink,
                textAlign: 'center', maxWidth: 60,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {m.name}
              </div>

              {/* Year ago pill */}
              <div style={{
                fontFamily: "'Space Mono', ui-monospace, monospace",
                fontSize: 9, fontWeight: 700,
                color: C.base,
                background: C.ink,
                borderRadius: 100,
                padding: '2px 6px',
                marginTop: -2,
                whiteSpace: 'nowrap',
              }}>
                {label}
              </div>
            </button>
          )
        })}
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
      padding: '20px 20px',
      marginBottom: 28,
      cursor: 'pointer',
    }}>
      {/* Label */}
      <div style={{
        fontFamily: "'Space Mono', ui-monospace, monospace",
        fontSize: 10, fontWeight: 700, color: C.yellow,
        letterSpacing: '0.1em', marginBottom: 6,
      }}>
        {year} WRAPPED 🎁
      </div>

      {/* Headline */}
      <div style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 700, fontSize: 22, color: C.base, lineHeight: 1.2, marginBottom: 16,
      }}>
        {data.outings} outings. {data.topFriend} was always there.
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
        {[
          { label: 'spent', value: data.spent },
          { label: 'top vibe', value: data.topVibe },
          { label: 'MVP', value: data.topFriend },
        ].map(s => (
          <div key={s.label}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 10, color: C.grey400, letterSpacing: '0.04em' }}>{s.label.toUpperCase()}</div>
            <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 700, fontSize: 13, color: C.base, marginTop: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: C.yellow, border: '2px solid #0A0A0A',
        borderRadius: 100, padding: '6px 14px',
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 700, fontSize: 14, color: C.ink,
        boxShadow: '2px 2px 0 0 #0A0A0A',
      }}>
        see full {year} →
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

      {/* Gradient overlay */}
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
