import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import GameAchievementBar from './GameAchievementBar';
import GameAchievementTile from './GameAchievementTile';
import Modal from './Modal';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appId: 440,
            achievements: [],
            achievementsBar: [],
            achievementsTile: [],
            appList: [],
            appName: "Team Fortress 2",
            offset: 0,
            perPage: 30,
            currentPage: 0,
            pageRangeDisplayed: 8,
            tileView: false,
        };

        this.getAchievements = this.getAchievements.bind(this);
    }

    async getAchievements(appId) {
        const res = await fetch(`http://localhost:10000/achievements?id=${appId}`);
        const data = await res.json();
        this.setState({ achievements: data });
        const dataSorted = this.sortAchievements(this.state.achievements);
        const slice = dataSorted.slice(this.state.offset, this.state.offset + this.state.perPage);
        const achievementsBar = slice.map(achievement =>
            <GameAchievementBar
                key={achievement.id}
                name={achievement.name}
                id={achievement.id}
                description={achievement.description}
                percent={achievement.percent}
                iconUrl={achievement.iconUrl}
            />
        )
        const achievementsTile = slice.map(achievement =>
            <GameAchievementTile
                key={achievement.id}
                name={achievement.name}
                id={achievement.id}
                description={achievement.description}
                percent={achievement.percent}
                iconUrl={achievement.iconUrl}
                showModal={this.openModal}
            />
        )
        this.setState({
            pageCount: Math.ceil(dataSorted.length / this.state.perPage),
            achievementsBar,
            achievementsTile,
        })
    }

    async getAppList() {
        let appName;
        const res = await fetch(`http://localhost:10000/appList`);
        const data = await res.json();

        // Gets name of game with appId
        Object.entries(data).forEach(([key, value]) => {
            if (value.appid === this.state.appId) {
                appName = value.name + '';
            }
        })
        this.setState({
            appList: data,
            appName: appName
        });
    }

    getAppIdByGameName() {
        // If search bar is empty, keep name and image up.
        // If full name is typed out, do not load achievements until clicking game image.
        let input = document.getElementById("search-bar");
        let timeout = null;

        // When user stops typing for 600ms, search for game.
        input.addEventListener('keyup', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                let gameName = input.value.toLowerCase();
                Object.entries(this.state.appList).forEach(([key, value]) => {
                    if (gameName === value.name.toLowerCase() + '') {
                        this.setState({
                            appId: value.appid,
                            appName: value.name,
                        })
                        this.getAchievements(value.appid);
                    }
                })
            }, 500);
        })


    }

    async componentDidMount() {
        this.getAchievements(this.state.appId);
        this.getAppList();
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset,
        }, () => {
            this.getAchievements(this.state.appId);
        });
    }

    resetPages = () => {
        // Selects first page of pagination 
        if (this.state.currentPage !== 0) {
            document.querySelector('[aria-label="Page 1"]').click();
        } else {
            document.querySelector('[aria-current="page"]').click();
        }
        this.setState({
            currentPage: 0,
            offset: 0,
            selected: 0,
        }, () => {
            this.getAchievements();
        });
    }

    sortAchievements = (achievements) => {
        const achievementsSorted = [];
        const sel = document.getElementById("filter-select").value;
        if (sel === "percent-ascending") {
            achievements.sort((a, b) => a.percent - b.percent).map(achievement =>
                achievementsSorted.push(achievement)
            )
        }
        if (sel === "percent-descending") {
            achievements.sort((a, b) => b.percent - a.percent).map(achievement =>
                achievementsSorted.push(achievement)
            )
        }
        if (sel === "name-ascending") {
            achievements.sort((a, b) => a.name.charAt(0).toUpperCase() > b.name.charAt(0).toUpperCase()).map(achievement =>
                achievementsSorted.push(achievement)
            )
        }
        if (sel === "name-descending") {
            achievements.sort((a, b) => a.name.charAt(0).toUpperCase() < b.name.charAt(0).toUpperCase()).map(achievement =>
                achievementsSorted.push(achievement)
            )
        }
        return achievementsSorted;
    }

    tileCheckboxToggle = () => {
        const checkbox = document.getElementById('tile-view-checkbox').checked;
        this.setState({ tileView: checkbox });
    }

    openModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    render() {
        const tileViewToggle = () => {
            if (this.state.tileView) {
                return (
                    <div>
                        <div className="achieveTileContainer">
                            {this.state.achievementsTile}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="achievements-container">
                        {this.state.achievementsBar}
                    </div>
                )
            }
        }

        return (
            <div>
                <section>
                    <article>
                        <div className="search-container">
                            <input id="search-bar"
                                type="text"
                                placeholder="Search Games..."
                                onChange={() => { this.getAppIdByGameName() }}>
                            </input>
                        </div>
                        <div className="game-info">
                            <div className="subtitle">
                                <h2>Global Gameplay Stats</h2>
                                <h3>{this.state.appName}</h3>
                            </div>
                            <div className="game-image-container">
                                <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.state.appId}/capsule_184x69.jpg`} alt={this.state.appName} />
                            </div>
                        </div>
                    </article>
                </section>
                <div className="search-filters">
                    <label for="filter-select">Sort By:</label>
                    <select name="filters" id="filter-select" onChange={this.resetPages}>
                        <option value="percent-descending">% Descending</option>
                        <option value="percent-ascending">% Ascending</option>
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
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </div >
        );
    }
}

export default App;