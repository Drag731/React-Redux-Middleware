import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { setFormData } from './FormActions'
import { getFormData } from './FormReducers'

import { addNewMovie  } from '../../Features/Movies/MoviesActions.js'
import { getData } from '../../Features/Movies/MoviesReducers.js'

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
        id: Math.max( ...this.props.getData.map(e => e.id)) + 1,
        title: this.props.getFormData.title,
        posterUrl: this.props.getFormData.posterUrl,
        director: this.props.getFormData.director,
        actors: this.props.getFormData.actors.split(','),
        genres: this.props.getFormData.genres.split(','),
        description: this.props.getFormData.description,
        likes: 0,
        stars: 0
      }
      this.props.addNewMovie(newData, newData.id);
      setTimeout(() => this.props.router.push('/movies'), 1000);
    }

    render() {
        return (
            <div>
                <form>
                    <table>
                        <tbody>
                        <tr>
                            <td>Title</td>
                            <td><input type="text" name='title' onChange={this.handleChange} value={this.props.getFormData.title} /></td>
                        </tr>
                        <tr>
                            <td>img url</td>
                            <td><input type="text" name='posterUrl' onChange={this.handleChange} value={this.props.getFormData.posterUrl} /></td>
                        </tr>
                        <tr>
                            <td>Direction</td>
                            <td><input type="text" name='director' onChange={this.handleChange} value={this.props.getFormData.director} /></td>
                        </tr>
                        <tr>
                            <td>Actors</td>
                            <td><input type="text" name='actors' onChange={this.handleChange} value={this.props.getFormData.actors} /></td>
                        </tr>
                        <tr>
                            <td>Genres</td>
                            <td><input type="text" name='genres' onChange={this.handleChange} value={this.props.getFormData.genres} /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea rows='10' cols='77' name='description' onChange={this.handleChange} value={this.props.getFormData.description}></textarea></td>
                        </tr>
                        <tr>
                            <td></td>
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
    addNewMovie: (data, id) => addNewMovie(data, id),
    setFormData: data => setFormData(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMovieForm);