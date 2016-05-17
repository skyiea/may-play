import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { ReactClass } from 'react-core-decorators';
import omit from 'lodash.omit';

import CSSModules from 'utils/css-modules';

import styles from './Button.scss';

@ReactClass
@CSSModules(styles)
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
            blurOnClick,

            onMouseDown
        } = this.props;

        onMouseDown && onMouseDown(e);

        if (blurOnClick) {
            // instead of making blur() after click (will cause 'outline-blink' effect, since there will be period
            // of time between MouseDown and Click events where CSS outline prop will appear)
            // prevent button from receiving focus at all (click still will be fired)

            // default behaviour would be blur on active element, and focus on current button
            e.preventDefault();

            // do blur manually and skip focus
            if (document.activeElement) {
                document.activeElement.blur();
            }
        } else if (e.target !== document.activeElement) {
            e.preventDefault();
        }
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

        const passedProps = omit(otherProps, [
            'styles',
            'blurOnEscape',
            'blurOnEnter',
            'blurOnClick',
            
            'onClick',
            'onKeyDown',
            'onMouseDown'
        ]);
        
        const rootStyleName = classnames('button', { disabled });

        return (
            <div {...passedProps}
                    styleName={rootStyleName}
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