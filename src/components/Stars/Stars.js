import React, { Component } from 'react';
import './font-awesome.min.css';
import './Stars.css'

class Stars extends Component {

    handlerOfStars = (event) => {
        let id = this.props.id;
        let data

        if (event.target.tagName === 'I') {
            data = {...this.props.currentMovie, stars: parseInt(event.target.id, 10)};
        }

        return this.props.handlerOfLikesAndStars(data, id)
    }

    render() {
        let i = 1;
        const arrayOfStarsClass = [];
        while (i < 6) {
            if (i <= this.props.stars) {
                arrayOfStarsClass.push(<i 
                                          onClick={this.handlerOfStars.bind(this)} 
                                          className="fa fa-star" 
                                          id={i} 
                                          key={arrayOfStarsClass.length}
                                        />);
            } else {
                arrayOfStarsClass.push(<i 
                                          onClick={this.handlerOfStars.bind(this)} 
                                          className="fa fa-star-o" 
                                          id={i} 
                                          key={arrayOfStarsClass.length}
                                        />);
            }
            i++;
        }

        return (
            <div className="stars">
                {arrayOfStarsClass}
            </div>
        );
    }
}

export default Stars;