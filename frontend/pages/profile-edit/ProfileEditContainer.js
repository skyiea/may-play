import { connect } from 'react-redux';

import fetchProfile from 'actions/fetchProfileAction';
import updateProfile from 'actions/updateProfileAction';
import ProfileEdit from './ProfileEdit';

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
)(ProfileEdit);