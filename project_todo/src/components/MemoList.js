import React, { Component } from 'react';
import { Memo } from 'components';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    onEdit: PropTypes.func
};

const defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => {
        console.error('edit function not defined');
    }
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
                        index={i}
                        onEdit={this.props.onEdit}
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