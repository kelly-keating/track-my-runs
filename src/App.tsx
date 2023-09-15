import './styles/index.scss'
import './firebase'
import { FirebaseUser } from './models/auth'
import { useEffect, useState } from 'react'

import Header from './components/Header'
import Login from './components/Login'
import Profile from './components/Profile'
import RunList from './components/RunList'

import { init as initUser, signOut } from './firebase/auth'

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    initUser(
      (user) => setUser(user),
      () => setUser(null)
    )
  }, [])

  const updateUser = (newDetails: Partial<FirebaseUser>) => setUser((user) => (user ? { ...user, ...newDetails } : null))
  const openEdit = () => setIsEditing(true)
  const closeEdit = () => setIsEditing(false)

  return (
    <div className="App">
      <Header />
      {!user && <Login />}
      {user && <div>Logged in as {user.email} <button onClick={openEdit}>Edit</button><button onClick={signOut}>Log out</button></div>}
      {user && isEditing && <Profile displayName={user.displayName || ''} photoURL={user.photoURL || ''} updateUser={updateUser} closeEdit={closeEdit} />}
      {user && !isEditing && <RunList />}
    </div>
  )
}

export default App
