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
      offset: 0,
      perPage: 30,
      currentPage: 0,
      pageRangeDisplayed: 8,
      gamesFoundArr: [],
      tileView: false,
      hasAchievements: true,
      isLoading: true,
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

    await fetch(`http://localhost:10000/achievements?id=${appId}`)
      .then((response) => response.json())
      .then((json) => (data = json))
      .catch((err) =>
        console.error("Request Failed. No achievements were found.", err)
      );

    if (data) {
      this.setState({
        achievements: data,
        hasAchievements: true,
        isLoading: false,
      });
      this.displayAchievementsOnPage();
      this.resetPages();
    } else {
      this.setState({
        hasAchievements: false,
        isLoading: false,
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
        showModal={this.showModal}
      />
    ));
    this.setState({
      pageCount: Math.ceil(dataSorted.length / this.state.perPage),
      achievementBars,
      achievementTiles,
    });
  }

  async getIdByApp() {
    const input = document.getElementById("search-bar");
    const appName = input.value.toLowerCase();
    let app = null;

    input.addEventListener("keyup", () => {
      clearTimeout(this.timeoutGetId);

      // If user deletes search, content will not disappear and make another API call.
      if (
        input.value === "" ||
        input.value === this.state.appName.toLowerCase()
      ) {
        return;
      } else {
        this.timeoutGetId = setTimeout(async () => {
          await fetch(`http://localhost:10000/applist?name=${appName}`)
            .then((response) => response.json())
            .then((json) => (app = json))
            .catch((err) =>
              console.error("Request Failed. No Achievements were found.", err)
            );

          // FIX HOW APPS DISPLAY
          // USE applist-filter instead?

          // if (app) {
          //   this.setState({
          //     appId: app.appid,
          //     appName: app.name,
          //     isLoading: true,
          //     achievementBars: [],
          //     achievementTiles: [],
          //   });
          // await this.getAchievements(app.appid);
          // } else {
          await this.searchForApps(appName);
          // }
        }, 800);
      }
    });
  }

  async searchForApps(appName) {
    let apps = {};
    let gamesFoundArr = [];
    this.setState({ gamesFoundArr: [] });

    await fetch(`http://localhost:10000/applist-filter?name=${appName}`)
      .then((response) => response.json())
      .then((json) => (apps = json))
      .catch((err) =>
        console.error("Request Failed. No games were found.", err)
      );

    // Creates an array for all apps that match appName from search.
    Object.keys(apps).map((key) => {
      const appElem = (
        <div
          className="search-result"
          onClick={async () => {
            this.setState(
              {
                appId: apps[key].appid,
                appName: apps[key].name,
                isLoading: true,
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
    this.hideSearchResults();
    this.setState({ gamesFoundArr: gamesFoundArr });
  }

  hideSearchResults = () => {
    let searchResults = document.getElementsByClassName("search-result");
    window.addEventListener("click", (e) => {
      if (e.target.className !== "search-result") {
        for (const result of searchResults) {
          result.style.display = "none";
        }
      }
    });
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

  tileCheckboxToggle = () => {
    const checkbox = document.getElementById("tile-view-checkbox").checked;
    this.setState({ tileView: checkbox });
  };

  showModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const tileViewToggle = () => {
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
        if (!this.state.isLoading) {
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
    if (this.state.hasAchievements && !this.state.isLoading) {
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
                onChange={() => {
                  this.getIdByApp();
                }}
              />
              <div id="search-results">{this.state.gamesFoundArr}</div>
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
            onChange={this.tileCheckboxToggle}
          />
        </div>
        {tileViewToggle()}
        {this.state.isLoading ? <div className="circle-loader" /> : null}
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
