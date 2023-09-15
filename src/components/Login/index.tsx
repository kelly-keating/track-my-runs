import { useState } from "react"

import Register from "./Register"
import Returning from "./Returning"

function Login() {
  const [newUser, setNewUser] = useState(false)

  return (
    <div>
      <h2>{newUser ? 'Register' : 'Login'}</h2>
      {newUser ? (
        <Register />
      ) : (
        <Returning />
      )}
      <button onClick={() => setNewUser(!newUser)}>
        {newUser ? 'Login' : 'Register'}
      </button>
    </div>
  )
}

export default Login
