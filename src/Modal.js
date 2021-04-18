import * as React from "react";
import { createPortal } from "react-dom";
import './Modal.css';

const Modal = ({ name, description, percent, iconUrl, isVisible, hideModal }) => {

  function clickOffModal() {
    var modal = document.getElementById("modal");
    window.onclick = (event) => {
      if (event.target === modal) {
        hideModal();
      }
    }
  }

  return isVisible
    ? createPortal(
      <div className="modal" id="modal" onClick={clickOffModal}>
        <div className="modal-content">
          <button className="close" onClick={hideModal}>
            X
          </button>
          <img className="icon" src={iconUrl} alt={name} width="80px" height="80px" />
          <h2>{name}</h2>
          <div className="percentBar">
            <div className="percentBarFill" style={{ width: `${percent}%` }}>
            </div>
            <div className="percentText">
              {Math.round(10 * percent) / 10}%
            </div>
          </div>
          <h4>
            {description}
          </h4>
        </div>
      </div>,
      document.body,
    )
    : null;
};

export default Modal;