import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import Form from "../../components/common/form";
import Input from "../../components/common/input";
import SportsModel from "./sports-modal.js";
import NotifyService from "../../shared/notify-service";
import { addSport, updateSport } from "../../store/sport/actions";
import Button from "../../components/common/button";

const AddSportModal = ({ isModalShow, handleCloseModal, editData }) => {
  const dispatch = useDispatch();
  const [sportsModal, setSportsModal] = useState(new SportsModel());

  // handle change
  const handleChange = ({ currentTarget: input }) => {
    const obj = { ...sportsModal };
    obj[input.name] = input.value;
    setSportsModal(obj);
  };

  useEffect(() => {
    setSportsModal(editData);
  }, [editData]);

  // handle save
  const handleSave = async () => {
    if (sportsModal.name == "") {
      NotifyService.fail("Please fill all fields!!");
      return;
    }
    if (!sportsModal.sports_id) {
      dispatch(addSport(sportsModal));
    } else {
      dispatch(updateSport({ ...sportsModal, id: sportsModal.sports_id }));
    }

    setSportsModal(new SportsModel());
    handleCloseModal();
  };

  return (
    <>
      <Modal show={isModalShow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sport</Modal.Title>
        </Modal.Header>

        {/* modal body */}
        <Modal.Body>
          <Form className="form col-12">
            <Input
              type="text"
              onChange={handleChange}
              value={sportsModal.name}
              className="form-control"
              name="name"
              label="Name"
              placeholder="Type name"
            />
          </Form>
        </Modal.Body>

        {/* modal footer */}
        <Modal.Footer>
        <Button label={'Cancel'} primary={false} onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button label={'Save'} primary onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSportModal;
