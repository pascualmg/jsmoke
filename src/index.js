//https://www.udemy.com/the-advanced-web-developer-bootcamp/learn/v4/t/lecture/7854250?start=0

import express from 'express'
import ConexionExample from './core/ConexionExample.js'
import { Observable } from 'rxjs';

const app = express();
const conn = ConexionExample.generate();

app.listen(
    8888,
    () => console.info('Server running on port ', 8888)
);

 const SqlLiteQueryObservable = function (query , conn) {
    const createdObservable = Observable.create(function(observer){
    conn.query(
        observer.next,//x cada una de las rows...
        observer.complete
    );
        return {
            unsubscribe: () => {console.log('que lastima, con lo que me gusta que me observen...') }
        }
    });
    return createdObservable;
};
app.get('/', function (req, res) {
    conn.test();
    conn.query(
        "SELECT rowid AS id , info FROM prueba",
        console.log,//x cada una de las rows...
        () => console.log('completado')//cuando no hay rows
    );
    res.json("mira en la consola del server la salida pidgeon");
});

app.get('/observable', function (req, res) {

    const query = "SELECT rowid AS id , info FROM prueba";
    const stream$ = SqlLiteQueryObservable(query,conn);
    stream$.subscribe(
        console.log,
        console.log,
        res.json("y he terminado de observar......omgomgomgomgomgojmgomgojm"),
    )
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
