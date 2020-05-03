'use strict';

const bookingDao = require('../dao/BookingsDao'),
  flightsDao = require('../dao/FlightsDao'),
  factory = require('../utils/dbConnectionFactory'),
  stripe = require('stripe')('sk_test_nO7vO3qiJLXNPAbw4sO10zx700DuBv1ev6');

/**
 * Delete a booking
 
 * bookingId Integer 
 * no response value expected for this operation
 **/
exports.bookingsBookingIdDELETE = async (bookingId) => {
  let conn = await factory.conn();
  try {
    await conn.beginTransaction();
    let [booking] = await bookingDao.findBooking(conn, bookingId);
    if (booking.length == 0)
      throw {
        message: "Booking Not Found",
        code: "#E404"
      }
    await stripe.refunds.create({ payment_intent: booking[0].paymentId });
    await flightsDao.addSeatsToFlight(conn, booking[0].flightId, booking[0].numberOfTickets);
    await bookingDao.deleteBooking(conn, bookingId);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
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
 * Create a booking
 *
 * body Booking 
 * no response value expected for this operation
 **/
exports.bookingsPOST = async (body) => {
  if (!body.hasOwnProperty("patron") || !body.hasOwnProperty("flight") || !body.hasOwnProperty("ticketPrice") || !body.hasOwnProperty("numberOfTickets") || !body.hasOwnProperty("bookingAgent") || !body.hasOwnProperty("paymentId"))
    throw {
      message: "Invalid Request Body",
      code: "#E798"
    };
  let conn = await factory.conn();
  try {
    await conn.beginTransaction();
    let [flight] = await flightsDao.findFlight(conn, body.flight);
    if (flight[0].avaiableSeats > body.numberOfTickets)
      throw {
        message: "Not Enough Seats Available",
        code: "#E444"
      };
    await flightsDao.removeSeatsFromFlight(conn, body.flight, body.numberOfTickets);
    let [booking] = await bookingDao.insert(conn, body);
    await conn.commit();
    return booking;
  } catch (err) {
    await conn.rollback();
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
 * Get all bookings by user
 *
 * userId Integer User to find bookings by
 * returns List
 **/
exports.usersUserIdBookingsGET = async (userId) => {
  let conn = await factory.conn();
  try {
    let [row] = await bookingDao.findAllByPatronId(conn, userId);
    row = proccessBookings(row);
    return row;
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

let proccessBookings = (bookings) => {
  try {
    let proccessedbookings = new Array();

    bookings.forEach(booking => {
      proccessedbookings.push({
        bookingId: booking.bookingId,
        patron: booking.patron,
        flight: {
          flightId: booking.flightId,
          airline: {
            airlineId: booking.airlineId,
            name: booking.airlineName
          },
          arrivalTime: booking.arrivalTime,
          arrivalLocation: {
            airportId: booking.arrivalLocation,
            name: booking.arrivalName,
            address: booking.arrivalAddress,
            airportCode: booking.arrivalCode
          },
          departureTime: booking.departureTime,
          departureLocation: {
            airportId: booking.departureLocation,
            name: booking.departureName,
            address: booking.departureAddress,
            airportCode: booking.departureCode
          }
        },
        ticketPrice: booking.ticketPrice,
        numberOfTickets: booking.numberOfTickets,
        bookingAgent: booking.bookingAgent
      });
    });
    return proccessedbookings;
  } catch (err) {
    throw {
      message: "Unable To Process Bookings",
      code: "#E369"
    };
  }
}