import React, { Component } from 'react';
import Stars from './Stars.js';

class Description extends Component {

    changeStars = (id, movieId) => { this.props.changeStars(id, movieId) }

    render() {

        return (
            <div className="description">
                <div className="description-title">
                    <p>{this.props.activeMovie.title}</p>
                    <p>Likes: {this.props.activeMovie.likes}</p>
                    <Stars changeStars={this.props.changeStars} stars={this.props.stars} id={this.props.id} />
                    <div className="description-control-buttons">
                        <button style={{background: 'green', display: this.props.flagButtonBGColor ? 'inline-block' : 'none'}}>EDIT</button>
                        <button style={{background: 'green', display: this.props.flagButtonBGColor ? 'inline-block' : 'none'}}>DELETE</button>
                    </div>
                </div>
                <div className="description-about">
                    <div>
                        <img className="description-img" alt={this.props.activeMovie.title} src={this.props.activeMovie.posterUrl} />
                    </div>
                    <p>Director: {this.props.activeMovie.director}</p>
                    <p>Actors: {this.props.activeMovie.actors.join(', ')}</p>
                    <p>Genres: {this.props.activeMovie.genres.join(', ')}</p>
                    <p>Description: {this.props.activeMovie.description}</p>
                </div>
            </div>
        );
    }
}

export default Description;