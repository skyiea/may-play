import React, { Component } from 'react';
import { ReactClass } from 'react-core-decorators';
import CSSModules from 'react-css-modules';

import HeaderContainer from 'components/header/HeaderContainer';
import constants from 'utils/constants';

import styles from './Carcass.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
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