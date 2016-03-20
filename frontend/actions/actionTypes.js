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
    LOGOUT          : Symbol('Logout')
};