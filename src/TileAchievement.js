import React from 'react'

export default function TileAchievement(props) {

    return (
        <div className="achieveRowTile">
            <div className="achieveImgHolderTile">
                <img src={props.iconUrl}
                    alt="Achievement Logo" width="64" height="64" border="0" />
            </div>
        </div>
    )
}