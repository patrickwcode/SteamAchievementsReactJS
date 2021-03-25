import React from 'react';
import Modal from "./Modal";
import useModal from "./useModal";

export default function GameAchievementTile(props) {

    const { isVisible, toggleModal } = useModal();

    return (
        <div className="achieveRowTile">
            <div className="achieveImgHolderTile">
                <img src={props.iconUrl}
                    alt={props.name} width="64" height="64" border="0" onClick={toggleModal} />
                <Modal name={props.name} id={props.achievementId} description={props.description} percent={props.percent} iconUrl={props.iconUrl} isVisible={isVisible} hideModal={toggleModal} />
            </div>
        </div>
    );
}