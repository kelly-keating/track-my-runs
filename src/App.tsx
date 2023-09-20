import { FirebaseUser, RunSet } from './models'
import { useEffect, useState } from 'react'

import Header from './components/Header'
import Login from './components/Login'
import Profile from './components/Profile'
import RunList from './components/RunList'

import { init as initUser } from './firebase/auth'
import { getRuns } from './firebase/db'
import Graphs from './components/Graphs'

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [runs, setRuns] = useState({} as RunSet)
  const [page, setPage] = useState('home')

  useEffect(() => {
    initUser(
      (user) => setUser(user),
      () => setUser(null)
    )
  }, [])

  useEffect(() => {
    if (user) {
      getRuns((runs) => setRuns(runs))
    }
  }, [user])

  const updateUser = (newDetails: Partial<FirebaseUser>) => setUser((user) => (user ? { ...user, ...newDetails } : null))
  const showHome = () => setPage('home')
  const showProfile = () => setPage('edit-profile')
  const showGraphs = () => setPage('graphs')

  const renderMainComponent = () => {
    switch (page) {
      case 'home':
        return <RunList runs={runs} />
      case 'edit-profile':
        return <Profile displayName={user?.displayName || ''} photoURL={user?.photoURL || ''} updateUser={updateUser} showHome={showHome} />
      case 'graphs':
        return <Graphs runs={runs} />
    }
  }

  return (
    <div className="App">
      <Header
        page={page}
        showHome={showHome}
        showProfile={showProfile}
        showGraphs={showGraphs}
        user={user}
      />
      {user ? renderMainComponent() : <Login />}
    </div>
  )
}

export default App
