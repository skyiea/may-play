import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { ReactClass } from 'react-core-decorators';
import omit from 'lodash.omit';

@ReactClass
class Button extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        tabIndex: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        onClick: PropTypes.func,
        blurOnEscape: PropTypes.bool,
        blurOnEnter: PropTypes.bool,
        blurOnClick: PropTypes.bool
    };

    static defaultProps = {
        disabled: false,
        tabIndex: 0,
        blurOnEscape: false,
        blurOnClick: false
    };

    _blur() {
        ReactDOM.findDOMNode(this).blur();
    }

    _handleKeyDown = (e) => {
        const {
            onClick,
            blurOnEscape,
            blurOnEnter
        } = this.props;

        const ENTER_CODE = 13;
        const ESCAPE_CODE = 27;

        if (e.keyCode === ENTER_CODE) {
            onClick(e);
            blurOnEnter && this._blur();
        } else if (e.keyCode === ESCAPE_CODE && blurOnEscape) {
            this._blur();
        }
    };

    _handleClick = (e) => {
        const {
            onClick,
            blurOnClick
        } = this.props;

        onClick(e);

        if (blurOnClick) {
            this._blur();
        }
    };

    componentDidUpdate(prevProps) {
        if (!prevProps.disabled && this.props.disabled && document.activeElement === ReactDOM.findDOMNode(this)) {
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
            'onClick',
            'blurOnEscape',
            'blurOnEnter',
            'blurOnClick'
        ]);

        return (
            <div {...filteredProps}
                    tabIndex={disabled ? null : tabIndex}
                    onClick={disabled ? null : this._handleClick}
                    onKeyDown={this._handleKeyDown}>
                {children}
            </div>
        );
    }
}

export default Button;