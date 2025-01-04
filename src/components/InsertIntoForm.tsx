import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { TypeValue } from "./TypeValueControl";

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
        values: []
    });

    /**
     * 
     * @param e 
     */
    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setFormData(prevState => ({
            ...prevState,
            values: prevState.values.map((value, i) => index === i ? e.target.value : value)
        }));
    };

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sql = `INSERT INTO ${table} () VALUES ()`;
        onSubmit(sql);
    };

    return (
        <Form onSubmit={submitHandler}>
            {columns.map((column, index) => (
                <Form.Group key={index} 
                            as={Row}
                            className="mb-3" 
                            controlId={`InsertIntoTable.${column.value}`}
                >
                    <Col>
                        <Form.Label>{column.value}</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="text" 
                                      placeholder="Enter a name for the table..."
                                      onChange={e => valueChangeHandler(e as any, index)}
                                      value={formData.values[index]}
                        />
                    </Col>
                </Form.Group>
            ))}

            <Button type="submit">Submit</Button>
        </Form>
    );
}