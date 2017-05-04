const global = require('../lib/global');
const sql = require('mssql');
const name = 'KhuVuc';

class KhuVuc {
    constructor (id, code, name, trangthai, cuahang_id){
            this.id = id;
            this.code = code;
            this.name = name; 
            this.trangthai = trangthai;
            this.cuahang_id = cuahang_id;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('code', sql.VarChar, this.code)
                .input('name', sql.NVarChar, this.name)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`INSERT INTO ${name}(id, code, name, trangthai, cuahang_id) 
                        VALUES (@id, @code, @name, @trangthai, @cuahang_id)`);
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('code', sql.VarChar, this.code)
                .input('name', sql.NVarChar, this.name)
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET code = @code, name = @name 
                        WHERE id = @id AND cuahang_id = @cuahang_id AND trangthai = @trangthai`);
            })
            .catch(err => console.log(err));
    }

    delete(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`DELETE FROM ${name} WHERE id = @id AND cuahang_id = @cuahang_id`);
            })
            .catch(err => console.log(err));
    }
}