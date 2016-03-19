const express = require('express');

const api = express.Router();

module.exports = function (passport) {
    api.post('/signup',
        (req, res, next) => {
            passport.authenticate('local-signup', (err, user, payload) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.json({
                        success: false,
                        payload
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.status(302).json({
                        success: true,
                        location: '/profile'
                    });
                });
            })(req, res, next);
        }
    );

    api.post('/login',
        (req, res, next) => {
            passport.authenticate('local-login', (err, user, payload) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.json({
                        success: false,
                        payload
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.status(302).json({
                        success: true,
                        location: '/profile'
                    });
                });
            })(req, res, next);
        }
    );

    api.post('/logout', (req, res) => {
        req.logout();
        res.clearCookie('connect.sid', '/');

        res.status(302).json({
            success: true,
            location: '/'
        });
    });

    return api;
};