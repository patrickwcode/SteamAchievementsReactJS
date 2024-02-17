import React from "react";

export default function GameAchievementBar(props) {
  const { name, id, description, percent, iconUrl } = props;
  return (
    <div>
      <div className="achieveRow fade-in">
        <div className="achieveImgHolder">
          <img src={iconUrl} alt={name} />
        </div>
        <div className="achieveTxtHolder">
          <div className="achieveFill" style={{ width: `${percent}%` }}></div>
          <div className="achievePercent">{Math.round(10 * percent) / 10}%</div>
          <div className="achieveTxt">
            <h3>{name}</h3>
            {description ? (
              <h5>{description}</h5>
            ) : (
              <h5 style={{ opacity: 0 }}>{name}</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
