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
        [ SignupStatus.USER_ALREADY_EXISTS ] : 'User already exists',
        'INVALID_EMAIL': 'Invalid email address entered',
        'PASSWORD_CONFIRMATION_DOES_NOT_MATCH_PASSWORD': 'Password confirmation does not match Password'
    };

    initialErrorsState = {
        username    : null,
        email       : null,
        password    : null,
        repassword  : null
    };

    state = {
        username    : '',
        email       : '',
        password    : '',
        repassword  : '',
        errors: {
            ...this.initialErrorsState
        }
    };

    _handleLoginKeyDown = (e) => {
        const { username, email, password, repassword } = this.state;
        const ENTER_CODE = 13;

        if (e.keyCode === ENTER_CODE && !!password && !!username && !!email && !!repassword) {
            this._handleSubmit();
        }
    };

    _handleSubmit = () => {
        const { username, email, password } = this.state;

        if (this._validateForm()) {
            this.props.signup({ username, email, password });
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
            errors: {
                ...this.initialErrorsState
            }
        });
    };

    _validateForm = () => {
        const {
            email,
            password,
            repassword
        } = this.state;

        const emailPattern = /\S+@\S+\.\S+/;

        let isValid = true;

        if (!emailPattern.test(email)) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    email: Signup.warnings.INVALID_EMAIL
                }
            });
            isValid = false;
        }
        if (password !== repassword) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    repassword: Signup.warnings.PASSWORD_CONFIRMATION_DOES_NOT_MATCH_PASSWORD
                }
            });
            isValid = false;
        }
        return isValid;
    };

    componentWillReceiveProps(nextProps) {
        // for now it is only username-error
        if (nextProps.error) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    username: nextProps.error
                }
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
            errors
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
                                incorrect={errors.username === SignupStatus.USER_ALREADY_EXISTS}
                                type="text"
                                autoFocus
                                placeholder="Username"
                                value={username}
                                onChange={this._handleUsernameInputChange}
                                onFocus={this._clearWarning}
                        />
                        {
                            !!errors.username &&
                                <div styleName="warning">{Signup.warnings[errors.username]}</div>
                        }
                        <Input
                                styleName="signup-input"
                                incorrect={!!errors.email}
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={this._handleEmailInputChange}
                                onFocus={this._clearWarning}
                        />
                        {
                            !!errors.email &&
                                <div styleName="warning">{errors.email}</div>
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
                        {
                            !!errors.repassword &&
                            <div styleName="warning">{errors.repassword}</div>
                        }
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