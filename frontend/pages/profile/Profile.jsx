import styles from './Profile.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Profile extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        email: PropTypes.string,

        fetchData   : PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.fetchData();
    }

    render() {
        const {
            username,
            email
        } = this.props;

        return (
            <section styleName="page">
                Hello { username }!
                Your email address is { email }.
            </section>
        );
    }
}

export default Profile;