/**
 * skel para el router , levanta un servidor que
 * escucha peticiones en el puerto 8888.
 */
import http from 'http';

const server = http.createServer(function (request, response) {
  console.log('me ha entrado una peti por...: ', request.method);//TODO: borrame.
  console.log('desde la url: ', request.url);//TODO: borramoe.


    if(request.url === "/endpoint") {
        response.write("smoke en acción");
    } else {

        response.write(request.method);
    }
    response.end();
});

server.listen(8888);