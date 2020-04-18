'use strict';

const flightDao = require("../dao/FlightsDao");
const factory = require('../utils/dbConnectionFactory');

/**
 * Get all flights
 *
 * returns List
 **/
exports.flightsGET = async () => {
  let conn = await factory.conn();
  try {
    let [rows] = await flightDao.findAll(conn);
    return rows;
  } catch (err) {
    if (!err.hasOwnProperty("code"))
      throw {
        message: err.message,
        code: "#E999"
      }
    else
      throw err;
  } finally {

  }
}


/**
 * Get all the flights that have the search criterion within them
 *
 * searchCriterion String 
 * returns Flight
 **/
exports.flightssearchCriterionGET = async (searchCriterion) => {
  let variableNames = Object.getOwnPropertyNames(searchCriterion);
  let variableValues = Object.values(searchCriterion);
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

  }
}

