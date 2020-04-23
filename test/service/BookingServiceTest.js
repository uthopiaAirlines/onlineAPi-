const assert = require('assert'),
    expect = require('chai').expect,
    bookingService = require('../../service/BookingService'),
    factory = require('../../utils/dbConnectionFactory');

describe("Test Booking Service", function () {
    it("should throw error code #E798", async () => {
        try {
            await bookingService.bookingsPOST({});
            assert.fail();
        } catch (err) {
            assert.equal(err.code, "#E798")
        }
        try {
            await bookingService.bookingsPOST({ patron: 2 });
            assert.fail();
        } catch (err) {
            assert.equal(err.code, "#E798")
        }
        try {
            await bookingService.bookingsPOST({
                patron: 2,
                flight: 2
            });
            assert.fail();
        } catch (err) {
            assert.equal(err.code, "#E798")
        }
        try {
            await bookingService.bookingsPOST({
                patron: 2,
                flight: 2,
                ticketPrice: 2
            });
            assert.fail();
        } catch (err) {
            assert.equal(err.code, "#E798")
        }
        try {
            await bookingService.bookingsPOST({
                flight: 2,
                ticketPrice: 2,
                numberOfTickets: 2
            });
            assert.fail();
        } catch (err) {
            assert.equal(err.code, "#E798")
        }
        try {
            await bookingService.bookingsPOST({
                patron: 2,
                ticketPrice: 2,
                numberOfTickets: 2
            });
            assert.fail();
        } catch (err) {
            assert.equal(err.code, "#E798")
        }
        try {
            await bookingService.bookingsPOST({
                patron: 2,
                flight: 2,
                numberOfTickets: 2
            });
            assert.fail();
        } catch (err) {
            assert.equal(err.code, "#E798")
        }
    });
    let insertId;
    it("should create a new bookings", async () => {
        try {
            let result = await bookingService.bookingsPOST({
                "patron": 5,
                "flight": 2,
                "ticketPrice": 230.20,
                "numberOfTickets": 3,
                "bookingAgent": 1
            });
            assert.equal(result.affectedRows, 1);
            insertId = result.insertId;
        } catch (err) {
            console.log(err);
            assert.fail();
        }
    });
    it("should delete created booking", async () => {
        try {
            await bookingService.bookingsBookingIdDELETE(insertId);
        } catch (err) {
            assert.fail();
        }
    });
});