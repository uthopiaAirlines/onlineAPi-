airlineDao = {
    findById(conn, airlineId) {
        return conn.execute('SELECT * FROM airlines WHERE airlineId = ? ;', [airlineId]);
    }
};

module.exports = airlineDao;