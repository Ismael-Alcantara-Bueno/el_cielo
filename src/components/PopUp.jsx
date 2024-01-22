import React from "react";
import "../CSS/popup.css";

const PopUp = ({ isOpen, onClose, onYes, onNo }) => {
  return (
    <div className={`modal popup ${isOpen ? "open" : ""} tabindex="-1"`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              ¿Estás seguro que quieres hacer eso?
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" onClick={onClose}>
                &times;
              </span>
            </button>
          </div>
          <div class="modal-footer">
            <button className="btn btn-danger mx-2" onClick={onYes}>
              Sí
            </button>
            <button className="btn btn-success mx-2" onClick={onNo}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
