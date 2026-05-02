import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { BottomSheet } from '../components/ui/BottomSheet'
import { C, F, S } from '../lib/tokens'

interface Props {
  onBack: () => void
  onAchievements: () => void
}

// ── Achievement badge icons ────────────────────────────────────
function IconOrganiser({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 8H19L15 11.5L16.5 17L12 14L7.5 17L9 11.5L5 8H10Z" fill={c}/></svg>
}
function IconReliable({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function IconHype({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11L9 22L19.5 9.5H13L13 2Z" fill={c}/></svg>
}
function IconNightOwl({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 1 0 9 9c-5 0-9-4-9-9z" fill={c}/></svg>
}
function IconBailProof({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2"/></svg>
}

const ACHIEVEMENTS = [
  { id: 'organiser', label: 'serial organiser', color: C.pink,   Icon: IconOrganiser, locked: false, condition: 'Organise 10+ outings',             earned: 'Mar 2025' },
  { id: 'reliable',  label: 'the reliable one', color: C.green,  Icon: IconReliable,  locked: false, condition: 'Attend 20 outings without bailing', earned: 'Jan 2025' },
  { id: 'hype',      label: 'hype man',         color: C.orange, Icon: IconHype,      locked: false, condition: 'Invite 50+ people total',           earned: 'Feb 2025' },
  { id: 'nightowl',  label: 'night owl',        color: C.purple, Icon: IconNightOwl,  locked: true,  condition: 'Create 5 outings after 10 PM',      earned: null },
  { id: 'bailproof', label: 'bail-proof',       color: C.blue,   Icon: IconBailProof, locked: true,  condition: 'Never bail 3 months running',       earned: null },
]

// Top 3 partners — people you hang out with most
const PARTNERS = [
  { name: 'Diya',  color: C.yellow, outings: 19 },
  { name: 'Kabir', color: C.green,  outings: 15 },
  { name: 'Rhea',  color: C.purple, outings: 12 },
]

const RANK_COLOURS = [C.yellow, C.grey200, C.orange]
const RANK_LABELS  = ['🥇', '🥈', '🥉']

// The Receipts — key stats
const RECEIPTS = [
  { emoji: '🎯', value: '14',     label: 'organised'   },
  { emoji: '🙌', value: '23',     label: 'showed up'   },
  { emoji: '💀', value: '3',      label: 'bailed'      },
  { emoji: '💸', value: '₹14.2k', label: 'total spent' },
]

// The Tab — net balances
const DEBTS = [
  { name: 'Diya',  color: C.yellow, amount:  320,  owe: false },
  { name: 'Kabir', color: C.green,  amount:  840,  owe: false },
  { name: 'Mira',  color: C.blue,   amount: -200,  owe: true  },
  { name: 'Rhea',  color: C.purple, amount:  0,    owe: false },
  { name: 'Vir',   color: C.orange, amount: -550,  owe: true  },
]
const totalOwed = DEBTS.filter(d => !d.owe && d.amount > 0).reduce((s, d) => s + d.amount, 0)
const totalOwe  = DEBTS.filter(d => d.owe).reduce((s, d) => s + Math.abs(d.amount), 0)

export function Profile({ onBack, onAchievements }: Props) {
  const [activeTitle, setActiveTitle]       = useState('serial organiser')
  const [showAchievements, setShowAchievements] = useState(false)
  const [showAllDebts, setShowAllDebts]     = useState(false)

  const currentBadge = ACHIEVEMENTS.find(a => a.label === activeTitle)

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>

        {/* ── Full-width banner ─────────────────────────────────── */}
        <div style={{ background: C.yellow }}>
          {/* Back button row */}
          <div style={{ padding: '48px 20px 0' }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
              </svg>
            </button>
          </div>

          {/* Avatar + title + name centered */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 20px 28px', gap: 8 }}>

            {/* Avatar with camera edit badge */}
            <div style={{ position: 'relative' }}>
              <Avatar name="A" color={C.pink} size={80} />
              <button style={{
                position: 'absolute', bottom: 0, right: -2,
                width: 28, height: 28, borderRadius: '50%',
                background: C.base, border: S.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0,
                boxShadow: '1px 1px 0 0 #0A0A0A',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </button>
            </div>

            {/* Title pill — tappable, sits above name */}
            <button
              onClick={() => setShowAchievements(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: C.ink, borderRadius: 100, padding: '5px 14px',
                border: 'none', cursor: 'pointer',
              }}
            >
              {currentBadge && <currentBadge.Icon locked={false} />}
              <span style={{ fontFamily: F.body, fontWeight: 600, fontSize: 12, color: C.base }}>{activeTitle}</span>
              <span style={{ color: 'rgba(250,250,240,0.45)', fontSize: 12, lineHeight: 1 }}>›</span>
            </button>

            {/* Name + inline edit button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 26, color: C.ink, lineHeight: 1 }}>
                Aarav Sharma
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
              </button>
            </div>

            {/* Inline mini stats */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
              {[
                { value: '14', label: 'organised' },
                { value: '23', label: 'showed up' },
                { value: '3',  label: 'bailed' },
              ].map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: 1, height: 28, background: 'rgba(10,10,10,0.2)', margin: '0 16px' }} />}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, color: C.ink, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: F.body, fontSize: 11, color: 'rgba(10,10,10,0.55)', marginTop: 2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cards ─────────────────────────────────────────────── */}
        <div style={{ padding: '16px 20px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Partners in crime ──────────────────────────────── */}
          <Card padding={20}>
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.08em', marginBottom: 16 }}>PARTNERS IN CRIME</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {PARTNERS.map((p, i) => (
                <div key={p.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  {/* Avatar with rank medal */}
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: 58, height: 58, borderRadius: '50%',
                      background: p.color, border: S.border,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink,
                    }}>
                      {p.name[0]}
                    </div>
                    <div style={{
                      position: 'absolute', bottom: -4, right: -4,
                      width: 22, height: 22, borderRadius: '50%',
                      background: RANK_COLOURS[i], border: S.border,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, lineHeight: 1,
                    }}>
                      {RANK_LABELS[i]}
                    </div>
                  </div>
                  <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.ink }}>{p.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: C.grey600 }}>{p.outings} outings</div>
                </div>
              ))}
            </div>
          </Card>

          {/* ── The Receipts (stats) ────────────────────────────── */}
          <Card padding={20}>
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.08em', marginBottom: 16 }}>THE RECEIPTS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 20, columnGap: 12 }}>
              {RECEIPTS.map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{s.emoji}</span>
                  <div>
                    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 18, color: C.ink, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginTop: 3 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ── The Tab (debt) ──────────────────────────────────── */}
          <Card padding={20}>
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.08em', marginBottom: 14 }}>THE TAB</div>

            {/* Net summary */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              <div style={{ flex: 1, background: '#E8F9EE', border: `2px solid ${C.green}`, borderRadius: 12, padding: '10px 14px' }}>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 18, color: C.ink }}>₹{totalOwed.toLocaleString('en-IN')}</div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: C.grey600, marginTop: 2 }}>you're owed</div>
              </div>
              <div style={{ flex: 1, background: '#FFF0F4', border: `2px solid ${C.pink}`, borderRadius: 12, padding: '10px 14px' }}>
                <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 18, color: C.ink }}>₹{totalOwe.toLocaleString('en-IN')}</div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: C.grey600, marginTop: 2 }}>you owe</div>
              </div>
            </div>

            {/* Per-friend rows */}
            {(() => {
              const allRows = DEBTS.filter(d => d.amount !== 0)
              const visible = showAllDebts ? allRows : allRows.slice(0, 2)
              return (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {visible.map(d => (
                      <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: d.color, border: S.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 600, fontSize: 15, color: C.ink, flexShrink: 0 }}>
                          {d.name[0]}
                        </div>
                        <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 14, color: C.ink, flex: 1 }}>{d.name}</div>
                        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 14, color: d.owe ? C.pink : C.green }}>
                          {d.owe ? `–₹${Math.abs(d.amount)}` : `+₹${d.amount}`}
                        </div>
                        <div style={{ fontFamily: F.body, fontSize: 11, color: C.grey400, minWidth: 54, textAlign: 'right' }}>
                          {d.owe ? 'you owe' : 'owes you'}
                        </div>
                      </div>
                    ))}
                  </div>
                  {allRows.length > 2 && (
                    <button
                      onClick={() => setShowAllDebts(v => !v)}
                      style={{ marginTop: 14, width: '100%', height: 38, border: S.border, borderRadius: 10, background: 'transparent', fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, cursor: 'pointer' }}
                    >
                      {showAllDebts ? 'show less ↑' : `see all ${allRows.length} ↓`}
                    </button>
                  )}
                </>
              )
            })()}
          </Card>

        </div>
      </div>

      {/* ── Achievements sheet (tap title to open) ────────────────── */}
      {showAchievements && (
        <BottomSheet onClose={() => setShowAchievements(false)} title="your achievements">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {ACHIEVEMENTS.map(a => {
              const { Icon } = a
              const isActive = activeTitle === a.label
              return (
                <div
                  key={a.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 0',
                    borderBottom: `1px solid ${C.grey100}`,
                    opacity: a.locked ? 0.5 : 1,
                  }}
                >
                  {/* Badge circle */}
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                    background: a.locked ? C.grey100 : a.color,
                    border: isActive ? `3px solid ${C.ink}` : S.border,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon locked={a.locked} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 14, color: C.ink }}>{a.label}</div>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginTop: 2, lineHeight: 1.4 }}>{a.condition}</div>
                    {a.earned && (
                      <div style={{ fontFamily: F.mono, fontSize: 10, color: C.grey400, marginTop: 3 }}>earned {a.earned}</div>
                    )}
                  </div>

                  {/* CTA */}
                  {!a.locked && (
                    <button
                      onClick={() => { setActiveTitle(a.label); setShowAchievements(false) }}
                      style={{
                        flexShrink: 0,
                        height: 34, padding: '0 14px',
                        borderRadius: 100,
                        border: isActive ? 'none' : S.border,
                        background: isActive ? C.green : 'transparent',
                        fontFamily: F.body, fontWeight: 600, fontSize: 12, color: C.ink,
                        cursor: isActive ? 'default' : 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {isActive ? 'wearing ✓' : 'wear'}
                    </button>
                  )}
                  {a.locked && (
                    <div style={{ fontFamily: F.mono, fontSize: 10, color: C.grey400, flexShrink: 0 }}>locked</div>
                  )}
                </div>
              )
            })}

            {/* See all link */}
            <button
              onClick={() => { setShowAchievements(false); onAchievements() }}
              style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: F.body, fontSize: 13, color: C.grey600, textDecoration: 'underline', textAlign: 'center', padding: 8 }}
            >
              see full achievements screen →
            </button>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
