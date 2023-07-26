import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import Form from "../../components/common/form";
import Input from "../../components/common/input";
import FeatureModel from "./feature-modal.js";
import NotifyService from "../../shared/notify-service";
import { addFeature, updateFeature } from "../../store/feature/actions";
import Button from "../../components/common/button";

const AddFeaterModal = ({ isModalShow, handleCloseModal, editData }) => {
  const dispatch = useDispatch();
  const [featureModal, setFeatureModal] = useState(new FeatureModel());

  // handle change
  const handleChange = ({ currentTarget: input }) => {
    const obj = { ...featureModal };
    obj[input.name] = input.value;
    setFeatureModal(obj);
  };

  useEffect(() => {
    setFeatureModal(editData);
  }, [editData]);

  // handle save
  const handleSave = async () => {
    if (featureModal.name == "") {
      NotifyService.fail("Please fill all fields!!");
      return;
    }
    if (!featureModal.feature_id) {
      dispatch(addFeature(featureModal));
    } else {
      dispatch(updateFeature({ ...featureModal, id: featureModal.feature_id }));
    }

    setFeatureModal(new FeatureModel());
    handleCloseModal();
  };

  return (
    <>
      <Modal show={isModalShow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Feature</Modal.Title>
        </Modal.Header>

        {/* modal body */}
        <Modal.Body>
          <Form className="form col-12">
            <Input
              type="text"
              onChange={handleChange}
              value={featureModal.name}
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

export default AddFeaterModal;
