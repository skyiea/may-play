import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

import Loader from 'components/loader/Loader';

import styles from './Profile.scss';

@CSSModules(styles, { allowMultiple: true })
@ReactClass
class Profile extends Component {
    static propTypes = {
        username: PropTypes.string,
        email: PropTypes.string
    };

    state = {
        username: '',
        email: ''
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
            username
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