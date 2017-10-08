import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getData, getSelectedMovie } from '../Features/MainPage/MainPageReducer'

class CreateMovie extends Component {

    componentDidMount () {
        // this.setDefaultFormData()
        const activeMovie = this.props.getSelectedMovie  

        console.log(activeMovie)

        // if (browserHistory.location.pathname !== '/form') {
        //     this.props.setFormData(
        //         {
        //             id: activeMovie.id,
        //             title: activeMovie.title,
        //             posterUrl: activeMovie.posterUrl,
        //             director: activeMovie.director,
        //             actors: activeMovie.actors,
        //             genres: activeMovie.genres,
        //             description: activeMovie.description,
        //             likes: activeMovie.likes,
        //             stars: activeMovie.stars,
        //             mode: 'edit'
        //         }
        //     )
        // }
    }

    onChange = () => { console.log('hi') }


  render() {
    const activeMovie = this.props.getSelectedMovie
    console.log(this)
    return (
      <div>
        <form>
            <table>
                <tbody>
                <tr>
                    <td>Title</td>
                    <td><input type="text" onChange={this.onChange.bind(this)} value={activeMovie.title} /></td>
                </tr>
                <tr>
                    <td>img url</td>
                    <td><input type="text" onChange={this.onChange.bind(this)} value={activeMovie.posterUrl} /></td>
                </tr>
                <tr>
                    <td>Direction</td>
                    <td><input type="text" /></td>
                </tr>
                <tr>
                    <td>Actors</td>
                    <td><input type="text" /></td>
                </tr>
                <tr>
                    <td>Genres</td>
                    <td><input type="text" /></td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td><textarea></textarea></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button>SUBMIT</button>
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
  getSelectedMovie: getSelectedMovie(state)
})

export default connect(mapStateToProps)(CreateMovie);