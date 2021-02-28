import React from 'react'

export default function TileAchievement(props) {
    console.log("Hello from Tiled");
    console.log(props);
    return (
        <div className="achieveImgHolder">
            <img src={props.iconUrl}
                alt="Achievement Logo" width="64" height="64" border="0" />
        </div>
    )
}
