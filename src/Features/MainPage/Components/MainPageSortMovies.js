import React, { Component } from 'react'
import PropTypes from 'prop-types';

class MainPageSortMovies extends Component {

    search = (event) => { this.props.search(event.target.value) }

    render() {
        return (
                <div className="sort-movies">
                    <h2>Sort movies</h2>
                    <div className="buttons">
                        <button onClick={this.props.sortMovieByLikes}>By likes</button>
                        <button onClick={this.props.sortMovieByRating}>By rating</button><br/>
                        <input 
                            onChange={this.search.bind(this)} 
                            className="search" 
                            type="search" 
                            placeholder="search"
                        /> 
                    </div>
                </div>
            )
    }
}

export default MainPageSortMovies;

MainPageSortMovies.propTypes = {
    search: PropTypes.func,
    sortMovieByLikes: PropTypes.func,
    sortMovieByRating: PropTypes.func
}