import Table from "react-bootstrap/Table";

interface Props {
    columns: string[],
    data: string[][]
}

export default function DataTable({ columns, data }: Props) {



    return (
        <Table striped bordered variant="dark">
            <thead>
                <tr>
                    <th></th>
                    {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {data.map((row, rIndex) => (
                <tr>
                    <td>{rIndex + 1}</td>
                    {row.map((item, cIndex) => ( 
                        <td key={cIndex}>{item}</td>
                    ))}
                </tr>
            ))} 
            </tbody>
        </Table>
    );
}