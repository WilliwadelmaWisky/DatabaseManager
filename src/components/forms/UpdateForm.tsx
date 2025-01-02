import { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

/**
 * 
 */
interface Props {
    table: string,
    onSubmit: (sql: string) => void
}

/**
 * 
 */
export default function UpdateForm({ table, onSubmit }: Props) {

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sql = "UPDATE";
        onSubmit(sql);
    };

    return (
        <Form onSubmit={submitHandler}>
            
            <Button type="submit">Submit</Button>
        </Form>
    );
}