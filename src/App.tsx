import { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import DataTable from './components/DataTable'
import ConnectionForm from './components/ConnectionForm'
import { useConnectDatabase } from './hooks/useConnectDatabase'
import { Alert, Button, ButtonGroup, Modal } from 'react-bootstrap'
import { useFetchJSON } from './hooks/useFetchJSON'
import ControlGroup from './components/ControlGroup'
import ModalForm from './components/ModalForm'

/**
 * 
 */
interface TableData {
  name: string,
  columns: string[],
  data: string[][]
}

/**
 * 
 */
function App() {

  const [connection, connectDatabase] = useConnectDatabase();
  const [fetchJSON] = useFetchJSON();
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);


  /**
   * 
   * @param address 
   */
  const onConnect = (address: string) => {
    console.log(address);
    connectDatabase(address);
  };

  /**
   * 
   * @param table 
   */
  const onTableRequested = async (table: string) => {
    if (connection === null) {
      return;
    }

    const sqlQuery = `SELECT * FROM ${table}`;
    const data = await fetchJSON(connection.address, 'POST', sqlQuery);
    setTableData({
      name: table,
      columns: data.columns,
      data: data.data
    });
  };

  return (
    <div>
      <ConnectionForm onSubmit={onConnect}/>
      {connection ? (
        <div>
          <div className='d-flex justify-content-between mt-3'>
            <ButtonGroup>
            {connection.tables.map((table, index) =>(
              <Button key={index} 
                      disabled={tableData !== null && table === tableData.name}
                      onClick={() => onTableRequested(table)}
              >{table}</Button>
            ))}
            </ButtonGroup>
            {tableData ? <ControlGroup onControlClick={() => setIsVisible(true)}/> : <></>}
          </div>
                    
          {tableData ? (
            <div>
              <h4>{tableData.name}</h4>
              <DataTable columns={tableData.columns} 
                        data={tableData.data}
              />
              <ModalForm title='ModalForm'
                         form={<p>Hello</p>}
                         isVisible={isVisible}
                         onHide={() => setIsVisible(false)}
              />
            </div>
          ) : <></>}
        </div>
      ) : (
        <Alert>Not connected to a database!</Alert>
      )}
    </div>
  );
}

export default App
