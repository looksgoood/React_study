import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Authentication } from 'components';

const propTypes = {

};

const defaultProps = {

};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Authentication mode={true}/>
            </div>
        );
    }

}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;