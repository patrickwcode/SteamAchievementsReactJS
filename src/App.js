import React from 'react';
import './App.css';
import Modal from "./Modal";
import useModal from './useModal';
// import achievements from './achievements.json';
// import APIService from './APIService.js';
import GameAchievement from './GameAchievement';

// function componentDidMount() {
//   APIService.getAchievements().then((data) => {
//     console.log(data);
//   })
//     .catch(function (ex) {
//       console.log('Response parsing failed. Error: ', ex);
//     });;
// }

// let url = 'http://localhost:8080/tf2';
// const componentDidMount = async () => {
// let response = await fetch(url);
// return achievements = await response.json();
// }

const params = {
  method: 'GET',
  headers: {
    'accept': 'application/json'
  }
};

function componentDidMount() {
  fetch('http://localhost:8080/tf2', params)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(e => console.error(e));
}

const achievements = componentDidMount();

// async function getAchievements() {
//   return await
//   fetch('http://localhost:8080/tf2')
//   .then(resp => resp.json());
// }

// const achievements = getAchievements();

const App = () => {
  const { isVisible, toggleModal } = useModal();
  return (
    <div>

      {
        <div>
          {achievements}
        </div>
        // <ol>
        //   {achievements.map(achievement => (
        //     <li key={achievement.name}>
        //       { <GameAchievement name={achievement.name}
        //         description={achievement.description}
        //         percent={achievement.percent}
        //         icon={achievement.iconUrl}
        //       />}

        //       <Modal key={achievement.name}
        //         isVisible={isVisible}
        //         hideModal={toggleModal}
        //         achievementName={achievement.name}
        //         achievementPercent={achievement.percent}
        //         achievementDescription={achievement.description}
        //         achievementIconUrl={achievement.iconUrl} />

        //       <button onClick={toggleModal}>
        //         Show modal
        //     </button>
        //     </li>
        //   ))}
        // </ol>
      }
    </div>
  );
};

export default App;