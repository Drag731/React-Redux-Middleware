import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class About extends Component {
    
    componentDidMount() {
        setTimeout(() =>
            this.props.location.pathname === '/about' ? this.props.router.push('/movies') : false, 5000);
    }

  render() {
    return (
      <div>
        <div>About page</div>
      </div>
    )
  }
}

 About.propTypes = {
  location: PropTypes.shape({
      pathname: PropTypes.string
    }), 
  router: PropTypes.shape({
      push: PropTypes.func
    })
}
