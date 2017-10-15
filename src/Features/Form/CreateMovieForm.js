import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Form.css'

import { setFormData } from './FormActions'
import { getFormData } from './FormReducers'

import { addNewMovie, fetchMovies } from '../../Features/MainPage/MainPageActions.js'
import { getData, getisFetching } from '../../Features/MainPage/MainPageReducers.js'

class CreateMovieForm extends Component {

    componentDidMount () {

        if (this.props.isFetching) {
            this.props.router.push('/movies');
        }

        this.props.setFormData (
            {
                id: '',
                title: '',
                posterUrl: '',
                director: '',
                actors: '',
                genres: '',
                description: ''
            }
        )
    }

    handleChange = e => this.props.setFormData({ [e.target.name]: e.target.value })

    onSubmit = () => {
        const { getFormData, addNewMovie } = this.props;
        const newData = {
            title: getFormData.title,
            posterUrl: getFormData.posterUrl,
            director: getFormData.director,
            actors: getFormData.actors.split(', '),
            genres: getFormData.genres.split(', '),
            description: getFormData.description,
            likes: 0,
            stars: 0
        };
        addNewMovie(newData);
    }

    render() {
        const { getFormData } = this.props;

        return (
            <div>
                <div className="header-create-film">Create New Film</div>
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
                                        placeholder="John Doe, Jane Doe"
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
                                        placeholder="Comedy, drama"
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
                                    <button onClick={this.onSubmit}>SUBMIT</button>
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
    getFormData: getFormData(state),
    isFetching: getisFetching(state)
})

const mapDispatchToProps = {
    addNewMovie: (data) => addNewMovie(data),
    setFormData: data => setFormData(data),
    fetchMovies: () => fetchMovies()
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMovieForm);

CreateMovieForm.propTypes = {
    getData: PropTypes.array,
    addNewMovie: PropTypes.func,
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