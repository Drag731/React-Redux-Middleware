import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { setFormData } from './FormActions'
import { getFormData } from './FormReducers'

import { updateMovie } from '../../Features/MainPage/MainPageActions.js'
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

        const newData = {
            id: this.props.getFormData.id,
            title: this.props.getFormData.title,
            posterUrl: this.props.getFormData.posterUrl,
            director: this.props.getFormData.director,
            actors: this.props.getFormData.actors.split(', '),
            genres: this.props.getFormData.genres.split(', '),
            description: this.props.getFormData.description,
            likes: this.props.getFormData.likes,
            stars: this.props.getFormData.stars
        }

        this.props.updateMovie(newData, newData.id);
        // this.props.router.push('/movies/' + newData.id);
    }
  

    render() {
        return (
            <div>
                <div className="header-edit-film">Edit Film</div>
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
    getSelectedMovie: getSelectedMovie(state),
    getFormData: getFormData(state),
    getisFetching: getisFetching(state)
})

const mapDispatchToProps = {
    updateMovie: (data, id) => updateMovie(data, id),
    setFormData: data => setFormData(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMovieForm);