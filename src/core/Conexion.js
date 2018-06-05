var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database("D:/Programacion/Sqlite/zapalevi.db");
var Conexion = {};


Conexion.executeQuery = function (sql, callback) {
    var result = [];
    db.each(sql,
        function item(err, row) {
            if (row) {
                result.push(row);
            }
        },
        function complete() {
            var obj = {
                proveedores: result
            };
            callback(obj);
        });
};

function putamierda(result) {
    console.log(JSON.stringify(result));
}
Conexion.executeQuery("select * from proveedor", putamierda);
export default {Conexion};



