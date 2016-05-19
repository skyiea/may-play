import { connect } from 'react-redux';

import processLogout from 'actions/logoutActions';
import Logout from './Logout';

const mapDispatchToProps = (dispatch) => ({
    logout() {
        dispatch(processLogout());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(Logout);