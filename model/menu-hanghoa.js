const global = require('../lib/global');
const sql = require('mssql');
const name = 'Menu_HangHoa';

class Menu_HangHoa {
    constructor (id, menu_id, group_id, goods_id, goods_name, 
            unit, price, type, trangthai, cuahang_id){
            this.id = id;
            this.menu_id = menu_id;
            this.group_id = group_id;
            this.goods_id = goods_id;
            this.goods_name = goods_name;
            this.unit = unit;
            this.price = price;
            this.type = type;
            this.trangthai = trangthai;
            this.cuahang_id = cuahang_id;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('menu_id', sql.Int, parseInt(this.menu_id))
                .input('group_id', sql.VarChar, this.group_id)
                .input('goods_id', sql.VarChar, this.goods_id)
                .input('goods_name', sql.NVarChar, this.goods_name)
                .input('unit', sql.NVarChar, this.unit)
                .input('price', sql.Money, this.price)
                .input('type', sql.VarChar, this.type)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`INSERT INTO ${name}(id, menu_id, group_id, goods_id, goods_name, unit, 
                            price, type, trangthai, cuahang_id) 
                        VALUES (@id, @menu_id, @group_id, @goods_id, @goods_name, @unit, @price, 
                            @type, @trangthai, @cuahang_id)`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('unit', sql.NVarChar, this.unit)
                .input('price', sql.Money, this.price)
                .input('menu_id', sql.Int, parseInt(this.menu_id))
                .input('group_id', sql.VarChar, this.group_id)
                .input('goods_id', sql.VarChar, this.goods_id)
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET unit = @unit, price = @price 
                        WHERE menu_id = @menu_id AND group_id = @group_id AND goods_id = @goods_id AND 
                                cuahang_id = @cuahang_id AND trangthai = @trangthai`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }

    remove(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('menu_id', sql.Int, parseInt(this.menu_id))
                .input('group_id', sql.VarChar, this.group_id)
                .input('goods_id', sql.VarChar, this.goods_id)
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`UPDATE ${name} SET trangthai = @trangthai 
                        WHERE menu_id = @menu_id AND group_id = @group_id AND goods_id = @goods_id AND 
                                cuahang_id = @cuahang_id`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }

    delete(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .input('menu_id', sql.Int, parseInt(this.menu_id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .query(`UPDATE ${name} SET trangthai = @trangthai 
                        WHERE menu_id = @menu_id AND cuahang_id = @cuahang_id`);
                
                pool.close();
            })
            .catch(err => console.log(err));
    }
}