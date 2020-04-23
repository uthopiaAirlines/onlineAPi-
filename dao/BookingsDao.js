bookingDao = {
    findAllByPatronId(conn, id) {
        return conn.execute('SELECT b.bookingId, b.patron,  f.flightId, a.airlineId, a.name AS airlineName, f.arrivalTime, f.arrivalLocation , '
            + 'air.name AS arrivalName, air.address AS arrivalAddress, air.airportCode AS arrivalCode, '
            + ' f.departureTime, f.departureLocation, air2.name AS departureName, '
            + ' air2.address AS departureAddress, air2.airportCode AS departureCode, b.ticketPrice, b.numberOfTickets, b.bookingAgent '
            + ' FROM bookings as b JOIN flights AS f  ON b.flight = f.flightId JOIN airlines AS a ON a.airlineId = f.airline '
            + ' JOIN airports AS air ON air.airportId = f.arrivalLocation JOIN airports AS air2 ON air2.airportId = f.departureLocation WHERE patron = ?;', [id]);
    },
    findBooking(conn, id) {
        return conn.execute('SELECT b.bookingId, b.patron,  f.flightId, a.airlineId, a.name AS airlineName, f.arrivalTime, f.arrivalLocation , '
            + 'air.name AS arrivalName, air.address AS arrivalAddress, air.airportCode AS arrivalCode, '
            + ' f.departureTime, f.departureLocation, air2.name AS departureName, '
            + ' air2.address AS departureAddress, air2.airportCode AS departureCode, b.ticketPrice, b.numberOfTickets, b.bookingAgent '
            + ' FROM bookings as b JOIN flights AS f  ON b.flight = f.flightId JOIN airlines AS a ON a.airlineId = f.airline '
            + ' JOIN airports AS air ON air.airportId = f.arrivalLocation JOIN airports AS air2 ON air2.airportId = f.departureLocation WHERE bookingId = ?;', [id]);
    },
    insert(conn, booking) {
        return conn.execute("INSERT INTO bookings (patron, flight, ticketPrice, numberOfTickets, bookingAgent) value (?, ?, ?, ?,?);",
            [booking.patron, booking.flight, booking.ticketPrice, booking.numberOfTickets, booking.bookingAgent]);
    },
    deleteBooking(conn, bookingId) {
        return conn.execute("DELETE FROM bookings WHERE bookingId = ?;", [bookingId]);
    }
}

module.exports = bookingDao;