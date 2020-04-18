'use strict';

const router = require('express').Router(),
  booking = require('../service/BookingService');

router.delete('/bookings/:id', async (req, res) => {
  try {
    console.log("recieved");
    console.log(req.params.id);
    await booking.bookingsBookingIdDELETE(req.params.id);
    res.status(200);
    res.send("completed");
  } catch (err) {
    res.status(400);
    res.send(err);
  }
})

router.post('/bookings', async (req, res) => {
  try {
    let result = await booking.bookingsPOST(req.body);
    res.status(201);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
})

router.get('/users/:id/bookings', async (req, res) => {
  try {
    let result = await booking.usersUserIdBookingsGET(req.params.id);
    res.status(200);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
})

module.exports = router;