import { render } from '@testing-library/react';
import React from 'react';
import './App.css';

// const gamesList = document.getElementById('games-list');
// const searchBar = document.getElementById('search-bar');
// searchBar.addEventListener('keyup', (e) => {
//   const searchString = e.target.value.toLowerCase();
// });
// const filteredGames = games.filter(game => { 
//   return (
//     game.name.includes(searchString)
//   );
// })
// displayGames(filteredGames);
// });

// const displayGames = (games) => {
//   const htmlString = games.map((game) => {
//           return `
//           <li class="game">
//               <h2>${game.name}</h2>
//           </li>
//       `;
//       })
//       .join('');
//   gamesList.innerHTML = htmlString;
// };

const games = [
  {
    name: 'Team Fortress 2',
    appId: 440,
  },
  {
    name: 'Counter-Strike: Source',
    appId: 123,
  }
];

class App extends React.Component {
  render() {
    return (<div></div>);
  }
}

export default App;
