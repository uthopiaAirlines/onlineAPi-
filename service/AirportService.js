'use strict';

const airportDao = require('../dao/AirportDao'),
    factory = require('../utils/dbConnectionFactory');

exports.airlinesGET = async () => {
    let conn = await factory.conn();
    try {
        let [airports] = await airportDao.findAll(conn);
        if (airports.length == 0) {
            throw {
                errorCode: "#E369",
                message: "No Airports Found"
            }
        }
        return airports;
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