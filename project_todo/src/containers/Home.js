import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write } from 'components';
import PropTypes from 'prop-types';

const propTypes = {

};

const defaultProps = {

};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const write = ( <Write/> );
        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
            </div>
        );
    }

}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
    }
}

export default connect(mapStateToProps) (Home);