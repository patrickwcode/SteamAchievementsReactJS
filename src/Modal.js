import * as React from "react";
import { createPortal } from "react-dom";

const Modal = ({ name, description, percent, iconUrl, isVisible, hideModal }) => {

  return isVisible
  ? createPortal(
    <div>
      <div>
        <h5>{name}</h5>
        <h4>{percent}</h4>
        <span>
          {description}
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