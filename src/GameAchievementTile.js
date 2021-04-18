import React from 'react';
import Modal from "./Modal";
import useModal from "./useModal";

export default function GameAchievementTile(props) {

    const { isVisible, toggleModal } = useModal();

    return (
        <div className="achieveRowTile">
            <div className="achieveImgHolderTile">
                <img src={props.iconUrl}
                    alt={props.name} width="80px" height="80px" onClick={toggleModal} />
                {props.name}
                <Modal name={props.name} description={props.description} percent={props.percent} iconUrl={props.iconUrl} isVisible={isVisible} hideModal={toggleModal} />
            </div>
        </div>
    );
}