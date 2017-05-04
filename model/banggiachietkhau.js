const global = require('../lib/global');
const sql = require('mssql');
const name = 'BangGiaChietKhau';

class BangGiaChietKhau {
    constructor (id, code, name, unit, main, sub, cuahang_id, trangthai){
            this.id = id;
            this.code = code;
            this.name = name;
            this.unit = unit;
            this.main = main;
            this.sub = sub;
            this.cuahang_id = cuahang_id;
            this.trangthai = trangthai;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('code', sql.NVarChar, this.code)
                .input('name', sql.NVarChar, this.name)
                .input('unit', sql.NVarChar, this.unit)
                .input('main_price', sql.Money, parseFloat(this.main))
                .input('sub_price', sql.Money, parseFloat(this.sub))
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`INSERT INTO ${name}(id, code, name, unit, main_price, sub_price, trangthai, cuahang_id) 
                        VALUES (@id, @code, @name, @unit, @main_price, @sub_price, @trangthai, @cuahang_id)`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('main_price', sql.Money, parseFloat(this.main))
                .input('sub_price', sql.Money, parseFloat(this.sub))
                .input('id', sql.Int, parseInt(this.id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET main_price = @main_price, sub_price = @sub_price
                        WHERE id = @id AND cuahang_id = @cuahang_id AND trangthai = @trangthai`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }

    delete(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('code', sql.NVarChar, this.code)
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`DELETE FROM ${name} WHERE code = @code AND cuahang_id = @cuahang_id`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }
}