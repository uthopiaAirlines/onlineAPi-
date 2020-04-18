'use strict';

const router = require('express').Router(),
  flight = require('../service/FlightService');

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
    res.status(400);
    res.send(err);
  }
});

// module.exports.flightssearchCriterionGET = function flightssearchCriterionGET(req, res, next, searchCriterion) {
//   console.log("here");
//   Flight.flightssearchCriterionGET(searchCriterion)
//     .then(function (response) {
//       utils.writeJson(res, response);
//     })
//     .catch(function (response) {
//       utils.writeJson(res, response);
//     });
// };

module.exports = router;
