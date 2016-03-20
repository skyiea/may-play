import { connect } from 'react-redux';

import processLogout from 'actions/logout';
import Profile from './Profile';

const mapStateToProps = () => ({
    
});

const mapDispatchToProps = (dispatch) => ({
    logout() {
        dispatch(processLogout());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);