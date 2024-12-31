import Modal from "react-bootstrap/Modal";

/**
 * 
 */
interface Props {
    title: string,
    form: JSX.Element,
    isVisible: boolean,
    onHide: () => void
}

/**
 * 
 */
export default function ModalForm({ title, form, isVisible, onHide }: Props) {

    return (
        <Modal show={isVisible} fullscreen='sm-down' onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{form}</Modal.Body>
        </Modal>
    )
}