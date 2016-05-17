import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';
import classnames from 'classnames';

import CSSModules from 'utils/css-modules';
import LoginStatus from '../../../universal/LoginStatus';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import SmartPassword from 'components/smart-password/SmartPassword';
import Expander from 'components/expander/Expander';

import styles from './Login.scss';

@ReactClass
@CSSModules(styles)
class Login extends Component {
    static propTypes = {
        error: PropTypes.string,
        processing: PropTypes.bool.isRequired,
        
        login: PropTypes.func.isRequired
    };
    
    static warnings = {
        [ LoginStatus.NO_USER_FOUND ]       : 'Incorrect username entered',
        [ LoginStatus.INCORRECT_PASSWORD ]  : 'Incorrect password entered'
    };

    static warningTypes = {
        username: [
            LoginStatus.NO_USER_FOUND
        ],
        password: [
            LoginStatus.INCORRECT_PASSWORD
        ]
    };
    
    state = {
        username: '',
        password: '',
        error: {
            field: null,
            message: null
        }
    };

    _login() {
        const {
            username,
            password
        } = this.state;

        if (!!username && !!password) {
            this.props.login(username, password);
        }
    }

    _handleInputKeyDown = (e) => {
        const ENTER_CODE = 13;

        if (e.keyCode === ENTER_CODE) {
            this._login();
        }
    };

    _handleLoginInputChange = (e) => {
        this.setState({ username: e.target.value });
        this._clearWarning();
    };

    _handlePasswordInputChange = (e) => {
        this.setState({ password: e.target.value });
        this._clearWarning();
    };

    _handleLoginBtnClick = () => {
        this._clearWarning();
        this._login();
    };

    _clearWarning = () => {
        this.setState({
            error: {
                field: null,
                message: null
            }
        });
    };

    componentWillReceiveProps(nextProps) {
        const { error: newError } = nextProps;
        const newErrorAppear = newError && newError !== this.props.error;

        if (newErrorAppear) {
            let errorFieldName;

            if (Login.warningTypes.username.indexOf(newError) !== -1) {
                errorFieldName = 'username';
            } else if (Login.warningTypes.password.indexOf(newError) !== -1) {
                errorFieldName = 'password';
            }

            if (errorFieldName) {
                this.setState({
                    error: {
                        field: errorFieldName,
                        message: Login.warnings[newError]
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
            password,
            error
        } = this.state;

        const isLoginAvailable = !!username && !!password && !processing;

        return (
            <section styleName="login-page">
                <section styleName="popup">
                    {
                        processing &&
                            <section styleName="container">
                                <Loader/>
                            </section>
                    }
                    <section styleName="header">Log in</section>

                    <section styleName="content">
                        <section styleName="input-line">
                            <Input
                                    styleName="input-element"
                                    incorrect={error.field === 'username'}
                                    type="text"
                                    autoFocus
                                    disabled={processing}
                                    placeholder="Username"
                                    value={username}
                                    onFocus={this._clearWarning}
                                    onKeyDown={this._handleInputKeyDown}
                                    onChange={this._handleLoginInputChange}
                            />

                            <Expander
                                    captureChildrenOnCollapse
                                    speed="fast"
                                    expanded={error.field === 'username'}>
                                <div styleName="warning">{error.message}</div>
                            </Expander>
                        </section>

                        <section styleName="input-line">
                            <SmartPassword
                                    styleName="input-element"
                                    incorrect={error.field === 'password'}
                                    disabled={processing}
                                    placeholder="Password"
                                    value={password}
                                    onFocus={this._clearWarning}
                                    onKeyDown={this._handleInputKeyDown}
                                    onChange={this._handlePasswordInputChange}
                            />

                            <Expander
                                    captureChildrenOnCollapse
                                    speed="fast"
                                    expanded={error.field === 'password'}>
                                <div styleName="warning">{error.message}</div>
                            </Expander>
                        </section>

                        <Button
                                disabled={!isLoginAvailable}
                                styleName={classnames('submit-button', !isLoginAvailable && 'disabled')}
                                onClick={this._handleLoginBtnClick}>
                            Log in
                        </Button>
                    </section>
                </section>
            </section>
        );
    }
}

export default Login;