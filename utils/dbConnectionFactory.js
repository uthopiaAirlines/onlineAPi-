const mysql = require('mysql2/promise');

const config = {
    host: 'utopia-airlines.cn8ju24mxkb6.us-east-1.rds.amazonaws.com',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'utopiaAirlines'
};

module.exports.conn = () => {
    try {
        return mysql.createConnection(config);
    } catch (err) {
        throw {
            message: "Failed To Connect to Databse",
            code: "#E382"
        }
    }
};

