import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddEvent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const addEvent = () => {
    setShow(true);
  }

  return(
    <>
      <button onClick={addEvent}>Add Event To MyQ</button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>

            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  )
}

export default AddEvent;