import React, { Component } from 'react'
import './App.css';
import ItemMovie from './ItemMovie.js';
import Description from './Description.js';
import { deleteMovie, updateMovie, fetchMovies, sortMovieByLikes, sortMovieByRating, search, changeButtonBGColor } from '../Features/MainPage/MainPageActions';
import { getisFetching, getMovies, getData, getMovieByLikes, getMovieByRating, getFlagSearch, getButtonBGColor } from '../Features/MainPage/MainPageReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Movies extends Component {

    componentDidMount() {
        this.props.fetchMovies();
    }

    sortMovieByLikes = (sort) => { this.props.sortMovieByLikes(sort) }

    sortMovieByRating = (sort) => { this.props.sortMovieByRating(sort) }

    search(event) { this.props.search(event.target.value) }

    changeButtonBGColor = (flagButtonBGColor) => { this.props.changeButtonBGColor(flagButtonBGColor) }

    handleSubmit = (currentMovie, id, event) => {
        let data
        if (event.target.alt === 'likeUp') {
            data = {...currentMovie, likes: currentMovie.likes + 1};
        } else if (event.target.alt === 'likeDown') {
             data = {...currentMovie, likes: currentMovie.likes - 1};
        }
        if (event.target.tagName === 'I') {
            data = {...currentMovie, stars: parseInt(event.target.id, 10)};
        }
        return this.props.updateMovie(data, id);
    }

    deleteMovie = (id) => {
        this.props.deleteMovie(id);
    }

    render() {
        const { movies } = this.props;
        const activeMovie = (movies.filter((el) => el.id === parseInt(this.props.params.id, 10))[0]) || this.props.data[0];
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
                    {movies.map((movie) => {
                        return (<ItemMovie 
                                    key={movie.id}
                                    id={movie.id}
                                    likes={movie.likes}
                                    stars={movie.stars}
                                    currentMovie={movie} 
                                    handleSubmit={this.handleSubmit}

                                /> );
                    })}
                </div>
                {
                    this.props.isFetching
                    ? "Loading ..."
                    : <Description
                    key={activeMovie.id} 
                    activeMovie={activeMovie}
                    stars={activeMovie.stars}
                    id={activeMovie.id}
                    flagButtonBGColor={this.props.flagButtonBGColor}
                    handleSubmit={this.handleSubmit}
                    deleteMovie={this.deleteMovie}
                />
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sortByLikes: getMovieByLikes(state),
    sortByRating: getMovieByRating(state),
    flagSearch: getFlagSearch(state),
    flagButtonBGColor: getButtonBGColor(state),
    movies: getMovies(state),
    data: getData(state),
    isFetching: getisFetching(state)
});

const mapDispatchToProps = {
    fetchMovies: () => fetchMovies(),
    sortMovieByLikes: (sortByLikes) => sortMovieByLikes(sortByLikes),
    sortMovieByRating: (sortByRating) => sortMovieByRating(sortByRating),
    search: (flagSearch) => search(flagSearch),
    changeButtonBGColor: (flagButtonBGColor) => changeButtonBGColor(flagButtonBGColor),
    updateMovie: (data, id) => updateMovie(data, id),
    deleteMovie: (id) => deleteMovie(id)
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);