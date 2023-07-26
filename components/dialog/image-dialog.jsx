import { Button, Modal } from "react-bootstrap";

const ImageDialog = ({ show, src, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} className="image-dialog">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img src={src} className="modal__img__center"/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageDialog;
