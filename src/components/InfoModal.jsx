import React from 'react';
import './InfoModal.css';

const InfoModal = ({ title, content, onClose }) => {
  if (!title) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        <div className="modal-body">
          {content}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
