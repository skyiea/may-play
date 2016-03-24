import { connect } from 'react-redux';

import fetchProfile from 'actions/fetchProfile';
import Profile from './Profile';

const mapStateToProps = ({ profile: { fetched, username, email }}) => ({
    fetched,
    username,
    email
});

const mapDispatchToProps = (dispatch) => ({
    fetchData() {
        dispatch(fetchProfile());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);