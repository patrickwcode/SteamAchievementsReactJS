import * as React from "react";
import { createPortal } from "react-dom";
import './Modal.css';

const Modal = ({ name, description, percent, iconUrl, isVisible, hideModal }) => {

  return isVisible
  ? createPortal(
    <div class="modal">
      <div class="content">
        <h1>{name}</h1>
        <h2>{percent}</h2>
        <span>
          {description}
        </span>
      </div>
      <button class="close" onClick={hideModal}>
        Close
      </button>
    </div>,
    document.body,
  )
  : null;
};

export default Modal;