import SignupStatus from '../../../universal/SignupStatus';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

import styles from './Signup.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Signup extends React.Component {
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
                                onChange={(e) => this.setState({ username: e.target.value })} />
                        <Input
                                styleName="signup-input"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => this.setState({ email: e.target.value })}/>
                        <Input
                                styleName="signup-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => this.setState({ password: e.target.value })} />
                        <Input
                                styleName="signup-input"
                                type="password"
                                placeholder="Confirm Password"
                                value={repassword}
                                onKeyDown={this._handleLoginKeyDown}
                                onChange={(e) => this.setState({ repassword: e.target.value})} />
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