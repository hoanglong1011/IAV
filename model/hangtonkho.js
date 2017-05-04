const global = require('../lib/global');
const sql = require('mssql');
const name = 'HangTonKho';

class HangTonKho {
    constructor (id, date, nvl_id, nvl_name, _t, _n, _r, _c, _tt, ware_id, ware_name, trangthai, cuahang_id){
            this.id = id;
            this.date = _date;
            this.nvl_id = _NVL_ID;
            this.nvl_name = _NVL_name;
            this._t = _quantity_t;
            this._n = _quantity_n;
            this._r = _quantity_r;
            this._c = _quantity_c;
            this._tt = _quantity_tt;
            this.ware_id = _ware_ID;
            this.ware_name = _ware_name;
            this.trangthai = trangthai;
            this.cuahang_id = cuahang_id;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('date', sql.Date, this.date)
                .input('nvl_id', sql.VarChar, this.nvl_id)
                .input('nvl_name', sql.NVarChar, this.nvl_name)
                .input('quantity_t', sql.Float, parseFloat(this._t))
                .input('quantity_n', sql.Float, parseFloat(this._n))
                .input('quantity_r', sql.Float, parseFloat(this._r))
                .input('quantity_c', sql.Float, parseFloat(this._c))
                .input('quantity_tt', sql.Float, parseFloat(this._tt))
                .input('ware_id', sql.VarChar, this.ware_id)
                .input('ware_name', sql.NVarChar, this.ware_name)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`INSERT INTO ${name}(id, date, nvl_id, nvl_name, quantity_t, quantity_n, quantity_r, 
                            quantity_c, quantity_tt, ware_id, ware_name, trangthai, cuahang_id) 
                        VALUES (@id, @date, @nvl_id, @nvl_name, @quantity_t, @quantity_n, 
                            @quantity_r, @quantity_c, @quantity_tt, @ware_id, @ware_name, @trangthai, @cuahang_id)`);
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('quantity_t', sql.Float, parseFloat(this._t))
                .input('quantity_n', sql.Float, parseFloat(this._n))
                .input('quantity_r', sql.Float, parseFloat(this._r))
                .input('quantity_c', sql.Float, parseFloat(this._c))
                .input('quantity_tt', sql.Float, parseFloat(this._tt))
                .input('date', sql.Date, this.date)
                .input('nvl_id', sql.VarChar, this.nvl_id)
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET quantity_t = @quantity_t, quantity_n = @quantity_n, quantity_r = @quantity_r, 
                            quantity_c = @quantity_c, quantity_tt = @quantity_tt 
                        WHERE date = @date AND nvl_id = @nvl_id AND 
                            cuahang_id = @cuahang_id AND trangthai = @trangthai`);
            })
            .catch(err => console.log(err));
    }
}