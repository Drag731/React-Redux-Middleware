import React, { Component } from 'react';
import Stars from './Stars.js';
import { Link } from 'react-router';

class Description extends Component {

    handleSubmit = (currentMovie, id, event) => {this.props.handleSubmit(currentMovie, id, event)}

    render() {
        return (
            <div className="description">
                <div className="description-title">
                    <p>{this.props.activeMovie.title}</p>
                    <p>Likes: {this.props.activeMovie.likes}</p>
                    <Stars 
                        handleSubmit={this.props.handleSubmit} 
                        currentMovie={this.props.activeMovie} 
                        stars={this.props.stars} 
                        id={this.props.id} 
                    />
                    <div className="description-control-buttons">
                        <Link to={'/editMovie'}>
                            <button style={{background: 'green', display: this.props.flagButtonBGColor ? 'inline-block' : 'none'}}>EDIT</button>
                        </Link>
                        <button onClick={this.props.deleteMovie.bind(this, this.props.id)} style={{background: 'green', display: this.props.flagButtonBGColor ? 'inline-block' : 'none'}}>DELETE</button>
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