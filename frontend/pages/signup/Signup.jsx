import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { ReactClass } from 'react-core-decorators';
import CSSModules from 'react-css-modules';

import SignupStatus from '../../../universal/SignupStatus';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

import styles from './Signup.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Signup extends Component {
    static propTypes = {
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
        error       : null
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
        
        this.props.signup({ username, email, password });
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

    componentWillReceiveProps(nextProps) {
        console.log('+');
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }

    render() {
        const {
            username,
            email,
            password,
            repassword,
            error
        } = this.state;

        const isSignupAvailable = !!username && !!email && !!password && !!repassword;

        return (
            <section styleName="page">
                <section styleName="signup-popup">
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
                        />

                        <Input
                                styleName="signup-input"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={this._handleEmailInputChange}
                        />

                        <Input
                                styleName="signup-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={this._handlePasswordInputChange}
                        />

                        <Input
                                styleName="signup-input"
                                type="password"
                                placeholder="Confirm Password"
                                value={repassword}
                                onKeyDown={this._handleLoginKeyDown}
                                onChange={this._handlePasswordConfirmInputChange}
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