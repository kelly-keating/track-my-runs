import { FirebaseUser } from '../models/auth'
import { auth } from './index'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from '@firebase/auth'

export function signUp(email: string, password: string, name: string) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => updateProfile(user, { displayName: name }))
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signOut() {
  return auth.signOut()
}

export function updateName(name: string) {
  const user = auth.currentUser as FirebaseUser
  return updateProfile(user, { displayName: name })
    .then(() => user)
}

export function updateImage(url: string) {
  const user = auth.currentUser as FirebaseUser
  return updateProfile(user, { photoURL: url })
    .then(() => user)
}

type SuccessFn = (user: FirebaseUser) => void
type FailFn = () => void

export function init(yesUser: SuccessFn, noUser: FailFn) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      yesUser(user)
    } else {
      noUser()
    }
  })
}

export default auth
