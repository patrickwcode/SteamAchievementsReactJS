import React from 'react';

export default function GameAchievementTile(props) {

    return (
        <div className="achieveRowTile">
            <div className="achieveImgHolderTile">
                <img src={props.iconUrl}
                    alt={props.name} width="64" height="64" border="0" onClick={props.showModal} />
                <button type="button" onClick={props.showModal}>Show Modal</button>
            </div>
        </div>
    )
}