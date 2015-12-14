import './carcass.scss';

@ReactClass
class Carcass extends React.Component {
    render() {
        return (
            <section className="carcass">
                <header>
                    <a href="/#/">React application</a>
                </header>
                <main>
                    { this.props.children }
                </main>
                <footer>
                    <a href="https://github.com/skyiea/jsx-suit">GitHub</a>
                </footer>
            </section>
        );
    }
}

export default Carcass;