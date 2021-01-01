import React from 'react'

export default function GameAchievement(achievement) {
  return (
    //   <div>
    //   <h1>{achievement.name}</h1>
    //   {achievement.description}
    //   {achievement.percent}
    //   {achievement.iconUrl}
    // </div>
    <div class="achieveRow">
      <div class="achieveImgHolder">
        <img src={achievement.iconUrl}
          alt="Achievement Logo" width="64" height="64" border="0" />
      </div>
      <div class="achieveTxtHolder">
        <div class="achieveFill" style={{width: `${achievement.percent}%`}}>
        </div>
        <div class="achievePercent">{achievement.percent}%</div>
        <div class="achieveTxt">
          <h3>{achievement.name}</h3>
          <h5>{achievement.description}
              </h5>
        </div>
      </div>
    </div>
  )
}