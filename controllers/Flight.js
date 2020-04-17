'use strict';

var utils = require('../utils/writer.js');
var Flight = require('../service/FlightService');

module.exports.flightsGET = function flightsGET (req, res, next) {
  Flight.flightsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.flightssearchCriterionGET = function flightssearchCriterionGET (req, res, next, searchCriterion) {
  Flight.flightssearchCriterionGET(searchCriterion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
