bookingDao = {
    findAll(conn, id) {
        return conn.execute("SELECT * FROM bookings where patron = ?;", [id]);
    },
    findBooking(conn, id) {
        return conn.execute("SELECT * FROM bookings where bookingId = ?;", [id]);
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