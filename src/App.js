import React from 'react';
import GameAchievement from './GameAchievement';
import useModal from './useModal';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            achievements: [],
        };

        this.getAchievements = this.getAchievements.bind(this);
    }

    async getAchievements() {
        const res = await fetch(`http://localhost:8080/tf2`);
        const data = await res.json();
        return data;
    }

    async componentDidMount() {
        const achievements = await this.getAchievements();
        this.setState({ achievements });
    }

    render() {
      this.componentDidMount();
      return (
          <div>
              {this.state.achievements.map((achievement) => (
                  <GameAchievement
                      name={achievement.achievementName}
                      description={achievement.achievementDescription}
                      percent={achievement.achievementPercent}
                      iconUrl={achievement.achievementIconUrl}
                  />
              ))}
          </div>
      );
  }
}

export default App;