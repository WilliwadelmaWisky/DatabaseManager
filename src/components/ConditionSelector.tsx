import { ChangeEvent, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { TypeValue } from "./TypeValueSelector";

/**
 * 
 */
const OPERATORS = Object.freeze(["<", "<=", "=", ">=", ">"]);

/**
 * 
 */
export interface Condition {
    columnIndex: number,
    operator: string,
    value: string
}

/**
 * 
 */
interface Props {
    columns: TypeValue[]
    onChange: (condition: Condition) => void
}

/**
 * 
 */
export default function ConditionSelector({ columns, onChange }: Props) {

    const [condition, setCondition] = useState<Condition>({
        columnIndex: 0,
        operator: OPERATORS[0],
        value: ""
    });

    /**
     * 
     * @param e 
     */
    const columnChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCondition = { ...condition, columnIndex: Number(e.target.value) };
        setCondition(newCondition);
        onChange(newCondition);
    };

    /**
     * 
     * @param e 
     */
    const operatorChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCondition = { ...condition, operator: e.target.value };
        setCondition(newCondition);
        onChange(newCondition);
    };

    /**
     * 
     * @param e 
     */
    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newCondition = { ...condition, value: e.target.value };
        setCondition(newCondition);
        onChange(newCondition);
    };

    return (
        <Form.Group as={Row} className="mb-3">
            <Col>
                <Form.Select value={condition.columnIndex}
                             onChange={columnChangeHandler}
                >
                    {columns.map((column, index) => (
                        <option key={index} 
                                value={index}
                        >{column.value}</option>
                    ))}
                </Form.Select>
            </Col>
            <Col sm="3">
                <Form.Select value={condition.operator} 
                             onChange={operatorChangeHandler}
                >
                    {OPERATORS.map((operator, index) => (
                        <option key={index} 
                                value={operator}
                        >{operator}</option>
                    ))}
                </Form.Select>
            </Col>
            <Col>
                <Form.Control type="text"
                              value={condition.value}
                              onChange={valueChangeHandler}
                />
            </Col>
        </Form.Group>
    );
}