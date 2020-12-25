import React from 'react';
import './App.css';
import Modal from "./Modal";
import useModal from './useModal';
import achievements from './achievements.json';
import GameAchievement from './GameAchievement';

const App = () => {
  const { isVisible, toggleModal } = useModal();
  return (
    <div>
      <ol>
        {achievements.map(achievement => (
          <li key={achievement.name}>
            { <GameAchievement name={achievement.name}
              description={achievement.description}
              percent={achievement.percent}
              iconUrl={achievement.iconUrl} />}

            <Modal isVisible={isVisible}
              hideModal={toggleModal}
              achievementName={achievement.name}
              achievementPercent={achievement.percent}
              achievementDescription={achievement.description}
              achievementIconUrl={achievement.iconUrl} />

            <button onClick={toggleModal}>
              Show modal
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;