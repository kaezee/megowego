import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { Card, HeaderCard } from '../components/ui/Card'
import { Avatar, AvatarStack } from '../components/ui/Avatar'
import { C } from '../lib/tokens'

type Stage = 'plan' | 'commit' | 'happen' | 'settle' | 'remember'

interface Props { onBack: () => void }

const PEOPLE = [
  { name: 'Aarav', color: C.pink,   rsvp: 'yes',   here: true },
  { name: 'Diya',  color: C.yellow, rsvp: 'yes',   here: true },
  { name: 'Kabir', color: C.green,  rsvp: 'yes',   here: false },
  { name: 'Mira',  color: C.blue,   rsvp: 'maybe', here: false },
  { name: 'Rhea',  color: C.purple, rsvp: 'no',    here: false },
  { name: 'Vir',   color: C.orange, rsvp: 'pending', here: false },
]


const STAGE_ORDER: Stage[] = ['plan', 'commit', 'happen', 'settle', 'remember']

function mono(text: string) {
  return <span style={{ fontFamily: "'Space Mono', ui-monospace, monospace" }}>{text}</span>
}

export function OutingDetail({ onBack }: Props) {
  const [stage, setStage] = useState<Stage>('plan')
  const [vibeTag, setVibeTag] = useState<string | null>(null)
  const stageIdx = STAGE_ORDER.indexOf(stage)

  const advance = () => {
    if (stageIdx < STAGE_ORDER.length - 1) setStage(STAGE_ORDER[stageIdx + 1])
  }

  const yes    = PEOPLE.filter(p => p.rsvp === 'yes')
  const no     = PEOPLE.filter(p => p.rsvp === 'no')
  const maybe  = PEOPLE.filter(p => p.rsvp === 'maybe')
  const ghost  = PEOPLE.filter(p => p.rsvp === 'pending')

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.surface }}>
      {/* Top bar */}
      <div style={{ padding: '48px 20px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `2px solid ${C.grey100}` }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 24, color: C.ink, cursor: 'pointer', padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 20, color: C.ink }}>chai @ irani</div>
          <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, color: C.grey600, marginTop: 2 }}>FRI 24 APR · 8:00 PM · BANDRA</div>
        </div>
        <Chip color={C.yellow}>food 🍕</Chip>
      </div>

      {/* Stage tabs */}
      <div style={{ padding: '12px 20px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {STAGE_ORDER.map((s, i) => (
          <div key={s} style={{
            fontFamily: "'Space Mono', ui-monospace, monospace",
            fontSize: 10, fontWeight: 600,
            padding: '4px 10px', borderRadius: 100,
            background: s === stage ? C.ink : (i < stageIdx ? C.grey200 : 'transparent'),
            color: s === stage ? C.base : (i < stageIdx ? C.grey600 : C.grey400),
            border: `1.5px solid ${s === stage ? C.ink : C.grey200}`,
            whiteSpace: 'nowrap', letterSpacing: '0.04em',
            cursor: i <= stageIdx ? 'pointer' : 'default',
          }} onClick={() => { if (i <= stageIdx) setStage(s) }}>
            {s.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* PLAN */}
        {stage === 'plan' && <>
          <HeaderCard color={C.blue}>
            <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: '0.06em', opacity: 0.8 }}>POLL CLOSES IN</div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 36, marginTop: 4 }}>{mono('23:41:09')}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 13, marginTop: 4, opacity: 0.9 }}>6 invited · poll closes tomorrow 10 pm</div>
          </HeaderCard>

          <div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 10 }}>they're in ({yes.length})</div>
            {yes.map(p => <Row key={p.name} person={p} badge="✓" badgeColor={C.green} />)}
          </div>
          <div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 10 }}>they're out ({no.length})</div>
            {no.map(p => <Row key={p.name} person={p} badge="✗" badgeColor={C.error} />)}
          </div>
          <div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 10 }}>still ghosting you ({ghost.length + maybe.length})</div>
            {[...ghost, ...maybe].map(p => <Row key={p.name} person={p} badge="?" badgeColor={C.grey400} action={<Chip style={{ fontSize: 11 }}>poke</Chip>} />)}
          </div>
        </>}

        {/* COMMIT */}
        {stage === 'commit' && <>
          <HeaderCard color={C.yellow}>
            <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: '0.06em', color: C.ink }}>OUTING WEATHER</div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 28, color: C.ink, marginTop: 4 }}>clear skies ☀️</div>
            <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 13, color: C.ink, marginTop: 6 }}>{yes.length} locked in · {maybe.length + ghost.length} still thinking</div>
          </HeaderCard>
          <div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 10 }}>confirmed squad</div>
            <AvatarStack people={yes} size={40} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {yes.map(p => <Row key={p.name} person={p} badge="✓" badgeColor={C.green} />)}
          </div>
        </>}

        {/* HAPPEN */}
        {stage === 'happen' && <>
          <HeaderCard color={C.green}>
            <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: '0.06em', color: C.ink }}>IT'S GO TIME</div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 28, color: C.ink, marginTop: 4 }}>who made it?</div>
            <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 13, color: C.ink, marginTop: 4 }}>2 here · 1 bailed · 1 on the way</div>
          </HeaderCard>
          {PEOPLE.slice(0, 4).map((p, i) => (
            <Row key={p.name} person={p}
              badge={i < 2 ? '✓' : i === 2 ? '💀' : '...'}
              badgeColor={i < 2 ? C.green : i === 2 ? C.error : C.grey400}
            />
          ))}
        </>}

        {/* SETTLE */}
        {stage === 'settle' && <>
          <Card padding={20}>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink, marginBottom: 16 }}>who paid?</div>
            {yes.slice(0, 2).map((p, i) => (
              <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, marginBottom: i < 1 ? 12 : 0, borderBottom: i < 1 ? `1px solid ${C.grey100}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={p.name} color={p.color} size={32} />
                  <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 14, color: C.ink }}>{p.name}</div>
                </div>
                <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 600, fontSize: 16, color: C.ink }}>₹{i === 0 ? '840' : '360'}</div>
              </div>
            ))}
          </Card>
          <Card padding={20}>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink, marginBottom: 16 }}>everyone owes</div>
            {yes.map(p => (
              <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={p.name} color={p.color} size={28} />
                  <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, color: C.ink }}>{p.name}</div>
                </div>
                <Chip color={C.grey100} style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 600 }}>₹300</Chip>
              </div>
            ))}
          </Card>
        </>}

        {/* REMEMBER */}
        {stage === 'remember' && <>
          <HeaderCard color={C.purple}>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 28 }}>that's a wrap 🫡</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, marginTop: 8, opacity: 0.9 }}>chai @ irani · {yes.length} showed up</div>
          </HeaderCard>

          <div>
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 12 }}>how was it?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['legendary 🏆', 'chaotic 💀', 'wholesome 🫶', 'mid 😐', 'unhinged 🤯'].map(v => (
                <Chip key={v} color={vibeTag === v ? C.yellow : C.white} active={false} onClick={() => setVibeTag(v)}>{v}</Chip>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button full variant="secondary">generate roast card 💀</Button>
            <Button full variant="secondary">generate fomo card 😭</Button>
            <Button full variant="secondary">moment card 📸</Button>
          </div>
        </>}
      </div>

      {/* Bottom action */}
      {stage !== 'remember' && (
        <div style={{ padding: '12px 20px 24px', borderTop: `2px solid ${C.grey100}` }}>
          <Button full onClick={advance}>
            {stage === 'plan' ? 'lock it in →' : stage === 'commit' ? "it's go time →" : stage === 'happen' ? 'sort the bills →' : 'wrap it up →'}
          </Button>
        </div>
      )}
    </div>
  )
}

function Row({ person, badge, badgeColor, action }: { person: { name: string; color: string }, badge: string, badgeColor: string, action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12 }}>
      <Avatar name={person.name} color={person.color} size={36} />
      <div style={{ flex: 1, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 14, color: C.ink }}>{person.name}</div>
      {action || <span style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 600, fontSize: 14, color: badgeColor }}>{badge}</span>}
    </div>
  )
}
