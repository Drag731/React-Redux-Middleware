import React, { Component } from 'react';
import Stars from '../../components/Stars/Stars.js';
import Button from '../../components/Button/Button.js';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserRole } from '../Header/HeaderReducers';

import { addNewMovie, deleteMovie, updateMovie, selectMovie } from '../MainPage/MainPageActions.js'
import { getFilteredMovies, getSelectedMovie } from '../MainPage/MainPageReducers.js'

import './Description.css'

class Description extends Component {

    componentDidMount = () => { 
        if (this.props.params.id) {
            this.props.selectMovie(parseInt(this.props.params.id, 10)) 
        }
    }

    render() {

        const { params, getSelectedMovie, movies, handlerOfLikesAndStars, userRole } = this.props;
        let activeMovie;

        if (movies[params.id - 1] && movies[params.id - 1].id === getSelectedMovie.id ) {
            activeMovie = movies[params.id - 1];
        } else {
            activeMovie = getSelectedMovie || movies[0];
        }

        return (
            <div className="description">
                <div className="description-title">
                    <p>{activeMovie.title}</p>
                    <p>Likes: {activeMovie.likes}</p>
                    <Stars 
                        handlerOfLikesAndStars={handlerOfLikesAndStars}
                        currentMovie={activeMovie} 
                        stars={activeMovie.stars} 
                        id={activeMovie.id} 
                    />
                    <div className="description-control-buttons">
                        <Link to={'/editMovie'}>
                            <Button userRole={userRole}>EDIT</Button>
                        </Link>
                        <Link to={'/movies'}>
                            <Button userRole={userRole} onClick={this.props.deleteMovie.bind(this, activeMovie.id)}>DELETE</Button>
                        </Link>
                    </div>
                </div>
                <div className="description-about">
                    <div>
                        <img 
                            className="description-img" 
                            alt={activeMovie.title} 
                            src={activeMovie.posterUrl} 
                        />
                    </div>
                    <p>Director: {activeMovie.director}</p>
                    <p>Actors: {activeMovie.actors.join(', ')}</p>
                    <p>Genres: {activeMovie.genres.join(', ')}</p>
                    <p>Description: {activeMovie.description}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    movies: getFilteredMovies(state),
    userRole: getUserRole(state),
    getSelectedMovie: getSelectedMovie(state),
});

const mapDispatchToProps = {
    updateMovie: (data, id) => updateMovie(data, id),
    deleteMovie: (id) => deleteMovie(id),
    addNewMovie: (data, id) => addNewMovie(data, id), 
    selectMovie: (id) => selectMovie(id)
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);

Description.propTypes = {
    movies: PropTypes.array,
    userRole: PropTypes.string,
    handlerOfLikesAndStars: PropTypes.func,
    getSelectedMovie: PropTypes.object
}

