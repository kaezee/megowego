import { useState } from 'react'
import { Avatar } from '../components/ui/Avatar'
import { Chip } from '../components/ui/Chip'
import { SearchInput } from '../components/ui/Input'
import { SectionBadge } from '../components/ui/SectionBadge'
import { BottomSheet } from '../components/ui/BottomSheet'
import { C, F, S } from '../lib/tokens'

interface Friend {
  id: string; name: string; initials: string; color: string
  outingsTogether: number; status?: string; mutual: number
}

const FRIENDS: Friend[] = [
  { id: '1', name: 'Diya Mehta',    initials: 'D', color: C.yellow,  outingsTogether: 18, status: 'shuka dinner fri', mutual: 4 },
  { id: '2', name: 'Kabir Nair',    initials: 'K', color: C.green,   outingsTogether: 12, status: 'free this weekend', mutual: 3 },
  { id: '3', name: 'Mira Patel',    initials: 'M', color: C.blue,    outingsTogether: 9,  mutual: 2 },
  { id: '4', name: 'Rhea Sood',     initials: 'R', color: C.purple,  outingsTogether: 7,  status: 'goa trip planning', mutual: 5 },
  { id: '5', name: 'Vir Sharma',    initials: 'V', color: C.orange,  outingsTogether: 5,  mutual: 1 },
  { id: '6', name: 'Ananya Kapoor', initials: 'A', color: C.pink,    outingsTogether: 3,  mutual: 2 },
]

const SUGGESTED = [
  { id: '7', name: 'Rohan Das',  initials: 'R', color: C.blue,  mutual: 3 },
  { id: '8', name: 'Priya Iyer', initials: 'P', color: C.pink,  mutual: 2 },
  { id: '9', name: 'Aman Verma', initials: 'A', color: C.green, mutual: 4 },
]

const ACTIVE_OUTINGS = ['chai @ irani', 'shuka dinner', 'matinee madness']

export function Friends() {
  const [query, setQuery]           = useState('')
  const [invited, setInvited]       = useState<string[]>([])
  const [added, setAdded]           = useState<string[]>([])
  const [profileSheet, setProfileSheet] = useState<Friend | null>(null)
  const [inviteSheet, setInviteSheet]   = useState<Friend | null>(null)
  const [sentTo, setSentTo]         = useState<Record<string, string>>({}) // friendId → outingName

  const filtered = query.trim()
    ? FRIENDS.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : FRIENDS

  const handleInviteToOuting = (friend: Friend, outing: string) => {
    setSentTo(prev => ({ ...prev, [friend.id]: outing }))
    setInviteSheet(null)
    setInvited(prev => [...prev, friend.id])
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden', position: 'relative' }}>

      <div style={{ padding: '48px 20px 12px', flexShrink: 0 }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 24, color: C.ink, marginBottom: 12 }}>Friends</div>
        <SearchInput placeholder="search friends..." value={query} onChange={setQuery} />
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 20px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* On the app */}
        <div>
          <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.06em', marginBottom: 10 }}>
            ON THE APP · {filtered.length}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filtered.map((f, i) => (
              <div
                key={f.id}
                onClick={() => setProfileSheet(f)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: C.base, border: S.border, cursor: 'pointer',
                  borderRadius: i === 0 ? '12px 12px 4px 4px' : i === filtered.length - 1 ? '4px 4px 12px 12px' : 4,
                  padding: '14px 16px',
                }}
              >
                <Avatar name={f.initials} color={f.color} size={44} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 17, color: C.ink }}>{f.name}</div>
                  <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginTop: 1 }}>{f.outingsTogether} outings together</div>
                  {f.status && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5, background: C.yellow, border: '1.5px solid #0A0A0A', borderRadius: 100, padding: '2px 8px' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.ink, flexShrink: 0 }} />
                      <span style={{ fontFamily: F.body, fontSize: 10, fontWeight: 600, color: C.ink }}>{f.status}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setInviteSheet(f) }}
                  style={{
                    background: invited.includes(f.id) ? C.green : 'transparent',
                    border: S.border, borderRadius: 100, padding: '6px 14px', cursor: 'pointer',
                    fontFamily: F.body, fontWeight: 600, fontSize: 12, color: C.ink,
                    whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.15s',
                  }}
                >
                  {invited.includes(f.id) ? 'invited ✓' : 'invite'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested */}
        {!query && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <SectionBadge icon="🌸" color={C.purple} size={32} />
              <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: 11, color: C.grey600, letterSpacing: '0.06em' }}>SUGGESTED</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SUGGESTED.map((s, i) => (
                <div key={s.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14, background: C.base, border: S.border,
                  borderRadius: i === 0 ? '12px 12px 4px 4px' : i === SUGGESTED.length - 1 ? '4px 4px 12px 12px' : 4,
                  padding: '14px 16px',
                }}>
                  <Avatar name={s.initials} color={s.color} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 17, color: C.ink }}>{s.name}</div>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.grey600, marginTop: 1 }}>{s.mutual} mutual friend{s.mutual !== 1 ? 's' : ''}</div>
                  </div>
                  <button
                    onClick={() => setAdded(p => p.includes(s.id) ? p : [...p, s.id])}
                    style={{
                      background: added.includes(s.id) ? C.green : C.ink,
                      border: S.border, borderRadius: 100, padding: '6px 14px', cursor: 'pointer',
                      fontFamily: F.body, fontWeight: 600, fontSize: 12, color: C.base,
                      whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.15s',
                    }}
                  >
                    {added.includes(s.id) ? 'added ✓' : '+ add'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invite from contacts */}
        {!query && (
          <div style={{ background: C.yellow, border: S.border, borderRadius: 12, boxShadow: '3px 3px 0 0 #0A0A0A', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/Invite.png" alt="" style={{ width: 56, height: 56, objectFit: 'contain', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 17, color: C.ink }}>Invite from contacts</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: C.ink, marginTop: 2, opacity: 0.6 }}>See who's already on Mego Wego</div>
            </div>
            <Chip color={C.ink} style={{ flexShrink: 0 }}>
              <span style={{ color: C.base }}>open</span>
            </Chip>
          </div>
        )}

      </div>

      {/* ── Mini profile sheet ────────────────────────────────── */}
      {profileSheet && (
        <BottomSheet onClose={() => setProfileSheet(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar name={profileSheet.initials} color={profileSheet.color} size={56} />
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink }}>{profileSheet.name}</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.grey600, marginTop: 2 }}>{profileSheet.outingsTogether} outings together · {profileSheet.mutual} mutual</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {[{ label: 'outings', value: profileSheet.outingsTogether.toString() }, { label: 'mutual', value: profileSheet.mutual.toString() }, { label: 'bails', value: '1' }].map(s => (
                <div key={s.label} style={{ flex: 1, background: C.grey100, borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 20, color: C.ink }}>{s.value}</div>
                  <div style={{ fontFamily: F.body, fontSize: 11, color: C.grey600, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setInviteSheet(profileSheet); setProfileSheet(null) }}
              style={{ width: '100%', height: 52, background: C.ink, border: 'none', borderRadius: 16, cursor: 'pointer', fontFamily: F.body, fontWeight: 600, fontSize: 16, color: C.base }}
            >
              invite to outing →
            </button>
          </div>
        </BottomSheet>
      )}

      {/* ── Invite to outing sheet ────────────────────────────── */}
      {inviteSheet && (
        <BottomSheet onClose={() => setInviteSheet(null)} title={`invite ${inviteSheet.name.split(' ')[0]} to...`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ACTIVE_OUTINGS.map(o => (
              <button
                key={o}
                onClick={() => handleInviteToOuting(inviteSheet, o)}
                style={{
                  width: '100%', background: sentTo[inviteSheet.id] === o ? C.green : C.grey100,
                  border: S.border, borderRadius: 12, padding: '14px 16px', cursor: 'pointer',
                  fontFamily: F.body, fontWeight: 500, fontSize: 15, color: C.ink, textAlign: 'left',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'background 150ms',
                }}
              >
                <span>{o}</span>
                {sentTo[inviteSheet.id] === o && <span style={{ fontFamily: F.mono, fontSize: 13, color: C.ink }}>sent ✓</span>}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}

    </div>
  )
}
