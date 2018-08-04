import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write } from 'components';
import { memoPostRequest } from 'actions/memo';
import PropTypes from 'prop-types';

const propTypes = {

};

const defaultProps = {

};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handlePost = this.handlePost.bind(this);
    }

    /* POST MEMO */
    handlePost(contents) {
        return this.props.memoPostRequest(contents).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    // TO BE IMPLEMENTED
                    Materialize.toast('Success!', 2000);
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
            </div>
        );
    }

}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);