import { connect } from 'react-redux';

import signup from 'actions/signup';
import Signup from './Signup';

const mapStateToProps = ({ signup: { processing, error }}) => ({
    processing,
    error
});

const mapDispatchToProps = (dispatch) => ({
    signup(data) {
        dispatch(signup(data));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);