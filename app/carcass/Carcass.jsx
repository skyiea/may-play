import styles from './Carcass.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Carcass extends React.Component {
    render() {
        return (
            <section styleName="carcass">
                { this.props.children }
            </section>
        );
    }
}

export default Carcass;