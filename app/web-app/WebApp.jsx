import './web-app.scss';

@ReactClass
class WebApp extends React.Component {
    render() {
        return (
            <section className="web-app">
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

export default WebApp;