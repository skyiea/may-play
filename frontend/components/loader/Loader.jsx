import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ReactClass, mixin } from 'react-core-decorators';
import classnames from 'classnames';

import CSSModules from 'utils/css-modules';

import styles from './Loader.scss';

@mixin(PureRenderMixin)
@ReactClass
@CSSModules(styles)
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

        const rootStyleName = classnames(
            'loader',
            size,
            isDark && 'dark'
        );

        return (
            <div className={className} styleName={rootStyleName}></div>
        );
    }
}

export default Loader;