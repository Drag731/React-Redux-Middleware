import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Form.css'

import { setFormData } from './FormActions'
import { getFormData } from './FormReducers'

import { addNewMovie  } from '../../Features/MainPage/MainPageActions.js'
import { getData } from '../../Features/MainPage/MainPageReducers.js'

class CreateMovieForm extends Component {

    componentDidMount () {
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

        const newData = {
            title: this.props.getFormData.title,
            posterUrl: this.props.getFormData.posterUrl,
            director: this.props.getFormData.director,
            actors: this.props.getFormData.actors.split(', '),
            genres: this.props.getFormData.genres.split(', '),
            description: this.props.getFormData.description,
            likes: 0,
            stars: 0
        }
        this.props.addNewMovie(newData);
        // this.props.router.push('/movies');
    }

    render() {
        return (
            <div>
                <div className="header-create-film">Create New Film</div>
                <hr />
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td><label for="title">Title</label></td>
                                <td>
                                    <input
                                        className="form-input"
                                        id="title" 
                                        type="text" 
                                        name='title' 
                                        onChange={this.handleChange} 
                                        value={this.props.getFormData.title} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label for="posterUrl">img url</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="posterUrl"
                                        type="text" 
                                        name='posterUrl' 
                                        onChange={this.handleChange}
                                        value={this.props.getFormData.posterUrl} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label for="director">Direction</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="director"
                                        type="text" 
                                        name='director' 
                                        onChange={this.handleChange} 
                                        value={this.props.getFormData.director}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label for="actors">Actors</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="actors"
                                        type="text" 
                                        name='actors' 
                                        onChange={this.handleChange} 
                                        value={this.props.getFormData.actors} 
                                        placeholder="John Doe, Jane Doe"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label for="genres">Genres</label></td>
                                <td>
                                    <input 
                                        className="form-input"
                                        id="genres"
                                        type="text" 
                                        name='genres' 
                                        onChange={this.handleChange} 
                                        value={this.props.getFormData.genres} 
                                        placeholder="Comedy, drama"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label for="description">Description</label></td>
                                <td>
                                    <textarea 
                                        className="form-input"
                                        id="description"
                                        rows='8' 
                                        cols='70' 
                                        name='description' 
                                        onChange={this.handleChange} 
                                        value={this.props.getFormData.description}
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
})

const mapDispatchToProps = {
    addNewMovie: (data) => addNewMovie(data),
    setFormData: data => setFormData(data),
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMovieForm);