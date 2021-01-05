import React from 'react';
import Modal from './Modal';

function CreateModal(isVisible, toggleModal) {
    return (
        <div>
            <Modal isVisible={isVisible} hideModal={toggleModal} />
        </div>
    )
}

export default CreateModal;
