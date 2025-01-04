import { ChangeEvent, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { TypeValue } from "./TypeValueSelector";

/**
 * 
 */
interface Props {
    defaultValue: string,
    column: TypeValue,
    onChange: (value: string) => void
}

/**
 * 
 */
export default function TypeValueLabel({ defaultValue, column, onChange }: Props) {

    const [value, setValue] = useState<string>(defaultValue);

    /**
     * 
     * @param e 
     */
    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <Form.Group as={Row}
                    className="mb-3" 
                    controlId={`InsertIntoTable.${column.value}`}
        >
            <Col sm="3">
                <Form.Label>{column.value}</Form.Label>
            </Col>
            <Col>
                <Form.Control type="text" 
                              placeholder="Enter a value..."
                              onChange={valueChangeHandler}
                              value={value}
                />
            </Col>
        </Form.Group>
    )
}