const express   = require('express');
const path      = require('path');

const { authPage } = require('./authMiddleware');

module.exports = function (app, passport) {
    const api = require('./api')(passport);

    const securedRoutes = [
        'profile(\/*)*',
        'home'
    ];

    app.use('/public', express.static('public'));
    app.use('/api', api);

    app.get(new RegExp(`\/(${securedRoutes.join('|')})` ), authPage, (req, res, next) => {
        next();
    });

    app.get('/favicon.png', (req, res) => {
        res.sendFile(path.resolve('favicon.png'));
    });

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'));
    });
};