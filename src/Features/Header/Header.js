import React, { Component }  from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserRole } from './HeaderReducers';
import { changeUserRole } from './HeaderActions';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {

    render() {
        const { changeUserRole, userRole } = this.props;
        return(
            <div className="movies-header">
                <div className="controlButtons">
                    <button
                        onClick={changeUserRole.bind(null, 'user')}
                        style={{ background: userRole === 'admin' ? '#ccc' : 'green'}}
                    >USER</button>
                    <button
                        onClick={changeUserRole.bind(null, 'admin')}
                        style={{background: userRole === 'admin' ? 'green' : '#ccc'}}
                    >ADMIN</button>
                </div>
                <div className="create-movie">
                    <Link to={'/createMovie'}>
                        <button style={{
                            background: 'green',
                            display: userRole === 'admin' ? 'inline-block' : 'none',
                        }}>CREATE MOVIE</button>
                    </Link>
                </div>
                <h2 className="movies-header-name">Movies</h2>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userRole: getUserRole(state),
});

const mapDispatchToProps = {
    changeUserRole: (userRole) => changeUserRole(userRole),
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
    userRole: PropTypes.string,
    changeUserRole: PropTypes.func
}