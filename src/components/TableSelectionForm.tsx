import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

/**
 * 
 */
interface Props {
    tables: string[],
    defaultValue: string,
    onSubmit: (table: string) => void
}

/**
 * 
 */
export default function TableSelectionForm({ tables, defaultValue, onSubmit }: Props) {
    
    const [table, setTable] = useState<string>(defaultValue);

    /**
     * 
     * @param e 
     */
    const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setTable(e.target.value);
    };

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(table);
    };

    return (
        <Form onSubmit={submitHandler}>
            <InputGroup>
                <InputGroup.Text>Tables</InputGroup.Text>
                <Form.Select onChange={changeHandler}>
                    {tables.map((table, index) =>(
                        <option key={index} 
                                value={table}
                        >{table}</option>
                    ))}
                </Form.Select>
                <Button type="submit">Load</Button>
            </InputGroup>
        </Form>
    )
}