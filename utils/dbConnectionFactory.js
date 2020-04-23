const mysql = require('mysql2/promise');

const config = {
    host: 'utopia-airlines.cn8ju24mxkb6.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: 'rootroot',
    database: 'utopiaAirlines'
};

let conn = mysql.createConnection(config);

module.exports.conn = () => {
    try {
        return mysql.createConnection(config)
    } catch (err) {
        throw {
            message: "Failed To Connect to Databse",
            code: "#E382"
        }
    }
};

