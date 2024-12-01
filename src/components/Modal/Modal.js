import React from 'react';
import './Modal.css';

const Modal = ({ showModal, report, onClose }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{report.title}</h2>
        <p><strong>Category:</strong> {report.category}</p>
        <p><strong>Location:</strong> {report.location}</p>
        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>Status:</strong> {report.status}</p>
        <p><strong>Severity:</strong> {report.severity}</p>
        <img src={report.image} alt={report.title} />
      </div>
    </div>
  );
};

export default Modal;
