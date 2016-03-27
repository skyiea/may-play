import { connect } from 'react-redux';

import fetchProfile from 'actions/fetchProfile';
import updateProfile from 'actions/updateProfile';
import Profile from './Profile';

const mapStateToProps = ({ profile: { fetched, username, email }}) => ({
    fetched,
    username,
    email
});

const mapDispatchToProps = (dispatch) => ({
    fetchData() {
        dispatch(fetchProfile());
    },
    
    updateProfile(data) {
        dispatch(updateProfile(data));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);