'use strict';

const router = require('express').Router(),
  flight = require('../service/FlightService'),
  errorHandler = require('../utils/errorCodeHandler');

router.get('/flights', async (req, res) => {
  try {
    if (Object.keys(req.query).length > 0) {
      let result = await flight.flightssearchCriterionGET(req.query);
      res.status(200);
      res.send(result);
    } else {
      let result = await flight.flightsGET();
      res.status(200);
      res.send(result);
    }
  } catch (err) {
    console.log(err.message)
    res.status(errorHandler.statusCodeHandler(err.code));
    res.send(err);
  }
});

module.exports = router;
