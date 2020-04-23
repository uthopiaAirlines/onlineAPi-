const assert = require('assert'),
    errorCodeHandler = require('../../utils/errorCodeHandler');

describe("test the error code handler", function () {
    it("should return status code 500", function (done) {
        assert.equal(errorCodeHandler.statusCodeHandler("#E382"), 500);
        assert.equal(errorCodeHandler.statusCodeHandler("#E999"), 500);
        assert.equal(errorCodeHandler.statusCodeHandler("#E451"), 500);
        assert.equal(errorCodeHandler.statusCodeHandler("#E369"), 500);
        done();
    });
    it("should return status code 400", function (done) {
        assert.equal(errorCodeHandler.statusCodeHandler("#E200"), 400);
        assert.equal(errorCodeHandler.statusCodeHandler("#E798"), 400);
        done();
    });
    it("should return status code 409", function (done) {
        assert.equal(errorCodeHandler.statusCodeHandler("#E444"), 409);
        done();
    });
});