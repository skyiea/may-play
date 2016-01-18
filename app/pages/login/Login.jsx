import LinkedStateMixin from 'react-addons-linked-state-mixin';

import './login.scss';

@mixin(LinkedStateMixin)
@ReactClass
class Login extends React.Component {
    state = {
        nickname: '',
        password: ''
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
                                valueLink={this.linkState('nickname')}/>
                    </section>
                </section>
            </section>
        );
    }
}

export default Login;