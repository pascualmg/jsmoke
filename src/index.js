/**
 * skel para el router , levanta un servidor que
 * escucha peticiones en el puerto 8888.
 */
import http from 'http';

import ConexionExample from './core/ConexionExample.js';
let conn = ConexionExample.generate();


const server = http.createServer(function (request, response) {
  console.log('me ha entrado una peti por...: ', request.method);//TODO: borrame.
  console.log('desde la url: ', request.url);//TODO: borramoe.

    if(request.url === "/endpoint") {
        response.write("smoke en acción");
        
        conn.test();
        let result = conn.query("SELECT rowid AS id , info FROM prueba", console.log );
        conn.close();

        setInterval(result=>console.log(result), 1000);
    } else {

        response.write(request.method);
    }
    response.end();
});

server.listen(8888);