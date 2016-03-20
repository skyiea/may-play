import { connect } from 'react-redux';

import processLogout from 'actions/logout';
import fetchProfile from 'actions/fetchProfile';
import Profile from './Profile';

const mapStateToProps = ({ profile: { username, email }}) => ({
    username,
    email
});

const mapDispatchToProps = (dispatch) => ({
    logout() {
        dispatch(processLogout());
    },
    
    fetchData() {
        dispatch(fetchProfile());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);