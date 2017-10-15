import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setFormData } from './FormActions'
import { getFormData } from './FormReducers'

import { updateMovie, fetchMovies } from '../../Features/MainPage/MainPageActions.js'
import { getData, getSelectedMovie, getisFetching } from '../../Features/MainPage/MainPageReducers.js'

class EditMovieForm extends Component {

    handleChange = e => this.props.setFormData({ [e.target.name]: e.target.value })

    componentDidMount () {
        let activeMovie;

        if (this.props.getisFetching === true) {
            activeMovie = {
                id: '',
                title: '',
                posterUrl: '',
                director: '',
                actors: [],
                genres: [],
                description: ''
            };
        } else {
            activeMovie = this.props.getSelectedMovie;
        }

        this.props.setFormData(
            {
                id: activeMovie.id,
                title: activeMovie.title,
                posterUrl: activeMovie.posterUrl,
                director: activeMovie.director,
                actors: activeMovie.actors.join(', '),
                genres: activeMovie.genres.join(', '),
                description: activeMovie.description,
                likes: activeMovie.likes,
                stars: activeMovie.stars,
            }
        )
    }

    onSubmit = () => {
        const { getFormData, updateMovie } = this.props;
        const newData = {
            id: getFormData.id,
            title: getFormData.title,
            posterUrl: getFormData.posterUrl,
            director: getFormData.director,
            actors: getFormData.actors.split(', '),
            genres: getFormData.genres.split(', '),
            description: getFormData.description,
            likes: getFormData.likes,
            stars: getFormData.stars
        }
        updateMovie(newData, newData.id);
    }
  

    render() {
        const { getFormData } = this.props;

        return (
            <div>
                <div className="header-edit-film">Edit Film</div>
                <hr />
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="title">Title</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="title"
                                        type="text" 
                                        name='title' 
                                        onChange={this.handleChange} 
                                        value={getFormData.title} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="posterUrl">img url</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="posterUrl"
                                        type="text" 
                                        name='posterUrl' 
                                        onChange={this.handleChange} 
                                        value={getFormData.posterUrl} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="director">Direction</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="director"
                                        type="text" 
                                        name='director' 
                                        onChange={this.handleChange} 
                                        value={getFormData.director}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="actors">Actors</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="actors"
                                        type="text" 
                                        name='actors' 
                                        onChange={this.handleChange} 
                                        value={getFormData.actors} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="genres">Genres</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="genres"
                                        type="text" 
                                        name='genres' 
                                        onChange={this.handleChange}
                                        value={getFormData.genres} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="description">Description</label></td>
                                <td>
                                    <textarea
                                        className="form-input" 
                                        id="description"
                                        rows='8' 
                                        cols='70' 
                                        name='description' 
                                        onChange={this.handleChange} 
                                        value={getFormData.description} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td />
                                <td>
                                    <Link to={'/movies'}>
                                        <button onClick={this.onSubmit}>SUBMIT</button>
                                    </Link>
                                    <Link to={'/movies'}>
                                        <button>GO BACK</button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    getData: getData(state),
    getSelectedMovie: getSelectedMovie(state),
    getFormData: getFormData(state),
    getisFetching: getisFetching(state)
})

const mapDispatchToProps = {
    updateMovie: (data, id) => updateMovie(data, id),
    setFormData: data => setFormData(data),
    fetchMovies: () => fetchMovies()
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMovieForm);

EditMovieForm.propTypes = {
    getData: PropTypes.array,
    getSelectedMovie: PropTypes.object,
    getisFetching: PropTypes.bool,
    updateMovie: PropTypes.func,
    setFormData: PropTypes.func,
    getFormData: PropTypes.shape({
        title: PropTypes.string,
        posterUrl: PropTypes.string,
        director: PropTypes.string,
        actors: PropTypes.string,
        genres: PropTypes.string,
        description: PropTypes.string
    })
}