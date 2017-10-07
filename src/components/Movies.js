import React, { Component } from 'react'
import './App.css';
import ItemMovie from './ItemMovie.js';
import Description from './Description.js';
import { fetchMovies, sortMovieByLikes, sortMovieByRating, search, likeUp, likeDown, changeStars, changeButtonBGColor } from '../Features/MainPage/MainPageActions';
import { getData, getMovieByLikes, getMovieByRating, getFlagSearch, getMovies, getInitialMovies, getLike, getStars, getButtonBGColor } from '../Features/MainPage/MainPageReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Movies extends Component {

    componentDidMount() {
        this.props.fetchMovies();
    }

    sortMovieByLikes = (sort) => { this.props.sortMovieByLikes(sort) }

    sortMovieByRating = (sort) => { this.props.sortMovieByRating(sort) }

    search(event) { this.props.search(event.target.value) }

    likeUp = (id) => { this.props.likeUp(id) }

    likeDown = (id) => { this.props.likeDown(id) }

    changeStars = (id, movieId) => { this.props.changeStars(id, movieId) }

    changeButtonBGColor = (flagButtonBGColor) => { this.props.changeButtonBGColor(flagButtonBGColor) }

    render() {
        console.log(this.props.data);
        const { data } = this.props;
        console.log(data);
        const activeMovie = (this.props.movies.filter((el) => el.id === parseInt(this.props.params.id, 10))[0]) || this.props.initialMovies[0];
        return (
            <div className="movies">
                <div className="movies-header">
                    <div className="controlButtons">
                        <button onClick={this.changeButtonBGColor.bind(this, this.props.flagButtonBGColor)} style={{background: this.props.flagButtonBGColor ? '#ccc' : 'green'}}>USER</button>
                        <button onClick={this.changeButtonBGColor.bind(this, this.props.flagButtonBGColor)} style={{background: this.props.flagButtonBGColor ? 'green' : '#ccc'}}>ADMIN</button>
                    </div>
                    <div className="create-movie">
                        <Link to={'/createMovie'}>
                            <button style={{background: 'green', 
                                    display: this.props.flagButtonBGColor ? 'inline-block' : 'none'}}
                            >CREATE MOVIE</button>
                        </Link>
                    </div>
                    <h2 className="movies-header-name">Movies</h2>
                </div>  
                <hr /> 
                <div className="movies-left">
                    <div className="sort-movies">
                        <h2>Sort movies</h2>
                        <div className="buttons">
                            <button onClick={this.sortMovieByLikes.bind(this, this.props.sortByLikes)}>By likes</button>
                            <button onClick={this.sortMovieByRating.bind(this, this.props.sortByRating)}>By rating</button><br/>
                            <input onChange={this.search.bind(this)} className="search" type="search" /> 
                        </div>
                    </div>
                    {this.props.movies.map((movie) => {
                        return (<ItemMovie 
                                    key={movie.id}
                                    id={movie.id}
                                    likes={movie.likes}
                                    stars={movie.stars}
                                    currentMovie={movie} 
                                    likeUp={this.likeUp}
                                    likeDown={this.likeDown}
                                    changeStars={this.changeStars}
                                /> );
                    })}
                </div>
                <Description
                    key={this.props.initialMovies.id} 
                    activeMovie={activeMovie}
                    stars={activeMovie.stars}
                    id={activeMovie.id}
                    flagButtonBGColor={this.props.flagButtonBGColor}
                    changeStars={this.changeStars} 
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sortByLikes: getMovieByLikes(state),
    sortByRating: getMovieByRating(state),
    flagSearch: getFlagSearch(state),
    movies: getMovies(state),
    initialMovies: getInitialMovies(state),
    flagLike: getLike(state),
    flagStars: getStars(state),
    flagButtonBGColor: getButtonBGColor(state),
    data: getData(state),
});

const mapDispatchToProps = {
    fetchMovies: () => fetchMovies(),
    sortMovieByLikes: (sortByLikes) => sortMovieByLikes(sortByLikes),
    sortMovieByRating: (sortByRating) => sortMovieByRating(sortByRating),
    search: (flagSearch) => search(flagSearch),
    likeUp: (id) => likeUp(id),
    likeDown: (id) => likeDown(id),
    changeStars: (id, movieId) => changeStars(id, movieId),
    changeButtonBGColor: (flagButtonBGColor) => changeButtonBGColor(flagButtonBGColor)
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);