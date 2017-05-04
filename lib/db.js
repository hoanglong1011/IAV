
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: '1.54.250.10',
    user: 'root',
    password: 'baonam',
    database: 'ISO2014v1'
});

function query(sql, parameters) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) reject(err);
            connection.query(sql, parameters, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });

            if(connection) connection.release();
        });
    });
}

module.exports = query;