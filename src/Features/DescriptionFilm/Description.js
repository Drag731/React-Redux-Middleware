import React, { Component } from 'react';
import Stars from '../../components/Stars/Stars.js';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getFormData } from '../Form/FormReducers'
import { getUserRole } from '../Header/HeaderReducers';

import { addNewMovie, deleteMovie, updateMovie } from '../MainPage/MainPageActions.js'
import { getFilteredMovies, getSelectedMovie } from '../MainPage/MainPageReducers.js'

import './Description.css'

class Description extends Component {

    render() {
        const activeMovie = this.props.getSelectedMovie || this.props.movies[0];
        const { userRole } = this.props;

        return (
            <div className="description">
                <div className="description-title">
                    <p>{activeMovie.title}</p>
                    <p>Likes: {activeMovie.likes}</p>
                    <Stars 
                        handlerOfLikesAndStars={this.props.handlerOfLikesAndStars}
                        currentMovie={activeMovie} 
                        stars={activeMovie.stars} 
                        id={activeMovie.id} 
                    />
                    <div className="description-control-buttons">
                        <Link to={'/editMovie'}>
                            <button style={{
                                background: 'green',
                                display: userRole === 'admin' ? 'inline-block' : 'none',
                            }}>EDIT</button>
                        </Link>
                        <button 
                            onClick={this.props.deleteMovie.bind(this, activeMovie.id)}
                            style={{
                                background: 'green',
                                display: userRole === 'admin' ? 'inline-block' : 'none',
                            }}>DELETE</button>
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
    getFormData: getFormData(state),
    getSelectedMovie: getSelectedMovie(state),
});

const mapDispatchToProps = {
    updateMovie: (data, id) => updateMovie(data, id),
    deleteMovie: (id) => deleteMovie(id),
    addNewMovie: (data, id) => addNewMovie(data, id)
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);