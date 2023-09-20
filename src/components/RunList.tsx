import { RunSet } from "../models"
import AddRun from "./AddRun"

interface Props {
  runs: RunSet
}

function RunList({ runs }: Props ) {
  return (
    <div>
      <AddRun />
      <h2>Previous Runs</h2>
      <ul>
        {Object.values(runs).map((run) => (
          <li key={run.date}>{run.totalKms}km in {run.totalMinutes} minutes ({run.date})</li>
        ))}
      </ul>
    </div>
  )
}

export default RunList
