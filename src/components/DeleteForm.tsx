import { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

/**
 * 
 */
interface Props {
    onSubmit: (sql: string) => void
}

/**
 * 
 */
export default function DeleteForm({ onSubmit }: Props) {

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sql = `DELETE FROM`;
        onSubmit(sql);
    };

    return (
        <Form onSubmit={submitHandler}>
            <Button type="submit">Submit</Button>
        </Form>
    );
}