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
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 8H19L15 11.5L16.5 17L12 14L7.5 17L9 11.5L5 8H10Z" fill={c}/></svg>
}
function IconReliable({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function IconHype({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11L9 22L19.5 9.5H13L13 2Z" fill={c}/></svg>
}
function IconNightOwl({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 1 0 9 9c-5 0-9-4-9-9z" fill={c}/></svg>
}
function IconBailProof({ locked }: { locked?: boolean }) {
  const c = locked ? '#A8A49C' : '#FAFAF0'
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2"/></svg>
}

const ACHIEVEMENTS = [
  { id: 'organiser', label: 'serial organiser', color: C.pink,   Icon: IconOrganiser, locked: false, condition: 'Organise 10+ outings',          earned: 'Mar 2025' },
  { id: 'reliable',  label: 'the reliable one', color: C.green,  Icon: IconReliable,  locked: false, condition: 'Attend 20 outings without bailing', earned: 'Jan 2025' },
  { id: 'hype',      label: 'hype man',         color: C.orange, Icon: IconHype,      locked: false, condition: 'Invite 50+ people total',        earned: 'Feb 2025' },
  { id: 'nightowl',  label: 'night owl',        color: C.purple, Icon: IconNightOwl,  locked: true,  condition: 'Create 5 outings after 10 PM',   earned: null },
  { id: 'bailproof', label: 'bail-proof',       color: C.blue,   Icon: IconBailProof, locked: true,  condition: 'Never bail 3 months running',    earned: null },
]

// Friend streaks — consecutive outings together recently
const FRIEND_STREAKS = [
  { name: 'Diya',  color: C.yellow, streak: 8,  frozen: false },
  { name: 'Kabir', color: C.green,  streak: 5,  frozen: false },
  { name: 'Mira',  color: C.blue,   streak: 3,  frozen: false },
  { name: 'Rhea',  color: C.purple, streak: 7,  frozen: false },
  { name: 'Vir',   color: C.orange, streak: 2,  frozen: true  },
]

// Overview stats
const OVERVIEW = [
  { emoji: '🎯', value: '14',     label: 'organised'    },
  { emoji: '🙌', value: '23',     label: 'showed up'    },
  { emoji: '💀', value: '3',      label: 'bailed'       },
  { emoji: '💸', value: '₹14.2k', label: 'total spent'  },
]

type Sheet = 'stats' | { type: 'badge'; id: string } | null

export function Profile({ onBack, onAchievements }: Props) {
  const [activeTitle, setActiveTitle] = useState('serial organiser')
  const [sheet, setSheet]             = useState<Sheet>(null)

  const badgeId   = sheet && typeof sheet === 'object' ? sheet.id : null
  const badgeData = badgeId ? ACHIEVEMENTS.find(a => a.id === badgeId) : null

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ padding: '48px 20px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Back */}
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, alignSelf: 'flex-start' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
            </svg>
          </button>

          {/* ── Profile card ────────────────────────────────── */}
          <div style={{ border: S.border, borderRadius: 16, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
            <div style={{ background: C.yellow, padding: '20px 20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Avatar name="A" color={C.pink} size={60} />
                  <div>
                    <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 24, color: C.ink, lineHeight: 1.1 }}>Aarav Sharma</div>
                    {/* Active title pill */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 7, background: C.ink, borderRadius: 100, padding: '4px 12px' }}>
                      <span style={{ fontFamily: F.body, fontWeight: 600, fontSize: 12, color: C.base }}>{activeTitle}</span>
                    </div>
                  </div>
                </div>
                {/* Edit pencil */}
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Overview ─────────────────────────────────────── */}
          <Card padding={20}>
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.08em', marginBottom: 16 }}>OVERVIEW</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 20, columnGap: 12 }}>
              {OVERVIEW.map(s => (
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

          {/* ── Your title ───────────────────────────────────── */}
          <Card padding={20}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.08em' }}>YOUR TITLE</div>
              <button onClick={onAchievements} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: F.body, fontSize: 13, color: C.grey600, padding: 0, textDecoration: 'underline' }}>
                see all →
              </button>
            </div>

            {/* Currently wearing */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.ink, borderRadius: 100, padding: '6px 14px', marginBottom: 16 }}>
              <span style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.base }}>{activeTitle}</span>
            </div>

            {/* Badge row as picker */}
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
              {ACHIEVEMENTS.map(a => {
                const { Icon } = a
                const isActive = activeTitle === a.label
                return (
                  <button
                    key={a.id}
                    onClick={() => setSheet({ type: 'badge', id: a.id })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: a.locked ? '#F0EEE8' : a.color,
                      border: isActive ? `3px solid ${C.ink}` : S.border,
                      boxShadow: isActive ? '2px 2px 0 0 #0A0A0A' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: a.locked ? 0.5 : 1,
                      transition: 'box-shadow 120ms, border 120ms',
                    }}>
                      <Icon locked={a.locked} />
                    </div>
                    <div style={{ fontFamily: F.body, fontSize: 10, fontWeight: isActive ? 700 : 500, color: a.locked ? C.grey400 : C.ink, textAlign: 'center', maxWidth: 56, lineHeight: 1.2 }}>
                      {a.label}
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* ── Friend streaks ───────────────────────────────── */}
          <Card padding={20}>
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.08em', marginBottom: 16 }}>FRIEND STREAKS</div>
            <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
              {FRIEND_STREAKS.map(f => (
                <div key={f.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: f.frozen ? C.grey100 : f.color,
                    border: S.border,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: F.display, fontWeight: 600, fontSize: 20, color: C.ink,
                    opacity: f.frozen ? 0.6 : 1,
                  }}>
                    {f.name[0]}
                  </div>
                  {/* Streak count */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 13 }}>{f.frozen ? '💧' : '🔥'}</span>
                    <span style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 13, color: f.frozen ? C.grey400 : C.ink }}>{f.streak}</span>
                  </div>
                  <div style={{ fontFamily: F.body, fontSize: 11, color: C.grey600 }}>{f.name}</div>
                </div>
              ))}

              {/* Add friend slot */}
              {[0, 1].map(i => (
                <div key={`add-${i}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', border: `2px dashed ${C.grey400}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <span style={{ fontFamily: F.body, fontSize: 20, color: C.grey400, lineHeight: 1 }}>+</span>
                  </div>
                  <div style={{ height: 20 }} />
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>

      {/* ── Badge sheet ───────────────────────────────────────── */}
      {badgeData && (
        <BottomSheet onClose={() => setSheet(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: badgeData.locked ? '#F0EEE8' : badgeData.color, border: S.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <badgeData.Icon locked={badgeData.locked} />
            </div>
            <div>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink }}>{badgeData.label}</div>
              <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, marginTop: 6, lineHeight: 1.5 }}>{badgeData.condition}</div>
              {badgeData.earned && (
                <div style={{ fontFamily: F.mono, fontSize: 12, color: C.grey400, marginTop: 8 }}>earned {badgeData.earned}</div>
              )}
            </div>
            {!badgeData.locked ? (
              <button
                onClick={() => { setActiveTitle(badgeData.label); setSheet(null) }}
                style={{ width: '100%', height: 52, background: activeTitle === badgeData.label ? C.green : C.ink, border: 'none', borderRadius: 16, cursor: 'pointer', fontFamily: F.body, fontWeight: 600, fontSize: 16, color: activeTitle === badgeData.label ? C.ink : C.base }}
              >
                {activeTitle === badgeData.label ? 'wearing this title ✓' : 'wear this title'}
              </button>
            ) : (
              <div style={{ background: C.grey100, borderRadius: 12, padding: '12px 16px', width: '100%' }}>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.grey600 }}>not unlocked yet — {badgeData.condition.toLowerCase()}</div>
              </div>
            )}
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
