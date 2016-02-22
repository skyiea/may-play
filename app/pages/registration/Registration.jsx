import LinkedStateMixin from 'react-addons-linked-state-mixin';

import styles from './Registration.scss';

@CSSModules(styles, { allowMultiple: true })
@mixin(LinkedStateMixin)
@ReactClass
class Registration extends React.Component {
    state = {
        name: '',
        email: '',
        nickname: '',
        password: '',
        repassword: ''
    };

    render() {
        return (
            <div styleName="form">
                <form method="post" styleName="contact-form">
                    <h1 styleName="title">New Account</h1>
                    <section styleName="input-line">
                        <img src="https://cdn2.iconfinder.com/data/icons/website-icons/512/User_Avatar-512.png" />
                        <input
                                id="nick"
                                type="text"
                                name="nick"
                                placeholder="Nickname"
                                valueLink={this.linkState('nickname')}
                                required />
                    </section>
                    <section styleName="input-line">
                        <img src="https://cdn0.iconfinder.com/data/icons/seo-smart-pack/128/grey_new_seo-15-512.png" />
                        <input
                                id="email"
                                type="email"
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
                    <input styleName="button" type="submit" value="Sing up!" />
                </form>
            </div>
        );
    }
}

export default Registration;