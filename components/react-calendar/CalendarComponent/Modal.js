import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import './Modal.scss';
import useOnClickOutside from './helpers/useOnClickOutside';
import Form from '../../common/form';
export default function Modal({
  title,
  subtitle,
  isVisible,
  isDisabled,
  handleClose,
  handleSave,
  handleDelete = () => null,
  children
}) {
  const ref = useRef();
  useOnClickOutside(ref, handleClose);

  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        handleClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return (
    isVisible && (
      <div className="modal" aria-modal="true">
        <div className="modal-main" onClick={handleSave} ref={ref}>
          <header className="modal-header">
            <div>
              <h2 className="modal-title">{title}</h2>
              <p className="modal-subtitle">{subtitle}</p>
            </div>

            <button
              type="button"
              className="modal-close"
              onClick={handleClose}
              autoFocus
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </header>

          <div className="modal-body">{children}</div>

          <div className="modal-actions">
            {handleDelete && (
              <button
                type="button"
                className="modal-action-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}

            <button
              type="button"
              className="modal-action-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-action-save"
              disabled={isDisabled}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
}
