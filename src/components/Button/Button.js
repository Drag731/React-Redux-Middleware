import React, { Component }  from 'react';

 class Button extends Component {
    render() {
        const { userRole, children } = this.props;
        return (
            <div className="create-movie-button">
                <button 
                    onClick={this.props.onClick}
                    style={{
                        background: 'green',
                        display: userRole === 'admin' ? 'inline-block' : 'none',
                    }}>
                    {children}
                </button>
            </div>
        );
    }
}

export default Button;