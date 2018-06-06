/**
 * skel para el router , levanta un servidor que
 * escucha peticiones en el puerto 8888 con express.
 *
 */
import express from 'express';

const app = express();
let port = process.env.PORT || 8888;

// import ConexionExample from './core/ConexionExample';
// import Conexion from './core/Conexion';

app.get('/', (req, res) => {
    res.json({algo: "datos"});
});

app.listen(port);
