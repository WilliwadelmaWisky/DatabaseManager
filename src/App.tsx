import { useState } from 'react'
import DataTable from './components/DataTable'
import ConnectionForm from './components/ConnectionForm'
import { useConnectDatabase } from './hooks/useConnectDatabase'
import { Alert, Button, ButtonGroup } from 'react-bootstrap'
import { useFetchJSON } from './hooks/useFetchJSON'
import ControlGroup from './components/ControlGroup'
import ModalForm from './components/forms/ModalForm'
import TableList from './components/TableList'

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
  const [content, setContent] = useState<JSX.Element | null>(null);


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

  /**
   * 
   * @param content 
   */
  const onControlClicked = (content: JSX.Element) => {
    setContent(content);
    setIsVisible(true);
  };

  return (
    <div>
      <ConnectionForm onSubmit={onConnect}/>
      {connection ? (
        <div>
          <TableList tables={connection.tables} 
                     onSelect={onTableRequested}
          />
          {tableData ? <ControlGroup onControlClick={onControlClicked}/> : <></>}
                    
          {tableData ? (
            <div>
              <h4>{tableData.name}</h4>
              <DataTable columns={tableData.columns} 
                         data={tableData.data}
              />
              <ModalForm title='ModalForm'
                         form={content ? content : <p>NULL</p>}
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
