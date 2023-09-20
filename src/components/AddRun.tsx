import { FormEvent, useState } from "react"
import { RunPoint } from "../models"
import { createRun } from "../firebase/db"

function AddRun() {
  const getDate = () => {
    const d = new Date()
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions()
    const [day, month, year] = d.toLocaleDateString('en-NZ', { timeZone: timeZone }).split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState(getDate())
  const [points, setPoints] = useState([] as RunPoint[])

  const addPoint = (e: FormEvent) => {
    e.preventDefault()

    const d = (e.target as HTMLFormElement).distance.value
    const t = (e.target as HTMLFormElement).time.value

    const distance = Math.abs(d)
    const time = Math.abs(t)

    if (points.find(point => point.distance === distance)) {
      alert('You already have a point for that distance')
    } else if (isNaN(distance) || isNaN(time)) {
      alert('Please enter a number for distance and time')
    } else {
      setPoints([...points, { distance, time }])
    }
  }

  const removePoint = (point: RunPoint) => {
    setPoints(points.filter(p => p.distance !== point.distance))
  }

  const saveRun = () => {
    createRun(date, points)
    setDate(getDate())
    setPoints([])
    setShowForm(false)
  }

  return showForm ? (
    <div>
      <h2>Add a Run</h2>      
      <form onSubmit={addPoint}>
        <label htmlFor="distance">Distance</label>
        <input type="text" id="distance" />
        <label htmlFor="time">Time</label>
        <input type="text" id="time" />
        <button type="submit">Add</button>
      </form>
      {points && (
        <>
          <h3>Current points:</h3>
          <ul>
            {points.map((point: RunPoint) => (
              <li key={point.distance}>{point.distance} km in {point.time} minutes <button onClick={() => removePoint(point)}>x</button></li>
            ))}
          </ul>
        </>
      )}
      <p>Date set for {date} <button>Change date?</button></p>
      <button onClick={saveRun}>Save</button>
    </div>
  ) : (
    <button onClick={() => setShowForm(true)}>Add Run</button>
  )
}

export default AddRun
