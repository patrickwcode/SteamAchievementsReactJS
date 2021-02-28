import React from 'react';

export default function GameAchievement(props) {
  return (

    //   num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // That will fix your percentage display issue

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString 

    // The instructions on how to use it are towards the bottom of that page.ctrl + f for that line of code at the beginning of this message

    // LOOK INTO PAGINATION FOR RENDERING ACHIEVEMENTS
    <div>
      <div className="achieveRow">
        <div className="achieveImgHolder">
          <img src={props.iconUrl}
            alt="Achievement Logo" width="64" height="64" border="0" />
        </div>
        <div className="achieveTxtHolder">
          <div className="achieveFill" style={{ width: `${props.percent}%` }}>
          </div>
          <div className="achievePercent">{props.percent}%</div>
          <div className="achieveTxt">
            <h3>{props.name}</h3>
            <h5>{props.description}
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
} 