import { Button, Modal } from "react-bootstrap";

const BookingCustomerDetails = ({ show, bookingRecord, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} className="image-dialog">
      <Modal.Header closeButton>
        <h4>Customer details</h4>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{bookingRecord?.customer?.name}</th>
              <th>{bookingRecord?.customer?.mobile}</th>
              <th>{bookingRecord?.customer?.email}</th>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingCustomerDetails;
