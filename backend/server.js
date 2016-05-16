const express   = require('express');
const passport  = require('passport');

// Middlewares
const morgan            = require('morgan');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const sessionMiddleware = require('./middlewares/sessionMiddleware');

const app = express();
const PORT = 3000;

const router            = require('./routes/routes');
const wsService         = require('./ws/wsService');
const configPassport    = require('./config/passport');

require('./config/mongoose');
require('./utils/consoleColors');

configPassport(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

router(app, passport);

const server = app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:%s'.blue, PORT);
});

wsService(server);