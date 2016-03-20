import constants from 'utils/constants';

import styles from './Carcass.scss';

@CSSModules(styles)
@ReactClass
class Carcass extends React.Component {
    _listenToLogin = (e) => {
        if (e.key === constants.LS_loggedKey) {
            const {
                login,
                logout
            } = this.props;

            if (e.newValue) {
                login();
            } else {
                logout();
            }
        }
    };
    
    componentDidMount() {
        window.addEventListener('storage', this._listenToLogin);
    }
    
    componentWillUnmount() {
        window.removeEventListener('storage', this._listenToLogin);
    }
    
    render() {
        const {
            loggedIn
        } = this.props;

        return (
            <section styleName="carcass">
                Logged in: { String(loggedIn) }
                { this.props.children }
            </section>
        );
    }
}

export default Carcass;