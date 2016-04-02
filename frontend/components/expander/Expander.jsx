import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ReactClass, mixin } from 'react-core-decorators';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import styles from './Expander.scss';

@CSSModules(styles, { allowMultiple: true })
@mixin(PureRenderMixin)
@ReactClass
class Expander extends React.Component {
    static propTypes = {
        className       : React.PropTypes.string,
        wrapperClassName: React.PropTypes.string,
        visible         : React.PropTypes.bool.isRequired,

        speed: React.PropTypes.oneOf([
            'fast',
            'normal',
            'slow'
        ])
    };
    
    static defaultProps = {
        speed: 'normal'
    };

    resizeEndTimeout = 250;
    resizeEndTimeoutHandler = null;

    state = {
        height: null
    };

    _handleResize = () => {
        this.resizeEndTimeoutHandler !== null && window.clearTimeout(this.resizeEndTimeoutHandler);

        // In performance regard, updating content height happens only when resize action is over, rather
        // than on each resize event fire, which will lead to a bunch of render calls and lags as a result.
        this.resizeEndTimeoutHandler = window.setTimeout(() => {
            this.updateHeight();
            this.resizeEndTimeoutHandler = null;
        }, this.resizeEndTimeout);
    };

    _updateHeight = () => {
        const height = this.refs.wrapper.clientHeight;

        this.setState({
            height: height || null
        });
    };

    _getTransitionSpeed() {
        const { height } = this.state;
        let speed;

        if (this.props.speed) {
            speed = this.props.speed;
        } else {
            if (height < 50) {
                speed = 'fast';
            } else if (height < 250) {
                speed = 'normal';
            } else {
                speed = 'slow';
            }
        }

        return `${speed}-transition`;
    }

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);

        if (this.props.visible) {
            this._updateHeight();
        }
    }

    componentWillUnmount() {
        this.resizeEndTimeoutHandler !== null && window.clearTimeout(this.resizeEndTimeoutHandler);
        window.removeEventListener('resize', this._handleResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && !this.props.visible && this.props.children !== nextProps.children) {
            this.setState({ height: null }, this._updateHeight);
        }
    }

    render() {
        const {
            className,
            wrapperClassName,
            visible,
            children
        } = this.props;

        const { height } = this.state;

        const expanderStyleNames = classnames(
            'expander',
            visible && 'expanded',
            height && this._getTransitionSpeed()
        );

        const expanderStyles = {
            height: visible ? height : null,
            maxHeight: visible ? height : null
        };

        return (
            <div
                    className={className}
                    styleName={expanderStyleNames}
                    style={expanderStyles}>
                <div
                        ref="wrapper"
                        className={wrapperClassName}
                        styleName="wrapper">
                    {children}
                </div>
            </div>
        );
    }
}

export default Expander;