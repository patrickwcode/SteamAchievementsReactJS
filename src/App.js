import React from 'react';
import ReactPaginate from 'react-paginate';
import GameAchievement from './GameAchievement';
import useModal from './useModal';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            achievements: [],
            offset: 0,
            perPage: 10,
            currentPage: 0
        };
    }

    async getAchievements() {
        const res = await fetch(`http://localhost:8080/tf2`);
        const data = await res.json();
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
        const achievements = slice.map(achievement =>
            <GameAchievement
                key={achievement.achievementName}
                name={achievement.achievementName}
                description={achievement.achievementDescription}
                percent={achievement.achievementPercent}
                iconUrl={achievement.achievementIconUrl}
            />
        )

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),

            achievements
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
    render() {
        return (
            <div>
                {this.state.achievements}
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
        );
    }
}

export default App;