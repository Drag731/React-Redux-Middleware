import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CreateMovie extends Component {
  render() {
    return (
      <div>
        <form>
            <table>
                <tbody>
                <tr>
                    <td>Title</td>
                    <td><input type="text" /></td>
                </tr>
                <tr>
                    <td>img url</td>
                    <td><input type="text" /></td>
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