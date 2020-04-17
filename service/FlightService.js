'use strict';


/**
 * Get all flights
 *
 * returns List
 **/
exports.flightsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "departureTime" : "2000-01-23T04:56:07.000+00:00",
  "departureLocation" : 5,
  "arrivalTime" : "2000-01-23T04:56:07.000+00:00",
  "availableSeats" : 5,
  "price" : 2.3021358869347655,
  "flightId" : 0,
  "airline" : 6,
  "arrivalLocation" : 1
}, {
  "departureTime" : "2000-01-23T04:56:07.000+00:00",
  "departureLocation" : 5,
  "arrivalTime" : "2000-01-23T04:56:07.000+00:00",
  "availableSeats" : 5,
  "price" : 2.3021358869347655,
  "flightId" : 0,
  "airline" : 6,
  "arrivalLocation" : 1
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all the flights that have the search criterion within them
 *
 * searchCriterion String 
 * returns Flight
 **/
exports.flightssearchCriterionGET = function(searchCriterion) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "departureTime" : "2000-01-23T04:56:07.000+00:00",
  "departureLocation" : 5,
  "arrivalTime" : "2000-01-23T04:56:07.000+00:00",
  "availableSeats" : 5,
  "price" : 2.3021358869347655,
  "flightId" : 0,
  "airline" : 6,
  "arrivalLocation" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

