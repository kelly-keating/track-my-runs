import { FirebaseUser, RunSet } from './models'
import { useEffect, useState } from 'react'

import Header from './components/Header'
import Login from './components/Login'
import Profile from './components/Profile'
import RunList from './components/RunList'

import { init as initUser, signOut } from './firebase/auth'
import { getRuns } from './firebase/db'

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [runs, setRuns] = useState({} as RunSet)

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
  const openEdit = () => setIsEditing(true)
  const closeEdit = () => setIsEditing(false)

  return (
    <div className="App">
      <Header />
      {!user && <Login />}
      {user && <div>Logged in as {user.email} <button onClick={openEdit}>Edit</button><button onClick={signOut}>Log out</button></div>}
      {user && isEditing && <Profile displayName={user.displayName || ''} photoURL={user.photoURL || ''} updateUser={updateUser} closeEdit={closeEdit} />}
      {user && !isEditing && <RunList runs={runs} />}
    </div>
  )
}

export default App
