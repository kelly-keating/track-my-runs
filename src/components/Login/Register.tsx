import { FormEvent } from 'react'
import { signUp } from '../../firebase/auth'

function Register() {

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const email = (e.target as HTMLFormElement).email.value
    const password = (e.target as HTMLFormElement).password.value
    const displayName = (e.target as HTMLFormElement)['display-name'].value
    try {
      await signUp(email, password, displayName)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="display-name">Display name</label>
        <input type="text" id="display-name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
