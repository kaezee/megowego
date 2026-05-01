import { useState, useRef } from 'react'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { Avatar } from '../components/ui/Avatar'
import { NoteField } from '../components/ui/NoteField'
import { C, F, S } from '../lib/tokens'

type Stage = 'plan' | 'commit' | 'happen' | 'settle' | 'remember'
interface Props { onBack: () => void }

const STAGE_ORDER: Stage[] = ['plan', 'commit', 'happen', 'settle', 'remember']

const PEOPLE = [
  { name: 'Aarav',  color: C.pink,   rsvp: 'yes',     here: true  },
  { name: 'Diya',   color: C.yellow, rsvp: 'yes',     here: true  },
  { name: 'Kabir',  color: C.green,  rsvp: 'yes',     here: false },
  { name: 'Mira',   color: C.blue,   rsvp: 'maybe',   here: false },
  { name: 'Rhea',   color: C.purple, rsvp: 'no',      here: false },
  { name: 'Vir',    color: C.orange, rsvp: 'pending', here: false },
]

const yes   = PEOPLE.filter(p => p.rsvp === 'yes')
const no    = PEOPLE.filter(p => p.rsvp === 'no')
const ghost = PEOPLE.filter(p => p.rsvp === 'pending' || p.rsvp === 'maybe')

// ── Section header strip ────────────────────────────────────────
function SectionHeader({ color, label, children }: { color: string; label: string; children?: React.ReactNode }) {
  return (
    <div style={{ background: color, padding: '14px 16px' }}>
      <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.ink, opacity: 0.6, marginBottom: 4 }}>
        {label}
      </div>
      {children}
    </div>
  )
}

// ── Collapsed summary card ──────────────────────────────────────
function SummaryCard({ color, stage, summary, onExpand }: { color: string; stage: Stage; summary: string; onExpand: () => void }) {
  return (
    <div
      onClick={onExpand}
      style={{
        border: S.border, borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
        boxShadow: '3px 3px 0 0 #0A0A0A',
      }}
    >
      <div style={{ background: color, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.ink, opacity: 0.7 }}>
          {stage.toUpperCase()} ✓
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.ink, opacity: 0.5 }}>tap to review</div>
      </div>
      <div style={{ background: C.base, padding: '10px 14px' }}>
        <div style={{ fontFamily: F.body, fontSize: 13, color: C.grey600 }}>{summary}</div>
      </div>
    </div>
  )
}

// ── Bucket row (response accordion) ────────────────────────────
function Bucket({ label, count, open, onToggle, children }: { label: string; count: number; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div style={{ border: S.border, borderRadius: 10, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: C.base, border: 'none', cursor: 'pointer',
          padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 16, color: C.ink }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: F.mono, fontSize: 12, color: C.grey600 }}>{count}</span>
          <span style={{ color: C.grey400, fontSize: 14, transition: 'transform 150ms', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 16px 12px', background: C.base, borderTop: `1px solid ${C.grey100}` }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ── Person row ─────────────────────────────────────────────────
function PersonRow({ person, right }: { person: typeof PEOPLE[0]; right?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12 }}>
      <Avatar name={person.name[0]} color={person.color} size={36} />
      <div style={{ flex: 1, fontFamily: F.body, fontWeight: 500, fontSize: 14, color: C.ink }}>{person.name}</div>
      {right}
    </div>
  )
}

// ── Vibe icons ─────────────────────────────────────────────────
function VibeIcon({ vibe, size = 20 }: { vibe: string; size?: number }) {
  const s = size
  switch (vibe) {
    case 'legendary': return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M9 2h6v8a3 3 0 0 1-6 0V2z" fill="rgba(255,255,255,0.9)"/>
        <path d="M5 2H3v4c0 1.7 1.3 3 3 3M19 2h2v4c0 1.7-1.3 3-3 3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M12 16v3M9 19h6" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
    case 'chaotic': return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M13 2L5 14h7l-1 8 9-12h-7l2-8z" fill="rgba(255,255,255,0.9)"/>
      </svg>
    )
    case 'wholesome': return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 21C12 21 3 15 3 8.5A5 5 0 0 1 12 6a5 5 0 0 1 9 2.5C21 15 12 21 12 21z" fill="rgba(255,255,255,0.9)"/>
      </svg>
    )
    case 'mid': return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.9)"/>
        <path d="M8 14h8" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="10" r="1" fill="rgba(0,0,0,0.4)"/>
        <circle cx="15" cy="10" r="1" fill="rgba(0,0,0,0.4)"/>
      </svg>
    )
    default: return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.9)"/>
        <path d="M9 10c0 0 0-2 3-2s3 2 3 2" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 14c1 2 3 3 4 3s3-1 4-3" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="10" r="0.8" fill="rgba(0,0,0,0.4)"/>
        <circle cx="15" cy="10" r="0.8" fill="rgba(0,0,0,0.4)"/>
      </svg>
    )
  }
}

export function OutingDetail({ onBack }: Props) {
  const [progress, setProgress]     = useState<Stage>('plan')
  const [openSection, setOpenSection] = useState<Stage>('plan')
  const [openBucket, setOpenBucket] = useState<string | null>(null)
  const [poked, setPoked]           = useState<Set<string>>(new Set())
  const [reminded, setReminded]     = useState<Set<string>>(new Set())
  const [absent, setAbsent]         = useState<string[]>([])
  const [planNote, setPlanNote]     = useState('')
  const [vibeTag, setVibeTag]       = useState<string | null>(null)
  const [journalNote, setJournalNote] = useState('')

  const commitRef   = useRef<HTMLDivElement>(null)
  const happenRef   = useRef<HTMLDivElement>(null)
  const settleRef   = useRef<HTMLDivElement>(null)
  const rememberRef = useRef<HTMLDivElement>(null)

  const stageRefs: Partial<Record<Stage, React.RefObject<HTMLDivElement | null>>> = {
    commit: commitRef, happen: happenRef, settle: settleRef, remember: rememberRef,
  }

  const advance = () => {
    const idx = STAGE_ORDER.indexOf(progress)
    if (idx >= STAGE_ORDER.length - 1) return
    const next = STAGE_ORDER[idx + 1]
    setProgress(next)
    setOpenSection(next)
    setTimeout(() => {
      stageRefs[next]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const poke = (name: string) => {
    setPoked(prev => new Set([...prev, name]))
    setTimeout(() => setPoked(prev => { const n = new Set(prev); n.delete(name); return n }), 3000)
  }

  const remind = (name: string) => {
    setReminded(prev => new Set([...prev, name]))
    setTimeout(() => setReminded(prev => { const n = new Set(prev); n.delete(name); return n }), 3000)
  }

  const progressIdx = STAGE_ORDER.indexOf(progress)
  const present     = yes.filter(p => !absent.includes(p.name))
  const bailed      = yes.filter(p => absent.includes(p.name))

  const SUMMARIES: Record<Stage, string> = {
    plan:     `${yes.length} in · ${no.length} out · ${ghost.length} ghosted`,
    commit:   `${yes.length} confirmed · ${ghost.length} still thinking`,
    happen:   `${present.length} made it · ${bailed.length} bailed`,
    settle:   '₹1,200 total · 3 people owe',
    remember: vibeTag ? `vibed: ${vibeTag}` : 'memories made',
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden', position: 'relative' }}>

      {/* Top bar */}
      <div style={{ padding: '48px 20px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `2px solid ${C.grey100}`, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', fontFamily: F.display, fontWeight: 600, fontSize: 24, color: C.ink, cursor: 'pointer', padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 20, color: C.ink }}>chai @ irani</div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.grey600, marginTop: 2 }}>FRI 24 APR · 8:00 PM · BANDRA</div>
        </div>
        <Chip color={C.yellow} tint>food</Chip>
      </div>

      {/* Scrollable accordion content */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ── PLAN ───────────────────────────────────────── */}
        {openSection === 'plan' ? (
          <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
            <SectionHeader color={C.yellow} label="PLAN">
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink, lineHeight: 1.2 }}>who's coming to chai @ irani?</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink, opacity: 0.7, marginTop: 4 }}>here's where everyone stands</div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink, opacity: 0.6, marginTop: 6 }}>FRI 24 APR · 8:00 PM · BANDRA</div>
              {/* countdown */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.1)', borderRadius: 8, padding: '5px 10px', marginTop: 10 }}>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.ink }}>POLL CLOSES IN</div>
                <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 14, color: C.ink }}>23:41:09</div>
              </div>
            </SectionHeader>

            <div style={{ background: C.base, padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Plan note */}
              <NoteField
                placeholder="anything the group needs to know?"
                value={planNote}
                onChange={setPlanNote}
              />

              {/* Response buckets */}
              <Bucket label={`they're in`} count={yes.length} open={openBucket === 'yes'} onToggle={() => setOpenBucket(b => b === 'yes' ? null : 'yes')}>
                {yes.map(p => <PersonRow key={p.name} person={p} right={<span style={{ fontFamily: F.mono, fontSize: 13, color: C.green }}>✓</span>} />)}
              </Bucket>

              <Bucket label={`they're out`} count={no.length} open={openBucket === 'no'} onToggle={() => setOpenBucket(b => b === 'no' ? null : 'no')}>
                {no.map(p => <PersonRow key={p.name} person={p} right={<span style={{ fontFamily: F.mono, fontSize: 13, color: C.error }}>✗</span>} />)}
              </Bucket>

              <Bucket label="still ghosting you" count={ghost.length} open={openBucket === 'ghost'} onToggle={() => setOpenBucket(b => b === 'ghost' ? null : 'ghost')}>
                {ghost.map(p => (
                  <PersonRow key={p.name} person={p} right={
                    <button
                      onClick={() => poke(p.name)}
                      style={{
                        background: poked.has(p.name) ? C.green : C.yellow,
                        border: S.border, borderRadius: 100,
                        padding: '4px 12px', cursor: 'pointer',
                        fontFamily: F.body, fontWeight: 600, fontSize: 12, color: C.ink,
                        transition: 'background 150ms',
                      }}
                    >
                      {poked.has(p.name) ? 'poked ✓' : `poke ${p.name.split(' ')[0]}`}
                    </button>
                  } />
                ))}
              </Bucket>

              {progress === 'plan' && (
                <Button full onClick={advance}>lock it in →</Button>
              )}
            </div>
          </div>
        ) : progressIdx > 0 ? (
          <SummaryCard color={C.yellow} stage="plan" summary={SUMMARIES.plan} onExpand={() => setOpenSection('plan')} />
        ) : null}

        {/* ── COMMIT ─────────────────────────────────────── */}
        {progressIdx >= 1 && (
          <div ref={commitRef}>
            {openSection === 'commit' ? (
              <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
                <SectionHeader color={C.blue} label="COMMIT">
                  <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.base, lineHeight: 1.2 }}>looks like it's happening</div>
                  <div style={{ fontFamily: F.mono, fontSize: 12, color: C.base, opacity: 0.8, marginTop: 6 }}>
                    {yes.length} locked in · {ghost.length} still thinking
                  </div>
                </SectionHeader>
                <div style={{ background: C.base, padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, letterSpacing: '0.04em', marginBottom: 10 }}>CONFIRMED SQUAD</div>
                    {yes.map(p => <PersonRow key={p.name} person={p} right={<span style={{ fontFamily: F.mono, fontSize: 13, color: C.green }}>✓</span>} />)}
                  </div>
                  {ghost.length > 0 && (
                    <div>
                      <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, letterSpacing: '0.04em', marginBottom: 10 }}>STILL THINKING · {ghost.length}</div>
                      {ghost.map(p => (
                        <PersonRow key={p.name} person={p} right={
                          <button
                            onClick={() => remind(p.name)}
                            style={{
                              background: reminded.has(p.name) ? C.green : C.yellow,
                              border: S.border, borderRadius: 100,
                              padding: '4px 12px', cursor: 'pointer',
                              fontFamily: F.body, fontWeight: 600, fontSize: 12, color: C.ink,
                              transition: 'background 150ms',
                            }}
                          >
                            {reminded.has(p.name) ? 'reminded ✓' : 'remind'}
                          </button>
                        } />
                      ))}
                    </div>
                  )}
                  {progress === 'commit' && (
                    <Button full onClick={advance}>it's go time →</Button>
                  )}
                </div>
              </div>
            ) : (
              <SummaryCard color={C.blue} stage="commit" summary={SUMMARIES.commit} onExpand={() => setOpenSection('commit')} />
            )}
          </div>
        )}

        {/* ── HAPPEN ─────────────────────────────────────── */}
        {progressIdx >= 2 && (
          <div ref={happenRef}>
            {openSection === 'happen' ? (
              <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
                <SectionHeader color={C.green} label="HAPPEN">
                  <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink, lineHeight: 1.2 }}>it's go time</div>
                  <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink, opacity: 0.7, marginTop: 4 }}>mark anyone who didn't make it</div>
                </SectionHeader>
                <div style={{ background: C.base, padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {yes.map(p => {
                    const isAbsent = absent.includes(p.name)
                    return (
                      <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.grey100}` }}>
                        <Avatar name={p.name[0]} color={p.color} size={36} />
                        <div style={{ flex: 1, fontFamily: F.body, fontWeight: 500, fontSize: 14, color: isAbsent ? C.grey400 : C.ink, textDecoration: isAbsent ? 'line-through' : 'none' }}>
                          {p.name}
                        </div>
                        <button
                          onClick={() => setAbsent(prev => isAbsent ? prev.filter(n => n !== p.name) : [...prev, p.name])}
                          style={{
                            background: isAbsent ? C.error : C.green,
                            border: S.border, borderRadius: 100,
                            padding: '4px 12px', cursor: 'pointer',
                            fontFamily: F.body, fontWeight: 600, fontSize: 12, color: isAbsent ? C.base : C.ink,
                          }}
                        >
                          {isAbsent ? 'bailed 💀' : 'here ✓'}
                        </button>
                      </div>
                    )
                  })}
                  {progress === 'happen' && (
                    <Button full onClick={advance} style={{ marginTop: 12 }}>sort the bills →</Button>
                  )}
                </div>
              </div>
            ) : (
              <SummaryCard color={C.green} stage="happen" summary={SUMMARIES.happen} onExpand={() => setOpenSection('happen')} />
            )}
          </div>
        )}

        {/* ── SETTLE ─────────────────────────────────────── */}
        {progressIdx >= 3 && (
          <div ref={settleRef}>
            {openSection === 'settle' ? (
              <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
                <SectionHeader color={C.pink} label="SETTLE">
                  <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.base, lineHeight: 1.2 }}>let's sort the bills</div>
                  <div style={{ fontFamily: F.body, fontSize: 13, color: C.base, opacity: 0.8, marginTop: 4 }}>who paid what?</div>
                </SectionHeader>
                <div style={{ background: C.base, padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Who paid */}
                  <div>
                    <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, letterSpacing: '0.04em', marginBottom: 10 }}>WHO FOOTED THE BILL</div>
                    {yes.slice(0, 2).map((p, i) => (
                      <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, marginBottom: i < 1 ? 12 : 0, borderBottom: i < 1 ? `1px solid ${C.grey100}` : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={p.name[0]} color={p.color} size={32} />
                          <span style={{ fontFamily: F.body, fontWeight: 500, fontSize: 14, color: C.ink }}>{p.name}</span>
                        </div>
                        <span style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 16, color: C.ink }}>₹{i === 0 ? '840' : '360'}</span>
                      </div>
                    ))}
                  </div>
                  {/* Everyone owes */}
                  <div>
                    <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, letterSpacing: '0.04em', marginBottom: 10 }}>EVERYONE OWES</div>
                    {yes.map(p => (
                      <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={p.name[0]} color={p.color} size={28} />
                          <span style={{ fontFamily: F.body, fontSize: 14, color: C.ink }}>{p.name}</span>
                        </div>
                        <Chip color={C.grey100} style={{ fontFamily: F.mono, fontWeight: 600 }}>₹400</Chip>
                      </div>
                    ))}
                  </div>
                  {progress === 'settle' && (
                    <Button full onClick={advance}>that's a wrap →</Button>
                  )}
                </div>
              </div>
            ) : (
              <SummaryCard color={C.pink} stage="settle" summary={SUMMARIES.settle} onExpand={() => setOpenSection('settle')} />
            )}
          </div>
        )}

        {/* ── REMEMBER ───────────────────────────────────── */}
        {progressIdx >= 4 && (
          <div ref={rememberRef}>
            {openSection === 'remember' && (
              <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
                <SectionHeader color={C.purple} label="REMEMBER">
                  <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, lineHeight: 1.2 }}>that's a wrap</div>
                  <div style={{ fontFamily: F.body, fontSize: 13, opacity: 0.8, marginTop: 4 }}>how was it though?</div>
                </SectionHeader>
                <div style={{ background: C.base, padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Vibe tags */}
                  <div>
                    <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, letterSpacing: '0.04em', marginBottom: 10 }}>THE VIBE</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {(['legendary', 'chaotic', 'wholesome', 'mid', 'unhinged'] as const).map(v => {
                        const vibeColors: Record<string, string> = { legendary: C.yellow, chaotic: C.orange, wholesome: C.pink, mid: C.grey200, unhinged: C.purple }
                        const selected = vibeTag === v
                        return (
                          <button
                            key={v}
                            onClick={() => setVibeTag(selected ? null : v)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              background: selected ? vibeColors[v] : C.grey100,
                              border: S.border, borderRadius: 100,
                              padding: '6px 14px', cursor: 'pointer',
                              fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.ink,
                              transition: 'background 120ms',
                            }}
                          >
                            {selected && <VibeIcon vibe={v} size={14} />}
                            {v}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Journal note */}
                  <div>
                    <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 13, color: C.grey600, letterSpacing: '0.04em', marginBottom: 8 }}>THE MEMORY</div>
                    <NoteField
                      placeholder="what actually happened today. don't hold back."
                      value={journalNote}
                      onChange={setJournalNote}
                    />
                  </div>

                  {/* Card generation */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Button full variant="destructive">roast someone</Button>
                    <Button full variant="secondary">send the fomo</Button>
                    <Button full variant="secondary" style={{ background: C.yellow }}>save the memory</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
