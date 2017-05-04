const query = require('../lib/db');

class Log {
    constructor(id, coso, phong, date, log){
        this.id = id;
        this.coso = coso;
        this.phong = phong;
        this.date = date;
        this.log = log;
    }

    add(){
        const sql = 'INSERT INTO icool_video_log(coso, phong, date, log) VALUES(?, ?, ?, ?)';
        return query(sql, [this.coso, this.phong, this.date, this.log]);
    }
}

module.exports = Log;