import { connect } from 'react-redux';

import fetchProfile from 'actions/fetchProfile';
import Profile from './Profile';

const mapStateToProps = ({ profile: { fetched, username }}) => ({
    fetched,
    username
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