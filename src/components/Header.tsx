import { FirebaseUser } from "../models"
import { signOut } from '../firebase/auth'

interface Props {
  page: string
  showHome: () => void
  showProfile: () => void
  showGraphs: () => void
  user: FirebaseUser | null
}

function Header({ page, showHome, showProfile, showGraphs, user }: Props) {
  return (
    <header>
      <h1>Track My Runs</h1>
      {user && (
        <div>
          <nav>
            {page !== 'home' && <button onClick={showHome}>Home</button>}
            {page !== 'edit-profile' && <button onClick={showProfile}>Profile</button>}
            {page !== 'graphs' && <button onClick={showGraphs}>Graphs</button>}
          </nav>
          <div><p>{user.displayName} <button onClick={signOut}>Log out</button></p></div>
        </div>
      )}
    </header>
  )
}

export default Header
