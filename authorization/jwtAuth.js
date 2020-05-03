const jwt = require('jwt-simple');

exports.authenticate = function (req, res, next) {
    console.log(req.header('accept'));
    console.log(req.get('accept'));
    console.log(req.get('authorization'));
    console.log(req.headers);
    let token = req.header('authorization').substring(7);
    if (token) {
        let decoded = jwt.decode(token, process.env.JWT_SECRET_TOKEN.replace('/\\n/g', '\n'));
        if (decoded.client_id != process.env.CLIENT_ID) {
            res.status(401).send();
        }
        if (Date(decoded.exp) <= Date.now()) {
            res.status(401).send("Expired Token");
        }
        if (decoded['cognito:groups'] != "Customer") {
            res.status(403).send();
        }
        if (decoded.sub) {
            req.body.verifiedSub = decoded.sub;
        } else {
            res.status(401).send();
        }
        return next();
    } else {
        res.status(401).send();
    }
}