import { RunSet } from "../models"
import { LineChart, Line } from 'recharts'

interface Props {
  runs: RunSet
}

function Graphs({ runs }: Props) {

  const data = Object.keys(runs).map(date => {
    const run = runs[date]
    return { date, speed: run.totalKms / run.totalMinutes }
  })

  return (
    <div>
      <h2>Graphs</h2>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="speed" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}

export default Graphs
