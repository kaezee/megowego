import { useState } from 'react'
import { BottomSheet } from '../components/ui/BottomSheet'
import { C, F, S } from '../lib/tokens'

interface Props { onBack: () => void }

function IconOrganiser({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 8H19L15 11.5L16.5 17L12 14L7.5 17L9 11.5L5 8H10Z" fill={c}/></svg>
}
function IconReliable({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function IconHype({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11L9 22L19.5 9.5H13L13 2Z" fill={c}/></svg>
}
function IconNightOwl({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 1 0 9 9c-5 0-9-4-9-9z" fill={c}/></svg>
}
function IconBailProof({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2"/></svg>
}
function IconGhostBuster({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 6.5 5 10v11l2.5-2 2.5 2 2.5-2 2.5 2 2.5-2 2.5 2V10C21 6.5 18 3 12 3z" fill={c}/><circle cx="9" cy="10" r="1.5" fill={locked ? C.grey200 : C.purple}/><circle cx="15" cy="10" r="1.5" fill={locked ? C.grey200 : C.purple}/></svg>
}
function IconChaosAgent({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M13 2L5 14h7l-1 8 9-12h-7l2-8z" fill={c}/></svg>
}
function IconMoneybag({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2c-2 0-4 1-4 3h8c0-2-2-3-4-3z" fill={c}/><path d="M6 7c0 0-3 3-3 8s3 7 9 7 9-2 9-7-3-8-3-8H6z" fill={c}/><path d="M10 13h4M12 11v4" stroke={locked ? C.grey200 : C.green} strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function IconLegendary({ locked }: { locked?: boolean }) {
  const c = locked ? C.grey400 : C.base
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill={c}/></svg>
}

const ACHIEVEMENTS = [
  { id: 'organiser',  label: 'serial organiser', sub: 'organised 10+ outings',         color: C.pink,   Icon: IconOrganiser,  locked: false, earned: 'Mar 2025', condition: 'Organise 10 or more outings' },
  { id: 'reliable',   label: 'the reliable one', sub: 'showed up 20 times',             color: C.green,  Icon: IconReliable,   locked: false, earned: 'Jan 2025', condition: 'Attend 20 outings without bailing' },
  { id: 'hype',       label: 'hype man',         sub: 'invited 50+ people',             color: C.orange, Icon: IconHype,       locked: false, earned: 'Feb 2025', condition: 'Invite 50 people across all outings' },
  { id: 'nightowl',   label: 'night owl',        sub: 'create 5 late-night outings',    color: C.purple, Icon: IconNightOwl,   locked: true,  earned: null,       condition: 'Create 5 outings that start after 10 PM' },
  { id: 'bailproof',  label: 'bail-proof',       sub: 'no bails 3 months running',      color: C.blue,   Icon: IconBailProof,  locked: true,  earned: null,       condition: 'Never bail for 3 consecutive months' },
  { id: 'ghostbust',  label: 'ghost buster',     sub: 'poked 20+ non-responders',       color: C.purple, Icon: IconGhostBuster,locked: true,  earned: null,       condition: 'Poke 20 people who haven\'t responded' },
  { id: 'chaos',      label: 'chaos agent',      sub: 'tagged chaotic 5 times',         color: C.orange, Icon: IconChaosAgent, locked: true,  earned: null,       condition: 'Tag an outing "chaotic" 5 times' },
  { id: 'moneybag',   label: 'settled up',       sub: 'settled bills in 10 outings',    color: C.green,  Icon: IconMoneybag,   locked: true,  earned: null,       condition: 'Complete the settle stage 10 times' },
  { id: 'legendary',  label: 'the legend',       sub: 'earn all other achievements',    color: C.yellow, Icon: IconLegendary,  locked: true,  earned: null,       condition: 'Unlock all other achievements' },
]

export function Achievements({ onBack }: Props) {
  const [active, setActive]       = useState('serial organiser')
  const [selected, setSelected]   = useState<typeof ACHIEVEMENTS[0] | null>(null)

  const earned  = ACHIEVEMENTS.filter(a => !a.locked)
  const locked  = ACHIEVEMENTS.filter(a => a.locked)

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, position: 'relative', overflow: 'hidden' }}>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ padding: '48px 20px 80px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, alignSelf: 'flex-start' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
            </svg>
          </button>

          <div>
            <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 26, color: C.ink }}>your titles</div>
            <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, marginTop: 4 }}>earn them. wear them. flex them.</div>
          </div>

          {/* Active title */}
          <div style={{ border: S.border, borderRadius: 12, padding: '16px 16px', background: C.base, boxShadow: S.shadow }}>
            <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginBottom: 8 }}>showing on your profile right now</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.ink, borderRadius: 100, padding: '6px 14px' }}>
              <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 14, color: C.base }}>{active}</div>
            </div>
          </div>

          {/* Earned */}
          <div>
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 12 }}>EARNED · {earned.length}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {earned.map(a => {
                const { Icon } = a
                return (
                  <button key={a.id} onClick={() => setSelected(a)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: a.color, border: S.border, boxShadow: active === a.label ? `0 0 0 3px ${a.color}, 0 0 0 5px #0A0A0A` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'box-shadow 150ms' }}>
                      <Icon locked={false} />
                    </div>
                    <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, color: C.ink, textAlign: 'center', lineHeight: 1.2 }}>{a.label}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 10, color: C.grey400, textAlign: 'center' }}>{a.earned}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Locked */}
          <div>
            <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 12 }}>LOCKED · {locked.length}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {locked.map(a => {
                const { Icon } = a
                return (
                  <button key={a.id} onClick={() => setSelected(a)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.grey100, border: S.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon locked />
                    </div>
                    <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, color: C.grey400, textAlign: 'center', lineHeight: 1.2 }}>{a.label}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 10, color: C.grey400, textAlign: 'center' }}>locked</div>
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      {selected && (
        <BottomSheet onClose={() => setSelected(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: selected.locked ? C.grey100 : selected.color, border: S.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <selected.Icon locked={selected.locked} />
            </div>
            <div>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink }}>{selected.label}</div>
              <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, marginTop: 6, lineHeight: 1.5 }}>{selected.condition}</div>
              {selected.earned && (
                <div style={{ fontFamily: F.mono, fontSize: 12, color: C.grey400, marginTop: 8 }}>earned {selected.earned}</div>
              )}
            </div>
            {!selected.locked ? (
              <button
                onClick={() => { setActive(selected.label); setSelected(null) }}
                style={{ width: '100%', height: 52, background: active === selected.label ? C.green : C.ink, border: 'none', borderRadius: 16, cursor: 'pointer', fontFamily: F.body, fontWeight: 600, fontSize: 16, color: C.base }}
              >
                {active === selected.label ? 'wearing this title ✓' : 'use this title'}
              </button>
            ) : (
              <div style={{ background: C.grey100, borderRadius: 12, padding: '12px 16px', width: '100%' }}>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.grey600 }}>keep going — {selected.condition.toLowerCase()}</div>
              </div>
            )}
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
