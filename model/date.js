const query = require('../lib/db');

class Dates {
    constructor (id, date){
        this.id = id;
        this.date = date;
    }

    getData(){
        const sql = 'SELECT * FROM date WHERE date = ?';
        return query(sql, [this.date]);
    }

    add(){
        const sql = 'INSERT INTO date(date) VALUES(?)';
        return query(sql, [this.date]);
    }
}

module.exports = Dates;