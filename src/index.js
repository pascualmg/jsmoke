//https://www.udemy.com/the-advanced-web-developer-bootcamp/learn/v4/t/lecture/7854250?start=0

import express from 'express'
import ConexionExample from './core/ConexionExample.js'
const app = express();

app.get('/', function (req, res) {
   res.send({algo: "ostia puta", cosa: {cosa:"algo"}})
    const conn = ConexionExample.generate();
    conn.test();
    conn.query("SELECT rowid AS id , info FROM prueba",console.log);
});

app.listen(8888, function () {
   console.log('app arrancada en el puerto...', 8888);//TODO: borrame.
});