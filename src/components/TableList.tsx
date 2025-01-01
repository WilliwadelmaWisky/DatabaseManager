import { Button, ButtonGroup } from "react-bootstrap";

/**
 * 
 */
interface Props {
    tables: string[]
    onSelect: (table: string) => void
}

/**
 * 
 */
export default function TableList({ tables, onSelect: onSelected }: Props) {
    return (
        <ButtonGroup>
            {tables.map((table, index) =>(
              <Button key={index} 
                      onClick={() => onSelected(table)}
              >{table}</Button>
            ))}
        </ButtonGroup>
    )
}