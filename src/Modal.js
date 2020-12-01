import React, { Component } from 'react';
import './Modal.css';

function achievementModal(achievementName, achievementDescription) {
    return (
      <div id="achievement-modal" class="modal">
  
        { alert(achievementDescription) }
        
        { myScript() };
        <div class="modal-content">
          <div class="modal-header">
            <span class="close-modal">&times;</span>
            <h2> {achievementName} </h2>
          </div>
          <div class="modal-body">
            <p> {achievementDescription} </p>
          </div>
        </div>
  
      </div>
    )
  }
  
  function myScript() {
    var modal = document.getElementById("achievement-modal");
    var openModal = document.getElementsByClassName("square")[0];
    var closeModal = document.getElementsByClassName("close-modal")[0];
  
    openModal.onclick = () => {
      modal.style.display = "block";
    }
  
    closeModal.onclick = () => {
      modal.style.display = "none";
    }
  
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }   

export class Modal extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export {achievementModal};
