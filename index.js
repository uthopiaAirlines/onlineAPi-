const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwtAuth = require('./authorization/jwtAuth'),
    cors = require('cors');

require('dotenv').config();

const flightsRoutes = require('./controllers/Flight'),
    agentRoutes = require('./controllers/Agent'),
    bookingsRoutes = require('./controllers/Booking');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://www.utopiaairlines.com');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.sendStatus(400); // Bad request
    }
    next();
});

app.use(`/online/${process.env.npm_package_version}`, flightsRoutes);

app.use('https://www.utopiaairlines.com', cors());

app.use((req, res, next) => {
    jwtAuth.authenticate(req, res, next);
});

app.use(`/online/${process.env.npm_package_version}`, agentRoutes);
app.use(`/online/${process.env.npm_package_version}`, bookingsRoutes);

module.exports = app.listen(process.env.PORT, () => {
    console.log(`The server is running and listening on port ${process.env.PORT}`);
});
