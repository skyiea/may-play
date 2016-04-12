import styles from './Footer.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Footer extends React.Component {
    render() {
        return (
            <footer styleName="app-footer">
                2016
            </footer>
        );
    }
}

export default Footer;