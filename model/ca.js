const global = require('../lib/global');
const sql = require('mssql');
const name = 'Ca';

class Ca {
    constructor (id, name, date, start, end, closed, cuahang_id, trangthai){
            this.id = id;
            this.name = name;
            this.date = date;
            this.start = start;
            this.end = end;
            this.closed = closed;
            this.cuahang_id = cuahang_id;
            this.trangthai = trangthai;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('name', sql.VarChar, this.name)
                .input('date', sql.DateTime, this.date)
                .input('start', sql.VarChar, this.start)
                .input('closed', sql.TinyInt, parseInt(this.closed))
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`INSERT INTO ${name}(id, name, date, start, closed, trangthai, cuahang_id) 
                        VALUES (@id, @name, @date, @start, @closed, @trangthai, @cuahang_id)`);
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('end', sql.VarChar, this.end)
                .input('closed', sql.TinyInt, parseInt(this.closed))
                .input('id', sql.Int, parseInt(this.id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET [end] = @end, closed = @closed
                        WHERE id = @id AND cuahang_id = @cuahang_id AND trangthai = @trangthai`);
            })
            .catch(err => console.log(err));
    }
}