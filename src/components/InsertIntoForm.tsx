import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TypeValue } from "./TypeValueSelector";
import TypeValueLabel from "./TypeValueLabel";

/**
 * 
 */
interface Props {
    table: string,
    columns: TypeValue[],
    onSubmit: (sql: string) => void
}

/**
 * 
 */
interface FormData {
    values: string[]
}

/**
 * 
 */
export default function InsertIntoForm({ table, columns, onSubmit }: Props) {

    const [formData, setFormData] = useState<FormData>({
        values: Array(columns.length).fill("")
    });

    /**
     * 
     * @param value 
     */
    const valueChangeHandler = (value: string, index: number) => {
        setFormData(prevState => ({
            ...prevState,
            values: prevState.values.map((val, i) => index === i ? value : val)
        }));
    };

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sql = `INSERT INTO ${table} (${columns.map(col => col.value).join(", ")}) VALUES (${formData.values.join(", ")})`;
        onSubmit(sql);
    };

    return (
        <Form onSubmit={submitHandler}>
            {columns.map((column, index) => (
                <TypeValueLabel key={index} 
                                defaultValue="" 
                                column={column} 
                                onChange={value => valueChangeHandler(value, index)}
                />
            ))}
            <Button type="submit">Submit</Button>
        </Form>
    );
}