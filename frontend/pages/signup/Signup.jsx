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
        [ SignupStatus.USER_ALREADY_EXISTS ]    : 'User already exists',
        [ SignupStatus.EMAIL_ALREADY_USED ]     : 'Email already used',
        'INVALID_EMAIL'                         : 'Invalid email address entered',
        'NOT_EQUAL_PASSWORDS'                   : 'Not equal passwords entered'
    };

    initialErrorsState = {
        username        : null,
        email           : null,
        password        : null,
        passwordConfirm : null
    };

    state = {
        username        : '1',
        email           : '1@1.2',
        password        : '1',
        passwordConfirm : '1',
        errors: {
            ...this.initialErrorsState
        }
    };
    
    _signup() {
        const {
            username,
            email,
            password
        } = this.state;
        
        this.props.signup({ username, email, password });
    }

    _handleLoginKeyDown = (e) => {
        const { username, email, password, passwordConfirm } = this.state;
        const ENTER_CODE = 13;

        if (e.keyCode === ENTER_CODE && !!password && !!username && !!email && !!passwordConfirm) {
            this._handleSubmitClick();
        }
    };

    _handleSubmitClick = () => {
        this._clearWarnings();

        if (this._validateForm()) {
            this._signup();
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
        this.setState({ passwordConfirm: e.target.value });
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

    _clearPasswordWarning = () => {
        this.setState({
            errors: {
                ...this.state.errors,
                password: null
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
            email,
            password,
            passwordConfirm
        } = this.state;

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
        const newErrors = {};

        if (Array.isArray(newError)) {
            for (let i = 0; i < newError.length; i++) {
                if (newErrorAppear) {
                    const fieldName = newError[i] === SignupStatus.USER_ALREADY_EXISTS ? 'username' : 'email';

                    switch (fieldName) {
                        case 'username':
                            newErrors.username = Signup.warnings.USER_ALREADY_EXISTS;
                            break;
                        case 'email':
                            newErrors.email = Signup.warnings.EMAIL_ALREADY_USED;
                            break;
                    }
                    this.setState({
                        errors: {
                            ...nextState.errors,
                            ...newErrors
                        }
                    });
                }
            }
        } else if (newErrorAppear) {
            const fieldName = newError === SignupStatus.USER_ALREADY_EXISTS ? 'username' : 'email';

            this.setState({
                errors: {
                    ...nextState.errors,
                    [ fieldName ]: Signup.warnings[newError]
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
                                onKeyDown={this._handleLoginKeyDown}
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
                                onKeyDown={this._handleLoginKeyDown}
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
                                onKeyDown={this._handleLoginKeyDown}
                                onChange={this._handlePasswordInputChange}
                                onFocus={this._clearPasswordWarning}
                        />

                        <Input
                                styleName="signup-input"
                                incorrect={!!errors.passwordConfirm}
                                type="password"
                                placeholder="Confirm Password"
                                value={passwordConfirm}
                                onKeyDown={this._handleLoginKeyDown}
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
                                onClick={this._handleSubmitClick}>
                            Sign in
                        </Button>
                    </section>
                    </section>
            </section>
        );
    }
}

export default Signup;