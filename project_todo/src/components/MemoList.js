import React, { Component } from 'react';
import { Memo } from 'components';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
};

const defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => {
        console.error('edit function not defined');
    },
    onRemove: (id, index) => {
        console.error('remove function not defined');
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
                        onRemove={this.props.onRemove}
                        onStar={this.props.onStar}
                        currentUser={this.props.currentUser}
                    />
                );
            });
        }

        return (
            <div>
                <ReactCSSTransitionGroup transitionName="memo"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1000}>
                    {mapToCompopnents(this.props.data)}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

}

MemoList.propTypes = propTypes;
MemoList.defaultProps = defaultProps;

export default MemoList;