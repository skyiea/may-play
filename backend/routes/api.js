const express = require('express');

const User                  = require('../models/user');
const { authAPI }           = require('./authMiddleware');
const ProfileChangeStatus   = require('../../universal/ProfileChangeStatus');

const api = express.Router();

module.exports = function (passport) {
    'use strict';

    api.post('/signup',
        (req, res, next) => {
            passport.authenticate('local-signup', (err, user, payload) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(400).json({
                        message: payload
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
            passport.authenticate('local-login', (err, user, payload) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(400).json({
                        message: payload
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

    api.post('/logout', (req, res) => {
        req.logout();
        // not cleared automatically
        res.clearCookie('connect.sid', '/');

        res.status(302).json({
            location: '/'
        });
    });

    api.get('/profile', authAPI, (req, res) => {
        const { username, email } = req.user.local;

        res.json({
            username,
            email
        });
    });

    api.post('/profile', authAPI, (req, res) => {
        const { user, body } = req;

        const {
            username: newUsername,
            email   : newEmail,
            password: newPassword
        } = body;

        function save() {
            if (newUsername) {
                user.local.username = newUsername;
            }

            if (newEmail) {
                user.local.email = newEmail;
            }

            if (newPassword) {
                user.local.password = user.generateHash(newPassword);
            }

            user.save((err) => {
                if (err) {
                    throw err;
                }

                res.json({
                    username: user.local.username,
                    email   : user.local.email
                });
            });
        }

        // first need to check if no username or email sent
        if (newUsername || newEmail) {
            const queryJSON = {
                $or: []
            };

            if (newUsername) {
                queryJSON.$or.push({ 'local.username': newUsername });
            }

            if (newEmail) {
                queryJSON.$or.push({ 'local.email': newEmail });
            }

            User.findOne(queryJSON).exec((err, foundUser) => {
                if (err) {
                    return done(err);
                }

                if (foundUser) {
                    let message;

                    if (!!newUsername && foundUser.local.username === newUsername) {
                        message = ProfileChangeStatus.USER_ALREADY_EXISTS;
                    }

                    if (!!newEmail && foundUser.local.email === newEmail) {
                        const emailError = ProfileChangeStatus.EMAIL_ALREADY_USED;

                        if (message) {
                            message = [ message ];
                            message.push(emailError);
                        } else {
                            message = emailError;
                        }
                    }

                    return res.status(400).json({
                        message
                    });
                }

                save();
            });
        } else {
            save();
        }
    });

    return api;
};