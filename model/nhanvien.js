const global = require('../lib/global');
const sql = require('mssql');
const name = 'NhanVien';

class NhanVien {
    constructor (id, code, name, password, confirms, sale, group_id, trangthai, cuahang_id){
            this.id = id;
            this.code = code;
            this.name = name;
            this.password = password;
            this.confirms = confirms;
            this.sale = sale;
            this.group_id = group_id;
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
                .input('password', sql.VarChar, this.password)
                .input('confirms', sql.VarChar, this.confirms)
                .input('sale', sql.VarChar, this.sale)
                .input('group_id', sql.Money, parseInt(this.group_id))
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`INSERT INTO ${name}(id, code, name, password, confirms, sale, group_id, trangthai, cuahang_id) 
                        VALUES (@id, @code, @name, @password, @confirms, @sale, @group_id, @trangthai, @cuahang_id)`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('name', sql.NVarChar, this.name)
                .input('password', sql.VarChar, this.password)
                .input('confirms', sql.VarChar, this.confirms)
                .input('sale', sql.VarChar, this.sale)
                .input('group_id', sql.Money, parseInt(this.group_id))
                .input('id', sql.Int, parseInt(this.id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET name = @name, password = @password, confirms = @confirms, 
                            sale = @sale, group_id = @group_id  
                        WHERE id = @id AND cuahang_id = @cuahang_id AND trangthai = @trangthai`);
                
                pool.close();
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
                
                pool.close();
            })
            .catch(err => console.log(err));
    }
}