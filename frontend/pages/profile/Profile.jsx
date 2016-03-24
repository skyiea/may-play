import Loader from 'components/loader/Loader';

import styles from './Profile.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Profile extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        email: PropTypes.string,

        fetchData: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.fetchData();
    }

    render() {
        const {
            fetched,
            username,
            email
        } = this.props;

        if (!fetched) {
            return (
                <section styleName="page">
                    <Loader/>
                </section>
            );
        }

        return (
            <section styleName="page">
                Hello { username }!
                Your email address is { email }.
            </section>
        );
    }
}

export default Profile;