const query = require('../lib/db');

class Coso {
  constructor(id, code, name, local, publics, path, username, password){
    this.id = id;
    this.code = code;
    this.name = name;
    this.local = local;
    this.publics = publics;
    this.path = path;
    this.username = username;
    this.password = password;
  }

  getData(){
    const sql = 'SELECT id, name FROM icool_coso';
    return query(sql, []);
  }
}

module.exports = Coso;