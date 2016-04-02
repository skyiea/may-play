import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import styles from './Loader.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Loader extends Component {
    static propTypes = {
        className   : PropTypes.string,
        isDark      : PropTypes.bool,
        
        size: PropTypes.oneOf([
            'small',
            'normal',
            'big',
            'flex'
        ])
    };

    static defaultProps = {
        isDark  : false,
        size    : 'normal'
    };

    render() {
        const {
            className,
            isDark,
            size
        } = this.props;

        const styleNames = classnames(
            'loader',
            size,
            isDark && 'dark'
        );

        return (
            <div
                    className={className}
                    styleName={styleNames}>
            </div>
        );
    }
}

export default Loader;