const chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("../../index"),
    should = chai.should();

chai.use(chaiHttp);

describe("Booking Controller", function () {
    it("returns all bookings with patron Id of 1", function (done) {
        chai
            .request(server)
            .get("/users/1/bookings")
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                res.body[0].should.have("bookingId");
                res.body[0].should.have("patron");
                res.body[0].should.have("flight");
                res.body[0].should.have("ticketPrice");
                res.body[0].should.have("numberOfTickets");
                res.body.forEach(element => {
                    element.patron.should.be(1);
                })
            });
        done();
    });
    it("should create then delete a booking", function (done) {
        let insertId;
        chai
            .request(server)
            .post('/bookings')
            .send({
                "patron": 5,
                "flight": 2,
                "ticketPrice": 230.20,
                "numberOfTickets": 3,
                "bookingAgent": 1
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a("object");
                res.body.affectedRows.should.be(1);
                res.body.should.have("insertId");
                insertId = res.body.insertId;
            });
        chai
            .request(server)
            .delete(`/bookings/${insertId}`)
            .end(function (err, res) {
                res.should.have.status(200);
            });
        done();
    });
    it("should return status code 400", function (done) {
        chai
            .request(server)
            .post('/bookings')
            .send({
                "patron": 5,
                "numberOfTickets": 3,
                "bookingAgent": 1
            })
            .end(function (err, res) {
                res.should.have.status(400);
            });
        done();
    });
})