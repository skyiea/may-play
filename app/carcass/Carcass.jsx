import './carcass.scss';

@ReactClass
class Carcass extends React.Component {
    render() {
        return (
            <section className="carcass">
                { this.props.children }
            </section>
        );
    }
}

export default Carcass;