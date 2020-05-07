const assert = require('assert'),
    bookingDao = require('../../dao/BookingsDao'),
    factory = require('../../utils/dbConnectionFactory');

require('dotenv').config({ path: '../../.env' });

describe("test the booking dao", function () {
    let conn;
    let insertId;

    this.beforeAll(function (done) {
        console.log(process.env.DB_PASSWORD);
        factory.conn().then(element => {
            conn = element;
            done();
        });
    });

    this.afterAll(function (done) {
        conn.end()
        done();
    });

    it("create a new booking", async () => {
        let [result] = await bookingDao.insert(conn, {
            "patron": "1",
            "flight": "2",
            "ticketPrice": 230.20,
            "numberOfTickets": 3,
            "bookingAgent": "1",
            "paymentId": "testId"
        });
        assert.equal(result.affectedRows, 1);
        insertId = result.insertId;
    });

    it("find all by patron Id", async () => {
        let [result] = await bookingDao.findAllByPatronId(conn, "1");
        result.forEach(element => {
            assert.equal(element.patron, 1);
        });
    });
    it("find booking by Id", async () => {
        let [result] = await bookingDao.findBooking(conn, insertId);
        assert.equal(result[0].bookingId, insertId);
        assert.equal(result[0].flightId, 2);
        assert.equal(result[0].ticketPrice, 230.20);
        assert.equal(result[0].numberOfTickets, 3);
        assert.equal(result[0].bookingAgent, 1);
    });
    it("delete booking by Id", async () => {
        let [result] = await bookingDao.deleteBooking(conn, insertId);
        assert.equal(result.affectedRows, 1);
    });
});