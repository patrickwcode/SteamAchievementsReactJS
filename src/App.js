import React from 'react';
import './App.css';
import Modal from "./Modal";
import useModal from "./useModal";

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

// function GameAchievementsMap() {
//   return (
//     <ol>
//       { achievements.map(achievement => (
//         <li key={achievement.name}>
//           { <GameAchievement name={achievement.name} /> }
//           { <GameAchievement description={achievement.description} /> }
//           { <GameAchievement percent={achievement.percent} /> }
//           { <GameAchievement iconUrl={achievement.iconUrl} /> }
//         </li>
//       ))}
//     </ol>
//   );
// }

const App = () => {
  const {isVisible, toggleModal} = useModal();
  return (
    <div>
      <button onClick={toggleModal}>
        Show modal
      </button>
      <Modal isVisible={isVisible} hideModal={toggleModal} />

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
    </div>
  );
};

export default App;