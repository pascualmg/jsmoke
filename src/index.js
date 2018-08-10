//https://www.udemy.com/the-advanced-web-developer-bootcamp/learn/v4/t/lecture/7854250?start=0

import express from 'express'
import rxObservableOfSqliteQuery from './rx-of-sqlite.js'
import sqlite from 'sqlite3'
sqlite.verbose()

const app = express()
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.listen(
    8888,
    () => console.info('Server running on port ', 8888)
)



/*example*/
//esto no lo detecta.
/**
 * selecciona los datos de pruebas
 *
 * @param {httprequest} req la request
 * @param {httpresponse} res la response
 * @returns {void} nada
 */
app.get('/', function (req, res) {
    const query = 'SELECT rowid AS id , info FROM prueba'
    const db = new sqlite.Database(':memory:');
    (function IIFFE_create_fixtures_in_db() {
        db.serialize(() => {
            //Creamos tabla
            db.run('CREATE TABLE prueba (info TEXT)')

            //console.log('creando tabla')//TODO: borrame.

            //llenamos de fixtures.
            const stmt = db.prepare('INSERT INTO prueba VALUES (?)')
            for (let i = 0; i < 10; i++) {
                stmt.run('datosDePrueba' + i)
            }
            stmt.finalize()

            //hacemos una query.
            //db.each("SELECT rowid AS id , info FROM prueba", (err, row) => console.log('result', row.id, " ", row.info, result) && result.push(row));
        })
    })(db)

    //////////////////////////////////////////////////////
    const stream$ = rxObservableOfSqliteQuery(query, db)
    let result = []
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
    )
})


app.get('/cursos', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var now = Date().toLocaleString();
  console.log(ip, now)
    res.json([
        {'id':'idCurso01',
            'name' : 'nombreCurso01', 
            'imgsrc' : 'imgUriCurso01', 
            'datestart': '2018-01-01',
            'hasExpired' : 'true',
            'inscriptions' : [ { 'name': 'inscrito01curso01'}, { 'name': 'inscrito02curso01'}, { 'name': 'inscrito03curso01'}, { 'name': 'inscrito04curso01'}, { 'name': 'inscrito05curso01'},] 
        },
        {'id':'idCurso02',
            'name' : 'nombreCurso02', 
            'imgsrc' : 'imgUriCurso02', 
            'datestart': '2018-01-02',
            'hasExpired' : 'true',
            'inscriptions' : [ { 'name': 'inscrito01curso02'}, { 'name': 'inscrito02curso02'}, { 'name': 'inscrito03curso02'}, { 'name': 'inscrito04curso02'}, { 'name': 'inscrito05curso02'},] 
        },
        {'id':'idCurso03',
            'name' : 'nombreCurso03', 
            'imgsrc' : 'imgUriCurso03', 
            'datestart': '2018-01-03',
            'hasExpired' : 'false',
            'inscriptions' : [ { 'name': 'inscrito01curso03'}, { 'name': 'inscrito02curso03'}, { 'name': 'inscrito03curso03'}, { 'name': 'inscrito04curso03'}, { 'name': 'inscrito05curso03'},] 
        },
        {'id':'idCurso04',
            'name' : 'nombreCurso04', 
            'imgsrc' : 'imgUriCurso04', 
            'datestart': '2018-01-04',
            'hasExpired' : 'false',
            'inscriptions' : [ { 'name': 'inscrito01curso04'}, { 'name': 'inscrito02curso04'}, { 'name': 'inscrito03curso04'}, { 'name': 'inscrito04curso04'}, { 'name': 'inscrito05curso04'},] 
        },
        {'id':'idCurso05',
            'imgsrc' : 'imgUriCurso05', 
            'name' : 'nombreCurso05', 
            'datestart': '2018-01-05',
            'hasExpired' : 'false',
            'inscriptions' : [ { 'name': 'inscrito01curso05'}, { 'name': 'inscrito02curso05'}, { 'name': 'inscrito03curso05'}, { 'name': 'inscrito04curso05'}, { 'name': 'inscrito05curso05'},] 
        },

    ]) 
})
