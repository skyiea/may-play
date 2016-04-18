import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ReactClass, mixin } from 'react-core-decorators';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import styles from './Expander.scss';

@CSSModules(styles, { allowMultiple: true })
@mixin(PureRenderMixin)
@ReactClass
class Expander extends Component {
    static propTypes = {
        className                   : PropTypes.string,
        wrapperClassName            : PropTypes.string,
        expanded                    : PropTypes.bool.isRequired,
        captureChildrenOnCollapse   : PropTypes.bool,

        speed: PropTypes.oneOf([
            'fast',
            'normal',
            'slow'
        ])
    };
    
    static defaultProps = {
        speed: 'normal',
        captureChildrenOnCollapse: false
    };

    resizeEndTimeout = 250;
    resizeEndTimeoutHandler = null;

    constructor(...args) {
        super(...args);

        this.state = {
            height: null,
            capturedChildren: this.props.captureChildrenOnCollapse ? this.props.children : null
        };
    }

    _handleResize = () => {
        this.resizeEndTimeoutHandler !== null && window.clearTimeout(this.resizeEndTimeoutHandler);

        // In performance regard, updating content height happens only when resize action is over, rather
        // than on each resize event fire, which will lead to a bunch of render calls and lags as a result.
        this.resizeEndTimeoutHandler = window.setTimeout(() => {
            this._updateHeight();
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

        if (this.props.expanded) {
            this._updateHeight();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            expanded,
            captureChildrenOnCollapse,
            children
        } = this.props;

        const willExpand = nextProps.expanded && !expanded;
        const willCollapse = !nextProps.expanded && expanded;

        if (willExpand && children !== nextProps.children) {
            this.setState({ height: null }, this._updateHeight);
        }

        // Need to save (capture) children *before* collapse will occur, otherwise children might be already emptied
        if (captureChildrenOnCollapse && !willCollapse) {
            this.setState({
                capturedChildren: nextProps.children
            });
        }
    }

    componentWillUnmount() {
        this.resizeEndTimeoutHandler !== null && window.clearTimeout(this.resizeEndTimeoutHandler);
        window.removeEventListener('resize', this._handleResize);
    }

    render() {
        const {
            className,
            wrapperClassName,
            captureChildrenOnCollapse,
            expanded,
            children
        } = this.props;

        const {
            height,
            capturedChildren
        } = this.state;

        const expanderStyleNames = classnames(
            'expander',
            height && this._getTransitionSpeed(),
            { expanded }
        );

        const expanderStyles = {
            height      : expanded ? height : null,
            maxHeight   : expanded ? height : null
        };

        return (
            <section
                    className={className}
                    styleName={expanderStyleNames}
                    style={expanderStyles}>
                <section
                        ref="wrapper"
                        className={wrapperClassName}
                        styleName="wrapper">
                    {captureChildrenOnCollapse ? capturedChildren : children}
                </section>
            </section>
        );
    }
}

export default Expander;