import { useRef, useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import DataTable from './components/DataTable'
import ConnectionForm from './components/ConnectionForm'
import { useConnection } from './hooks/useConnection'

/**
 * 
 */
function App() {

  const [connection, connect] = useConnection();

  /**
   * 
   * @param address 
   */
  const onConnect = (address: string) => {
    console.log(address);
    connect(address);
  };

  return (
    <Stack>
      <ConnectionForm onSubmit={onConnect}/>
      {connection ? (
        <DataTable columns={["id", "name", "age"]} 
                   data={[["0", "Person 1", "30"], ["1", "Person 2", "45"]]}
        />
      ) : <></>}
    </Stack>
  );
}

export default App
