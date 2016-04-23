import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';

import CSSModules from 'utils/css-modules';
import Loader from 'components/loader/Loader';

import styles from './Logout.scss';

@ReactClass
@CSSModules(styles)
class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.logout();
    }

    render() {
        return (
            <section styleName="logout-page">
                <Loader/>
            </section>
        );
    }
}

export default Logout;