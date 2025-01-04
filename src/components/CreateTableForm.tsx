import { ChangeEvent, FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TypeValueControl, TypeValue } from "./TypeValueControl";

/**
 * 
 */
interface FormData {
    table: string
    columns: TypeValue[]
}

/**
 * 
 */
interface Props {
    types: readonly string[],
    onSubmit: (sql: string) => void
}

/**
 * 
 */
export default function CreateTableForm({ types, onSubmit }: Props) {

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
    const onColumnChange = (typeValue: TypeValue, index: number) => {
        setFormData(prevState => ({
            ...prevState,
            columns: prevState.columns.map((col, i) => index === i ? typeValue : col)
        }));
    }

    /**
     * 
     */
    const onAddColumn = () => {
        setFormData(prevState => ({
            ...prevState,
            columns: [...prevState.columns, { typeIndex: 0, value: "" }]
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

        const sql = `CREATE TABLE ${formData.table} (${formData.columns.map(col => col.value + " " + types[col.typeIndex]).join(", ")})`;
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
            {formData.columns.map((_, index) => (
                <TypeValueControl key={index} 
                                  types={types}
                                  defaultValue={{typeIndex: 0, value: ""}}
                                  onChange={typeValue => onColumnChange(typeValue, index)}
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