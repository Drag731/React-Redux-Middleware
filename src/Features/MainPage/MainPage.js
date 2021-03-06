import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './MainPage.css';
import ItemMovie from '../../components/ItemMovie/ItemMovie.js';
import Description from '../DescriptionFilm/Description.js';
import Header from '../Header/Header';
import MainPageSortMovies from './Components/MainPageSortMovies'

import { deleteMovie, updateMovie, fetchMovies, sortMovieByLikes, 
         sortMovieByRating, search, selectMovie } from './MainPageActions';

import { getisFetching, getData, getFlagSearch, 
         getFilteredMovies } from './MainPageReducers';


class MainPage extends Component {

    componentDidMount() { this.props.fetchMovies() }



    search = (flagSearch) => { this.props.search(flagSearch) }

    handlerOfLikesAndStars = (data, id) => { this.props.updateMovie(data, id) }

    deleteMovie = (id) => { this.props.deleteMovie(id) }

    render() {
        const { movies, sortMovieByLikes, sortMovieByRating, params, data } = this.props;
        const activeMovie = movies.filter((el) => {
            return el.id === parseInt(params.id, 10)[0] || data[0];
        });

        return (
            this.props.isFetching
            ? "Loading ..."
            : <div className="movies">
                <Header /> 
                <hr /> 
                <div className="movies-left">
                    <MainPageSortMovies 
                        sortMovieByLikes={sortMovieByLikes}
                        sortMovieByRating={sortMovieByRating}
                        search={ this.search }
                    />
                    {movies.map((movie) => {
                        return (<ItemMovie 
                                    key={movie.id}
                                    id={movie.id}
                                    likes={movie.likes}
                                    stars={movie.stars}
                                    currentMovie={movie} 
                                    handlerOfLikesAndStars={this.handlerOfLikesAndStars}
                                    selectMovie={this.props.selectMovie}
                                /> );
                    })}
                </div>
                <Description
                    key={activeMovie.id} 
                    handlerOfLikesAndStars={this.handlerOfLikesAndStars}
                    params={params}
                />    
            </div>
        )
    }
}

const mapStateToProps = state => ({
    flagSearch: getFlagSearch(state),
    movies: getFilteredMovies(state),
    data: getData(state),
    isFetching: getisFetching(state)
});

const mapDispatchToProps = {
    fetchMovies: () => fetchMovies(),
    sortMovieByLikes: () => sortMovieByLikes(),
    sortMovieByRating: () => sortMovieByRating(),
    search: (flagSearch) => search(flagSearch),
    updateMovie: (data, id) => updateMovie(data, id),
    deleteMovie: (id) => deleteMovie(id),
    selectMovie: (id) => selectMovie(id)
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

MainPage.propTypes = {
    flagSearch: PropTypes.string,
    movies: PropTypes.array,
    data: PropTypes.array,
    isFetching: PropTypes.bool,
    fetchMovies: PropTypes.func,
    sortMovieByLikes: PropTypes.func,
    sortMovieByRating: PropTypes.func,
    updateMovie: PropTypes.func,
    deleteMovie: PropTypes.func,
    selectMovie: PropTypes.func
}