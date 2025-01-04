import { useState } from 'react'
import DataTable from './components/DataTable'
import ConnectionForm from './components/ConnectionForm'
import { useConnectDatabase } from './hooks/useConnectDatabase'
import { Alert, Button, ButtonGroup } from 'react-bootstrap'
import { useFetchJSON } from './hooks/useFetchJSON'
import ModalForm from './components/ModalForm'
import TableList from './components/TableList'
import CreateTableForm from './components/CreateTableForm'
import InsertIntoForm from './components/InsertIntoForm'
import UpdateForm from './components/UpdateForm'
import DeleteForm from './components/DeleteForm'
import DropTableForm from './components/DropTableForm'

/**
 * 
 */
interface TableData {
  name: string,
  columns: string[],
  column_types: number[], 
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
const TYPES = Object.freeze([ "INT", "VARCHAR" ]);

/**
 * 
 */
export default function App() {

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
      column_types: (data.column_types as string[]).map(type => TYPES.indexOf(type)),
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
            <Button variant='primary' 
                    onClick={() => onControlClicked("Create a new table", <CreateTableForm types={TYPES} onSubmit={sql => {
                      console.log(sql);
                      //fetchJSON(connection.address, 'POST', sql);
                      //connectDatabase(connection.address);
                    }}/>)}
            >Create</Button>
            <Button variant='primary'>Alter</Button>
            <Button variant='danger' 
                    onClick={() => onControlClicked("Drop a table", <DropTableForm tables={connection.tables} onSubmit={sql => { 
                      console.log(sql); 
                      //fetchJSON(connection.address, 'POST', sql);
                      //connectDatabase(connection.address);
                    }}/>)}>Drop</Button>
          </ButtonGroup>
          <p></p>
          <TableList tables={connection.tables} 
                     onSelect={onTableRequested}
          />

          {tableData ? (
            <div>
              <ButtonGroup>
                <Button variant='primary' 
                        onClick={() => onControlClicked("Insert data to a table", <InsertIntoForm table={tableData.name} columns={tableData.columns.map((col, index) => ({ typeIndex: tableData.column_types[index], value: col }))} onSubmit={sql => {
                          console.log(sql);
                          //fetchJSON(connection.address, 'POST', sql);
                          //connectDatabase(connection.address);
                        }}/>)}
                >Insert</Button>
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
