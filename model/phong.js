const query = require('../lib/db');

class Phong {
  constructor (id, code, version, coso, status){
    this.id = id;
    this.code = code;
    this.version = version;
    this.coso = coso;
    this.status = status;
  }

  getData(){
    const sql = 'SELECT * FROM icool_phong';
    return query(sql, []);
  }

  update(){
    const sql = 'UPDATE icool_phong SET status = ? WHERE coso = ? AND code = ?';
    return query(sql, [this.status, this.coso, this.code]);
  }

  default(){
    const sql = 'UPDATE icool_phong SET status = ?';
    return query(sql, [this.status]);
  }
}

module.exports = Phong;