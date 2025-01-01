import { ChangeEvent } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row  from "react-bootstrap/Row";

/**
 * 
 */
export interface ColumnData {
    type: Types,
    name: string
}

/**
 * 
 */
export enum Types {
    INT = 0,
    VARCHAR
}

/**
 * 
 */
interface Props {
    value: ColumnData
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

/**
* 
*/
export function ColumnControl({ value, onChange }: Props) {

   /**
    * 
    * @param e 
    */
   const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
       onChange(e);
   };

   /**
    * 
    * @param e 
    */
   const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
       onChange(e);
   };

   return (
       <Form.Group as={Row} className="mb-3">
           <Col>
               <Form.Select value={value.type}
                            onChange={onTypeChange}
               >
                   {Object.values(Types).filter(type => typeof type === 'number').map((type, index) => (
                       <option key={index} 
                               value={type}
                        >{Types[type]}</option>
                   ))}
               </Form.Select>
           </Col>
           <Col>
               <Form.Control type="text" 
                             placeholder="Enter a value..." 
                             value={value.name}
                             onChange={onNameChange}
               />
           </Col>
       </Form.Group>
   );
}