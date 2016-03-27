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

    state = {
        username: '',
        password: '',
        email: ''
    };

    _handleChange = () => {
        const {
            username: initialUsername,
            email: initialEmail
        } = this.props;

        const {
            username,
            password,
            email
        } = this.state;

        const dataToBeSent = {};

        if (username && username !== initialUsername) {
            dataToBeSent.username = username;
        }

        if (email && email !== initialEmail) {
            dataToBeSent.email = email;
        }

        if (password) {
            dataToBeSent.password = password;
        }

        if (Object.keys(dataToBeSent).length) {
            this.props.updateProfile(dataToBeSent);
        }
    };

    componentWillMount() {
        this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        const {
            username,
            email
        } = nextProps;

        if (!this.props.fetched && nextProps.fetched) {
            this.setState({
                username,
                email
            });
        }
    }

    render() {
        const {
            fetched
        } = this.props;

        const {
            username,
            password,
            email
        } = this.state;

        if (!fetched) {
            return (
                <section styleName="page">
                    <Loader/>
                </section>
            );
        }

        return (
            <section styleName="profile-page page">
                <section>
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => this.setState({ username: e.target.value })}/>
                    <br/>
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => this.setState({ email: e.target.value })}/>
                    <br/>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => this.setState({ password: e.target.value })}/>
                    <br/>
                    <button onClick={this._handleChange}>
                        Change
                    </button>
                </section>
            </section>
        );
    }
}

export default Profile;