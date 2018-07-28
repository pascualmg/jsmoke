//https://www.udemy.com/the-advanced-web-developer-bootcamp/learn/v4/t/lecture/7854250?start=0

import express from 'express'
import ConexionExample from './core/ConexionExample.js'
import {Observable} from 'rxjs';// A tomar por culo los problemas de asincronía , Cuenca 2017.
import rxObservableOfSqliteQuery from './rx-of-sqlite.js'
import sqlite from 'sqlite3';

const app = express();
const conn = ConexionExample.generate();
app.listen(
    8888,
    () => console.info('Server running on port ', 8888)
);


/*example*/
app.get('/', function (req, res) {
    const query = "SELECT rowid AS id , info FROM prueba";
    sqlite.verbose();
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

app.get('/location', (req, res) => {
    //mocked data.
    res.send(
        {
            "id": "string",
            "name": "string",
            "type": "string",
            "measure": {
                "long": 0,
                "high": 0,
                "wide": 0
            },
            "articles": [
                {
                    "article": {
                        "id": "string",
                        "name": "string",
                        "sku": "string",
                        "path_number": "string",
                        "serial_numbers": [
                            "string"
                        ],
                        "eans": [
                            "string"
                        ],
                        "movement_statistics": {
                            "rotation": "string",
                            "pending_orders": 0
                        },
                        "family": {
                            "name": "string",
                            "serial_number_required": true,
                            "type": "volumetric"
                        },
                        "measure": {
                            "long": 0,
                            "high": 0,
                            "wide": 0,
                            "weight": 0
                        }
                    },
                    "quantity": 0,
                    "created_at": "2018-06-06T08:21:33.018Z"
                }
            ]
        }
    )
});
