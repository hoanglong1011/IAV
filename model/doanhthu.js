const global = require('../lib/global');
const sql = require('mssql');
const name = 'DoanhThu';

class DoanhThu {
    constructor (id, bill, guests, sum, total, mon, 
            loai, hoadon, customer, vat, phuphi, cuahang_id, 
            cuahang_name, ngay, ca, trangthai){
            this.id = id;
            this.bill = bill;
            this.guests = guests;
            this.sum = sum;
            this.total = total;
            this.mon = _mon;
            this.loai = _loai;
            this.hoadon = hoadon;
            this.customer = _customer;
            this.vat = _vat;
            this.phuphi = _phuphi;
            this.cuahang_id = cuahang_id;
            this.cuahang_name = cuahang_name;
            this.ngay = ngay;
            this.ca = ca;
            this.trangthai = trangthai;
    }

    add(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('id', sql.Int, parseInt(this.id))
                .input('sobill', sql.Int, parseInt(this.bill))
                .input('sokhach', sql.Int, parseInt(this.guests))
                .input('doanhso', sql.Money, parseFloat(this.sum))
                .input('doanhthu', sql.Money, parseFloat(this.total))
                .input('mon', sql.Money, parseFloat(this.mon))
                .input('loai', sql.Money, parseFloat(this.loai))
                .input('bill', sql.Money, parseFloat(this.hoadon))
                .input('customer', sql.Money, parseFloat(this.customer))
                .input('vat', sql.Money, parseFloat(this.vat))
                .input('phuphi', sql.Money, parseFloat(this.phuphi))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('cuahang_name', sql.VarChar, this.cuahang_name)
                .input('ngay', sql.Date, this.ngay)
                .input('ca', sql.Int, parseInt(this.ca))
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`INSERT INTO ${name}(id, sobill, sokhach, doanhso, doanhthu, mon, loai, bill, customer, vat, 
                            phuphi, cuahang_id, cuahang_name, ngay, ca, trangthai) 
                        VALUES (@id, @sobill, @sokhach, @doanhso, @doanhthu, @mon, @loai, @bill, 
                            @customer, @vat, @phuphi, @cuahang_id, @cuahang_name, @ngay, @ca, @trangthai)`);
            })
            .catch(err => console.log(err));
    }

    edit(){
        sql.connect(config)
            .then (pool => {                
                return pool.request()
                .input('sobill', sql.Int, parseInt(this.bill))
                .input('sokhach', sql.Int, parseInt(this.guests))
                .input('doanhso', sql.Money, parseFloat(this.sum))
                .input('doanhthu', sql.Money, parseFloat(this.total))
                .input('mon', sql.Money, parseFloat(this.mon))
                .input('loai', sql.Money, parseFloat(this.loai))
                .input('bill', sql.Money, parseFloat(this.hoadon))
                .input('customer', sql.Money, parseFloat(this.customer))
                .input('vat', sql.Money, parseFloat(this.vat))
                .input('phuphi', sql.Money, parseFloat(this.phuphi))
                .input('id', sql.Int, parseInt(this.id))
                .input('cuahang_id', sql.VarChar, this.cuahang_id)
                .input('trangthai', sql.Int, parseInt(this.trangthai))
                .query(`UPDATE ${name} SET sobill = @sobill, sokhach = @sokhach, doanhso = @doanhso, 
                            doanhthu = @doanhthu, mon = @mon, loai = @loai, bill = @bill, 
                            customer = @cusomer, vat = @vat, phuphi = @phuphi
                        WHERE id = @id AND cuahang_id = @cuahang_id AND trangthai = @trangthai`);
            })
            .catch(err => console.log(err));
    }
}

