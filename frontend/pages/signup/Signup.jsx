import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';
import { ReactClass } from 'react-core-decorators';

import SignupStatus from '../../../universal/SignupStatus';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

import styles from './Signup.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Signup extends Component {
    static propTypes = {
        processing: PropTypes.bool,
        error: PropTypes.string,
        
        signup: PropTypes.func.isRequired
    };

    static warnings = {
        [ SignupStatus.USER_ALREADY_EXISTS ] : 'User already exists'
    };
    
    state = {
        username    : '',
        email       : '',
        password    : '',
        repassword  : '',
        error       : null,
        emailErrorMessage  : null
    };

    _handleLoginKeyDown = (e) => {
        const { username, email, password, repassword } = this.state;
        const ENTER_CODE = 13;

        if (e.keyCode === ENTER_CODE && !!password && !!username && !!email && !!repassword) {
            this._handleSubmit();
        }
    };

    _handleSubmit = () => {
        const { username, email, password, emailErrorMessage } = this.state;

        this._checkEmail(email);
        if (emailErrorMessage === null) {
            this.props.signup({username, email, password});
            this._clearWarning();
        }
    };

    _handleUsernameInputChange = (e) => {
        this.setState({ username: e.target.value });
    };

    _handleEmailInputChange = (e) => {
        this.setState({ email: e.target.value });
    };

    _handlePasswordInputChange = (e) => {
        this.setState({ password: e.target.value });
    };

    _handlePasswordConfirmInputChange = (e) => {
        this.setState({ repassword: e.target.value });
    };

    _clearWarning = () => {
        this.setState({
            error: null,
            emailErrorMessage: null
        });
    };

    _checkEmail = (email) => {
        const correctEmail = /\S+@\S+\.\S+/;
        //const result = correctEmail.test(email);
        //
        //console.log(result);
        if (correctEmail.test(email) === false) {
            this.setState({
                emailErrorMessage: "Incorrect email"
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }

    render() {
        const {
            processing
        } = this.props;
        
        const {
            username,
            email,
            password,
            repassword,
            error,
            emailErrorMessage
        } = this.state;

        const isSignupAvailable = !!username && !!email && !!password && !!repassword;

        return (
            <section styleName="page">
                <section styleName="signup-popup">
                    {
                        processing &&
                            <section styleName="loader-container">
                                <Loader/>
                            </section>
                    }
                    <section styleName="signup-header">New Account</section>

                    <section styleName="signup-content">
                        <Input
                                styleName="signup-input"
                                incorrect={error === SignupStatus.USER_ALREADY_EXISTS}
                                type="text"
                                autoFocus
                                placeholder="Username"
                                value={username}
                                onChange={this._handleUsernameInputChange}
                                onFocus={this._clearWarning}
                        />
                        {
                            !!error &&
                                <div styleName="warning">{Signup.warnings[error]}</div>
                        }

                        <Input
                                styleName="signup-input"
                                incorrect={emailErrorMessage === "Incorrect email"}
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={this._handleEmailInputChange}
                                onFocus={this._clearWarning}
                        />
                        {
                            emailErrorMessage === "Incorrect email" &&
                            <div styleName="warning">{emailErrorMessage}</div>
                        }

                        <Input
                                styleName="signup-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={this._handlePasswordInputChange}
                                onFocus={this._clearWarning}
                        />

                        <Input
                                styleName="signup-input"
                                type="password"
                                placeholder="Confirm Password"
                                value={repassword}
                                onKeyDown={this._handleLoginKeyDown}
                                onChange={this._handlePasswordConfirmInputChange}
                                onFocus={this._clearWarning}
                        />

                        <Button
                                styleName={classnames('signup-button', !isSignupAvailable && 'disabled')}
                                disabled={!isSignupAvailable}
                                onClick={this._handleSubmit}>
                            Sign in
                        </Button>
                    </section>
                    </section>
            </section>
        );
    }
}

export default Signup;