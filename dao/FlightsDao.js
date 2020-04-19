flightsDao = {
    findAll(conn) {
        return conn.execute('SELECT f.flightId, a.airlineId, a.name as airlineName, f.arrivalTime, f.arrivalLocation , air.name as arrivalName, '
            + 'air.address as arrivalAddress, air.airportCode as arrivalCode, f.departureTime, f.departureLocation, air2.name as departureName, '
            + 'air2.address as departureAddress, air2.airportCode as departureCode, f.availableSeats, f.price '
            + 'FROM flights AS f JOIN airlines AS a ON a.airlineId = f.airline JOIN airports AS air '
            + 'ON air.airportId = f.arrivalLocation JOIN airports as air2 on air2.airportId = f.departureLocation;');
    },
    addSeatsToFlight(conn, flightId, seats) {
        return conn.execute('UPDATE flights SET availableSeats = availableSeats + ? WHERE flightId = ?;', [seats, flightId]);
    },
    findFlight(conn, flightId) {
        return conn.execute('SELECT f.flightId, a.airlineId, a.name as airlineName, f.arrivalTime, f.arrivalLocation , air.name as arrivalName, '
            + 'air.address as arrivalAddress, air.airportCode as arrivalCode, f.departureTime, f.departureLocation, air2.name as departureName, '
            + 'air2.address as departureAddress, air2.airportCode as departureCode, f.availableSeats, f.price '
            + 'FROM flights AS f JOIN airlines AS a ON a.airlineId = f.airline JOIN airports AS air '
            + 'ON air.airportId = f.arrivalLocation JOIN airports as air2 on air2.airportId = f.departureLocation'
            + ' WHERE flightId = ?;', [flightId]);
    },
    removeSeatsFromFlight(conn, flightId, seats) {
        return conn.execute('UPDATE flights SET availableSeats = availableSeats - ? WHERE flightId = ?;',
            [seats, flightId]);
    },
    searchFlightsByCriterion(conn, criterion) {
        return conn.execute('SELECT f.flightId, a.airlineId, a.name as airlineName, f.arrivalTime, f.arrivalLocation , air.name as arrivalName, '
            + 'air.address as arrivalAddress, air.airportCode as arrivalCode, f.departureTime, f.departureLocation, air2.name as departureName, '
            + 'air2.address as departureAddress, air2.airportCode as departureCode, f.availableSeats, f.price '
            + 'FROM flights AS f JOIN airlines AS a ON a.airlineId = f.airline JOIN airports AS air '
            + 'ON air.airportId = f.arrivalLocation JOIN airports as air2 on air2.airportId = f.departureLocation '
            + 'WHERE (f.flightId = ? OR ? = "THISISTHEDEFAULT") AND (f.airline = ? OR ? = "THISISTHEDEFAULT") '
            + 'AND (f.arrivalTime = ? OR ? = "THISISTHEDEFAULT") AND (f.arrivalLocation = ? OR ? = "THISISTHEDEFAULT") AND (f.departureTime = ? OR ? = "THISISTHEDEFAULT") '
            + 'AND (f.departureLocation = ? OR ? = "THISISTHEDEFAULT") AND (f.availableSeats = ? OR ? = "THISISTHEDEFAULT") AND (f.price = ? OR ? = "THISISTHEDEFAULT");',
            [criterion.flightId, criterion.flightId, criterion.airline, criterion.airline, criterion.arrivalTime, criterion.arrivalTime, criterion.arrivalLocation,
            criterion.arrivalLocation, criterion.departureTime, criterion.departureTime, criterion.departureLocation, criterion.departureLocation,
            criterion.availableSeats, criterion.availableSeats, criterion.price, criterion.price]);
    }
}

module.exports = flightsDao;