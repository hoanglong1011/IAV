const global = require('../lib/global');
const sql = require('mssql');
const name = 'BangDinhMucTonKho';

class BangDinhMucTonKho {
    constructor (id, nvl_id, nvl_name, ware_unit, from, to, 
        normal, le, created, recipient, cuahang_id, trangthai){
            this.id = id;
            this.nvl_id = nvl_id;
            this.nvl_name = nvl_name;
            this.ware_unit = ware_unit;
            this.from = from;
            this.to = to;
            this.normal = normal;
            this.le = le;
            this.created = created;
            this.recipient = recipient;
            this.cuahang_id = cuahang_id;
            this.trangthai = trangthai;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('nvl_id', sql.VarChar, this.nvl_id)
                .input('nvl_name', sql.NVarChar, this.nvl_name)
                .input('ware_unit', sql.NVarChar, this.ware_unit)
                .input('from', sql.Int, parseInt(this.from))
                .input('to', sql.Int, parseInt(this.to))
                .input('normal', sql.Float, parseFloat(this.normal))
                .input('le', sql.Float, parseFloat(this.le))
                .input('created', sql.Date, this.created)
                .input('recipient', sql.VarChar, this.recipient)
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`INSERT INTO ${name}(id, nvl_id, nvl_name, ware_unit, [from], [to], 
                            normal, le, created, recipient, cuahang_id, trangthai) 
                        VALUES (@id, @nvl_id, @nvl_name, @ware_unit, @from, @to, 
                            @normal, @le, @created, @recipient, @cuahang_id, @trangthai)`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('from', sql.Int, parseInt(this.from))
                .input('to', sql.Int, parseInt(this.to))
                .input('normal', sql.Float, parseFloat(this.normal))
                .input('le', sql.Float, parseFloat(this.le))
                .input('id', sql.Int, parseInt(this.id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET [from] = @from, [to] = @to, normal = @normal, le = @le
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