import { connect } from 'react-redux';

import Header from './Header';

const mapStateToProps = ({ loggedIn }) => ({
    loggedIn
});

const mapDispatchToProps = () => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);