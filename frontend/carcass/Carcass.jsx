import React, { Component } from 'react';
import { ReactClass } from 'react-core-decorators';

import CSSModules from 'utils/css-modules';
import HeaderContainer from './header/HeaderContainer';

import styles from './Carcass.scss';

@ReactClass
@CSSModules(styles)
class Carcass extends Component {
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