import LinkedStateMixin from 'react-addons-linked-state-mixin';
import fetch from 'isomorphic-fetch';

import './login.scss';

@mixin(LinkedStateMixin)
@ReactClass
class Login extends React.Component {
    state = {
        nickname: '',
        password: '',
        warningMessage: ''
    };

    _sendUserData = () => {
        const { nickname, password } = this.state;

        if (nickname.length === 0 || password.length === 0) {
            this.setState({
                warningMessage: "* all fields must be non-empty!"
            });
        } else {
            fetch('/api/login', {
                method: 'post',
                body: JSON.stringify({
                    nickname, // nickname: nickname
                    password
                })
            }).then((res) => {
                console.log('result', res);
            }).catch((ex) => {
                console.log('error', ex);
            });
        }
    };

    _clearWarning = () => {
        this.setState({
            warningMessage: ""
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
                                type="text"
                                onFocus={this._clearWarning}
                                valueLink={this.linkState('password')}/>
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
                </section>
            </section>
        );
    }
}

export default Login;