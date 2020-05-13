require('dotenv').config();
const assert = require('assert'),
    expect = require('chai').expect,
    flightDao = require('../../dao/FlightsDao.js'),
    factory = require('../../utils/dbConnectionFactory');

describe("test the booking dao", function () {
    let conn;

    this.beforeAll(function (done) {
        factory.conn().then(element => {
            conn = element;
            done();
        });
    });

    this.afterAll(function (done) {
        conn.end()
        done();
    });

    it("find all flights", async () => {
        let [result] = await flightDao.findAll(conn);
        expect(result).to.be.a("array");
        expect(result[0]).to.haveOwnProperty("flightId");
    });

    it("add seats to flight", async () => {
        let [initial] = await flightDao.searchFlightsByCriterion(conn, {
            flightId: 2,
            airline: 'THISISTHEDEFAULT',
            arrivalTime: 'THISISTHEDEFAULT',
            arrivalLocation: 'THISISTHEDEFAULT',
            departureTime: 'THISISTHEDEFAULT',
            departureLocation: 'THISISTHEDEFAULT',
            availableSeats: 'THISISTHEDEFAULT',
            price: 'THISISTHEDEFAULT'
        });
        let [result] = await flightDao.addSeatsToFlight(conn, 2, 4);
        let [after] = await flightDao.searchFlightsByCriterion(conn, {
            flightId: 2,
            airline: 'THISISTHEDEFAULT',
            arrivalTime: 'THISISTHEDEFAULT',
            arrivalLocation: 'THISISTHEDEFAULT',
            departureTime: 'THISISTHEDEFAULT',
            departureLocation: 'THISISTHEDEFAULT',
            availableSeats: 'THISISTHEDEFAULT',
            price: 'THISISTHEDEFAULT'
        });
        assert.equal(result.affectedRows, 1);
        assert.equal(after[0].availableSeats, (initial[0].availableSeats + 4));
    });

    it("remove seats from flight", async () => {
        let [initial] = await flightDao.searchFlightsByCriterion(conn, {
            flightId: 2,
            airline: 'THISISTHEDEFAULT',
            arrivalTime: 'THISISTHEDEFAULT',
            arrivalLocation: 'THISISTHEDEFAULT',
            departureTime: 'THISISTHEDEFAULT',
            departureLocation: 'THISISTHEDEFAULT',
            availableSeats: 'THISISTHEDEFAULT',
            price: 'THISISTHEDEFAULT'
        });
        let [result] = await flightDao.removeSeatsFromFlight(conn, 2, 4);
        let [after] = await flightDao.searchFlightsByCriterion(conn, {
            flightId: 2,
            airline: 'THISISTHEDEFAULT',
            arrivalTime: 'THISISTHEDEFAULT',
            arrivalLocation: 'THISISTHEDEFAULT',
            departureTime: 'THISISTHEDEFAULT',
            departureLocation: 'THISISTHEDEFAULT',
            availableSeats: 'THISISTHEDEFAULT',
            price: 'THISISTHEDEFAULT'
        });
        assert.equal(result.affectedRows, 1);
        assert.equal(after[0].availableSeats, (initial[0].availableSeats - 4));
    })
})