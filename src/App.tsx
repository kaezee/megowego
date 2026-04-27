import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { Splash } from './screens/Splash'
import { Signup } from './screens/Signup'
import { Signin } from './screens/Signin'
import { HomeEmpty } from './screens/HomeEmpty'
import { HomeActive } from './screens/HomeActive'
import { CreateOuting } from './screens/CreateOuting'
import { OutingDetail } from './screens/OutingDetail'
import { Moments } from './screens/Moments'
import { Profile } from './screens/Profile'

type Screen =
  | 'splash' | 'signup' | 'signin'
  | 'home-empty' | 'home-active'
  | 'create' | 'outing-detail'
  | 'moments' | 'profile'

type Tab = 'home' | 'moments' | 'profile'

const TABBED_SCREENS: Screen[] = ['home-empty', 'home-active', 'moments', 'profile']

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [tab, setTab] = useState<Tab>('home')

  // Demo: after first outing created, home becomes active
  const [hasOutings, setHasOutings] = useState(true)

  const go = (s: Screen) => setScreen(s)

  const handleTab = (t: Tab) => {
    setTab(t)
    if (t === 'home') go(hasOutings ? 'home-active' : 'home-empty')
    else if (t === 'moments') go('moments')
    else if (t === 'profile') go('profile')
  }

  const showNav = TABBED_SCREENS.includes(screen)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      {/* Screen */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
        {screen === 'splash'       && <Splash onSignup={() => go('signup')} onSignin={() => go('signin')} />}
        {screen === 'signup'       && <Signup onBack={() => go('splash')} onDone={() => { setHasOutings(true); go('home-active') }} />}
        {screen === 'signin'       && <Signin onBack={() => go('splash')} onDone={() => go('home-active')} />}
        {screen === 'home-empty'   && <HomeEmpty onCreate={() => go('create')} />}
        {screen === 'home-active'  && <HomeActive onOutingTap={() => go('outing-detail')} onCreate={() => go('create')} />}
        {screen === 'create'       && <CreateOuting onBack={() => go(hasOutings ? 'home-active' : 'home-empty')} onDone={() => { setHasOutings(true); go('home-active') }} />}
        {screen === 'outing-detail'&& <OutingDetail onBack={() => go('home-active')} />}
        {screen === 'moments'      && <Moments />}
        {screen === 'profile'      && <Profile />}
      </div>

      {/* Bottom nav */}
      {showNav && (
        <BottomNav active={tab} onChange={handleTab} />
      )}
    </div>
  )
}
