import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { Splash } from './screens/Splash'
import { Signup } from './screens/Signup'
import { Signin } from './screens/Signin'
import { HomeEmpty } from './screens/HomeEmpty'
import { HomeActive } from './screens/HomeActive'
import { CreateOuting } from './screens/CreateOuting'
import { OutingDetail } from './screens/OutingDetail'
import { Moments, MomentDetail } from './screens/Moments'
import { Friends } from './screens/Friends'
import { Profile } from './screens/Profile'
import type { Moment } from './screens/Moments'
import { C } from './lib/tokens'

type Screen =
  | 'splash' | 'signup' | 'signin'
  | 'home-empty' | 'home-active'
  | 'create' | 'outing-detail'
  | 'moments' | 'moment-detail'
  | 'friends'
  | 'profile'

type Tab = 'home' | 'moments' | 'friends' | 'profile'

export interface Outing {
  id: string
  name: string
  date: string        // display string e.g. "WED 30 APR · 7:00 PM"
  sortDate: string    // ISO date e.g. "2026-04-30", or "LIVE"
  type: string
  color: string
  people: { name: string; color: string }[]
}

const PEOPLE = [
  { name: 'Aarav', color: C.pink },
  { name: 'Diya',  color: C.yellow },
  { name: 'Kabir', color: C.green },
  { name: 'Mira',  color: C.blue },
  { name: 'Rhea',  color: C.purple },
  { name: 'Vir',   color: C.orange },
]

const INITIAL_OUTINGS: Outing[] = [
  { id: '1', name: 'chai @ irani',              date: 'HAPPENING NOW',         sortDate: 'LIVE',       type: 'food 🍕',     color: C.yellow, people: PEOPLE.slice(0,4) },
  { id: '2', name: 'shuka dinner',              date: 'FRI 1 MAY · 8:00 PM',   sortDate: '2026-05-01', type: 'food 🍕',     color: C.yellow, people: PEOPLE.slice(0,5) },
  { id: '3', name: 'matinee madness',           date: 'WED 30 APR · 3:30 PM',  sortDate: '2026-04-30', type: 'movies 🎬',  color: C.pink,   people: [PEOPLE[1], PEOPLE[3], PEOPLE[5]] },
  { id: '4', name: 'goa boys (real this time)', date: 'FRI 29 MAY · WEEKEND',  sortDate: '2026-05-29', type: 'hangout ✌️', color: C.blue,   people: PEOPLE },
]

const TABBED_SCREENS: Screen[] = ['home-empty', 'home-active', 'moments', 'friends', 'profile']

export default function App() {
  const [screen, setScreen]             = useState<Screen>('splash')
  const [tab, setTab]                   = useState<Tab>('home')
  const [outings, setOutings]           = useState<Outing[]>(INITIAL_OUTINGS)
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null)

  const hasOutings = outings.length > 0

  const go = (s: Screen) => setScreen(s)

  const handleTab = (t: Tab) => {
    setTab(t)
    if (t === 'home')         go(hasOutings ? 'home-active' : 'home-empty')
    else if (t === 'moments') go('moments')
    else if (t === 'friends') go('friends')
    else if (t === 'profile') go('profile')
  }

  const openMoment = (m: Moment) => {
    setActiveMoment(m)
    go('moment-detail')
  }

  const handleOutingCreated = (o: Outing) => {
    setOutings(prev => [...prev, o])
    go('home-active')
  }

  const showNav = TABBED_SCREENS.includes(screen)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>

        {screen === 'splash'        && <Splash onSignup={() => go('signup')} onSignin={() => go('signin')} />}
        {screen === 'signup'        && <Signup onBack={() => go('splash')} onDone={() => go('home-active')} />}
        {screen === 'signin'        && <Signin onBack={() => go('splash')} onDone={() => go('home-active')} />}
        {screen === 'home-empty'    && <HomeEmpty onCreate={() => go('create')} />}
        {screen === 'home-active'   && (
          <HomeActive
            outings={outings}
            onOutingsChange={setOutings}
            onOutingTap={() => go('outing-detail')}
            onCreate={() => go('create')}
          />
        )}
        {screen === 'create'        && (
          <CreateOuting
            onBack={() => go(hasOutings ? 'home-active' : 'home-empty')}
            onDone={handleOutingCreated}
          />
        )}
        {screen === 'outing-detail' && <OutingDetail onBack={() => go('home-active')} />}
        {screen === 'moments'       && <Moments onMomentTap={openMoment} />}
        {screen === 'moment-detail' && activeMoment && <MomentDetail moment={activeMoment} onBack={() => go('moments')} />}
        {screen === 'friends'       && <Friends />}
        {screen === 'profile'       && <Profile />}

      </div>

      {showNav && <BottomNav active={tab} onChange={handleTab} />}
    </div>
  )
}
