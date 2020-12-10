import * as React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isVisible, hideModal }) => {

  return isVisible
    ? createPortal(
      <div>
        <div>
          <h5>Modal</h5>
          <span>
            Why this modal has popped up
            </span>
        </div>
        <button onClick={hideModal}>
          Close
          </button>
      </div>,
      document.body,
    )
    : null;
}; 

export default Modal;