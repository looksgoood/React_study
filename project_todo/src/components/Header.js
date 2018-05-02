import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

const defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined") }
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const loginButton = (
            <li>
                <a>
                    <i className="material-icons">vpn_key</i>
                </a>
            </li>
        );

        const logoutButton = (
            <li>
                <a>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
            <nav>
                <div className="nav_wrapper blue darken-1">
                    <a className="brand-logo center">MEMOPAD</a>

                    <ul>
                        <li><a onClick={this.toggleSearch}><i className="meterial-icons">search</i></a></li>
                    </ul>
                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton: loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;