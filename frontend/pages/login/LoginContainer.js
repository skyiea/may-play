import { connect } from 'react-redux';

import login from 'actions/login';
import Login from './Login';

const mapStateToProps = ({ login: { error } }) => ({
    error
});

const mapDispatchToProps = (dispatch) => ({
    login(username, password) {
        dispatch(login(username, password));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);