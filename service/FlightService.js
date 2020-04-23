'use strict';

const flightDao = require("../dao/FlightsDao"),
  factory = require('../utils/dbConnectionFactory');

/**
 * Get all flights
 *
 * returns List
 **/
exports.flightsGET = async () => {
  let conn = await factory.conn();
  try {
    let [result] = await flightDao.findAll(conn);
    result = processFlights(result);
    return result;
  } catch (err) {
    if (!err.hasOwnProperty("code"))
      throw {
        message: err.message,
        code: "#E999"
      }
    else
      throw err;
  } finally {
    await conn.end();
  }
}


/**
 * Get all the flights that have the search criterion within them
 *
 * searchCriterion String 
 * returns Flight
 **/
exports.flightssearchCriterionGET = async (searchCriterion) => {
  if (!searchCriterion.hasOwnProperty("flightId") && !searchCriterion.hasOwnProperty("airline") && !searchCriterion.hasOwnProperty("arrivalTime") && !searchCriterion.hasOwnProperty("arrivalLocation") && !searchCriterion.hasOwnProperty("departureTime") && !searchCriterion.hasOwnProperty("departureLocation") && !searchCriterion.hasOwnProperty("availableSeats") && !searchCriterion.hasOwnProperty("price"))
    throw {
      message: "Unproccesable Search Criteria",
      code: "#E200"
    }
  let conn = await factory.conn();
  try {
    searchCriterion = {
      flightId: searchCriterion.flightId || 'THISISTHEDEFAULT',
      airline: searchCriterion.airline || 'THISISTHEDEFAULT',
      arrivalTime: searchCriterion.arrivalTime || 'THISISTHEDEFAULT',
      arrivalLocation: searchCriterion.arrivalLocation || 'THISISTHEDEFAULT',
      departureTime: searchCriterion.departureTime || 'THISISTHEDEFAULT',
      departureLocation: searchCriterion.departureLocation || 'THISISTHEDEFAULT',
      availableSeats: searchCriterion.availableSeats || 'THISISTHEDEFAULT',
      price: searchCriterion.price || 'THISISTHEDEFAULT'
    };
    let [result] = await flightDao.searchFlightsByCriterion(conn, searchCriterion);
    result = processFlights(result);
    return result;
  } catch (err) {
    if (!err.hasOwnProperty("code"))
      throw {
        message: err.message,
        code: "#E999"
      }
    else
      throw err;
  } finally {
    await conn.end();
  }
}

let processFlights = (flights) => {
  try {
    let proccessedFlights = new Array();

    flights.forEach(flight => {
      proccessedFlights.push({
        flightId: flight.flightId,
        airline: {
          airlineId: flight.airlineId,
          name: flight.airlineName
        },
        arrivalTime: flight.arrivalTime,
        arrivalLocation: {
          airportId: flight.arrivalLocation,
          name: flight.arrivalName,
          address: flight.arrivalAddress,
          airportCode: flight.arrivalCode
        },
        departureTime: flight.departureTime,
        departureLocation: {
          airportId: flight.departureLocation,
          name: flight.departureName,
          address: flight.departureAddress,
          airportCode: flight.departureCode
        },
        availableSeats: flight.availableSeats,
        price: flight.price
      });
    });
    return proccessedFlights;
  } catch (err) {
    throw {
      message: "Unable To Process Flights",
      code: "#E369"
    };
  }
}