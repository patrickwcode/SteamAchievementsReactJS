import React from 'react';
import ReactPaginate from 'react-paginate';
import GameAchievement from './GameAchievement';
import TileAchievement from './TileAchievement';
import useModal from './useModal';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            achievements: [],
            achievementsTiled: [],
            offset: 0,
            perPage: 50,
            currentPage: 0,
            pageRangeDisplayed: 10,
            tileView: false,
        };
    }

    async getAchievements() {
        const res = await fetch(`http://localhost:8080/tf2`);
        const data = await res.json();
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
        const sliceTiled = data.slice(this.state.offset, this.state.offset + this.state.perPage);
        const achievements = slice.map(achievement =>
            <GameAchievement
                key={achievement.achievementId}
                name={achievement.achievementName}
                id={achievement.achievementId}
                description={achievement.achievementDescription}
                percent={achievement.achievementPercent}
                iconUrl={achievement.achievementIconUrl}
            />
        )
        const achievementsTiled = sliceTiled.map(achievement =>
            <TileAchievement
                key={achievement.achievementId}
                name={achievement.achievementName}
                id={achievement.achievementId}
                description={achievement.achievementDescription}
                percent={achievement.achievementPercent}
                iconUrl={achievement.achievementIconUrl}
            />
        )

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            achievements,
            achievementsTiled
        })
    }

    async componentDidMount() {
        this.getAchievements();
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset,
        }, () => {
            this.getAchievements()
        });
    };

    sortAchievements = () => {
        const { achievements } = this.state
        const sel = document.getElementById("filter-select").value;
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

    tileCheckboxToggle = () => {
        const checkbox = document.getElementById('tile-view-checkbox').checked;
        this.setState ({ tileView: checkbox });
    }

    render() {
        const tileViewToggle = () => {
            console.log("Hello toggle");
            // this.setState ({ tileView: !this.state.tileView })
            if (this.state.tileView) {
                return (
                <div>
                    {console.log("Hello Tiled return")}
                    {this.state.achievementsTiled}
                </div>
                )
            } else {
                return (
                <div>
                    {console.log("Hello normal return")}
                    {this.state.achievements}
                </div>
                )
            }
        }
        return (
            <div>
                <div className="search-filters">
                    <label for="filter-select">Sort By:</label>
                    <select name="filters" id="filter-select" onChange={this.sortAchievements}>
                        <option value="original">Original List</option>
                        <option value="percent-ascending">% Ascending</option>
                        <option value="percent-descending">% Descending</option>
                        <option value="name-ascending">Name Ascending</option>
                        <option value="name-descending">Name Descending</option>
                    </select>
                    <label for="tile-view-checkbox">Tile View</label>
                    <input type="checkbox" id="tile-view-checkbox" onChange={this.tileCheckboxToggle}></input>
                </div>
                {tileViewToggle()}
                <div>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </div>
        );
    }
}

export default App;