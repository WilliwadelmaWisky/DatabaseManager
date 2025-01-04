import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row  from "react-bootstrap/Row";

/**
 * 
 */
export interface TypeValue {
    typeIndex: number,
    value: string
}

/**
 * 
 */
interface Props {
    types: readonly string[],
    defaultValue: TypeValue
    onChange: (typeValue: TypeValue) => void
}

/**
* 
*/
export function TypeValueSelector({ types, defaultValue, onChange }: Props) {

    const [data, setData] = useState<TypeValue>(defaultValue);

    /**
     * 
     * @param e 
     */
    const typeChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const typeValue = { ...data, typeIndex: Number(e.target.value)}
        setData(typeValue);
        onChange(typeValue);
    };

    /**
     * 
     * @param e 
     */
    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const typeValue = { ...data, value: e.target.value}
        setData(typeValue);
        onChange(typeValue);
    };

    return (
        <Form.Group as={Row} className="mb-3">
            <Col>
                <Form.Select value={data.typeIndex}
                             onChange={typeChangeHandler}
                >
                    {types.map((type, index) => (
                        <option key={index} 
                                value={index}
                        >{type}</option>
                    ))}
                </Form.Select>
            </Col>
            <Col>
                <Form.Control type="text" 
                              placeholder="Enter a value..." 
                              value={data.value}
                              onChange={valueChangeHandler}
                />
            </Col>
        </Form.Group>
    );
}