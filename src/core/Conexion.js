var sqlite3 = require('sqlite3').verbose();


function Conexion(path) {
    this.db = new sqlite3.Database(path);
    this.executeQuery = function(sql, callback) {
        this.db.all(sql, (err, row) => {
           if(row) {
               console.log(row);
               callback(row);
           }
        });
    };
}



var con = new Conexion("D:/Programacion/Sqlite/zapalevi.db");

var miResult = con.executeQuery("select * from proveedor", function(row) {
    console.log(row);
        return row;
});
console.log(miResult);