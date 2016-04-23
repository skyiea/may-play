import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';
import { Link } from 'react-router';

import CSSModules from 'utils/css-modules';
import Loader from 'components/loader/Loader';
import Input from 'components/input/Input';

import styles from './ProfileEdit.scss';

@ReactClass
@CSSModules(styles)
class ProfileEdit extends Component {
    static propTypes = {
        username: PropTypes.string,
        email: PropTypes.string,

        fetchData: PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: '',
        email: ''
    };

    _handleChange = () => {
        const {
            username: initialUsername,
            email: initialEmail
        } = this.props;

        const {
            username,
            password,
            email
        } = this.state;

        const dataToBeSent = {};

        if (username && username !== initialUsername) {
            dataToBeSent.username = username;
        }

        if (email && email !== initialEmail) {
            dataToBeSent.email = email;
        }

        if (password) {
            dataToBeSent.password = password;
        }

        if (Object.keys(dataToBeSent).length) {
            this.props.updateProfile(dataToBeSent);
        }
    };

    _handleUsernameInputChange = (e) => {
        this.setState({ username: e.target.value });
    };

    _handleEmailInputChange = (e) => {
        this.setState({ email: e.target.value });
    };

    _handlePasswordInputChange = (e) => {
        this.setState({ password: e.target.value });
    };

    componentWillMount() {
        this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        const {
            username,
            email
        } = nextProps;

        if (!this.props.fetched && nextProps.fetched) {
            this.setState({
                username,
                email
            });
        }
    }

    render() {
        const {
            fetched
        } = this.props;

        const {
            username,
            password,
            email
        } = this.state;
        
        const rootStyleName = 'profile-edit-page';

        if (!fetched) {
            return (
                <section styleName={rootStyleName}>
                    <Loader/>
                </section>
            );
        }

        return (
            <section styleName={rootStyleName}>
                <section styleName="container">
                    <Input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={this._handleUsernameInputChange}
                    />
                    <br/>
                    <Input
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={this._handleEmailInputChange}
                    />
                    <br/>
                    <Input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={this._handlePasswordInputChange}
                    />
                    <br/>
                    <button onClick={this._handleChange}>
                        Change
                    </button>
                    <Link to="/profile">Back</Link>
                </section>
            </section>
        );
    }
}

export default ProfileEdit;