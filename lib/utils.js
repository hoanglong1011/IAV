var mysql = require('mysql');
var sync_date = require('./model/sync_data');
var icool_phong = require('./model/icool_phong');
var icool_coso = require('./model/icool_coso');

exports.getCoso = function (pool) {
  	pool.getConnection(function(err, connection){
  		if(err){
  			io.emit('query error', {code: 100, message: err});
  		}
  		else {
  			var obj = new icool_coso(connection);
  			obj.getData(function(err, json){
  				if(err){
  					io.emit('query error', {code: 100, message: err});
  				}
  				else{
  					res.end(json);
  				}
  			});
  		}
  	});
};

exports.sync = function (phong, coso, version, io) {
  pool.getConnection(function(err, connection){
    if(err) {
      console.log("Error: ", err);
    }
    else {
      var sync = new sync_date(connection, [moment(Date.now()).format('YYYY-MM-DD')]);
      var room = new icool_phong().init(connection, phong, coso);

      // Restart lại trạng thái (online, offline) phòng các cơ sở
      sync.getData(function(err, result){
        if(err){
          console.log("Error: ", err);
        }
        else{
          if(result.length == 0){
            obj.offline(function(err, result){
              if(err){
                console.log("Error: ", err);
              }
              else{
                sync.insert(function(err, result){
                  if(err){
                    console.log("Error: ", err);
                  }
                  else{
                    console.log("Query executed successfully");
                  }
                });
              }
            });
          }
        }
      });

      room.setstatus(1, function(err, result){
        if(err){
          console.log("Error: ", err);
        }
        else{
          console.log("Query executed successfully");
        }
      });

      io.emit('client connect', {coso: coso, phong: phong, version: version});
    }

    connection.release();
  });
};
