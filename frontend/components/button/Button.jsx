import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';
import { ReactClass } from 'react-core-decorators';
import omit from 'lodash.omit';

import styles from './Button.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Button extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        tabIndex: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        blurOnEscape: PropTypes.bool,
        blurOnEnter : PropTypes.bool,
        blurOnClick : PropTypes.bool,

        onMouseDown : PropTypes.func,
        onClick     : PropTypes.func,
        onKeyDown   : PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        tabIndex: 0,
        blurOnEscape: false,
        blurOnClick: false
    };

    _isFocused() {
        return document.activeElement === ReactDOM.findDOMNode(this);
    }

    _blur() {
        ReactDOM.findDOMNode(this).blur();
    }

    _handleKeyDown = (e) => {
        const {
            onClick,
            onKeyDown,
            blurOnEscape,
            blurOnEnter
        } = this.props;

        const ENTER_CODE = 13;
        const ESCAPE_CODE = 27;

        if (e.keyCode === ENTER_CODE) {
            onClick && onClick(e);
            blurOnEnter && this._blur();
        } else if (e.keyCode === ESCAPE_CODE && blurOnEscape) {
            this._blur();
        }

        onKeyDown && onKeyDown(e);
    };

    _handleMouseDown = (e) => {
        const {
            onMouseDown
        } = this.props;

        // this is necessary because even if tabIndex is -1 it is still possible to focus button via pointer
        e.preventDefault();

        // still need to blur from previously focused element
        if (document.activeElement) {
            document.activeElement.blur();
        }

        onMouseDown && onMouseDown(e);
    };

    _handleClick = (e) => {
        const {
            onClick,
            blurOnClick
        } = this.props;

        onClick && onClick(e);

        if (blurOnClick) {
            this._blur();
        }
    };

    componentDidUpdate(prevProps) {
        if (!prevProps.disabled && this.props.disabled && this._isFocused()) {
            this._blur();
        }
    }

    render() {
        const {
            children,
            disabled,
            tabIndex,
            ...otherProps
        } = this.props;

        const filteredProps = omit(otherProps, [
            'styles',
            'onClick',
            'onKeyDown',
            'onMouseDown',
            'blurOnEscape',
            'blurOnEnter',
            'blurOnClick'
        ]);
        
        const styleNames = classnames('button', { disabled });

        return (
            <div {...filteredProps}
                    styleName={styleNames}
                    tabIndex={disabled ? null : tabIndex}
                    onMouseDown={this._handleMouseDown}
                    onClick={disabled ? null : this._handleClick}
                    onKeyDown={this._handleKeyDown}>
                {children}
            </div>
        );
    }
}

export default Button;