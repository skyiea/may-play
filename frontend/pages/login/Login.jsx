import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';

import LoginStatus from '../../../universal/LoginStatus';

import styles from './Login.scss';

@CSSModules(styles, { allowMultiple: true })
@mixin(LinkedStateMixin)
@ReactClass
class Login extends React.Component {
    static propTypes = {
        error: PropTypes.string,
        
        login: PropTypes.func.isRequired
    };
    
    static warnings = {
        'INSUFFICIENT_DATA'                 : 'All field must be filled',
        [ LoginStatus.NO_USER_FOUND ]       : 'Incorrect username entered',
        [ LoginStatus.INCORRECT_PASSWORD ]  : 'Incorrect password entered'
    };
    
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
                warningMessage: Login.warnings.INSUFFICIENT_DATA
            });
        } else {
            this.props.login(username, password);
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                warningMessage: Login.warnings[nextProps.error]
            });
        }
    }

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
                        <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                onFocus={this._clearWarning}
                                valueLink={this.linkState('username')}/>
                    </section>

                    <section styleName="input-line">
                        <input
                                id="password"
                                type={isChecked ? "text" : "password"}
                                placeholder="Password"
                                onFocus={this._clearWarning}
                                valueLink={this.linkState('password')}/>
                    </section>

                    <section styleName="input-line">
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