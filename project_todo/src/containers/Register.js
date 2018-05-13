import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/authentication';

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(id, pw) {
        console.log("in container register.");
        return this.props.registerRequest(id, pw).then(
            () => {
                if (this.props.status == "SUCCESS") {
                    Materialize.toast('Success! please log in.', 2000);
                    this.props.history.push('/login');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    console.log("error code : " + this.props.error.code);
                    // let errorMessage = [
                    //     "Invalid username.",
                    //     "Password is too short.",
                    //     "Username is already exists."
                    // ];

                    let $toastContent = $('<span style="color: #FFB4B4">'+ this.props.error.msg +'</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Authentication
                    mode={false}
                    onRegister={this.handleRegister}
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        error: state.authentication.register.errorCode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Register);