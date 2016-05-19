export default {
    SIGNUP_REQUEST  : Symbol('Signup request'),
    SIGNUP_SUCCESS  : Symbol('Signed up successfully'),
    SIGNUP_FAILURE  : Symbol('Signup failed'),
    
    LOGIN_REQUEST   : Symbol('Login request'),
    LOGIN_SUCCESS   : Symbol('Logged in successfully in BE'),
    LOGIN_FAILURE   : Symbol('Login failed'),
    LOGIN           : Symbol('Login'),
    
    LOGOUT_REQUEST  : Symbol('Logout request'),
    LOGOUT_SUCCESS  : Symbol('Logged out successfully in BE'),
    LOGOUT_FAILURE  : Symbol('Logout failed'),
    LOGOUT          : Symbol('Logout'),
    
    PROFILE_FETCH_REQUEST   : Symbol('Profile fetch request'),
    PROFILE_FETCH_SUCCESS   : Symbol('Profile successfully fetched'),
    PROFILE_FETCH_FAILURE   : Symbol('Profile fetch failure'),
    
    PROFILE_UPDATE_REQUEST   : Symbol('Profile update request'),
    PROFILE_UPDATE_SUCCESS   : Symbol('Profile successfully updated'),
    PROFILE_UPDATE_FAILURE   : Symbol('Profile update failure'),
    
    CHAT: {
        ENTER: Symbol('Enter chat'),
        LEAVE: Symbol('Leave chat'),
        SEND_MESSAGE: Symbol('Send message'),
        RECEIVE_MESSAGE: Symbol('Receive message')
    }
};