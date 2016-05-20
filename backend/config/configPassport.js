const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/userModel');
const SignupStatus  = require('../../universal/SignupStatus');
const LoginStatus   = require('../../universal/LoginStatus');

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        const usernameExistsPromise = new Promise((resolve) => {
            User.findOne({ 'local.username': username }, (error, user) => {
                if (error) {
                    done(error);
                } else {
                    resolve(!!user);
                }
            });
        });

        const emailExistsPromise = new Promise((resolve) => {
            User.findOne({ 'local.email': req.body.email }, (error, user) => {
                if (error) {
                    done(error);
                } else {
                    resolve(!!user);
                }
            });
        });

        Promise.all([ usernameExistsPromise, emailExistsPromise ]).then(([ usernameExists, emailExists ]) => {
            if (usernameExists || emailExists) {
                let message;

                if (usernameExists) {
                    message = SignupStatus.USER_ALREADY_EXISTS;
                }

                if (emailExists) {
                    const emailError = SignupStatus.EMAIL_ALREADY_USED;

                    if (message) {
                        message = [ message, emailError ];
                    } else {
                        message = emailError;
                    }
                }

                return done(null, false, message);
            }

            const newUser = new User();

            newUser.local.username  = username;
            newUser.local.email     = req.body.email;
            newUser.local.password  = newUser.generateHash(password);

            newUser.save((err) => {
                if (err) {
                    throw err;
                }

                return done(null, newUser);
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        User.findOne({ 'local.username': username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, LoginStatus.NO_USER_FOUND);
            }

            if (!user.validPassword(password)) {
                return done(null, false, LoginStatus.INCORRECT_PASSWORD);
            }

            return done(null, user);
        });
    }));
};