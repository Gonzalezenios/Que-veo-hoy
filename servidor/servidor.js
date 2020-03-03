//paquetes necesarios para el proyecto
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controlador = require('./controladores/controlador');
const controladorGeneros = require('./controladores/controladorGeneros.js');
const controladorId = require('./controladores/controladorId.js');
const controladorRecomendaciones = require('./controladores/controladorRecomendaciones.js');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//Pedidos de distintas rutas - Enio
app.get('/peliculas', controlador.obtenerPeliculas);
app.get('/peliculas/recomendacion', controladorRecomendaciones.recomendarPelicula);
app.get('/peliculas/:id', controladorId.obtenerPorId);
app.get('/generos', controladorGeneros.obtenerGeneros);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

