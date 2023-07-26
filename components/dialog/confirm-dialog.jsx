import { Button, Modal } from "react-bootstrap";

const ConfirmDialog = ({ show, onConfirm, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>Conirmation message</Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
