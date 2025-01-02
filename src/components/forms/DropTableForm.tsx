import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

/**
 * 
 */
interface Props {
    tables: string[],
    onSubmit: (sql: string) => void
}

/**
 * 
 */
export default function DropTableForm({ tables, onSubmit }: Props) {

    const [tableIndex, setTableIndex] = useState(0);

    /**
     * 
     * @param e 
     */
    const tableChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setTableIndex(Number(e.target.value));
    };

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sql = `DROP TABLE ${tables[tableIndex]}`;
        onSubmit(sql);
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="DropTableForm.Table">
                <Form.Label>Table</Form.Label>
                <Form.Select onChange={tableChangeHandler}
                             value={tableIndex}
                >
                    {tables.map((table, index) => (
                        <option key={index} value={index}>{table}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    );
}