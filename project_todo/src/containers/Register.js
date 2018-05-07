import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Authentication } from 'components';

const propTypes = {

};

const defaultProps = {

};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Authentication mode={false}/>
            </div>
        );
    }

}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;