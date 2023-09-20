import { RunPoint } from "../models"
import dayjs from "dayjs"

import { FormEvent, useState } from "react"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"

import { createRun } from "../firebase/db"

type MaybeDate = dayjs.Dayjs | null
const dateToString = (date: MaybeDate) => date ? date.format('YYYY-MM-DD') : ''

function AddRun() {
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState(dayjs(new Date()) as MaybeDate)
  const [points, setPoints] = useState([] as RunPoint[])

  const addPoint = (e: FormEvent) => {
    e.preventDefault()

    const d = (e.target as HTMLFormElement).distance.value
    const t = (e.target as HTMLFormElement).time.value

    // TODO: check if distance and time are above zero rather than convert
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
    // TODO: check date is set to today or earlier
    // TODO: make sure I can't just push the button whenever
    // aka make sure there's points? 
    if(date) createRun(dateToString(date), points)
    setDate(dayjs(new Date()))
    setPoints([])
    setShowForm(false)
  }

  return (
    <div>
      <h2>Add a Run</h2>
      {showForm ? (
        <div>
          <DatePicker value={date} maxDate={dayjs(new Date())} onChange={(newValue) => setDate(newValue)} />
          <form onSubmit={addPoint}>
            <label htmlFor="distance">Distance</label>
            <input type="text" id="distance" />
            <label htmlFor="time">Time</label>
            <input type="text" id="time" />
            {/* <TimePicker views={['minutes', 'seconds']} format="mm:ss" onChange={(val:any) => console.log(val)} /> */}
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
          <button onClick={saveRun}>Save</button>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)}>Add Run</button>
      )}
    </div>
  )
}

export default AddRun
