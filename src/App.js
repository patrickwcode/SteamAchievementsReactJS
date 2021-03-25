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
            achievements: [],
            achievementsBar: [],
            achievementsTile: [],
            offset: 0,
            perPage: 30,
            currentPage: 0,
            pageRangeDisplayed: 10,
            tileView: false,
        };

        this.getAchievements = this.getAchievements.bind(this);
    }

    async getAchievements() {
        const res = await fetch(`http://localhost:8080/tf2`);
        const data = await res.json();
        this.setState({ achievements: data });
        const dataSorted = this.sortAchievements(this.state.achievements);
        const slice = dataSorted.slice(this.state.offset, this.state.offset + this.state.perPage);
        const achievementsBar = slice.map(achievement =>
            <GameAchievementBar
                key={achievement.achievementId}
                name={achievement.achievementName}
                id={achievement.achievementId}
                description={achievement.achievementDescription}
                percent={achievement.achievementPercent}
                iconUrl={achievement.achievementIconUrl}
            />
        )
        const achievementsTile = slice.map(achievement =>
            <GameAchievementTile
                key={achievement.achievementId}
                name={achievement.achievementName}
                id={achievement.achievementId}
                description={achievement.achievementDescription}
                percent={achievement.achievementPercent}
                iconUrl={achievement.achievementIconUrl}
                showModal={this.openModal}
            />
        )

        this.setState({
            pageCount: Math.ceil(dataSorted.length / this.state.perPage),
            achievementsBar,
            achievementsTile,
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
            this.getAchievements();
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

        if (sel === "original") {
            achievements.sort((a, b) => a.achievementId - b.achievementId).map(achievement =>
                achievementsSorted.push(achievement)
            )
        }
        if (sel === "percent-ascending") {
            achievements.sort((a, b) => a.achievementPercent - b.achievementPercent).map(achievement =>
                achievementsSorted.push(achievement)
            )
        }
        if (sel === "percent-descending") {
            achievements.sort((a, b) => b.achievementPercent - a.achievementPercent).map(achievement =>
                achievementsSorted.push(achievement)
            )
        }
        if (sel === "name-ascending") {
            achievements.sort((a, b) => a.achievementName.charAt(0).toUpperCase() > b.achievementName.charAt(0).toUpperCase()).map(achievement =>
                achievementsSorted.push(achievement)
            )
        }
        if (sel === "name-descending") {
            achievements.sort((a, b) => a.achievementName.charAt(0).toUpperCase() < b.achievementName.charAt(0).toUpperCase()).map(achievement =>
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
                <div className="search-filters">
                    <label for="filter-select">Sort By:</label>
                    <select name="filters" id="filter-select" onChange={this.resetPages}>
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