import React from 'react';
import App from './App';
import GameAchievement from './GameAchievement';

class Sorting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            achievements: [],
            achievementsSort: '',
        };
    }

    sortAchievements = (props) => {
        console.log("Hi from Sorting");
        const { achievements } = this.props.achievements;
        const { sel } = document.getElementById('filter').value;
        if (sel === "original") {
            this.setState({
                achievements: achievements.sort((a, b) => a.props.id - b.props.id).map(achievement =>
                    <GameAchievement
                        key={achievement.props.id}
                        name={achievement.props.name}
                        id={achievement.props.id}
                        description={achievement.props.description}
                        percent={achievement.props.percent}
                        iconUrl={achievement.props.iconUrl}
                    />
                )
            })
        }
        if (sel === "percent-ascending") {
            this.setState({
                achievements: achievements.sort((a, b) => a.props.percent - b.props.percent).map(achievement =>
                    <GameAchievement
                        key={achievement.props.id}
                        name={achievement.props.name}
                        id={achievement.props.id}
                        description={achievement.props.description}
                        percent={achievement.props.percent}
                        iconUrl={achievement.props.iconUrl}
                    />
                )
            })
        }
        if (sel === "percent-descending") {
            this.setState({
                achievements: achievements.sort((a, b) => b.props.percent - a.props.percent).map(achievement =>
                    <GameAchievement
                        key={achievement.props.id}
                        name={achievement.props.name}
                        id={achievement.props.id}
                        description={achievement.props.description}
                        percent={achievement.props.percent}
                        iconUrl={achievement.props.iconUrl}
                    />
                )
            })
        }
        if (sel === "name-ascending") {
            this.setState({
                achievements: achievements.sort((a, b) => a.props.name.charAt(0).toUpperCase() > b.props.name.charAt(0).toUpperCase()).map(achievement =>
                    <GameAchievement
                        key={achievement.props.id}
                        name={achievement.props.name}
                        id={achievement.props.id}
                        description={achievement.props.description}
                        percent={achievement.props.percent}
                        iconUrl={achievement.props.iconUrl}
                    />
                )
            })
        }
        if (sel === "name-descending") {
            this.setState({
                achievements: achievements.sort((a, b) => a.props.name.charAt(0).toUpperCase() < b.props.name.charAt(0).toUpperCase()).map(achievement =>
                    <GameAchievement
                        key={achievement.props.id}
                        name={achievement.props.name}
                        id={achievement.props.id}
                        description={achievement.props.description}
                        percent={achievement.props.percent}
                        iconUrl={achievement.props.iconUrl}
                    />
                )
            })
        }
    }

    render() {
        return (
            <div>
                <div className="search-filters">
                    <label for="filter-select">Sort By:</label>
                    <select name="filters" id="filter" onChange={this.sortAchievements}>
                        <option value="original">Original List</option>
                        <option value="percent-ascending">% Ascending</option>
                        <option value="percent-descending">% Descending</option>
                        <option value="name-ascending">Name Ascending</option>
                        <option value="name-descending">Name Descending</option>
                    </select>
                    <label for="checkbox-tile-view">Tile View</label>
                    <input type="checkbox" id="checkbox-tile-view" value="tile-view" onChange={this.toggleTileView}></input>
                </div>
                <div>
                    {this.state.achievements}
                </div>
            </div>
        );
    }
}

export default Sorting;
