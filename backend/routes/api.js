const express = require('express');

const api = express.Router();

module.exports = function (passport) {
    api.post('/signup',
        (req, res, next) => {
            passport.authenticate('local-signup', (err, user, message) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.json({
                        message
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.status(302).json({
                        location: '/profile'
                    });
                });
            })(req, res, next);
        }
    );

    api.post('/login',
        (req, res, next) => {
            passport.authenticate('local-login', (err, user, message) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.json({
                        message
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.status(302).json({
                        location: '/profile'
                    });
                });
            })(req, res, next);
        }
    );

    return api;
};