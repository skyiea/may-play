import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';

import { login } from 'utils/api';
import LoginStatus from '../../../universal/LoginStatus';

import styles from './Login.scss';

@CSSModules(styles, { allowMultiple: true })
@mixin(LinkedStateMixin)
@ReactClass
class Login extends React.Component {
    state = {
        username: '',
        password: '',
        warningMessage: '',
        isChecked: false
    };

    _sendUserData = () => {
        const { username, password } = this.state;

        if (username.length === 0 || password.length === 0) {
            this.setState({
                warningMessage: '* all fields must be non-empty!'
            });
        } else {
            login(username, password).
            then((json) => {
                const { message } = json;

                if (message && message in LoginStatus) {
                    this.setState({
                        warningMessage: message
                    });
                }
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
        const {
            isChecked,
            warningMessage
        } = this.state;

        return (
            <section styleName="overlay">
                <section styleName="popup">
                    <h2 styleName="title">Log in</h2>
                    <section styleName="input-line">
                        <label htmlFor="username">Username:</label>
                        <input
                                id="username"
                                type="text"
                                onFocus={this._clearWarning}
                                valueLink={this.linkState('username')}/>
                    </section>

                    <section styleName="input-line">
                        <label htmlFor="password">Password:</label>
                        <input
                                id="password"
                                type={isChecked ? "text" : "password"}
                                onFocus={this._clearWarning}
                                valueLink={this.linkState('password')}/>
                    </section>

                    <section styleName="input-line checkbox-line">
                        <input
                                id="showPassword"
                                type="checkbox"
                                checked={isChecked}
                                onChange={this._checkChange} />
                        <label htmlFor="showPassword">Show password</label>
                    </section>
                    {
                        warningMessage &&
                            <div styleName="warning">{ warningMessage }</div>
                    }
                    <button onClick={this._sendUserData}>
                        Log in
                    </button>
                    <br/>
                    <Link to="signup">
                        Create new account
                    </Link>
                </section>
            </section>
        );
    }
}

export default Login;