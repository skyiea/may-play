import styles from './Input.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Input extends React.Component {
    static PropTypes = {
        className   : PropTypes.string,
        value       : PropTypes.string,
        placeholder : PropTypes.string,
        incorrect   : PropTypes.bool
    };

    render() {
        const {
            className,
            value,
            placeholder,
            incorrect,
            ...otherProps
        } = this.props;

        return (
            <section styleName={classnames('input', value && 'filled')}>
                <label>{placeholder}</label>

                <input {...otherProps}
                        className={className}
                        styleName={incorrect ? 'incorrect' : null}
                        value={value}
                        placeholder={placeholder}/>
            </section>
        );
    }
}

export default Input;