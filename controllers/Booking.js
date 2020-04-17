'use strict';

var utils = require('../utils/writer.js');
var Booking = require('../service/BookingService');

module.exports.bookingsBookingIdDELETE = function bookingsBookingIdDELETE (req, res, next, bookingId) {
  Booking.bookingsBookingIdDELETE(bookingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookingsPOST = function bookingsPOST (req, res, next, body) {
  Booking.bookingsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdBookingsGET = function usersUserIdBookingsGET (req, res, next, userId) {
  Booking.usersUserIdBookingsGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
