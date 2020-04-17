'use strict';


/**
 * Delete a booking
 *
 * bookingId Integer 
 * no response value expected for this operation
 **/
exports.bookingsBookingIdDELETE = function(bookingId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create a booking
 *
 * body Booking 
 * no response value expected for this operation
 **/
exports.bookingsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all bookings by user
 *
 * userId Integer User to find bookings by
 * returns List
 **/
exports.usersUserIdBookingsGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "bookingAgent" : 6,
  "flight" : 5,
  "patron" : 1,
  "ticketPrice" : 5.637376656633329,
  "numberOfTickets" : 2,
  "bookingId" : 0
}, {
  "bookingAgent" : 6,
  "flight" : 5,
  "patron" : 1,
  "ticketPrice" : 5.637376656633329,
  "numberOfTickets" : 2,
  "bookingId" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

