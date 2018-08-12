import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import { memoPostRequest, memoListRequest } from 'actions/memo';
import PropTypes from 'prop-types';

const propTypes = {

};

const defaultProps = {

};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState : false
        };
        this.handlePost = this.handlePost.bind(this);
        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.loadOldMemo = this.loadOldMemo.bind(this);
    }

    componentDidMount() {
        // Load new memo every 5 seconds
        const loadMemoLoop = () => {
            this.loadNewMemo().then(
                () => {
                    this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
                }
            );
        };

        const loadUntilScrollable = () => {
            // If the scrollbar does not exist,
            if ($("body").height() < $(window).height()) {
                this.loadOldMemo().then(
                    () => {
                        // Do this recursively unless it's last page
                        if (!this.props.isLast) {
                            loadUntilScrollable();
                        }
                    }
                );
            }
        };

        this.props.memoListRequest(true).then(
            () => {
                // Begin new memo loading loop
                loadUntilScrollable();
                loadMemoLoop();
            }
        );

        $(window).scroll(() => {
            // When height under scroll bottom is less then 250
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if (!this.state.loadingState) {
                    this.loadOldMemo();
                    this.setState({
                        loadingState: true
                    });
                }
            } else {
                if (this.state.loadingState) {
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        // Stop the loadMemoLoop
        clearTimeout(this.memoLoaderTimeoutId);

        // Remove windows scroll listener
        $(window).unbind();
    }

    loadNewMemo() {
        // Cancel if there is  a pending request
        if (this.props.listStatus === 'WAITING') {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }

        // If page is empty, do the initial loading
        if (this.props.memoData.length === 0) {
            return this.props.memoListRequest(true);
        }

        return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
    }

    loadOldMemo() {
        // Cancel if user is reading the last page
        if (this.props.isLast) {
            return new Promise((resolve, reject) => {   //TODO what is promise?
                resolve();
            });
        }

        // Get id of the memo at the bottom
        let lastId = this.props.memoData[this.props.memoData.length - 1]._id;

        // Start request
        return this.props.memoListRequest(false, 'old', lastId).then(() => {
            // If it is last page, notify
            if (this.props.isLast) {
                Materialize.toast('You are reading the last page', 2000);
            }
        });
    }

    /* POST MEMO */
    handlePost(contents) {
        return this.props.memoPostRequest(contents).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    this.loadNewMemo().then(
                        () => {
                            Materialize.toast('Success!', 2000);
                        }
                    )
                } else {
                    /*
                        ERROR CODES
                        1: NOT LOGGED IN
                        2: EMPTY CONTENTS
                    */
                    let $toastContent;
                    switch (this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(() => { location.reload(false); }, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        )
    }

    render() {
        const write = (
            <Write onPost={this.handlePost}/>
        );

        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <MemoList data={this.props.memoData} currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data,
        listStatus: state.memo.list.status,
        isLast: state.memo.list.isLast
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        },
        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Home);