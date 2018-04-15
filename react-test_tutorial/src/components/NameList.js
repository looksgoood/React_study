import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {

};

const defaultProps = {
    names: []
};

class NameList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderList() {
        const { names } = this.props;
        const nameList = names.map(
            (name, i) => (<li key={i}>{name}</li>)
        );
        return nameList;
    }


    render() {
        return (
            <ul>
                { this.renderList() }           
            </ul>
        );
    }

}

NameList.propTypes = propTypes;
NameList.defaultProps = defaultProps;

export default NameList;