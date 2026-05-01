import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { SectionBadge } from '../components/ui/SectionBadge'
import { BottomSheet } from '../components/ui/BottomSheet'
import { C, F, S } from '../lib/tokens'

interface Props {
  onBack: () => void
  onAchievements: () => void
  onWrapped: () => void
  onShop: () => void
}

// ── Achievement icons ──────────────────────────────────────────
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
  { id: 'organiser', label: 'serial organiser', color: C.pink,   Icon: IconOrganiser, locked: false, condition: 'Organised 10+ outings', earned: 'Mar 2025' },
  { id: 'reliable',  label: 'the reliable one', color: C.green,  Icon: IconReliable,  locked: false, condition: 'Showed up to 20 outings', earned: 'Jan 2025' },
  { id: 'hype',      label: 'hype man',         color: C.orange, Icon: IconHype,      locked: false, condition: 'Invited 50+ people total', earned: 'Feb 2025' },
  { id: 'nightowl',  label: 'night owl',        color: C.purple, Icon: IconNightOwl,  locked: true,  condition: 'Create 5 outings after 10 PM', earned: null },
  { id: 'bailproof', label: 'bail-proof',       color: C.blue,   Icon: IconBailProof, locked: true,  condition: 'Never bail 3 months in a row', earned: null },
]

const EXCUSES = [
  { name: 'Kabir',  text: '"my dog needed therapy"',         votes: 24 },
  { name: 'Mira',   text: '"the moon was in retrograde"',    votes: 18 },
  { name: 'Vir',    text: '"i was spiritually unavailable"', votes: 15 },
]

const USUAL_SUSPECTS = [
  { name: 'Diya',   color: C.yellow },
  { name: 'Kabir',  color: C.green  },
  { name: 'Mira',   color: C.blue   },
  { name: 'Rhea',   color: C.purple },
]

type Sheet =
  | 'stats'
  | 'achievement'
  | 'debt'
  | 'excuses'
  | { type: 'badge'; id: string }
  | null

export function Profile({ onBack, onAchievements, onWrapped, onShop }: Props) {
  const [sheet, setSheet]   = useState<Sheet>(null)
  const [activeTitle, setActiveTitle] = useState('serial organiser')
  const [bio, setBio]       = useState('')
  const [bioFocused, setBioFocused] = useState(false)

  const closeSheet = () => setSheet(null)

  const badgeId = sheet && typeof sheet === 'object' && sheet.type === 'badge' ? sheet.id : null
  const badgeData = badgeId ? ACHIEVEMENTS.find(a => a.id === badgeId) : null

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, position: 'relative' }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ padding: '48px 20px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Back */}
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, alignSelf: 'flex-start' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
            </svg>
          </button>

          {/* Profile card */}
          <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
            <div style={{ background: C.yellow, padding: '20px 20px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Avatar name="A" color={C.pink} size={56} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'inline-block', marginBottom: 5, background: C.ink, color: C.base, fontFamily: F.body, fontWeight: 600, fontSize: 11, borderRadius: 100, padding: '3px 10px' }}>
                    {activeTitle}
                  </div>
                  <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 26, color: C.ink, lineHeight: 1.1 }}>Aarav Sharma</div>
                </div>
                <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: F.body, fontSize: 13, color: C.grey600, alignSelf: 'flex-start', padding: 0, textDecoration: 'underline' }}>
            edit profile
          </button>

          {/* Stats */}
          <button onClick={() => setSheet('stats')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
            <Card padding={20}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SectionBadge icon="🎯" color={C.pink} size={32} />
                  <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.ink }}>Your stats</div>
                </div>
                <span style={{ color: C.grey400, fontSize: 18 }}>›</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[{ label: 'organised', value: '14' }, { label: 'showed up', value: '23' }, { label: 'bailed', value: '3' }, { label: 'bailed on you', value: '7' }].map(s => (
                  <div key={s.label} style={{ background: C.surface, borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 22, color: C.ink }}>{s.value}</div>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </button>

          {/* Achievements */}
          <Card padding={20}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SectionBadge icon="🏆" color={C.yellow} size={32} />
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.ink }}>Achievements</div>
              </div>
              <button onClick={onAchievements} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: F.body, fontSize: 13, color: C.grey600, padding: 0, textDecoration: 'underline' }}>
                see all →
              </button>
            </div>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
              {ACHIEVEMENTS.map(a => {
                const { Icon } = a
                return (
                  <button key={a.id} onClick={() => setSheet({ type: 'badge', id: a.id })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: a.locked ? '#F0EEE8' : a.color, border: S.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon locked={a.locked} />
                    </div>
                    <div style={{ fontFamily: F.body, fontSize: 10, fontWeight: 600, color: a.locked ? C.grey400 : C.ink, textAlign: 'center', maxWidth: 60, lineHeight: 1.2 }}>
                      {a.label}
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Debt overview */}
          <button onClick={() => setSheet('debt')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', width: '100%' }}>
            <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
              <div style={{ background: C.green, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src="/In debt.png" alt="" style={{ width: 68, height: 68, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 26, color: C.ink, lineHeight: 1.1 }}>Debt<br />overview</div>
                <span style={{ marginLeft: 'auto', color: C.ink, opacity: 0.5, fontSize: 18 }}>›</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '14px 14px 16px' }}>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginBottom: 10 }}>across 3 recent outings</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1, background: C.debtPositive, border: S.border, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600 }}>owed to you</div>
                    <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 20, color: C.green, marginTop: 4 }}>₹640</div>
                    <div style={{ fontFamily: F.body, fontSize: 11, color: C.grey600, marginTop: 4 }}>from Kabir, Vir</div>
                  </div>
                  <div style={{ flex: 1, background: C.debtNegative, border: S.border, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600 }}>you owe</div>
                    <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 20, color: C.error, marginTop: 4 }}>₹180</div>
                    <div style={{ fontFamily: F.body, fontSize: 11, color: C.grey600, marginTop: 4 }}>to Diya</div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Hall of fame excuses */}
          <button onClick={() => setSheet('excuses')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', width: '100%' }}>
            <Card padding={20}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SectionBadge icon="🏆" color={C.orange} size={32} />
                  <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.ink }}>Hall of fame</div>
                </div>
                <span style={{ color: C.grey400, fontSize: 18 }}>›</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Avatar name="K" color={C.green} size={32} />
                <div>
                  <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink, lineHeight: 1.4 }}>{EXCUSES[0].text}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: C.grey600, marginTop: 4 }}>{EXCUSES[0].votes} votes · {EXCUSES[0].name}</div>
                </div>
              </div>
            </Card>
          </button>

          {/* Usual suspects */}
          <Card padding={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <SectionBadge icon="👯" color={C.blue} size={32} />
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.ink }}>Your usual suspects</div>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              {USUAL_SUSPECTS.map(p => (
                <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Avatar name={p.name[0]} color={p.color} size={44} />
                  <div style={{ fontFamily: F.body, fontSize: 12, color: C.ink }}>{p.name}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bio */}
          <Card padding={20}>
            <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 10 }}>Your bio</div>
            <div style={{ background: C.grey100, border: `2px solid ${bioFocused ? C.purple : C.grey200}`, borderRadius: 10, padding: '12px 14px', transition: 'border-color 150ms' }}>
              <textarea
                placeholder="what kind of friend are you?"
                value={bio}
                onChange={e => setBio(e.target.value)}
                onFocus={() => setBioFocused(true)}
                onBlur={() => setBioFocused(false)}
                rows={3}
                maxLength={160}
                style={{ fontFamily: F.body, fontSize: 14, color: C.ink, background: 'transparent', border: 'none', outline: 'none', width: '100%', resize: 'none' }}
              />
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.grey400, textAlign: 'right', marginTop: 4 }}>{bio.length}/160</div>
            </div>
          </Card>

          {/* See your year */}
          <button onClick={onWrapped} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A', background: C.purple, padding: '20px 20px' }}>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.base, opacity: 0.7, letterSpacing: '0.06em', marginBottom: 8 }}>YOUR YEAR IN OUTINGS</div>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.base }}>see your 2025 →</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.base, opacity: 0.7, marginTop: 4 }}>stats, chaos, memories</div>
            </div>
          </button>

          {/* Get more cards */}
          <button onClick={onShop} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A', background: C.yellow, padding: '20px 20px' }}>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink, opacity: 0.7, letterSpacing: '0.06em', marginBottom: 8 }}>CARD PACKS</div>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink }}>get more cards →</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink, opacity: 0.6, marginTop: 4 }}>roast packs, fomo packs & more</div>
            </div>
          </button>

        </div>
      </div>

      {/* ── Stats sheet ───────────────────────────────────────── */}
      {sheet === 'stats' && (
        <BottomSheet onClose={closeSheet} title="Your stats">
          {[
            { label: 'Outings organised', value: '14', sub: 'you love a plan' },
            { label: 'Outings attended', value: '23', sub: 'remarkably reliable' },
            { label: 'Times you bailed', value: '3',  sub: 'lower than average' },
            { label: 'Times bailed on',  value: '7',  sub: 'Kabir is the main culprit' },
            { label: 'People invited',   value: '47', sub: 'total across all outings' },
            { label: 'Total spent',      value: '₹14,200', sub: 'across 23 outings' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${C.grey100}` }}>
              <div>
                <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 14, color: C.ink }}>{s.label}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginTop: 2 }}>{s.sub}</div>
              </div>
              <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 20, color: C.ink }}>{s.value}</div>
            </div>
          ))}
        </BottomSheet>
      )}

      {/* ── Badge sheet ───────────────────────────────────────── */}
      {badgeData && (
        <BottomSheet onClose={closeSheet}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: badgeData.locked ? '#F0EEE8' : badgeData.color, border: S.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <badgeData.Icon locked={badgeData.locked} />
            </div>
            <div>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink }}>{badgeData.label}</div>
              <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, marginTop: 6 }}>{badgeData.condition}</div>
              {badgeData.earned && (
                <div style={{ fontFamily: F.mono, fontSize: 12, color: C.grey400, marginTop: 8 }}>earned {badgeData.earned}</div>
              )}
            </div>
            {!badgeData.locked ? (
              <button
                onClick={() => { setActiveTitle(badgeData.label); closeSheet() }}
                style={{
                  width: '100%', height: 52, background: activeTitle === badgeData.label ? C.green : C.ink,
                  border: 'none', borderRadius: 16, cursor: 'pointer',
                  fontFamily: F.body, fontWeight: 600, fontSize: 16, color: C.base,
                }}
              >
                {activeTitle === badgeData.label ? 'wearing this title ✓' : 'use this title'}
              </button>
            ) : (
              <div style={{ background: C.grey100, borderRadius: 12, padding: '12px 16px', width: '100%' }}>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.grey600 }}>not unlocked yet. {badgeData.condition.toLowerCase()}.</div>
              </div>
            )}
          </div>
        </BottomSheet>
      )}

      {/* ── Debt sheet ────────────────────────────────────────── */}
      {sheet === 'debt' && (
        <BottomSheet onClose={closeSheet} title="Debt breakdown">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, letterSpacing: '0.04em', marginBottom: 4 }}>OWED TO YOU</div>
            {[{ name: 'Kabir', color: C.green, amount: '₹400', outing: 'shuka dinner' }, { name: 'Vir', color: C.orange, amount: '₹240', outing: 'chai @ irani' }].map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.debtPositive, border: S.border, borderRadius: 10, padding: '12px 14px' }}>
                <Avatar name={d.name[0]} color={d.color} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 14, color: C.ink }}>{d.name}</div>
                  <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginTop: 2 }}>{d.outing}</div>
                </div>
                <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 16, color: C.green }}>{d.amount}</div>
              </div>
            ))}
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, letterSpacing: '0.04em', marginTop: 8, marginBottom: 4 }}>YOU OWE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.debtNegative, border: S.border, borderRadius: 10, padding: '12px 14px' }}>
              <Avatar name="D" color={C.yellow} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 14, color: C.ink }}>Diya</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginTop: 2 }}>matinee madness</div>
              </div>
              <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 16, color: C.error }}>₹180</div>
            </div>
          </div>
        </BottomSheet>
      )}

      {/* ── Excuses sheet ─────────────────────────────────────── */}
      {sheet === 'excuses' && (
        <BottomSheet onClose={closeSheet} title="Hall of fame excuses">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {EXCUSES.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, background: C.grey100, borderRadius: 10, padding: '14px 14px' }}>
                <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 18, color: C.grey400, width: 24, flexShrink: 0 }}>#{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.body, fontSize: 14, color: C.ink, lineHeight: 1.4 }}>{e.text}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: C.grey600, marginTop: 6 }}>{e.votes} votes · {e.name}</div>
                </div>
              </div>
            ))}
          </div>
        </BottomSheet>
      )}

    </div>
  )
}
