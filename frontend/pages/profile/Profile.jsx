//import LinkedStateMixin from 'react-addons-linked-state-mixin';
//import fetch from 'utils/fetch';
//import { Link } from 'react-router';

import { logout } from 'utils/auth';

//import styles from './Profile.scss';

//@CSSModules(styles, { allowMultiple: true })
//@mixin(LinkedStateMixin)
@ReactClass
class Profile extends React.Component {
    render() {
        return (
            <section>
                <a
                        href="#"
                        onClick={logout}>
                    Logout
                </a>
                <br/>
                Yay! Profile under development!
            </section>
        );
    }
}

export default Profile;