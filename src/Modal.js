import * as React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isVisible, hideModal, achievementName, achievementPercent, achievementDescription, achievementIconUrl }) => {
console.log(isVisible);
  return isVisible
    ? createPortal(
      <div>
        <div>
          <h5>{achievementName}</h5>
          <span>
            {achievementPercent}
            {achievementDescription}
            {achievementIconUrl}
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