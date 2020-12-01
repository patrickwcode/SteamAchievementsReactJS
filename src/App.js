import React from 'react';
import './App.css';
import { achievementModal } from './Modal.js';

const achievements = [
  {
    name: 'Race for the Pennant 1',
    description: '#1 Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
  {
    name: 'Race for the Pennant 2',
    description: '#2 Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
  {
    name: 'Race for the Pennant 3',
    description: '#3 Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
  {
    name: 'Race for the Pennant 4',
    description: '#4 Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
  {
    name: 'Race for the Pennant 5',
    description: '#5 Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
];

function GameAchievement(props) {
  return (
    <div>
      {props.name}
      {props.description}
      {props.percent}
      {props.iconUrl}
    </div>
  )
}

function App() {
  return (
    <ol>
      { achievements.map(achievement => (
        <li key={achievement.name}>
          { <GameAchievement name={achievement.name} />}
          { <GameAchievement description={achievement.description} />}
          { <GameAchievement percent={achievement.percent} />}
          { <GameAchievement iconUrl={achievement.iconUrl} />}
          <button onClick={() => achievementModal(achievement.name, achievement.description)}>
            Show description
          </button>
        </li>
      ))}
    </ol>
  );
}

// ReactDOM.render(<App />, document.getElementById('achievements-container'));

export default App;