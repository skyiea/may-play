const path      = require('path');
const express   = require('express');
const mongoose  = require('mongoose');
const passport  = require('passport');
const socketIO  = require('socket.io');

// Express middleware
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const app = express();
const PORT = 3000;

const router            = require('./routes/routes');
const wsService         = require('./ws/wsService');
const configDB          = require('./config/database');
const configPassport    = require('./config/passport');

mongoose.connect(configDB.url);
configPassport(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'mayplaysecretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

router(app, passport);

const server = app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:%s', PORT);
});

const io = socketIO(server);

wsService(io);