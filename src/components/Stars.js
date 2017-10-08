import React, { Component } from 'react';
import './font-awesome.min.css';

class Stars extends Component {

    handleSubmit = (event) => {
        let currentMovie = this.props.currentMovie;
        let id = this.props.id;
        this.props.handleSubmit(currentMovie, id, event);
    }

    render() {
        let i = 1;
        const arrayOfStarsClass = [];
        while (i < 6) {
            if (i <= this.props.stars) {
                arrayOfStarsClass.push(<i onClick={this.handleSubmit.bind(this)} className="fa fa-star" id={i} key={arrayOfStarsClass.length}></i>);
            } else {
                arrayOfStarsClass.push(<i onClick={this.handleSubmit.bind(this)} className="fa fa-star-o" id={i} key={arrayOfStarsClass.length}></i>);
            }
            i++;
        }

        return (
            <div>
                {arrayOfStarsClass}
            </div>
        );
    }
}

export default Stars;