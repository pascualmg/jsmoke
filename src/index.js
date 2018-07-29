//https://www.udemy.com/the-advanced-web-developer-bootcamp/learn/v4/t/lecture/7854250?start=0

import express from 'express'
import ConexionExample from './core/ConexionExample.js'
import rxObservableOfSqliteQuery from './rx-of-sqlite.js'
import sqlite from 'sqlite3';
sqlite.verbose();

const app = express();
const conn = ConexionExample.generate();
app.listen(
    8888,
    () => console.info('Server running on port ', 8888)
);



/*example*/
app.get('/', function (req, res) {
    const query = "SELECT rowid AS id , info FROM prueba";
    const db = new sqlite.Database(':memory:');
    (function IIFFE_create_fixtures_in_db() {
        db.serialize(() => {
            //Creamos tabla
            db.run("CREATE TABLE prueba (info TEXT)");

            console.log('creando tabla');//TODO: borrame.

            //llenamos de fixtures.
            const stmt = db.prepare("INSERT INTO prueba VALUES (?)");
            for (let i = 0; i < 10; i++) {
                stmt.run("datosDePrueba" + i);
            }
            stmt.finalize();

            //hacemos una query.
            //db.each("SELECT rowid AS id , info FROM prueba", (err, row) => console.log('result', row.id, " ", row.info, result) && result.push(row));
        })
    })(db);

    //////////////////////////////////////////////////////
    const stream$ = rxObservableOfSqliteQuery(query, db);
    let result = [];
    /**
     * A un observable , se le pasan 3 callbacks :
     *  Son estos:
     *  por cada item,
     *  si hay un error,
     *  al completar el flujo.
     */
    stream$.subscribe(//nos subscribimos al flujo de datos ( iterable + eventEmitter )
        (next) => result.push(next), //por cada uno de los items pusheamos al result...
        (error) => res.json(error), //si hay error ...
        () => res.json(result),    //Al terminar el flujo, en el complete enviamos la response con el result.
    );
});


app.get('/cursos', (req, res) => {
res.json([
  {"id":"idCurso01",
  "name" : "nombreCurso01", 
  "datestart": "2018-01-01",
  "hasExpired" : "false",
  "inscriptions" : [ { "name": "inscrito01curso01"}, { "name": "inscrito02curso01"}, { "name": "inscrito03curso01"}, { "name": "inscrito04curso01"}, { "name": "inscrito05curso01"},] 
  },
  {"id":"idCurso01",
  "name" : "nombreCurso01", 
  "datestart": "2018-01-01",
  "hasExpired" : "false",
  "inscriptions" : [ { "name": "inscrito01curso01"}, { "name": "inscrito02curso01"}, { "name": "inscrito03curso01"}, { "name": "inscrito04curso01"}, { "name": "inscrito05curso01"},] 
  },
  {"id":"idCurso01",
  "name" : "nombreCurso01", 
  "datestart": "2018-01-01",
  "hasExpired" : "false",
  "inscriptions" : [ { "name": "inscrito01curso01"}, { "name": "inscrito02curso01"}, { "name": "inscrito03curso01"}, { "name": "inscrito04curso01"}, { "name": "inscrito05curso01"},] 
  },
  {"id":"idCurso01",
  "name" : "nombreCurso01", 
  "datestart": "2018-01-01",
  "hasExpired" : "false",
  "inscriptions" : [ { "name": "inscrito01curso01"}, { "name": "inscrito02curso01"}, { "name": "inscrito03curso01"}, { "name": "inscrito04curso01"}, { "name": "inscrito05curso01"},] 
  },
  {"id":"idCurso01",
  "name" : "nombreCurso01", 
  "datestart": "2018-01-01",
  "hasExpired" : "false",
  "inscriptions" : [ { "name": "inscrito01curso01"}, { "name": "inscrito02curso01"}, { "name": "inscrito03curso01"}, { "name": "inscrito04curso01"}, { "name": "inscrito05curso01"},] 
  },

	]); 
});
