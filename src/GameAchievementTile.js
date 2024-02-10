import React from 'react';
import Modal from "./Modal";
import useModal from "./useModal";

export default function GameAchievementTile(props) {
    const { name, id, description, percent, iconUrl } = props;
    const { isVisible, toggleModal } = useModal();

    return (
        <div className="achieveRowTile fade-in">
            <div className="achieveImgHolderTile">
                <img src={iconUrl}
                    alt={name} width="80px" height="80px" onClick={toggleModal} />
                {name}
                <Modal name={name} description={description} percent={percent} iconUrl={iconUrl} isVisible={isVisible} hideModal={toggleModal} />
            </div>
        </div>
    );
}