import LoginStatus from '../../../universal/LoginStatus';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

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
        error: null
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
            error: null
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
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
            error
        } = this.state;

        const isLoginAvailable = !!username && !!password && !processing;

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

                    <section styleName="login-content">
                        {
                            !!error &&
                                <div styleName="warning">{ Login.warnings[error] }</div>
                        }
                        <Input
                                styleName="login-input"
                                incorrect={error === LoginStatus.NO_USER_FOUND}
                                type="text"
                                autoFocus
                                disabled={processing}
                                placeholder="Username"
                                value={username}
                                onFocus={this._clearWarning}
                                onChange={(e) => this.setState({ username: e.target.value })}/>

                        <Input
                                styleName="login-input"
                                incorrect={error === LoginStatus.INCORRECT_PASSWORD}
                                type="password"
                                disabled={processing}
                                placeholder="Password"
                                value={password}
                                onFocus={this._clearWarning}
                                onKeyDown={this._handleLoginKeyDown}
                                onChange={(e) => this.setState({ password: e.target.value })}/>

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