import './styles/index.scss'
import { FirebaseUser } from './models/auth'
import { useEffect, useState } from 'react'
import './firebase'

import Header from './components/Header'
import Login from './components/Login'

import * as auth from './firebase/auth'

function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null)

  useEffect(() => {
    auth.init(
      (user) => setUser(user),
      () => setUser(null)
    )
  }, [])

  return (
    <div className="App">
      <Header />
      {!user && <Login />}
      {user && <div>Logged in as {user.email}</div>}
    </div>
  )
}

export default App
