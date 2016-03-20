//import LinkedStateMixin from 'react-addons-linked-state-mixin';
//import fetch from 'utils/fetch';
//import { Link } from 'react-router';

//import styles from './Profile.scss';

//@CSSModules(styles, { allowMultiple: true })
//@mixin(LinkedStateMixin)
@ReactClass
class Profile extends React.Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    render() {
        return (
            <section>
                <a
                        href="#"
                        onClick={this.props.logout}>
                    Logout
                </a>
                <br/>
                Yay! Profile under development!
            </section>
        );
    }
}

export default Profile;