const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/user');
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
        User.findOne({ 'local.username': username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, SignupStatus.USER_ALREADY_EXISTS);
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