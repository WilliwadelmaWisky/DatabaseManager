import { ChangeEvent, FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ColumnControl, ColumnData, Types } from "./ColumnControl";

/**
 * 
 */
interface FormData {
    table: string
    columns: ColumnData[]
}

/**
 * 
 */
interface Props {
    onSubmit: (sql: string) => void
}

/**
 * 
 */
export default function CreateTableForm({ onSubmit }: Props) {

    const [formData, setFormData] = useState<FormData>({
        table: "",
        columns: []
    });

    /**
     * 
     * @param e 
     */
    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            table: e.target.value
        }));
    };

    /**
     * 
     * @param e 
     * @param index
     */
    const onColumnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const propertyName: string = e.target instanceof HTMLInputElement ? "name" : "type";
        setFormData(prevState => ({
            ...prevState,
            columns: prevState.columns.map((col, i) => {
                if (index !== i)
                    return col;
                
                let newCol = { ...col };
                (newCol as any)[propertyName] = e.target.value;
                return newCol;
            })
        }));
    }

    /**
     * 
     */
    const onAddColumn = () => {
        setFormData(prevState => ({
            ...prevState,
            columns: [...prevState.columns, { type: Types.INT, name: "" }]
        }));
    };

    /**
     * 
     */
    const onRemoveColumn = () => {
        setFormData(prevState => ({
            ...prevState,
            columns: prevState.columns.slice(0, -1)
        }));
    };

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sql = `CREATE TABLE ${formData.table} (${formData.columns.map(col => col.name + " " + Types[col.type]).join(", ")})`;
        onSubmit(sql);
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="CreateTableForm.Name">
                <Form.Label>Table</Form.Label>
                <Form.Control type="text" 
                              placeholder="Enter a name for the table..."
                              onChange={onNameChange}
                              value={formData.table}
                />
            </Form.Group>

            <Form.Label>Columns</Form.Label>
            {formData.columns.map((column, index) => (
                <ColumnControl key={index} 
                               value={column}
                               onChange={e => onColumnChange(e, index)}
                />
            ))}
            <div className="d-flex justify-content-end gap-1">
                <Button onClick={onAddColumn}>Add</Button>
                <Button onClick={onRemoveColumn}>Remove</Button>
            </div>

            <Button type="submit">Submit</Button>
        </Form>
    );
}