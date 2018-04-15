import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {

};

const defaultProps = {
    onSubmit: () => console.warn('onSubmit not defined')
};

class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    onChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit = (e) => {
        const {name} = this.state;
        const {onInsert} = this.props;

        //Add name & initialize name value.
        onInsert(name);
        this.setState({
            name: ''
        })
        e.preventDefault(); //prevent refreshing page when submit.
    }

    render() {
        const { onSubmit, onChange } = this;
        const { name } = this.state;
        return (
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <input type="text" value={name} onChange={onChange} />
                <button type="submit">register</button>
            </form>
        );
    }

}

NameForm.propTypes = propTypes;
NameForm.defaultProps = defaultProps;

export default NameForm;