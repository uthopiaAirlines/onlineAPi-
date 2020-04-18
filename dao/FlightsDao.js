flightsDao = {
    findAll(conn) {
        return conn.execute('SELECT * FROM flights');
    },
    addSeatsToFlight(conn, flightId, seats) {
        return conn.execute('UPDATE flights SET availableSeats = availableSeats + ? WHERE flightId = ?;', [seats, flightId]);
    },
    findFlight(conn, flightId) {
        return conn.execute('SELECT * FROM flights WHERE flightId = ?;', [flightId]);
    },
    removeSeatsFromFlight(conn, flightId, seats) {
        return conn.execute('UPDATE flights SET availableSeats = availableSeats - ? WHERE flightId = ?;',
            [seats, flightId]);
    },
    searchFlightsByCriterion(conn, criterion) {
        return conn.execute('SELECT * FROM flights WHERE (flightId = ? OR ? = "THISISTHEDEFAULT") AND (airline = ? OR ? = "THISISTHEDEFAULT") '
            + 'AND (arrivalTime = ? OR ? = "THISISTHEDEFAULT") AND (arrivalLocation = ? OR ? = "THISISTHEDEFAULT") AND (departureTime = ? OR ? = "THISISTHEDEFAULT") '
            + 'AND (departureLocation = ? OR ? = "THISISTHEDEFAULT") AND (availableSeats = ? OR ? = "THISISTHEDEFAULT") AND (price = ? OR ? = "THISISTHEDEFAULT");',
            [criterion.flightId, criterion.flightId, criterion.airline, criterion.airline, criterion.arrivalTime, criterion.arrivalTime, criterion.arrivalLocation,
            criterion.arrivalLocation, criterion.departureTime, criterion.departureTime, criterion.departureLocation, criterion.departureLocation,
            criterion.availableSeats, criterion.availableSeats, criterion.price, criterion.price]);
    }
}

module.exports = flightsDao;