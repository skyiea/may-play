const passport = require('passport');

const app = require('express')();
const PORT = 3000;

require('./config/configConsoleColors');
require('./config/configPassport')(passport);

app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('./middlewares/sessionMiddleware'));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes')(app, passport);

const server = app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:%s'.blue, PORT);
});

require('./ws/configWebSockets')(server);