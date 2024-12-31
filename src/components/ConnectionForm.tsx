import { ChangeEvent, FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const DEFAULT_PORT = 9000

/**
 * 
 */
interface Props {
    onSubmit: (s: string) => void
}

/**
 * 
 */
export default function ConnectionForm({ onSubmit }: Props) {

    const [port, setPort] = useState<string>(`${DEFAULT_PORT}`);

    /**
     * 
     * @param e 
     */
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPort(e.currentTarget.value);
    };

    /**
     * 
     * @param e 
     */
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(`http://localhost:${port}`);
    };

    return (
        <Form onSubmit={submitHandler}>
          <InputGroup>
            <InputGroup.Text>localhost</InputGroup.Text>
            <Form.Control type="text" 
                          required 
                          pattern="[0-9]+" 
                          placeholder={`${DEFAULT_PORT}`}
                          onChange={changeHandler} 
                          value={port}
            />
            <Button type="submit">Connect</Button>
          </InputGroup> 
        </Form>
    );
}