//importar la conexion a la base de datos -Enio
const conexion = require('../lib/conexionbd');

//funcion para devolver las peliculas - Enio
obtenerPeliculas = (req, res) => {
    conexion.connect()
    // se obtiene el query param peliculas
    var sql = 'select * from pelicula;'
    
    conexion.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(500).send('Hubo un error en la consulta');
        }
        var response = {
            'peliculas': resultado
        };

        res.send(JSON.stringify(response));
    });

    // conexion.destroy()
}
    //Se expportan las funciones creadas - Enio
    module.exports = {
        obtenerPeliculas: obtenerPeliculas
    };