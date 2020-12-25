import React from 'react'

export default function GameAchievement(achievement) {
    return (
        <>
        {achievement.name}
        {achievement.description}
        {achievement.percent}
        {achievement.iconUrl}
      </>
    )
}