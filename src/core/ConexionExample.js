//Ejemplo del https://www.npmjs.com/package/sqlite3 en ES6 y funcando.

import sqlite from 'sqlite3';
sqlite.verbose();

function generate() {
    const db = new sqlite.Database(':memory:');
    let result = [];

    function query(sql, eachRowCallback, complete){
        db.serialize(() => {
            db.each(sql,(err, row) => {
                eachRowCallback(row);
                result.push(row);
            },complete);
        });
        return result;
    }
    async function test() {
        db.serialize(() => {
            //Creamos tabla
            db.run("CREATE TABLE prueba (info TEXT)");

            console.log('creando tabla' );//TODO: borrame.

            //llenamos de fixtures.
            const stmt = db.prepare("INSERT INTO prueba VALUES (?)");
            for (let i = 0; i < 10; i++) {
                stmt.run("datosDePrueba" + i);
            }
            stmt.finalize();

            //hacemos una query.
            //db.each("SELECT rowid AS id , info FROM prueba", (err, row) => console.log('result', row.id, " ", row.info, result) && result.push(row));
        })
    }
    function close() {
        console.log('cerrando la conn');//TODO: borrame.
        console.log('output ', db.close());//TODO: borrame.
    }

    return {
        test: test,
        close: close,
        query: query,
    }
}

export default { generate } ;