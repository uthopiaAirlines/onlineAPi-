const chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("../../index"),
    should = chai.should();

chai.use(chaiHttp);

describe("Flight Controller", function () {
    it("should display all flights", function (done) {
        chai
            .request(server)
            .get("/flights")
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                res.body[0].should.have("flightId");
                res.body[0].should.have("airline");
                res.body[0].airline.should.be.a("object");
                res.body[0].should.have("arrivalTime");
                res.body[0].should.have("arrivalLocation");
                res.body[0].arrivalLocation.should.be.a("object");
                res.body[0].should.have("departureLocation");
                res.body[0].departureLocation.should.be.a("object");
                res.body[0].should.have("departureTime");
                res.body[0].should.have("availableSeats");
                res.body[0].should.have("price");
            });
        done();
    });
    it("should return all flights with airlineId = 1", function (done) {
        chai
            .request(server)
            .get('/flights?airline=1')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                res.body.array.forEach(element => {
                    element.airline.airlineId.should.be(1);
                });
            });
        done();
    });
    it("should return all flights with arrivalLocation = 7 and departureLocation = 4", function (done) {
        chai
            .request(server)
            .get('flights?departureLocation=4&arrivalLocation=7')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                res.body.array.forEach(element => {
                    element.arrivalLocation.airportId.should.be(7);
                    element.departureLocation.airportId.should.be(4);
                });
            });
        done();
    });
    it("should return status code 400", function (done) {
        chai
            .request(server)
            .get('/flights?flight=4')
            .end(function (err, res) {
                res.should.have.status(400);
            });
        done();
    });
});