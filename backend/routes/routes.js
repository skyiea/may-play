const express   = require('express');
const path      = require('path');

const isLoggedIn = require('./isLoggedIn');

module.exports = (app, passport) => {
    const api = require('./api')(passport);

    app.use('/public', express.static('public'));
    app.use('/api', api);

    app.get('/profile', isLoggedIn, (req, res, next) => {
        next();
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/favicon.png', (req, res) => {
        res.sendFile(path.resolve('favicon.png'));
    });

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'));
    });
};