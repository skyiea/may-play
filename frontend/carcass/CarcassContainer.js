import { connect } from 'react-redux';

import { doLogin } from 'actions/login';
import { doLogout } from 'actions/logout';
import Carcass from './Carcass';

const mapStateToProps = ({ loggedIn }) => ({
    loggedIn
});

const mapDispatchToProps = (dispatch) => ({
    login() {
        dispatch(doLogin());
    },

    logout() {
        dispatch(doLogout());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Carcass);