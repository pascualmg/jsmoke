//Ejemplo del https://www.npmjs.com/package/sqlite3 en ES6 y funcando.

import sqlite from 'sqlite3';
sqlite.verbose();

const db = new sqlite.Database(':memory:');

db.serialize(() => {
    //Creamos tabla
    db.run("CREATE TABLE prueba (info TEXT)");

    //llenamos de fixtures.
    const stmt = db.prepare("INSERT INTO prueba VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("datosDePrueba" + i);
    }
    stmt.finalize();

    //hacemos una query.
    db.each("SELECT rowid AS id , info FROM prueba", (err, row) => console.log('result', row.id, " ", row.info));
});