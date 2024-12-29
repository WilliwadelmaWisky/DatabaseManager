import { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import DataTable from './components/DataTable'
import ConnectionForm from './components/ConnectionForm'
import { useConnectDatabase } from './hooks/useConnectDatabase'
import { Alert, Button, ButtonGroup } from 'react-bootstrap'

/**
 * 
 */
function App() {

  const [connection, connectDatabase] = useConnectDatabase();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  /**
   * 
   * @param address 
   */
  const onConnect = (address: string) => {
    console.log(address);
    connectDatabase(address);
  };

  return (
    <Stack>
      <ConnectionForm onSubmit={onConnect}/>
      {connection ? (
        <div>
          <ButtonGroup>
            <Button variant='secondary'>Create</Button>
            <Button variant='primary'>Insert</Button>
            <Button variant='primary'>Update</Button>
            <Button variant='danger'>Delete</Button>
            <Button variant='danger'>Drop</Button>
          </ButtonGroup>

          <h4>Tables</h4>
          <ButtonGroup>
          {connection.tables.map((table, index) =>(
            <Button key={index} onClick={() => setSelectedTable(table)}>{table}</Button>
          ))}
          </ButtonGroup>
          
          {selectedTable ? (
            <div>
              <h4>{selectedTable}</h4>
              <DataTable columns={["id", "name", "age"]} 
                         data={[["0", "Person 1", "30"], ["1", "Person 2", "45"]]}
              />
            </div>
          ) : <></>}
        </div>
      ) : (
        <Alert>Not connected to a database!</Alert>
      )}
    </Stack>
  );
}

export default App
