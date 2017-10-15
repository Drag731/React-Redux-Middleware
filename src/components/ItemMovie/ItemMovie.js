import React, { Component } from 'react';
import Stars from '../Stars/Stars.js';
import likeImg from './likeImg.js';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import './ItemMovie.css'

class ItemMovie extends Component {

    handlerOfLike = (event) => {
        const {id, likes} = this.props.currentMovie
        let data

        if (event.target.alt === 'likeUp') {
            data = {...this.props.currentMovie, likes: likes + 1};
        } else if (event.target.alt === 'likeDown') {
            data = {...this.props.currentMovie, likes: likes - 1};
        }

        return this.props.handlerOfLikesAndStars(data, id)
    }

    render() {
        const {selectMovie, currentMovie} = this.props;
        return (
            <div className="movie-item">
                <div className="likes">
                    <img 
                        onClick={this.handlerOfLike} 
                        className="likes-img" 
                        src={likeImg.like} 
                        alt="likeUp"
                    />
                    <img 
                        onClick={this.handlerOfLike} 
                        className="likes-img" 
                        src={likeImg.dislike} 
                        alt="likeDown"
                    />
                    likes
                </div>
                
                <div className="poster" onClick={selectMovie.bind(this, currentMovie.id)}>
                    <Link to={'/movies/' + currentMovie.id} className="movie-name-link">
                        <h3 className="movie-name">{currentMovie.title}</h3>
                        <img 
                            className="poster-img" 
                            src={currentMovie.posterUrl} 
                            alt={currentMovie.title}
                        />
                    </Link>
                </div>
                <div className="count-likes">{currentMovie.likes}</div>
                <Stars 
                    handlerOfLikesAndStars={this.props.handlerOfLikesAndStars} 
                    currentMovie={currentMovie} 
                    stars={currentMovie.stars} 
                    id={currentMovie.id} 
                />
            </div>
        );
    }
}


export default ItemMovie;

ItemMovie.propTypes = {
    id: PropTypes.number,
    likes: PropTypes.number,
    stars: PropTypes.number,
    currentMovie: PropTypes.object,
    handlerOfLikesAndStars: PropTypes.func,
    selectMovie: PropTypes.func
}