import React, { Component } from 'react';
import { ReactClass } from 'react-core-decorators';
import classnames from 'classnames';
import { Link } from 'react-router';

import CSSModules from 'utils/css-modules';

import styles from './Header.scss';

@ReactClass
@CSSModules(styles)
class Header extends Component {
    render() {
        const {
            loggedIn
        } = this.props;

        return (
            <header styleName="app-header">
                <Link
                        styleName="logo link"
                        to="/">
                    May Play    
                    {
                        DEBUG &&
                            <i styleName={classnames('debug-online-status', loggedIn && 'online')}/>
                    }
                </Link>

                <section styleName="account-area">
                    {
                        !loggedIn ?
                            [
                                <Link
                                        key="login"
                                        styleName="link"
                                        to="login">
                                    Login
                                </Link>,
                                <Link
                                        key="signup"
                                        styleName="link"
                                        to="signup">
                                    Sign up
                                </Link>
                            ] : [
                                <Link
                                        key="profile"
                                        styleName="link"
                                        to="profile">
                                    Profile
                                </Link>,
                                <Link
                                        key="logout"
                                        styleName="link"
                                        to="logout">
                                    Logout
                                </Link>
                            ]
                    }
                </section>
            </header>
        );
    }
}

export default Header;