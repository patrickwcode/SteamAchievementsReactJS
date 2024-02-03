import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import GameAchievementBar from "./GameAchievementBar";
import GameAchievementTile from "./GameAchievementTile";
import Modal from "./Modal";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appId: 440,
      achievements: [],
      achievementBars: [],
      achievementTiles: [],
      appName: "Team Fortress 2",
      prevSearch: "Team Fortress 2",
      offset: 0,
      perPage: 30,
      currentPage: 0,
      pageRangeDisplayed: 8,
      gamesFoundArr: [],
      tileView: false,
      hasAchievements: true,
      hasSearched: false,
      areAchievementsLoading: true,
    };

    this.getAchievements = this.getAchievements.bind(this);
  }

  async componentDidMount() {
    this.timeoutController = null;
    this.timeoutGetId = null;
    await this.getAchievements(this.state.appId);
  }

  async getAchievements(appId) {
    let data = null;

    await fetch(
      `https://achievements.patrickwcode.com/api/achievements?id=${appId}`
    )
      .then((response) => response.json())
      .then((json) => (data = json))
      .catch((err) =>
        console.error("Request Failed. No achievements were found.", err)
      );

    if (data) {
      this.setState({
        achievements: data,
        hasAchievements: true,
        areAchievementsLoading: false,
      });
      this.displayAchievementsOnPage();
      this.resetPages();
    } else {
      this.setState({
        hasAchievements: false,
        areAchievementsLoading: false,
      });
    }
  }

  displayAchievementsOnPage() {
    const dataSorted = this.sortAchievements(this.state.achievements);
    const dataSlice = dataSorted.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const achievementBars = dataSlice.map((achievement) => (
      <GameAchievementBar
        key={achievement.id}
        name={achievement.name}
        id={achievement.id}
        description={achievement.description}
        percent={achievement.percent}
        iconUrl={achievement.iconUrl}
      />
    ));
    const achievementTiles = dataSlice.map((achievement) => (
      <GameAchievementTile
        key={achievement.id}
        name={achievement.name}
        id={achievement.id}
        description={achievement.description}
        percent={achievement.percent}
        iconUrl={achievement.iconUrl}
        showModal={this.toggleModal}
      />
    ));
    this.setState({
      pageCount: Math.ceil(dataSorted.length / this.state.perPage),
      achievementBars,
      achievementTiles,
    });
  }

  async searchForApp() {
    const input = document.getElementById("search-bar");
    const appName = input.value.toLowerCase();
    let apps = {};

    input.addEventListener("keyup", () => {
      clearTimeout(this.timeoutGetId);

      // If user deletes search or presses a non-character key, this will not make another API call.
      if (
        input.value === "" ||
        input.value === this.state.appName ||
        input.value === this.state.prevSearch
      ) {
        return;
      } else {
        this.timeoutGetId = setTimeout(async () => {
          await fetch(
            `https://achievements.patrickwcode.com/api/applist-filter?name=${appName}`
          )
            .then((response) => response.json())
            .then((json) => (apps = json))
            .catch((err) =>
              console.error("Request Failed. No Achievements were found.", err)
            );
          this.createGamesFoundArray(apps, appName);
        }, 700);
      }
    });
  }

  createGamesFoundArray = (apps, appName) => {
    let gamesFoundArr = [];
    this.setState({ gamesFoundArr: [] });
    Object.keys(apps).map((key) => {
      const appElem = (
        <div
          className="search-result"
          onClick={async () => {
            this.setState(
              {
                appId: apps[key].appid,
                appName: apps[key].name,
                areAchievementsLoading: true,
              },
              async () => {
                await this.getAchievements(apps[key].appid);
              }
            );
          }}
        >
          <img
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${apps[key].appid}/capsule_184x69.jpg`}
            alt={key}
          />
        </div>
      );

      // If game is an exact match, then it is pushed to front of array.
      if (appName === key) {
        gamesFoundArr = [appElem, ...gamesFoundArr];
      } else {
        gamesFoundArr.push(appElem);
      }
      return gamesFoundArr;
    });

    this.setState(
      {
        gamesFoundArr: gamesFoundArr,
        prevSearch: appName,
        hasSearched: true,
      },
      () => {
        window.addEventListener("click", this.toggleSearchResults);
        document.getElementById("search-bar").click();
      }
    );
  }

  toggleSearchResults = (e) => {
    const searchResults = document.getElementById("search-results");
    if (e.target.id === "search-bar" && this.state.hasSearched) {
      searchResults.style.display = "block";
    } else {
      searchResults.style.display = "none";
    }
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.displayAchievementsOnPage();
      }
    );
  };

  resetPages = () => {
    // Selects first page of pagination
    if (this.state.currentPage !== 0) {
      document.querySelector('[aria-label="Page 1"]').click();
    } else {
      document.querySelector('[aria-current="page"]').click();
    }
    this.setState(
      {
        currentPage: 0,
        offset: 0,
        selected: 0,
      },
      () => {
        this.displayAchievementsOnPage();
      }
    );
  };

  sortAchievements = (achievements) => {
    const achievementsSorted = [];
    const sel = document.getElementById("filter-select").value;
    if (sel === "percent-ascending") {
      achievements
        .sort((a, b) => a.percent - b.percent)
        .map((achievement) => achievementsSorted.push(achievement));
    }
    if (sel === "percent-descending") {
      achievements
        .sort((a, b) => b.percent - a.percent)
        .map((achievement) => achievementsSorted.push(achievement));
    }
    if (sel === "name-ascending") {
      achievements
        .sort(
          (a, b) =>
            a.name.charAt(0).toUpperCase() > b.name.charAt(0).toUpperCase()
        )
        .map((achievement) => achievementsSorted.push(achievement));
    }
    if (sel === "name-descending") {
      achievements
        .sort(
          (a, b) =>
            a.name.charAt(0).toUpperCase() < b.name.charAt(0).toUpperCase()
        )
        .map((achievement) => achievementsSorted.push(achievement));
    }
    return achievementsSorted;
  };

  toggleTileCheckbox = () => {
    const checkbox = document.getElementById("tile-view-checkbox").checked;
    this.setState({ tileView: checkbox });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const toggleTileView = () => {
      if (this.state.hasAchievements) {
        if (this.state.tileView) {
          return (
            <div>
              <div className="achieveTileContainer">
                {this.state.achievementTiles}
              </div>
            </div>
          );
        } else {
          return (
            <div className="achievements-container">
              {this.state.achievementBars}
            </div>
          );
        }
      } else {
        if (!this.state.areAchievementsLoading) {
          return (
            <div className="fade-in" style={{ marginTop: "3em" }}>
              <h1>No Achievements Found</h1>
            </div>
          );
        }
      }
    };

    // Displays or hides Pagination so resetPages() won't crash app.
    let stylesPaginate;
    if (this.state.hasAchievements && !this.state.areAchievementsLoading) {
      stylesPaginate = { display: "block" };
    } else {
      stylesPaginate = { display: "none" };
    }
    return (
      <div>
        <title>Steam Achievements Search</title>
        <header>
          <h1>Steam Achievements Search</h1>
        </header>
        <section>
          <article>
            <div className="search-container">
              <input
                id="search-bar"
                type="text"
                placeholder="Search Games..."
                onClick={this.toggleSearchResults}
                onChange={() => {
                  this.searchForApp();
                }}
              />
              <div id="search-results" style={{ display: "none" }}>
                {this.state.gamesFoundArr.length > 0 ? (
                  this.state.gamesFoundArr
                ) : (
                  <h1>No Games Found.</h1>
                )}
              </div>
            </div>
            <div className="game-info">
              <div className="subtitle">
                <h2>Global Gameplay Stats</h2>
                <h3>{this.state.appName}</h3>
              </div>
              <div className="game-image-container">
                <img
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.state.appId}/capsule_184x69.jpg`}
                  alt={this.state.appName}
                />
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
          <input
            type="checkbox"
            id="tile-view-checkbox"
            onChange={this.toggleTileCheckbox}
          />
        </div>
        {toggleTileView()}
        {this.state.areAchievementsLoading ? (
          <div className="circle-loader" />
        ) : null}
        <div style={stylesPaginate}>
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
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

export default App;
