import { useState } from 'react'
import DataTable from './components/DataTable'

function App() {
  return (
    <div>
      <DataTable 
        columns={["id", "name", "age"]} 
        data={[["0", "Person 1", "30"], ["1", "Person 2", "45"]]}
      />
    </div>
  )
}

export default App
