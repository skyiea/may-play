import React, { Component } from 'react';
import { ReactClass } from 'react-core-decorators';

import CSSModules from 'utils/css-modules';
import HeaderContainer from './header/HeaderContainer';
import constants from 'utils/constants';

import styles from './Carcass.scss';

@ReactClass
@CSSModules(styles)
class Carcass extends Component {
    _listenToLogin = (e) => {
        if (e.key === constants.lsLoggedKey) {
            document.location.reload();
        }
    };
    
    componentDidMount() {
        window.addEventListener('storage', this._listenToLogin);
    }
    
    componentWillUnmount() {
        window.removeEventListener('storage', this._listenToLogin);
    }
    
    render() {
        return (
            <section styleName="carcass">
                <HeaderContainer/>
                {this.props.children}
            </section>
        );
    }
}

export default Carcass;