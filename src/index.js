/**
 * skel para el router , levanta un servidor que
 * escucha peticiones en el puerto 8888.
 */
const http = require('http');

const server = http.createServer(function (request, response) {
  console.log('me ha entrado una peti por...: ', request.method);//TODO: borrame.
  response.write("hola caracola");
  response.end();
});

server.listen(8888);