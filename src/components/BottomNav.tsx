import { C } from '../lib/tokens'

type Tab = 'home' | 'moments' | 'friends' | 'profile'

interface BottomNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

function HomeIcon({ on }: { on: boolean }) {
  const s = on ? C.ink : C.grey400
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/></svg>
}
function SparkleIcon({ on }: { on: boolean }) {
  const s = on ? C.ink : C.grey400
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8L16.5 18.5l1.8-.7z"/></svg>
}
function FriendsIcon({ on }: { on: boolean }) {
  const s = on ? C.ink : C.grey400
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3.5"/>
      <path d="M2 21c0-3.5 3.1-6 7-6s7 2.5 7 6"/>
      <path d="M16 3.5c1.8.5 3 2 3 3.5s-1.2 3-3 3.5"/>
      <path d="M22 21c0-3-2-5.5-6-6"/>
    </svg>
  )
}
function UserIcon({ on }: { on: boolean }) {
  const s = on ? C.ink : C.grey400
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
}

const TABS: { id: Tab; label: string; Icon: React.FC<{ on: boolean }> }[] = [
  { id: 'home',    label: 'Home',    Icon: HomeIcon },
  { id: 'moments', label: 'Moments', Icon: SparkleIcon },
  { id: 'friends', label: 'Friends', Icon: FriendsIcon },
  { id: 'profile', label: 'Profile', Icon: UserIcon },
]

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div style={{
      height: 64, background: C.surface,
      borderTop: '2px solid #0A0A0A',
      display: 'flex', justifyContent: 'space-around', alignItems: 'stretch',
      flexShrink: 0,
    }}>
      {TABS.map(({ id, label, Icon }) => {
        const on = active === id
        return (
          <button key={id} onClick={() => onChange(id)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 2, position: 'relative', padding: 0,
          }}>
            <Icon on={on} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: on ? 600 : 500, fontSize: 10,
              color: on ? C.ink : C.grey400,
            }}>{label}</span>
            {on && <div style={{
              position: 'absolute', bottom: 6,
              width: 6, height: 6, borderRadius: '50%',
              background: C.yellow, border: `1.5px solid ${C.ink}`,
            }} />}
          </button>
        )
      })}
    </div>
  )
}
