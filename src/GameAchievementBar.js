import React from 'react';

export default function GameAchievementBar(props) {
  return (
    <div>
      <div className="achieveRow fade-in">
        <div className="achieveImgHolder">
          <img src={props.iconUrl}
            alt={props.name} width="64" height="64" border="0" />
        </div>
        <div className="achieveTxtHolder">
          <div className="achieveFill" style={{ width: `${props.percent}%` }}>
          </div>
          <div className="achievePercent">{Math.round(10 * props.percent) / 10}%</div>
          <div className="achieveTxt">
            <h3>{props.name}</h3>
            <h5>{props.description ? props.description : <h5 style={{ opacity: 0 }}>{props.name}</h5>}
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
} 