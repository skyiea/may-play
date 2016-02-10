import LinkedStateMixin from 'react-addons-linked-state-mixin';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router';

import './login.scss';

@mixin(LinkedStateMixin)
@ReactClass
class Login extends React.Component {
    state = {
        nickname: '',
        password: '',
        warningMessage: '',
        isChecked: false
    };

    _sendUserData = () => {
        const { nickname, password } = this.state;

        if (nickname.length === 0 || password.length === 0) {
            this.setState({
                warningMessage: '* all fields must be non-empty!'
            });
        } else {
            fetch('/api/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nickname, // nickname: nickname
                    password
                })
            }).
            then((res) => res.json()).
            then((json) => {
                console.log('result', json);
            }).
            catch((ex) => {
                console.log('error', ex);
            });
        }
    };

    _clearWarning = () => {
        this.setState({
            warningMessage: ''
        });
    };

    _checkChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    };

    render() {
        return (
            <section className="login-page">
                <section className="popup">
                    <h2>Log in</h2>
                    <section className="input-line">
                        <label htmlFor="nickname">Nickname:</label>
                        <input
                                id="nickname"
                                type="text"
                                onFocus={this._clearWarning}
                                valueLink={this.linkState('nickname')}/>
                    </section>
                    <section className="input-line">
                        <label htmlFor="password">Password:</label>
                        <input
                                id="password"
                                type={this.state.isChecked ? "text" : "password"}
                                onFocus={this._clearWarning}
                                valueLink={this.linkState('password')}/>
                        <input
                                id="showPassword"
                                type="checkbox"
                                checked={this.state.isChecked}
                                onChange={this._checkChange} />
                        <label htmlFor="showPassword">Show password</label>
                    </section>
                    {
                        this.state.warningMessage.length !== 0 &&
                            <div className="warning">{this.state.warningMessage}</div>
                    }
                    <button
                            className="login-button"
                            onClick={this._sendUserData}>
                        Log in
                    </button>
                    <br/>
                    <Link
                            to="register"
                            className="newAccount-button">
                        Create new account
                    </Link>
                </section>
            </section>
        );
    }
}

export default Login;