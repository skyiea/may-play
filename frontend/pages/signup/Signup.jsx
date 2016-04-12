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
        error: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),

        signup: PropTypes.func.isRequired
    };

    static warnings = {
        [ SignupStatus.USER_ALREADY_EXISTS ]: 'User already exists',
        [ SignupStatus.EMAIL_ALREADY_USED ] : 'Email already used',
        'INVALID_EMAIL'                     : 'Invalid email address entered',
        'NOT_EQUAL_PASSWORDS'               : 'Not equal passwords entered'
    };

    // Used to determine to what input type warning is related
    static warningTypes = {
        username: [
            SignupStatus.USER_ALREADY_EXISTS
            // could be extended with, for instance, USERNAME_IS_TOO_SHORT, or anything else
        ],
        email: [
            SignupStatus.EMAIL_ALREADY_USED
        ]
    };

    initialErrorsState = {
        username        : null,
        email           : null,
        passwordConfirm : null
    };

    state = {
        username        : '',
        email           : '',
        password        : '',
        passwordConfirm : '',
        errors: {
            ...this.initialErrorsState
        }
    };

    _signup = () => {
        const {
            username,
            email,
            password
        } = this.state;

        this._clearWarnings();

        if (this._validateForm()) {
            this.props.signup({ username, email, password });
        }
    };
    
    _handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            this._signup();
        }
    };

    _handleUsernameInputChange = (e) => {
        this.setState({ username: e.target.value });
        this._clearUsernameWarning();
    };

    _handleEmailInputChange = (e) => {
        this.setState({ email: e.target.value });
        this._clearEmailWarning();
    };

    _handlePasswordInputChange = (e) => {
        this.setState({ password: e.target.value });
        this._clearPasswordConfirmWarning();
    };

    _handlePasswordConfirmInputChange = (e) => {
        this.setState({ passwordConfirm: e.target.value });
        this._clearPasswordConfirmWarning();
    };

    _clearUsernameWarning = () => {
        this.setState({
            errors: {
                ...this.state.errors,
                username: null
            }
        });
    };

    _clearEmailWarning = () => {
        this.setState({
            errors: {
                ...this.state.errors,
                email: null
            }
        });
    };
        
    _clearPasswordConfirmWarning = () => {
        this.setState({
            errors: {
                ...this.state.errors,
                passwordConfirm: null
            }
        });
    };
    
    _clearWarnings = () => {
        this.setState({
            errors: {
                ...this.initialErrorsState
            }
        });
    };

    _validateForm = () => {
        const {
            username,
            email,
            password,
            passwordConfirm
        } = this.state;

        if (!password || !username || !email || !passwordConfirm) {
            // No need to show any error if some field is empty, since "Sign in" button is disabled, which is
            // sufficient indicator.
            return false;
        }

        const emailPattern = /\S+@\S+\.\S+/;
        const newErrors = {};

        if (!emailPattern.test(email)) {
            newErrors.email = Signup.warnings.INVALID_EMAIL;
        }

        if (password !== passwordConfirm) {
            newErrors.passwordConfirm = Signup.warnings.NOT_EQUAL_PASSWORDS;
        }

        const isValid = Object.keys(newErrors).length === 0;

        if (!isValid) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    ...newErrors
                }
            });
        }

        return isValid;
    };

    componentWillUpdate(nextProps, nextState) {
        const { error: newError } = nextProps;
        const newErrorAppear = newError && newError !== this.props.error;

        // No need to do anything if there was no new error
        if (newErrorAppear) {
            const newErrorsState = {};
            // To avoid code duplication let's make it an array even if it doesn't, and cycle over it
            const newErrorArr = Array.isArray(newError) ? newError : [ newError ];

            for (const currentError of newErrorArr) {
                let errorFieldName;

                if (Signup.warningTypes.username.indexOf(currentError) !== -1) {
                    errorFieldName = 'username';
                } else if (Signup.warningTypes.email.indexOf(currentError) !== -1) {
                    errorFieldName = 'email';
                }

                // There might be some unknown error returned from backend, and then this variable might be empty
                // which is not what we want
                if (errorFieldName) {
                    newErrorsState[errorFieldName] = Signup.warnings[currentError];
                }
            }

            // Ensure that there are new errors to be set
            if (Object.keys(newErrorsState).length !== 0) {
                this.setState({
                    errors: {
                        ...nextState.errors,
                        ...newErrorsState
                    }
                });
            }
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
            passwordConfirm,
            errors
        } = this.state;

        const isSignupAvailable = !!username && !!email && !!password && !!passwordConfirm;

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
                                incorrect={!!errors.username}
                                type="text"
                                autoFocus
                                placeholder="Username"
                                value={username}
                                onKeyDown={this._handleInputKeyDown}
                                onChange={this._handleUsernameInputChange}
                                onFocus={this._clearUsernameWarning}
                        />
                        {
                            !!errors.username &&
                                <div styleName="warning">{errors.username}</div>
                        }
                        <Input
                                styleName="signup-input"
                                incorrect={!!errors.email}
                                type="text"
                                placeholder="Email"
                                value={email}
                                onKeyDown={this._handleInputKeyDown}
                                onChange={this._handleEmailInputChange}
                                onFocus={this._clearEmailWarning}
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
                                onKeyDown={this._handleInputKeyDown}
                                onChange={this._handlePasswordInputChange}
                        />

                        <Input
                                styleName="signup-input"
                                incorrect={!!errors.passwordConfirm}
                                type="password"
                                placeholder="Confirm Password"
                                value={passwordConfirm}
                                onKeyDown={this._handleInputKeyDown}
                                onChange={this._handlePasswordConfirmInputChange}
                                onFocus={this._clearPasswordConfirmWarning}
                        />
                        {
                            !!errors.passwordConfirm &&
                                <div styleName="warning">{errors.passwordConfirm}</div>
                        }
                        <Button
                                styleName={classnames('signup-button', !isSignupAvailable && 'disabled')}
                                disabled={!isSignupAvailable}
                                onClick={this._signup}>
                            Sign in
                        </Button>
                    </section>
                    </section>
            </section>
        );
    }
}

export default Signup;