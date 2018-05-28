var sqlite3 = require('sqlite3').verbose();


function Conexion(path) {
    this.db = this.db || new sqlite3.Database(path);
    this.exeQuery = function(sql) {
        return this.db.prepare(sql);
    };

}

var con = new Conexion('D:/Programacion/Sqlite/zapalevi.db');
var pro = con.exeQuery("select nombre from proveedor");

/*nombresPro.forEach((item) => {
   console.log(item.nombre);
});*/