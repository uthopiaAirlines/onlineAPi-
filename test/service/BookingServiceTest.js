require('dotenv').config();

const assert = require('assert'),
    bookingService = require('../../service/BookingService'),
    factory = require('../../utils/dbConnectionFactory'),
    bookingDao = require('../../dao/BookingsDao');

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

    it("should create a new bookings", async () => {
        let insertId;
        try {
            let result = await bookingService.bookingsPOST({
                "patron": "testUser",
                "flight": 2,
                "ticketPrice": 230.20,
                "numberOfTickets": 3,
                "bookingAgent": "testAgent",
                "paymentId": "testTestTest"
            });
            assert.equal(result.affectedRows, 1);
            insertId = result.insertId;
            let conn = await factory.conn();
            await bookingDao.deleteBooking(conn, insertId);
        } catch (err) {
            console.log(err);
            assert.fail();
        }
    });
    // it("should delete created booking", async () => {
    //     try {
    //         await bookingService.bookingsBookingIdDELETE(insertId);
    //     } catch (err) {
    //         assert.fail();
    //     }
    // });
});