import React from 'react';
import './App.css';

const achievements = [
  {
    name: 'Race for the Pennant',
    description: 'Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
  {
    name: 'Race for the Pennant',
    description: 'Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
  {
    name: 'Race for the Pennant',
    description: 'Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
  {
    name: 'Race for the Pennant',
    description: 'Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
  {
    name: 'Race for the Pennant',
    description: 'Run 25 kilometers.',
    percent: 54.9,
    iconUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg'
  },
];

function GameAchievement(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <h1>{props.description}</h1>
      <h1>{props.percent}</h1>
      <h1>{props.iconUrl}</h1>
    </div>
  )
}

function App() {
  return (
    <ol>
      { achievements.map(achievement => (
        <li key={achievement.name}>
          { <GameAchievement name={achievement.name} /> }
          { <GameAchievement description={achievement.description} /> }
          { <GameAchievement percent={achievement.percent} /> }
          { <GameAchievement iconUrl={achievement.iconUrl} /> }
        </li>
      ))}
    </ol>
  );
}

// ReactDOM.render(<App />, document.getElementById('achievements-container'));

export default App;