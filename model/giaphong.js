const global = require('../lib/global');
const sql = require('mssql');
const name = 'GiaPhong';

class DoanhThu {
    constructor (id, group_id, day, name, begin, end, normal, special, trangthai, cuahang_id){
            this.id = id;
            this.group_id = group_id;
            this.day = day;
            this.name = name;
            this.begin = begin;
            this.end = end;
            this.normal = normal;
            this.special = special;
            this.trangthai = trangthai;
            this.cuahang_id = cuahang_id;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('group_id', sql.Int, parseInt(this.group_id))
                .input('day', sql.Int, parseInt(this.day))
                .input('name', sql.NVarChar, this.name)
                .input('begin', sql.Int, parseInt(this.begin))
                .input('end', sql.Int, parseInt(this.end))
                .input('normal', sql.Money, parseFloat(this.normal))
                .input('special', sql.Money, parseFloat(this.special))
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`INSERT INTO ${name}(id, group_id, day, name, [begin], [end], normal, special, trangthai, cuahang_id) 
                        VALUES (@id, @group_id, @day, @name, @begin, @end, @normal, @special, @trangthai, @cuahang_id)`);
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('group_id', sql.Int, parseInt(this.group_id))
                .input('day', sql.Int, parseInt(this.day))
                .input('name', sql.NVarChar, this.name)
                .input('begin', sql.Int, parseInt(this.begin))
                .input('end', sql.Int, parseInt(this.end))
                .input('normal', sql.Money, parseFloat(this.normal))
                .input('special', sql.Money, parseFloat(this.special))
                .input('id', sql.Int, parseInt(this.id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET group_id = @group_id, day = @day, name = @name, [begin] = @begin, [end] = @end, 
                            normal = @normal, special = @special
                        WHERE id = @id AND cuahang_id = @cuahang_id AND trangthai = @trangthai`);
            })
            .catch(err => console.log(err));
    }
}