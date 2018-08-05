import React, { Component } from 'react';
import { Memo } from 'components';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string
};

const defaultProps = {
    data: [],
    currentUser: ''
};

class MemoList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const mapToCompopnents = (data) => {
            return data.map((memo, i) => {
                return (
                    <Memo
                        data={memo}
                        ownership={ (memo.writer === this.props.currentUser) }
                        key={memo._id}
                    />
                );
            });
        }

        return (
            <div>
                {mapToCompopnents(this.props.data)}
            </div>
        );
    }

}

MemoList.propTypes = propTypes;
MemoList.defaultProps = defaultProps;

export default MemoList;