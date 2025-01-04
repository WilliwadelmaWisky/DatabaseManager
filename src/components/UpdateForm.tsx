import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ConditionSelector from "./ConditionSelector";
import { TypeValue } from "./TypeValueSelector";
import { Condition } from "./ConditionSelector";

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
    conditions: Condition[]
}

/**
 * 
 */
export default function UpdateForm({ table, columns, onSubmit }: Props) {

    const [formData, setFormData] = useState<FormData>({
        conditions: []
    });

    /**
     * 
     */
    const addCondition = () => {
        setFormData(prevState => ({ 
            ...prevState, 
            conditions: [ ...prevState.conditions, { columnIndex: 0, operator: "", value: "" }]
        }));
    };

    /**
     * 
     */
    const removeCondition = () => {
        setFormData(prevState => ({ 
            ...prevState, 
            conditions: prevState.conditions.slice(0, -1)
        }));
    };

    /**
     * 
     * @param condition 
     * @param index 
     */
    const conditionChangeHandler = (condition: Condition, index: number) => {
        setFormData(prevState => ({ 
            ...prevState, 
            conditions: prevState.conditions.map((cond, i) => index === i ? condition : cond)
        }));
    };

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sql = `UPDATE ${table} ${formData.conditions.map(cond => `WHERE ${columns[cond.columnIndex].value} ${cond.operator} ${cond.value}`).join(" ")}`;
        onSubmit(sql);
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Label>Columns</Form.Label>
            {formData.conditions.map((_, index) => (
                <ConditionSelector key={index} 
                                   columns={columns}
                                   onChange={cond => conditionChangeHandler(cond, index)}
                />
            ))}
            <div className="d-flex justify-content-end gap-1">
                <Button onClick={addCondition}>Add</Button>
                <Button onClick={removeCondition}>Remove</Button>
            </div>
            <Button type="submit">Submit</Button>
        </Form>
    );
}