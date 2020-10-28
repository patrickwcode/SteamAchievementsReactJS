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
    return (
      // <div>
      //   {games.filter(game => game.appId === 440).map(filteredGame => (
      //     <li>
      //       {filteredGame.name}
      //     </li> */}
      //   {/* ))}
      // </div>
      <div class="achieveRow ">
        <div class="achieveImgHolder">
          <img src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/440/924764eea604817d3c14de9640ae6422c7cdfb7a.jpg"
            alt="achievement icon" width="64" height="64" border="0"></img>
        </div>
        <div class="achieveTxtHolder">
          <div class="achieveFill" style={{ width: '55%' }}>
          </div>
          <div class="achievePercent">55.0%</div>
          <div class="achieveTxt">
            <h3>Race for the Pennant</h3>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laudantium, totam, nostrum id ad sunt vero provident obcaecati reiciendis consequuntur quo</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
