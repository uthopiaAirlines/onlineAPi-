const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

let serverPort = 8080;

const flightsRoutes = require('./controllers/Flight'),
    // agentRoutes = require('./controllers/Agent'),
    bookingsRoutes = require('./controllers/Booking');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
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

// app.use("/", agentRoutes);
app.use("/", flightsRoutes);
app.use("/", bookingsRoutes);

app.listen(serverPort, () => {
    console.log(`The server is running and listening on port ${serverPort}`);
});
