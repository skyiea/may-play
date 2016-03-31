import LoginStatus from '../../../universal/LoginStatus';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';

import styles from './Login.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Login extends React.Component {
    static propTypes = {
        error: PropTypes.string,
        processing: PropTypes.bool.isRequired,
        
        login: PropTypes.func.isRequired
    };
    
    static warnings = {
        [ LoginStatus.NO_USER_FOUND ]       : 'Incorrect username entered',
        [ LoginStatus.INCORRECT_PASSWORD ]  : 'Incorrect password entered'
    };
    
    state = {
        username: '',
        password: '',
        warningMessage: '',
        focusedName: null,
        focusedPass: null
    };

    _handleLoginKeyDown = (e) => {
        const { username, password } = this.state;
        const ENTER_CODE = 13;

        if (e.keyCode === ENTER_CODE && !!password && !!username) {
            this._login();
        }
    };

    _login = () => {
        const { username, password } = this.state;

        this.props.login(username, password);
        this._clearWarning();
    };

    _clearWarning = () => {
        this.setState({
            warningMessage: ''
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
            processing
        } = this.props;

        const {
            username,
            password,
            warningMessage,
            focusedName,
            focusedPass
        } = this.state;

        const isLoginAvailable = !!username && !!password && !processing;

        const incorrectUserName = Login.warnings[LoginStatus.NO_USER_FOUND];
        const incorrectPassword = Login.warnings[LoginStatus.INCORRECT_PASSWORD];

        return (
            <section styleName="page">
                <section styleName="login-popup">
                    {
                        processing &&
                            <section styleName="loader-container">
                                <Loader/>
                            </section>
                    }
                    <section styleName="login-header">Log in</section>

                    <section styleName={classnames('login-content', !!warningMessage && 'error')}>
                        {
                            !!warningMessage &&
                                <div styleName="warning">{ warningMessage }</div>
                        }
                        <section
                                styleName={classnames('login-line', focusedName === 'login' && 'focused')}
                                onChange={(e) => this.setState({ focusedName: !!e.target.value ? 'login' : null })}>
                            <label htmlFor="username">Username</label>

                            <input
                                    id="username"
                                    styleName={warningMessage === incorrectUserName ? 'incorrect' : null}
                                    type="text"
                                    autoFocus
                                    disabled={processing}
                                    placeholder="Username"
                                    value={username}
                                    onFocus={this._clearWarning}
                                    onChange={(e) => this.setState({ username: e.target.value })}/>
                        </section>

                        <section
                                styleName={classnames('login-line', focusedPass === 'password' && 'focused')}
                                onChange={(e) => this.setState({ focusedPass: !!e.target.value ? 'password' : null })}>
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                    id="password"
                                    styleName={warningMessage === incorrectPassword ? 'incorrect' : null}
                                    type="password"
                                    disabled={processing}
                                    placeholder="Password"
                                    value={password}
                                    onFocus={this._clearWarning}
                                    onKeyDown={this._handleLoginKeyDown}
                                    onChange={ (e) => this.setState({ password: e.target.value })}/>
                        </section>

                        <Button
                                disabled={!isLoginAvailable}
                                styleName={classnames('login-button', !isLoginAvailable && 'disabled')}
                                onClick={this._login}>
                            Log in
                        </Button>
                    </section>
                </section>
            </section>
        );
    }
}

export default Login;

/*
    TODO:
    -   extract enhanced input line to separate component <Input>
    -   make padding-top transition in <Input> +
    -   clear error-state on login +
    -   use LoginStatus instead string literals in render method +
    -   get rid LinkedStateMixin +
    -   make label-placeholder not possible to select and click on (like in target site) +
    -   fix issue with label-placeholder incorrect appearance (doesn't appear when input is just focused)+
*/