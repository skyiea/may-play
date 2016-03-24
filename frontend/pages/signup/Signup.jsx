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

    _handleSubmit = (e) => {
        const { username, email, password } = this.state;
        
        e.preventDefault();

        this.props.signup({ username, email, password });
    };

    render() {
        return (
            <div styleName="page form">
                <form
                        styleName="contact-form"
                        method="post"
                        onSubmit={this._handleSubmit}>
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
                    <input styleName="button" type="submit" value="Sign up!" />
                </form>
            </div>
        );
    }
}

export default Signup;