import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import CreateTableForm from "./forms/CreateTableForm";

/**
 * 
 */
interface Props {
    onControlClick: (content: JSX.Element) => void
}

/**
 * 
 */
export default function ControlGroup({ onControlClick }: Props) {
    return (
        <ButtonGroup>
            <Button variant='secondary' onClick={() => onControlClick(<CreateTableForm onSubmit={sql => console.log(sql)}/>)}>Create</Button>
            <Button variant='secondary'>Alter</Button>
            <Button variant='primary'>Insert</Button>
            <Button variant='primary'>Update</Button>
            <Button variant='danger'>Delete</Button>
            <Button variant='danger'>Drop</Button>
        </ButtonGroup>
    );
}