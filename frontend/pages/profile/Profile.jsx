import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';
import { Link } from 'react-router';

import CSSModules from 'utils/css-modules';
import Loader from 'components/loader/Loader';

import styles from './Profile.scss';

@ReactClass
@CSSModules(styles)
class Profile extends Component {
    static propTypes = {
        username: PropTypes.string,

        fetchData: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.fetchData();
    }

    render() {
        const {
            fetched,
            username
        } = this.props;
        
        const rootStyleName = 'profile-page';

        if (!fetched) {
            return (
                <section styleName={rootStyleName}>
                    <Loader/>
                </section>
            );
        }

        return (
            <section styleName={rootStyleName}>
                <section styleName="container">
                    <h2>Profile</h2>
                    <p>Hello {username}!</p>
                    
                    <Link
                            styleName="edit-link"
                            to="profile/edit">
                        Edit
                    </Link>
                </section>
            </section>
        );
    }
}

export default Profile;