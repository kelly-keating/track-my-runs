import { FirebaseUser } from '../models/auth'
import { auth } from './index'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from '@firebase/auth'

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
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
