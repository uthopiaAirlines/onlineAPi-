'use strict';

const router = require('express').Router(),
    airports = require('../service/AirportService'),
    errorHandler = require('../utils/errorCodeHandler');

router.get('/airports', async (req, res) => {
    try {
        let result = await airports.airlinesGET();
        res.status(200);
        res.send(result);

    } catch (err) {
        console.log(err.message)
        res.status(errorHandler.statusCodeHandler(err.code));
        res.send(err);
    }
});

module.exports = router;