import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { ReactClass } from 'react-core-decorators';

import CSSModules from 'utils/css-modules';
import SignupStatus from '../../../uniend/SignupStatus';
import Expander from 'components/expander/Expander';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import SmartPassword from 'components/smart-password/SmartPassword';

import styles from './Signup.scss';

@ReactClass
@CSSModules(styles)
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
        'INVALID_EMAIL'                     : 'Invalid email address entered'
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
        username: null,
        email   : null
    };

    state = {
        username: '',
        email   : '',
        password: '',
        errors: {
            ...this.initialErrorsState
        },
        passwordStrengthGradation: null,
        passwordLength: 0
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
        this.setState({
            password: e.target.value,
            passwordLength: e.target.value.length
        });
        if (e.target.value.length === 0) {
            this.setState({
                passwordStrengthGradation: null
            });
        }
    };

    _handlePasswordStrengthChange = (score) => {
        if (this.state.passwordLength !== 0) {
            this.setState({passwordStrengthGradation: SmartPassword.strengthGradation[score]});
        }
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
            password
        } = this.state;

        if (!password || !username || !email) {
            // No need to show any error if some field is empty, since "Sign in" button is disabled, which is
            // sufficient indicator.
            return false;
        }

        const emailPattern = /\S+@\S+\.\S+/;
        const newErrors = {};

        if (!emailPattern.test(email)) {
            newErrors.email = Signup.warnings.INVALID_EMAIL;
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
            errors,
            passwordStrengthGradation
        } = this.state;

        const isSignupAvailable = !!username && !!email && !!password;

        return (
            <section styleName="signup-page">
                <section styleName="popup">
                    {
                        processing &&
                            <section styleName="container">
                                <Loader/>
                            </section>
                    }
                    <section styleName="header">New Account</section>

                    <section styleName="content">
                        <section styleName="input-line">
                            <Input
                                    styleName="input-element"
                                    incorrect={!!errors.username}
                                    type="text"
                                    autoFocus
                                    placeholder="Username"
                                    value={username}
                                    onKeyDown={this._handleInputKeyDown}
                                    onChange={this._handleUsernameInputChange}
                                    onFocus={this._clearUsernameWarning}
                            />

                            <Expander
                                    wrapperClassName={styles['warning-wrapper']}
                                    captureChildrenOnCollapse
                                    speed="fast"
                                    expanded={!!errors.username}>
                                <div styleName="warning">{errors.username}</div>
                            </Expander>
                        </section>

                        <section styleName="input-line">
                            <Input
                                    styleName="input-element"
                                    incorrect={!!errors.email}
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onKeyDown={this._handleInputKeyDown}
                                    onChange={this._handleEmailInputChange}
                                    onFocus={this._clearEmailWarning}
                            />

                            <Expander
                                    wrapperClassName={styles['warning-wrapper']}
                                    captureChildrenOnCollapse
                                    speed="fast"
                                    expanded={!!errors.email}>
                                <div styleName="warning">{errors.email}</div>
                            </Expander>
                        </section>

                        <section styleName="input-line">
                            <SmartPassword
                                    styleName="input-element"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onKeyDown={this._handleInputKeyDown}
                                    onChange={this._handlePasswordInputChange}
                                    onStrengthChange={this._handlePasswordStrengthChange}
                            />

                            <Expander
                                    wrapperClassName={styles['warning-wrapper']}
                                    captureChildrenOnCollapse
                                    speed="fast"
                                    expanded={!!passwordStrengthGradation}>
                                <div styleName="info">Password strength: {passwordStrengthGradation}</div>
                            </Expander>
                        </section>

                        <Button
                                styleName={classnames('submit-button', !isSignupAvailable && 'disabled')}
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