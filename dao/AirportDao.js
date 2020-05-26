airportDao = {
    findAll(conn) {
        return conn.execute("SELECT * FROM airports ORDER BY airportCode;")
    }
}

module.exports = airportDao;