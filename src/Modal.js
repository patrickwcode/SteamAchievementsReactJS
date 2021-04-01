import * as React from "react";
import { createPortal } from "react-dom";
import './Modal.css';

const Modal = ({ name, description, percent, iconUrl, isVisible, hideModal }) => {

  return isVisible
  ? createPortal(
    <div class="modal">
      <div class="content">
        <img class="icon" src={iconUrl} alt={name} width="80px" height="80px"/>
        <h1>{name}</h1>
        <h1>{Math.round(10*percent)/10}%</h1>
        <h4>
          {description}
        </h4>
      </div>
      <button class="close" onClick={hideModal}>
        X
      </button>
    </div>,
    document.body,
  )
  : null;
};

export default Modal;