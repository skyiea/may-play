const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/user');
const SignupStatus  = require('../../universal/SignupStatus');
const LoginStatus   = require('../../universal/LoginStatus');

module.exports = function (passport) {
    'use strict';

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
        const query = User.findOne({
            $or: [
                { 'local.username': username },
                { 'local.email': req.body.email }
            ]
        });

        query.exec((err, foundUser) => {
            if (err) {
                return done(err);
            }

            if (foundUser) {
                let message;

                if (foundUser.local.username === username) {
                    message = SignupStatus.USER_ALREADY_EXISTS;
                }

                if (foundUser.local.email === req.body.email) {
                    const emailError = SignupStatus.EMAIL_ALREADY_USED;

                    if (message) {
                        message = [ message ];
                        message.push(emailError);
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