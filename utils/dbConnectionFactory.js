const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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

