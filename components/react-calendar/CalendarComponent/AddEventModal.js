import { useEffect, useState } from 'react';
// import styles from'../../../layout/AddEventModal.scss';

import Modal from './Modal';
import { CAL_FORMAT, initialFormData } from './helpers/constants';
import moment from 'moment';

export default function AddEventModal({
  modalVisible,
  handleModalClose,
  handleModalSave,
  handleModalDelete,
  initialModalData,
  isEditingEvent,
  dateSelected
}) {
  const [formData, setFormData] = useState(initialFormData);
  const initialValidationData = !!formData.title && !!formData.time;
  const [isValidated, setIsValidated] = useState(initialValidationData);

  useEffect(() => {
    if (!initialModalData) return;

    setFormData(initialModalData);
  }, [initialModalData]);

  useEffect(() => {
    if (!formData.title || !formData.time) return setIsValidated(false);

    setIsValidated(true);
  }, [formData.title, formData.time]);

  function handleFormInputChange({ target }) {
    setFormData((prevState) => ({ ...prevState, [target.name]: target.value }));
  }

  function handleSave(ev) {
    ev.preventDefault();

    handleModalSave(formData);
  }

  return (
    <div>
      hh
    </div>
    // <Modal
    //   title={isEditingEvent ? 'Edit the event' : 'Add a new event'}
    //   subtitle={moment(dateSelected).format(CAL_FORMAT)}
    //   isVisible={modalVisible}
    //   isDisabled={!isValidated}
    //   handleClose={handleModalClose}
    //   handleSave={handleSave}
    //   handleDelete={isEditingEvent && handleModalDelete.bind(null, formData)}
    // >
    //   <section className="modal-field">
    //     <label htmlFor="modal_field_title">Title *</label>
    //     <input
    //       type="text"
    //       name="title"
    //       id="modal_field_title"
    //       value={formData.title}
    //       onChange={handleFormInputChange}
    //     />
    //   </section>

    //   <section className="modal-field">
    //     <label htmlFor="modal_field_place">Place</label>
    //     <input
    //       type="text"
    //       name="place"
    //       id="modal_field_place"
    //       value={formData.place}
    //       onChange={handleFormInputChange}
    //     />
    //   </section>

    //   <section className="modal-field">
    //     <label htmlFor="modal_field_time">Time *</label>
    //     <input
    //       type="time"
    //       name="time"
    //       id="modal_field_time"
    //       value={formData.time}
    //       onChange={handleFormInputChange}
    //       step={60 * 15}
    //     />
    //   </section>

    //   <section className="modal-field">
    //     <label htmlFor="modal_field_description">Description</label>
    //     <textarea
    //       name="description"
    //       id="modal_field_description"
    //       value={formData.description}
    //       onChange={handleFormInputChange}
    //     ></textarea>
    //   </section>

    //   <div className="modal-info">Mandatory fields (*)</div>
    // </Modal>
  );
}
