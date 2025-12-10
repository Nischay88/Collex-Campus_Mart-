import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelectionModal.css';

const RoleSelectionModal = ({ isOpen, onClose, isLogin }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRoleSelection = (role) => {
    const path = isLogin 
      ? `/login/${role}` 
      : `/signup/${role}`;
    navigate(path);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Choose your role</h2>
        <div className="role-buttons">
          <button 
            className="role-btn buyer-btn"
            onClick={() => handleRoleSelection('buyer')}
          >
            I am a Buyer
          </button>
          <button 
            className="role-btn seller-btn"
            onClick={() => handleRoleSelection('seller')}
          >
            I am a Seller
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;

