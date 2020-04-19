airportDao = {
    findById(conn, airportId) {
        return conn.execute('SELECT * FROM airports WHERE  airportId = ? ;', [airportId]);
    }
}

module.exports = airportDao;