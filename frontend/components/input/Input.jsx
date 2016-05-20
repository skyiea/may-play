import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';
import classnames from 'classnames';

import CSSModules from 'utils/css-modules';

import styles from './Input.scss';

@ReactClass
@CSSModules(styles)
class Input extends Component {
    static PropTypes = {
        wrapperClassName: PropTypes.string,
        value           : PropTypes.string,
        placeholder     : PropTypes.string,
        incorrect       : PropTypes.bool
    };
    
    focus() {
        this.refs.input.focus();
    }

    render() {
        const {
            wrapperClassName,
            value,
            placeholder,
            incorrect,
            
            ...otherProps
        } = this.props;

        return (
            <section
                    className={wrapperClassName}
                    styleName={classnames('input', value && 'filled')}>
                <label>{placeholder}</label>

                <input {...otherProps}
                        ref="input"
                        styleName={incorrect ? 'incorrect' : null}
                        value={value}
                        placeholder={placeholder}
                />
            </section>
        );
    }
}

export default Input;