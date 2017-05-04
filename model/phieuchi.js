const global = require('../lib/global');
const sql = require('mssql');
const name = 'PhieuChi';

class PhieuChi {
    constructor (id, code, date, creater, lydo_id, lydo_name, cuahang_id, 
            recipient, expense, created, ca, trangthai){
            this.id = id;
            this.code = code;
            this.date = date;
            this.creater = creater;
            this.lydo_id = lydo_id;
            this.lydo_name = lydo_name;
            this.cuahang_id = cuahang_id;
            this.recipient = recipient;
            this.expense = expense;
            this.created = created;
            this.ca = ca;
            this.trangthai = trangthai;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('code', sql.VarChar, this.code)
                .input('date', sql.Date, this.date)
                .input('creater', sql.VarChar, this.creater)
                .input('lydo_id', sql.VarChar, this.lydo_id)
                .input('lydo_name', sql.NVarChar, this.lydo_name)
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('recipient', sql.VarChar, this.recipient)
                .input('expense', sql.Money, this.expense)
                .input('created', sql.DateTime, this.created)
                .input('ca', sql.Int, parseInt(this.ca))
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`INSERT INTO ${name}(id, code, date, creater, lydo_id, lydo_name, cuahang_id, 
                            recipient, expense, created, ca, trangthai) 
                        VALUES (@id, @code, @date, @creater, @lydo_id, @lydo_name, @cuahang_id, 
                            @recipient, @expense, @created, @ca, @trangthai)`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('lydo_id', sql.VarChar, this.lydo_id)
                .input('lydo_name', sql.NVarChar, this.lydo_name)
                .input('expense', sql.Money, this.expense)
                .input('id', sql.Int, parseInt(this.id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET lydo_id = @lydo_id, lydo_name = @lydo_name, expense = @expense   
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