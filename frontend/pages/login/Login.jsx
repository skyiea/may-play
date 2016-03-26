import LinkedStateMixin from 'react-addons-linked-state-mixin';

import LoginStatus from '../../../universal/LoginStatus';
import Loader from 'components/loader/Loader';

import styles from './Login.scss';

@CSSModules(styles, { allowMultiple: true })
@mixin(LinkedStateMixin)
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
        warningMessage: ''
    };

    _login = () => {
        const { username, password } = this.state;

        this.props.login(username, password);
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
            warningMessage
        } = this.state;

        return (
            <section styleName="page">
                <section styleName="login-popup">
                    {
                        processing &&
                            <section styleName="loader-container">
                                <Loader/>
                            </section>
                    }
                    <section styleName="login-header">
                        Log in
                    </section>

                    <section styleName="login-content">
                        <section styleName="input-line">
                            <input
                                    id="username"
                                    type="text"
                                    disabled={processing}
                                    placeholder="Username"
                                    valueLink={this.linkState('username')}
                                    onFocus={this._clearWarning}/>
                        </section>

                        <section styleName="input-line">
                            <input
                                    id="password"
                                    type="password"
                                    disabled={processing}
                                    placeholder="Password"
                                    valueLink={this.linkState('password')}
                                    onFocus={this._clearWarning}/>
                        </section>
                        {
                            !!warningMessage &&
                                <div styleName="warning">{ warningMessage }</div>
                        }
                        <button
                                styleName="login-button"
                                disabled={!username || !password || this.props.processing}
                                onClick={this._login}>
                            Log in
                        </button>
                    </section>
                </section>
            </section>
        );
    }
}

export default Login;

/*
    TODO:
        - validation error: yellow border and error message (yellow background)
        - login using Enter button on password field
        - replace <button> to <div>
        - fix input field jumping effect on focus
        - add placeholder for username with the same effect as in target site
 */