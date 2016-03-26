import LinkedStateMixin from 'react-addons-linked-state-mixin';

import styles from './Signup.scss';

@CSSModules(styles, { allowMultiple: true })
@mixin(LinkedStateMixin)
@ReactClass
class Signup extends React.Component {
    static propTypes = {
        signup: PropTypes.func.isRequired
    };
    
    state = {
        username    : '',
        email       : '',
        password    : '',
        repassword  : ''
    };

    _handleSubmit = () => {
        const { username, email, password } = this.state;
        
        this.props.signup({ username, email, password });
    };

    render() {
        return (
            <section styleName="page">
                <section styleName="signup-popup">
                    <h1 styleName="title">New Account</h1>
                    <section styleName="input-line">
                       <img src="https://cdn2.iconfinder.com/data/icons/website-icons/512/User_Avatar-512.png" />
                       <input
                               id="username"
                               type="text"
                               name="username"
                               placeholder="Username"
                               valueLink={this.linkState('username')}
                               required />
                    </section>
                    <section styleName="input-line">
                        <img src="https://cdn0.iconfinder.com/data/icons/seo-smart-pack/128/grey_new_seo-15-512.png" />
                        <input
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Email"
                                valueLink={this.linkState('email')}
                                required />
                    </section>
                    <section styleName="input-line">
                        <img src="https://cdn2.iconfinder.com/data/icons/app-types-in-grey/512/lock_512pxGREY.png" />
                        <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                valueLink={this.linkState('password')}
                                required />
                    </section>
                    <section styleName="input-line">
                       <img src="https://cdn2.iconfinder.com/data/icons/app-types-in-grey/512/lock_512pxGREY.png" />
                       <input
                               id="repassword"
                               type="password"
                               name="password"
                               placeholder="Confirm Password"
                               valueLink={this.linkState('repassword')}
                               required />
                    </section>
                    <br/>
                    <input
                            styleName="button"
                            type="submit"
                            value="Sign up!"
                            onClick={this._handleSubmit}/>
                </section>
            </section>
        );
    }
}

export default Signup;