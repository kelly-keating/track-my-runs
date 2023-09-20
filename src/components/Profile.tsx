import { FormEvent } from "react"
import { updateImage, updateName } from "../firebase/auth"
import { FirebaseUser } from "../models"

interface Props {
  displayName: string
  photoURL: string
  updateUser: (newDetails: Partial<FirebaseUser>) => void
  closeEdit: () => void
}


function Profile({ displayName, photoURL, updateUser, closeEdit }: Props) {
  const handleNameChange = async (e: FormEvent) => {
    e.preventDefault()
    const displayName = (e.target as HTMLFormElement)['display-name'].value
    const newUser = await updateName(displayName)
    updateUser({ displayName: newUser.displayName })
  }

  const handleImageChange = async (e: FormEvent) => {
    e.preventDefault()
    const photoURL = (e.target as HTMLFormElement)['photo-url'].value
    const newUser = await updateImage(photoURL)
    updateUser({ photoURL: newUser.photoURL })
  }

  return (
    <div>
      <h2>Profile</h2>
      <div className="profile_display">
        <p>Image: <img src={photoURL} alt={photoURL ? displayName : 'No display image set yet'} /></p>
        <p>Name: {displayName}</p>
      </div>
      <div>
        <form onSubmit={handleNameChange}>
          <label htmlFor="display-name">Display name</label>
          <input type="text" id="display-name" defaultValue={displayName} />
          <button type="submit">Update</button>
        </form>
        <form onSubmit={handleImageChange}>
          <label htmlFor="photo-url">Photo URL</label>
          <input type="text" id="photo-url" defaultValue={photoURL} />
          <button type="submit">Update</button>
        </form>
      </div>
      <button onClick={closeEdit}>Done</button>
    </div>
  )
}

export default Profile
