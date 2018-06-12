//https://www.udemy.com/the-advanced-web-developer-bootcamp/learn/v4/t/lecture/7854250?start=0

import express from 'express'
import ConexionExample from './core/ConexionExample.js'
import { Observable } from 'rxjs';// A tomar por culo los problemas de asincronía , Cuenca 2017.
import rxObservableOfSqliteQuery from './rx-of-sqlite.js'

const app = express();
const conn = ConexionExample.generate();
app.listen(
    8888,
    () => console.info('Server running on port ', 8888)
);

/**
 * Crea un observable desde una consulta a una SQLite.
 *
 * Usando para probar con una dependencia muy fea
 * que wrappea el driver real de SQLite .
 * @todo Refactor con el driver nativo en otra ruta.
 *
 * @Note4levi:  fijate únicamente  en el uso que se le da , no en su implementación, por ahora.
 * @param query
 * @returns {*}
 * @constructor
 */
const SqlLiteQueryObservableFromConexionExample = function (query) {
    return Observable.create(function (observer) {
        const conn = ConexionExample.generate();
        try {
            conn.test();
            conn.query(
                query,
                (item) => observer.next(item),
                () => {
                    observer.complete()
                }
            );
        } catch (e) {
            observer.error(e);
        }
        return () => {
            conn.close()
        };
    });
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

app.get('/observable-con-dependencia-pestosa', function (req, res) {
    const query = "SELECT rowid AS id , info FROM prueba";
    const stream$ = SqlLiteQueryObservableFromConexionExample(query);
    let result = [];

    /**
     * A un observable , se le pasan 3 callbacks :
     * el que se ejecuta...
     *  por cada item,
     *  si hay un error,
     *  al completar el flujo.
     */
    stream$.subscribe(//nos subscribimos al flujo de datos ( iterable + eventEmitter )
        (next) => result.push(next), //por cada uno de los items pusheamos al result...
        (error) => res.json(error), //si nos peta por lo que sea mandamos ese error como json en la response.
        () => res.json(result),    //Al terminar el flujo, en el complete enviamos la response con el result.
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
