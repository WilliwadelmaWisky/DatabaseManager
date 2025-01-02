import { useState } from 'react'
import DataTable from './components/DataTable'
import ConnectionForm from './components/ConnectionForm'
import { useConnectDatabase } from './hooks/useConnectDatabase'
import { Alert, Button, ButtonGroup } from 'react-bootstrap'
import { useFetchJSON } from './hooks/useFetchJSON'
import ModalForm from './components/forms/ModalForm'
import TableList from './components/TableList'
import CreateTableForm from './components/forms/CreateTableForm'
import InsertIntoForm from './components/forms/InsertIntoForm'
import UpdateForm from './components/forms/UpdateForm'
import DeleteForm from './components/forms/DeleteForm'
import DropTableForm from './components/forms/DropTableForm'

/**
 * 
 */
interface TableData {
  name: string,
  columns: string[],
  data: string[][]
}

interface ModalData {
  isVisible: boolean,
  title: string,
  content: JSX.Element | null
}

/**
 * 
 */
function App() {

  const [connection, connectDatabase] = useConnectDatabase();
  const [fetchJSON] = useFetchJSON();
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [modalData, setModalData] = useState<ModalData>({
    isVisible: false,
    title: "",
    content: null
  });


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
   * @param title
   * @param content 
   */
  const onControlClicked = (title: string, content: JSX.Element) => {
    setModalData(prevState => ({
      ...prevState,
      isVisible: true,
      title: title,
      content: content
    }));
  };

  return (
    <div>
      <ConnectionForm onSubmit={onConnect}/>
      {connection ? (
        <div>
          <ButtonGroup>
            <Button variant='primary' onClick={() => onControlClicked("Create a new table", <CreateTableForm onSubmit={sql => console.log(sql)}/>)}>Create</Button>
            <Button variant='primary'>Alter</Button>
            <Button variant='danger' onClick={() => onControlClicked("Drop a table", <DropTableForm tables={connection.tables} onSubmit={sql => console.log(sql)}/>)}>Drop</Button>
          </ButtonGroup>
          <p></p>
          <TableList tables={connection.tables} 
                     onSelect={onTableRequested}
          />

          {tableData ? (
            <div>
              <ButtonGroup>
                <Button variant='primary' onClick={() => onControlClicked("Insert data to a table", <InsertIntoForm table={tableData.name} columns={[]} onSubmit={sql => console.log(sql)}/>)}>Insert</Button>
                <Button variant='primary' onClick={() => onControlClicked("Update data in a table", <UpdateForm table={tableData.name} onSubmit={sql => console.log(sql)}/>)}>Update</Button>
                <Button variant='danger' onClick={() => onControlClicked("Delete data from a table", <DeleteForm onSubmit={sql => console.log(sql)}/>)}>Delete</Button>
              </ButtonGroup>

              <h4>{tableData.name}</h4>
              <DataTable columns={tableData.columns} 
                         data={tableData.data}
              />
              <ModalForm title={modalData.title}
                         form={modalData.content ? modalData.content : <p>NULL</p>}
                         isVisible={modalData.isVisible}
                         onHide={() => setModalData(prevState => ({ ...prevState, isVisible: false }))}
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
