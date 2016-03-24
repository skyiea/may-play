import Loader from 'components/loader/Loader';

import styles from './Logout.scss';

@CSSModules(styles)
@ReactClass
class Logout extends React.Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.logout();
    }

    render() {
        return (
            <section styleName="page">
                <Loader/>
            </section>
        );
    }
}

export default Logout;