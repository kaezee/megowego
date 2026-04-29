import { useState } from 'react'
import { Avatar } from '../components/ui/Avatar'
import { Chip } from '../components/ui/Chip'
import { SearchInput } from '../components/ui/Input'
import { Blob } from '../components/ui/Blob'
import { C } from '../lib/tokens'

interface Friend {
  id: string
  name: string
  initials: string
  color: string
  outingsTogether: number
  status?: string   // what they're up to this week
  mutual: number    // mutual friends count
}

const FRIENDS: Friend[] = [
  { id: '1', name: 'Diya Mehta',    initials: 'D', color: C.yellow,  outingsTogether: 18, status: 'shuka dinner fri', mutual: 4 },
  { id: '2', name: 'Kabir Nair',    initials: 'K', color: C.green,   outingsTogether: 12, status: 'free this weekend', mutual: 3 },
  { id: '3', name: 'Mira Patel',    initials: 'M', color: C.blue,    outingsTogether: 9,  mutual: 2 },
  { id: '4', name: 'Rhea Sood',     initials: 'R', color: C.purple,  outingsTogether: 7,  status: 'goa trip planning', mutual: 5 },
  { id: '5', name: 'Vir Sharma',    initials: 'V', color: C.orange,  outingsTogether: 5,  mutual: 1 },
  { id: '6', name: 'Ananya Kapoor', initials: 'A', color: C.pink,    outingsTogether: 3,  mutual: 2 },
]

const SUGGESTED: { id: string; name: string; initials: string; color: string; mutual: number }[] = [
  { id: '7', name: 'Rohan Das',    initials: 'R', color: C.blue,   mutual: 3 },
  { id: '8', name: 'Priya Iyer',   initials: 'P', color: C.pink,   mutual: 2 },
  { id: '9', name: 'Aman Verma',   initials: 'A', color: C.green,  mutual: 4 },
]

export function Friends() {
  const [query, setQuery]       = useState('')
  const [invited, setInvited]   = useState<string[]>([])
  const [added, setAdded]       = useState<string[]>([])

  const filtered = query.trim()
    ? FRIENDS.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : FRIENDS

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '48px 20px 12px', flexShrink: 0 }}>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 24, color: C.ink, marginBottom: 12 }}>
          Friends
        </div>
        <SearchInput placeholder="search friends..." value={query} onChange={setQuery} />
      </div>

      {/* Scrollable */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 20px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* On the app */}
        <div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontWeight: 600, fontSize: 11, color: C.grey600,
            letterSpacing: '0.06em', marginBottom: 10,
          }}>
            ON THE APP · {filtered.length}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filtered.map((f, i) => (
              <div key={f.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: C.base,
                border: '2px solid #0A0A0A',
                borderRadius: i === 0 ? '12px 12px 4px 4px' : i === filtered.length - 1 ? '4px 4px 12px 12px' : 4,
                padding: '14px 16px',
                boxShadow: i === filtered.length - 1 ? '3px 3px 0 0 #0A0A0A' : 'none',
              }}>
                <Avatar name={f.initials} color={f.color} size={44} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 17, color: C.ink }}>
                    {f.name}
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600, marginTop: 1 }}>
                    {f.outingsTogether} outings together
                  </div>
                  {f.status && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      marginTop: 5,
                      background: C.yellow, border: '1.5px solid #0A0A0A',
                      borderRadius: 100, padding: '2px 8px',
                    }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.ink, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 10, fontWeight: 600, color: C.ink }}>
                        {f.status}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setInvited(p => p.includes(f.id) ? p : [...p, f.id])}
                  style={{
                    background: invited.includes(f.id) ? C.green : 'transparent',
                    border: '2px solid #0A0A0A',
                    borderRadius: 100, padding: '6px 14px', cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontWeight: 600, fontSize: 12, color: C.ink,
                    whiteSpace: 'nowrap', flexShrink: 0,
                    transition: 'background 0.15s',
                  }}>
                  {invited.includes(f.id) ? 'invited ✓' : 'invite'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested — hidden while searching */}
        {!query && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Blob color={C.orange} shape="bean" expression="happy" size={28} />
              <div style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 600, fontSize: 11, color: C.grey600,
                letterSpacing: '0.06em',
              }}>SUGGESTED</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SUGGESTED.map((s, i) => (
                <div key={s.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: C.base,
                  border: '2px solid #0A0A0A',
                  borderRadius: i === 0 ? '12px 12px 4px 4px' : i === SUGGESTED.length - 1 ? '4px 4px 12px 12px' : 4,
                  padding: '14px 16px',
                  boxShadow: i === SUGGESTED.length - 1 ? '3px 3px 0 0 #0A0A0A' : 'none',
                }}>
                  <Avatar name={s.initials} color={s.color} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 17, color: C.ink }}>
                      {s.name}
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600, marginTop: 1 }}>
                      {s.mutual} mutual friend{s.mutual !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => setAdded(p => p.includes(s.id) ? p : [...p, s.id])}
                    style={{
                      background: added.includes(s.id) ? C.green : C.ink,
                      border: '2px solid #0A0A0A',
                      borderRadius: 100, padding: '6px 14px', cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontWeight: 600, fontSize: 12, color: C.base,
                      whiteSpace: 'nowrap', flexShrink: 0,
                      boxShadow: added.includes(s.id) ? 'none' : '2px 2px 0 0 #0A0A0A',
                      transition: 'background 0.15s',
                    }}>
                    {added.includes(s.id) ? 'added ✓' : '+ add'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invite from contacts */}
        {!query && (
          <div style={{
            background: C.yellow, border: '2px solid #0A0A0A',
            borderRadius: 12, boxShadow: '3px 3px 0 0 #0A0A0A',
            padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden', position: 'relative',
          }}>
            <Blob color={C.pink} shape="bean" expression="excited" size={72} style={{ marginLeft: -8, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 17, color: C.ink }}>
                Invite from contacts
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.ink, marginTop: 2, opacity: 0.6 }}>
                See who's already on Mego Wego
              </div>
            </div>
            <Chip color={C.ink} style={{ flexShrink: 0 }}>
              <span style={{ color: C.base }}>open</span>
            </Chip>
          </div>
        )}

      </div>
    </div>
  )
}
