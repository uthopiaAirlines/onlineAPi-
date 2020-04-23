'use strict';

const router = require('express').Router(),
  booking = require('../service/BookingService'),
  errorHandler = require('../utils/errorCodeHandler');

router.delete('/bookings/:id', async (req, res) => {
  try {
    await booking.bookingsBookingIdDELETE(req.params.id);
    res.status(200);
    res.send("completed");
  } catch (err) {
    console.log(err.message)
    res.status(errorHandler.statusCodeHandler(err.code));
    res.send(err);
  }
})

router.post('/bookings', async (req, res) => {
  try {
    let result = await booking.bookingsPOST(req.body);
    res.status(201);
    res.send(result);
  } catch (err) {
    console.log(err.message)
    res.status(errorHandler.statusCodeHandler(err.code));
    res.send(err);
  }
})

router.get('/users/:id/bookings', async (req, res) => {
  try {
    let result = await booking.usersUserIdBookingsGET(req.params.id);
    res.status(200);
    res.send(result);
  } catch (err) {
    console.log(err.message)
    res.status(errorHandler.statusCodeHandler(err.code));
    res.send(err);
  }
})

module.exports = router;