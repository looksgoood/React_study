import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
            <div>
                <nav>
                    <div className="nav_wrapper blue darken-1">
                        <Link to="/" className="brand-logo center">MEMOPAD</Link>

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
            </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;