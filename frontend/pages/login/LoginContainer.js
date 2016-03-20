import { connect } from 'react-redux';

import processLogin from 'actions/login';
import Login from './Login';

const mapStateToProps = ({ login: { error } }) => ({
    error
});

const mapDispatchToProps = (dispatch) => ({
    login(username, password) {
        dispatch(processLogin(username, password));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);