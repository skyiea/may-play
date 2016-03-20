import { connect } from 'react-redux';

import Carcass from './Carcass';

const mapStateToProps = ({ loggedIn }) => ({
    loggedIn
});

const mapDispatchToProps = () => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Carcass);