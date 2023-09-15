import AddRun from "./AddRun"

function RunList() {
  return (
    <div>
      <AddRun />
      <h2>Previous Runs</h2>
      <ul>
        <li>Run 1</li>
        <li>Run 2</li>
        <li>etc</li>
      </ul>
    </div>
  )
}

export default RunList
