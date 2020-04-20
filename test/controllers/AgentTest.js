const chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("../../index"),
    should = chai.should();

chai.use(chaiHttp);

describe("Agent Controller", function () {
    it("should display all agents", function (done) {
        chai
            .request(server)
            .get('/agents')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                res.body[0].should.have("Username");
                res.body[0].should.have("Attributes");
                res.body[0].Attributes.should.be.a("array");
            });
        done();
    });
    it("should successfully attach client to user", function (done) {
        chai
            .request(server)
            .post('./agents/999/client/999')
            .end(function (err, res) {
                res.should.have.status(201);
            });
        done();
    });
    it("should successfully detach client from user", function (done) {
        chai
            .request(server)
            .delete('./agents/999/client/999')
            .end(function (err, res) {
                res.should.have.status(200);
            });
        done();
    })
})