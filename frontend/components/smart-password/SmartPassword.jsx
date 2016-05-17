import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ReactClass, mixin } from 'react-core-decorators';
import classnames from 'classnames';
import omit from 'lodash.omit';

import CSSModules from 'utils/css-modules';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

import styles from './SmartPassword.scss';

/**
 *  'zxcvbn' lib weights considerably, hence we'll load it on demand only
 *  @returns {Promise}
 */
const ensureZxcvbn = (function() {
    let zxcvbnPromise;

    return function() {
        if (!zxcvbnPromise) {
            zxcvbnPromise = new Promise((resolve) => {
                require.ensure('zxcvbn', (require) => {
                    resolve(require('zxcvbn'));
                });
            });
        }

        return zxcvbnPromise;
    };
})();

@ReactClass
@mixin(PureRenderMixin)
@CSSModules(styles)
class SmartPassword extends Component {
    static propTypes = {
        className       : PropTypes.string,
        inputClassName  : PropTypes.string,
        value           : PropTypes.string,
        allowUnmask     : PropTypes.bool,
        disabled        : PropTypes.bool,

        updatePwStrDelay: (props, propName) => !Number.isInteger(Number(props[propName])) &&
                            new Error('Invalid prop `updatePwStrDelay` supplied to `SmartPassword`.'),

        onChange: PropTypes.func,
        onStrengthChange: PropTypes.func
    };
    
    static defaultProps = {
        updatePwStrDelay: 250,
        allowUnmask: true
    };

    static strengthGradation = [
        'Very weak',
        'Weak',
        'Decent',
        'Strong',
        'Very strong'
    ];

    state = {
        masked: true
    };

    updatePwStrTimeoutHandler = null;
    
    handleChange = (e) => {
        const {
            updatePwStrDelay,
            allowUnmask,

            onChange,
            onStrengthChange
        } = this.props;

        const { value } = e.target;
        
        onChange && onChange(e);

        // reset to "masked" mode if input is emptied
        if (allowUnmask && !value && !this.state.masked) {
            this.setState({
                masked: true
            });
        }

        if (onStrengthChange) {
            ensureZxcvbn();

            // In performance regard password strength will be calculated only after {updatePwStrTimeout}ms idle time
            this.updatePwStrTimeoutHandler !== null && clearTimeout(this.updatePwStrTimeoutHandler);

            this.updatePwStrTimeoutHandler = setTimeout(() => {
                // It's possible that 'zxcvbn' won't be loaded yet when this callback is fired, thus promise is used
                ensureZxcvbn().then((zxcvbn) => {
                    onStrengthChange(zxcvbn(value).score);
                });
            }, Number(updatePwStrDelay));
        }
    };

    handleBlur = () => {
        // to know next focused element we'll need to make timeout
        setTimeout(() => {
            if (!ReactDOM.findDOMNode(this).contains(document.activeElement)) {
                this.setState({
                    masked: true
                });
            }
        }, 0);
    };

    handleToggle = () => {
        this.setState({
            masked: !this.state.masked
        });

        this.refs.input.focus();
    };
    
    render() {
        const {
            className,
            inputClassName,
            value,
            allowUnmask,
            disabled,
            
            ...otherProps
        } = this.props;

        const {
            masked
        } = this.state;
        
        const passedProps = omit(otherProps, [
            'styles',
            'updatePwStrDelay',
            
            'onChange',
            'onStrengthChange'
        ]);

        return (
            <section
                    styleName={classnames('smart-pw', allowUnmask && 'with-toggle')}
                    className={className}
                    onBlur={this.handleBlur}>
                <Input {...passedProps}
                        className={inputClassName}
                        ref="input"
                        type={masked ? 'password' : 'text'}
                        value={value}
                        disabled={disabled}
                        onChange={this.handleChange}
                />
                {
                    allowUnmask && !!value &&
                        <Button
                                blurOnClick={false}
                                disabled={disabled}
                                title={`${masked ? 'Show' : 'Hide'} password`}
                                styleName={classnames('toggle', !masked && 'unmasked')}
                                onClick={this.handleToggle}
                        />
                }
            </section>
        );
    }
}

export default SmartPassword;