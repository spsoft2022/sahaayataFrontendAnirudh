import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Modal.css'; // Include your CSS here

const ConfirmationModal = ({ show, message, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-backdrop">
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header">
            <div className="icon-box">
              <i className="material-icons"></i>
            </div>
            <h4 className="modal-title w-100">Awesome!</h4>
          </div>
          <div className="modal-body">
            <p className="text-center">{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success btn-block" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
      </div>

    </div>
  );
};

export default ConfirmationModal;
