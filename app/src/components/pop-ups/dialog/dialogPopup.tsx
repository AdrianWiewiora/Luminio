import React from "react";
import { useNavigate } from "react-router-dom";
import "./dialogPopup.scss";

type DialogPopupProps = {
  message: string;
  redirectPath: string;
  onClose: () => void;
};

const DialogPopup = ({ message, redirectPath, onClose }: DialogPopupProps) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectPath);
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <p className="dialog-message">{message}</p>
        <button className="dialog-button" onClick={handleRedirect}>
          Dalej
        </button>
      </div>
    </div>
  );
};

export default DialogPopup;
